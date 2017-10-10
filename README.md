# NodeChat Application
Building a simple application with express.js 
## Getting Started  
This application can authenticate user form various login strategies.
Planning to target Socket.io for chating purpose.
### Prerequisites   
You must have install node , mongoDB and redius.
MongoDB installation. 


## Running 
 I have used **Redis** and **connect-redis** for storing the session ID as a key and the session data as a value.
To use a Redis store,we assume that we are running Redis locally and that Redis' version is above 2.0.0

### I found Running REDIS on window is quite complicated  than installing MongoDB on windows
we can easily setup REDIS on Ubuntu by using following command 

``` sudo apt-get install redis-server```

``` redis-server --daemonize yes ```

``` redis-cli ```

REDIS can be install on widown by using below link.

https://github.com/ServiceStack/redis-windows

If redis is not configred properly on your machine and you are running your application on server at that time your session is not getting store on nowhere except SID that time you might get error saying 

connect-redis - **ERR wrong number of arguments for 'set' command #298**

I have used **connect-mongo** as well for storing session on DB

Used **Passport** for Authentication 

- Google Auth
- Facebook Auth
- Local Auth (not used passport but own logic):shipit:

you can run this application by using any of the following 

 - nodemon 
 - npm start
 - node app.js

 This application is deployed on heroku.
 you can find below link 

 Sometime this application wont behave as per requirement becouse its under development and some commit need to push on heroku server.

### https://santosh-nodechat.herokuapp.com/