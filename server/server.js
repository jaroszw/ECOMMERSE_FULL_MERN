require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cookieParser());

const URI = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

app.use('/user', require('./routes/userRouter'));

app.get('/', (req, res) => {
  res.json({ message: 'HELLO WORLD' });
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listienning on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
