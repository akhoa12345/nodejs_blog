const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");

const routes = require("./routes");
const db = require("./config/db");
const sortMiddleware = require('./app/middlewares/sortMiddleware');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Custom middlewares
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'))
app.use(morgan("dev"));

// Template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: require('./helpers/handlebars'),
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
