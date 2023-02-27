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
    ${posts.map((post) => `<li>${post.title}</li>`)}
    </ul>
  </body>
  </html>`;
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

app.use(morgan("dev"));
