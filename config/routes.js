var config = {

    routes: {
        login: '/login',
        logout: '/logout',
        chat :'/chat',
        facebookAuth : '/auth/facebook',
        facebookAuthCallback : '/auth/facebook/callback',
        googleAuth : '/auth/google',
        googleAuthCallback:'/auth/google/callback'
    },
    host: 'http://localhost:3000'
};
module.exports = config;
