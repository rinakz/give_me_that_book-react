const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();
const cors = require('cors');

const userRouter = require('./routes/userRouter');

const booksRouter = require('./routes/books')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(
  session({
    name: 'sid',
    store: new FileStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use('/', userRouter);
app.use('/books', booksRouter)

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
