const express = require('express');
const dotenv = require('dotenv');
const { auth, provider } = require('../firebase.js');
const { checkAuth } = require('../utils/helper.js');
const User = require('../mongodb/models/User');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } = require("firebase/auth");

dotenv.config();

const router = express.Router();

// GETS CURRENT USER IF THERE IS ONE
router.get('/', checkAuth, (req, res) => {
    const user = req.user;
    res.status(200).json(user);
});

// SIGNS USER IN WITH EMAIL/PASSWORD
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ user });
        })
        .catch((error) => {
            const code = error.code;
            let errorMessage;
            switch(code) {
              case "auth/invalid-email":
                errorMessage = "Please enter a valid email.";
                break;
              case "auth/wrong-password":
              case "auth/user-not-found":
                errorMessage = "Incorrect password or user not found.";
                break;
              case "auth/too-many-requests":
                errorMessage = "Too many login attempts. Please try again later.";
                break;
              default:
                errorMessage = "Error logging in user. Please try again later.";
            }
            res.status(400).send(errorMessage);
        });
});

// LOGS USER OUT
router.post('/logout', (req, res) => {
    signOut(auth).then(() => {
        res.status(200).send('Logged out successfully.');
    })
    .catch((error) => {
        const errorMessage = error.message;
        res.status(500).send('Error Logging out user.');
    });
})

// REGISTERS NEW USER WITH EMAIL/PASSWORD
router.post('/register', (req, res) => {
    const { email, password } = req.body;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUser = new User({
                uid: user.uid,
                favorite_movies: []
            });
            newUser.save()
                .then(() => {
                    res.status(200).json({ user });
                })
                .catch((error) => {
                    res.status(500).send(error.message); 
                });
        })
        .catch((error) => {
            const code = error.code;
            let errorMessage;
            switch(code) {
              case "auth/invalid-email":
                errorMessage = "Please enter a valid email.";
                break;
              case "auth/email-already-in-use":
                errorMessage = "Account already exists with email.";
                break;
              case "auth/weak-password":
                errorMessage = "Password must be more than 6 characters.";
                break;
              default:
                errorMessage = "Error logging in user. Please try again later.";
            }
            res.status(400).send(errorMessage);
        }
    );
})

// LOGS IN USER USING GOOGLE (NOT IMPLEMENTED)
router.post('/login/google', (req, res) => {

    signInWithPopup(auth, provider)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUser = new User({
                uid: user.uid,
                favorite_movies: []
            });
            newUser.save()
                .then(() => {
                    res.status(200).json({ user });
                })
                .catch((error) => {
                    res.status(500).send(error.message); 
                });
        })
        .catch((error) => {
            res.status(500).send(error.message); 
        }
    );
})

// GETS USERS FAVORITE MOVIES
router.get('/favorite', checkAuth, (req, res) => {
    const userId = req.user.uid;

    User.findOne({ uid: userId }, { favorite_movies: 1 })
        .then((user) => {
            return res.status(200).json({ favorite_movies: user.favorite_movies });
        })
        .catch((err) => {
            
            return res.status(500).json({ error: "Error finding user's favorite movies." });
            
        }
    );

    
})

// CHECKS IF CERTAIN MOVIE IS FAVORITED BY USER
router.get('/favorite/:id', checkAuth, async (req, res) => {
    const userId = req.user.uid;
    const favoriteMovieId = parseInt(req.params.id);
  
    try {
      const user = await User.findOne({ uid: userId });
      const favoriteMovie = user.favorite_movies.find(movie => movie.id === favoriteMovieId);
      if (!favoriteMovie) {
        return res.status(200).json({ isFavorite: false });
      }
      return res.status(200).json({ isFavorite: true });
    } catch (err) {
      return res.status(500).json({ error: "Error getting favorite movie." });
    }
});

// ADDS MOVIE TO USERS FAVORITES
router.put('/favorite', checkAuth, async (req, res) => {
    const movieData = req.body;
    const userId = req.user.uid;

    const movie = {
        id: movieData.id,
        title: movieData.title,
        overview: movieData.overview,
        poster_path: movieData.poster_path,
        backdrop_path: movieData.backdrop_path
    }

    User.findOneAndUpdate({ uid: userId }, { $push: { favorite_movies: movie } })
        .then(() => {
            return res.status(200).json({ message: "Favorite movie added." });
        })
        .catch((err) => {
            return res.status(500).json({ error: "Error updating favorites." });
        }
    );
})

// REMOVES MOVIE FROM USERS FAVORITES
router.put('/favorite/:id', checkAuth, (req, res) => {
    const movieId = req.params.id;
    const userId = req.user.uid;

    User.findOneAndUpdate({ uid: userId }, { $pull: { favorite_movies: { id: movieId } } })
        .then(() => {
            return res.status(200).json({ message: "Favorite movie deleted." });
        })
        .catch((err) => {
            return res.status(500).json({ error: "Error updating favorites." });
        }
    );
})

module.exports = router;