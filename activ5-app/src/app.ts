import express from 'express';
import { PORT } from './config/constants';
import { A5DeviceManager, A5Device } from 'activ5-device';

const app = express();
const path = require('path');
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.get('/connect', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'test.html'))
});