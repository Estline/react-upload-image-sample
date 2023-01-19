const express = require('express')
const cors = require('cors');
const multer = require('multer')
const path = require('path');

const app = express()
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'image/');
    },
    filename: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        callback(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

app.use('/image', express.static(path.join(__dirname, 'image')));

app.post('/upload', upload.array('photos', 12), (req, res) => {
    const files = req.files;
    const fileUrls = files.map(file => `${req.protocol}://${req.get('host')}/${file.path}`);
    res.json({ fileUrls });
});



app.listen(9999, () => console.log('Running on port 9999'))
