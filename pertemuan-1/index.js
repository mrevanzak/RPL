const { readFileSync } = require("fs");
const { appendFile } = require("fs/promises");
const http = require("http");
const cv = readFileSync("./index.html");
const contact = readFileSync("./contact.html");

const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      res.setHeader("content-type", "text/html");
      res.write(cv);
      res.end();
    } else if (req.url === "/img/foto.jpg") {
      res.setHeader("content-type", "image/jpg");
      res.write(readFileSync("./img/foto.jpg"));
      res.end();
    } else if (req.url === "/img/foto2.png") {
      res.setHeader("content-type", "image/jpg");
      res.write(readFileSync("./img/foto2.png"));
      res.end();
    } else if (req.url === "/img/poster.png") {
      res.setHeader("content-type", "image/jpg");
      res.write(readFileSync("./img/poster.png"));
      res.end();
    }
    // about page
    else if (req.url === "/contact") {
      res.setHeader("content-type", "text/html");
      res.write(contact);
      res.end();
    }
    // 404
    else {
      res.writeHead(404, { "content-type": "text/html" });
      res.write("<h1>page not found</h4>");
      res.end();
    }
  } else if (req.method === "POST") {
    if (req.url === "/contact") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });

      req.on("end", () => {
        let data = body.replaceAll("&", "\n");
        data += "\n";
        appendFile("./data.txt", data, (err) => {
          if (err) {
            console.log(err);
          }
        });
        res.writeHead(200, { "content-type": "text/html" });
        res.write("<p>Form submited!</p>");
        res.end();
      });
    }
  }
});

server.listen(3000);
