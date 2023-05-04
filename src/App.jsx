import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Genre from './components/Genre'
import Search from './components/Search'
import Favorites from './components/Favorites'
import Details from './components/Details';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import userService from './services/user';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBI8Urpqz2-pZDakhOcFlgoEELNMdchrCY",
  authDomain: "final-385703.firebaseapp.com",
  projectId: "final-385703",
  storageBucket: "final-385703.appspot.com",
  messagingSenderId: "876270913261",
  appId: "1:876270913261:web:d4abb13962d913d8dfaee4",
  measurementId: "G-PT30HC5L54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    userService.getUser()
      .then((response) => {
        if(response.data.uid) {
          setUser({
            uid: response.data.uid,
            email: response.data.email
          });
          setIsLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setIsLoggedIn(false);
      })
  }, []);

  const handleNotification = (notification, type) => {
    if (type === "message") {
      setMessage(notification);
    } else if (type === "error") {
      console.log(notification)
      setError(notification);
    }

    setTimeout(() => {
      if (type === "message") {
        setMessage('');
      } else if (type === "error") {
        setError('');
      }
    }, 3500)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    userService.logout()
      .then(response => {
        console.log(response);
        setUser({});
        setIsLoggedIn(false);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<><Navbar user={user} handleLogout={handleLogout} /><Login setUser={setUser} handleNotification={handleNotification} message={message} error={error} setIsLoggedIn={setIsLoggedIn} /></>} />
          <Route path="/register" element={<><Navbar user={user} handleLogout={handleLogout} /><Register error={error} handleNotification={handleNotification} /></>} />
          <Route path="/" element={<><Navbar user={user} handleLogout={handleLogout} /><Home handleNotification={handleNotification} error={error} /></>} />
		      <Route path="/genre/:id" element={<><Navbar user={user} handleLogout={handleLogout} /><Genre /></>} />
          <Route path="/details/:id" element={<><Navbar user={user} handleLogout={handleLogout} /><Details handleNotification={handleNotification} error={error} message={message} isLoggedIn={isLoggedIn} /></>} />
          <Route path="/favorites" 
            element={
              <Protected isLoggedIn={isLoggedIn} handleNotification={handleNotification}>
                <Navbar user={user} handleLogout={handleLogout} />
                <Favorites handleNotification={handleNotification} error={error} />
              </Protected>
            }
          />
          <Route path="/search/:query" element={<><Navbar user={user} handleLogout={handleLogout} /><Search handleNotification={handleNotification} error={error} /></>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
