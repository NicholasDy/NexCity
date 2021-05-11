// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const sequelize = require("./config/connection")
// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Set handlebars
const app = express();
const expressHandlebars = require("express-handlebars");
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./controllers/html-routes.js")(app);
require("./controllers/api/user-api-routes.js")(app);
require("./controllers/api/search-api-routes.js")(app);

//Syncing our database and logging a message to the user upon success

sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
    );
  });
});