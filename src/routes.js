const fs = require('fs');
const path = require('path');

const express = require('express');
const mime = require('mime');

const routes = express.Router();

function loadFile(filepath) {
  return fs.createReadStream(filepath);
}

routes.get('/', (request, response) => {
  const tmpPath = path.resolve(__dirname, '..', 'tmp');

  const files = fs.readdirSync(tmpPath);

  return response.send(`
    <ul>
      ${files
        .map(
          (file) => `<li>
        <a href="${file}">${file}</a>
      </li>`
        )
        .join('<br />')}
    </ul>
  `);
});

routes.get('/:filename', (request, response) => {
  const { filename } = request.params;
  const tmpPath = path.resolve(__dirname, '..', 'tmp');

  const files = fs.readdirSync(tmpPath);

  const file = files.find((file) => file === filename);

  if (!file) {
    return response.status(400).json({ message: 'Arquivo não encontrado' });
  }

  const stream = loadFile(path.resolve(tmpPath, file));
  const mimetype = mime.getType(path.resolve(tmpPath, file));

  response.writeHead(200, {
    'Content-Type': mimetype,
    'Content-Disposition': `attachment; filename=${file}`,
  });

  stream.on('open', () => {
    console.log('Opened');
    stream.pipe(response);
  });
  stream.on('close', () => {
    console.log('Closed');
  });
});

module.exports = routes;
