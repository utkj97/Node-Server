# Node-Server
A server based on node JS that handles the HTTP requests made by the chrome extension Channeler.
Run:
npm install
this installs all the local node modules 
the use:
node app 
This starts a localhost at port 3000.
The database connection is made by :
mongoose.connect(<Path to database>); this is done in the /controllers/serve-controller.js file
