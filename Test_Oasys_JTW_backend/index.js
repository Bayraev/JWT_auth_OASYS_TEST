const express = require('express'); // app
const mongoose = require('mongoose');
const dotenv = require('dotenv'); // secret data containing
const cors = require('cors'); // Cross-Origin Resource Sharing (preventing errors for local execution)
const morgan = require('morgan'); // logging HTTP reqs (for debugg)
const cookieParser = require('cookie-parser'); // managing cookies

dotenv.config(); // Environment secret data

//! temp
const { MONGO_DB, PORT } = process.env; // info from env

const app = express(); // express app init
app.use(express.json({ extended: true })); // need this instead of body-parser (i actually dowloaded) //! WITHOUT THIS REQ.BODY IS UNDEFINED
app.use(cookieParser());
app.use(express.urlencoded({ extended: false })); // url parsing (string to obj). Need "true" for nested ones.
app.use(cors());
app.use(morgan('dev'));
app.use('/api', require('./routes/AuthRoutes'));

// connect to MongoDB //! callback version doesnt work no longer, use .then.catch!
mongoose
  .connect(MONGO_DB)
  .then(() => {
    console.log('Успешное подключение к MongoDB');
  })
  .catch((error) => {
    console.log('Ошибка подключени к MongoDB');
  });

// Start Server
app.listen(PORT, (error) => {
  if (error) {
    console.log(`Ошибка: при соединении с сервером ${PORT}`);
  }
  console.log(`Успех: сервер прослушивается на порту: ${PORT}`);
});
