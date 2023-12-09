const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");

const routes = require("./routes");
const db = require("./config/db");
const SortMiddleware = require('./app/middlewares/SortMiddleware');

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
app.use(SortMiddleware);

// HTTP logger
// app.use(morgan('combined'))
app.use(morgan("dev"));

// Template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => {
        return a + b;
      },

      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default'

        const icons = {
          default: 'bi bi-arrow-down-up',
          asc: 'bi bi-sort-down-alt',
          desc: 'bi bi-sort-down',
        }

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        }

        const icon = icons[sortType]
        const type = types[sortType]

        return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
      }
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// Routes init
routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
