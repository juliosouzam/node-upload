const path = require('path');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();
app.use(cors());
app.use(routes);
app.use(express.static(path.resolve(__dirname, '..', 'tmp')));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Runnint at PORT ${PORT}`));
