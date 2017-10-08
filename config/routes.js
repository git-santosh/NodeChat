var config = {

    routes: {
        register:'/register',
        login: '/auth/login',
        logout: '/auth/logout',
        chat :'/chat',
        facebookAuth : '/auth/facebook',
        facebookAuthCallbauthack : '/auth/facebook/callback',
        googleAuth : '/auth/google',
        googleAuthCallback:'/auth/google/callback'
    },
    host: 'http://localhost:3000',
    crypto:{
        workFactor:5000,
        keylen:32,          //size of our hash that comes back
        randomSize:256      //randomSize is the size of the salt.
    }
};
module.exports = config;