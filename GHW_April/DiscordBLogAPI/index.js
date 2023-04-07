const PORT = process.env.PORT || 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const dblog = [
  {
    name : 'Discord-Blogs',
    address: 'https://discord.com/blog',
    base: 'https://discord.com/'
  }
];

const articles = [];

dblog.forEach(blog => {
  axios.get(blog.address)
    .then(response => {
      const html = response.data;
      const $ = cheerio.load(html)

      $('a:contains("Discord")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr('href');

        articles.push({
          title,
          url: blog.base + url,
          source : blog.name
        });
      });
      
    });
});

app.get('/', (req,res) => {
  res.json('Welcome to the Discord Blog API');
});

app.get('/articles', (req,res) => {
  res.json(articles);
});



app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
