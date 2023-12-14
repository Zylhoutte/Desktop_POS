const express = require('express');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const multer = require('multer'); // Added multer
const port = process.env.PORT || 5001;
const crudRoutes = require('./routes/crudRoutes');

connectDB();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './frontend/src/images'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', upload.single('image'), require('./routes/productRoutes')); // Use multer middleware for file uploads
app.use('/api/bills', require('./routes/billsRoutes'));
app.use('/api/cruds', crudRoutes);

// Serve Frontend
if (process.env.NODE_ENV == 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
