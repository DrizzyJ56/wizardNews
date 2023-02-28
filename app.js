const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();
app.use(express.static("./public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = postBank.list();

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts
        .map(
          (post) => `
          <a href="/posts/${post.id}"><div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div></a>`
        )
        .join("")}
    </div>
  </body>
</html>`;

  res.send(html);
});

app.get("/posts/:id", (req, res, next) => {
  const id = req.params.id;
  const post = postBank.find(id);
  if (!post.id) {
    next({
      error: `404 ${+id} does not exist`,
      message: 'Post ID not found'
    });
  }else{
  const html = `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="news-list">
        <header><img src="/logo.png"/>Wizard News</header>
          <div class='news-item'>
            <p>
              <span>${post.title}.</span>
              <small>(by ${post.name})</small>
            </p>
            <small class="news-info">
              ${post.content}
            </small>
          </div>
    </body>
  </html>`;
  res.send(html);
}
});

app.use('*', (error,req,res,next)=>{
  res.status(500).send({error})
})

const { PORT = 1337 } = process.env;




app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

