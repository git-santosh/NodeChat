var config = {

    routes: {
        login: '/login',
        logout: '/logout',
        chat :'/chat',
        facebookAuth : '/auth/facebook',
        facebookAuthCallback : '/auth/facebook/callback'
    },
    host: 'http://localhost:3000',
    facebook: {
        appID: '299478470529543',
        appSecret: 'ae7c0a440335a15cbdcfb7eeae2fbd36',
    }
};
module.exports = config;