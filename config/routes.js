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
    host: 'http://localhost:3000',
    facebook: {
        appID: '299478470529543',
        appSecret: 'ae7c0a440335a15cbdcfb7eeae2fbd36',
    },
    google:{
        clientID:'118353661828-mcsrp5g2ksmub7ajvt1f46l7gao30oe1.apps.googleusercontent.com',
        clientSecret :'T3g3IBKCT5xFkSPkpJw3okzn'
    }
};
module.exports = config;