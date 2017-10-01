# We have used Redis and connect-redis for storing the session ID as a key and the session data as a value.
To use a Redis store,we assume that we are running Redis locally and that Redis' version is above 2.0.0

# How to run redis on windows ? 
https://github.com/ServiceStack/redis-windows

1) sudo apt-get install redis-server
2) redis-server --daemonize yes
3) redis-cli

If redis is not configred properly you might get error saying 
connect-redis - ERR wrong number of arguments for 'set' command #298