// Core Modules
const fs = require('fs');

// Third-party Modules
const wiki = require('wikijs').default;
const {parse} = require('node-html-parser');

const articleName = 'List of people from New York';


wiki().find(articleName).then(async (page) => {
  const sections = await page.content();
  const data = await page.html();

  for (let section of sections) {
    const root = parse(data);
    const title = section.title;

    const parent = root.querySelector(`#${title}`)?.parentNode;

    if (!parent) {
      continue;
    }

    const list = parent.querySelector('~ div ul');
    section.content = list?.innerHTML;
  }

  fs.writeFile('./test.json', JSON.stringify(sections), (err, data) => {
    if (err) {
      throw err;
    }

    console.log('File written successfully!');
  })
});
