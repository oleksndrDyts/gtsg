const fs = require('fs/promises');

(async () => {
  const textIn = await fs.readFile('./text.txt', 'utf-8');

  const textOut = textIn
    .replace(/[^а-яіїєь]/gi, ' ')
    .toLowerCase()
    .split(' ')
    .filter(el => el !== '')
    .join(' ');

  fs.writeFile('./textOut.txt', textOut);

  console.log(textOut);
})();
