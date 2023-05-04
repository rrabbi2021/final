const { auth } = require('../firebase.js');

const checkAuth = (request, response, next) => {
    if (auth.currentUser) {
      request.user = auth.currentUser;
      next();
    } else {
      return response.status(500).json({ error: 'User not authenticated.' })
    }
}

module.exports = { checkAuth }