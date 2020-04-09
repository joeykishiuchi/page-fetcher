const argv = process.argv.splice(2);
const request = require('request');
const fs = require('fs');
const url = argv[0];
const targetFile = argv[1];

const fileExists = (body) => {
  const stdin = process.stdin;
  stdin.setEncoding('utf8');
  stdin.setRawMode(true);
  stdin.on('data', (data) => {
    if (data === 'y') {
      fs.writeFile(targetFile, body, (err) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${body.length} bytes to ./index/html`);
        process.exit();
      });
    } else {
      process.exit();
    }
  });
};

request(url, (err, response, body) => {
  if (err) throw err;
  if (fs.existsSync(targetFile)) {
    console.log(`That file already exists!\nType 'Y' to overwrite or 'N' to exit:`);
    fileExists(body);
  } else {
    console.log('That file doesn\'t exist');
  }
});