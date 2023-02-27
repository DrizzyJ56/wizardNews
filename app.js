const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
  <title>Wizard News</title>
  </head>
  <body>
    <ul>
    ${posts.map((post) => `<li><b>Title: </b>${post.title} <br><b>Author: </b>${post.name}</li>`).join('')}
    </ul>
  </body>
  </html>`;

  res.send(html)
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

app.use(morgan("dev"));
