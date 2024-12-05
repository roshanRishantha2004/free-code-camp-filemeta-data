const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());


const storage = multer.diskStorage({
    destination: 'uploads/', 
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    }
  });
  
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded!' });
    }

    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,     
        size: req.file.size 
    });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));