const { createServer } = require("http");
const { createReadStream } = require("fs");
const { decode } = require("querystring");

const sendFile = (response, status, type, filePath) => {
  response.writeHead(status, { "Content-Type": type });
  createReadStream(filePath).pipe(response);
};

createServer((request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      const { name, email, message } = decode(body);
      console.log(body);
      console.log(`email: ${email}, name: ${name}, message:${message}`);
    });
  }

  switch (request.url) {
    case "/":
      return sendFile(response, 200, "text/html", "./client/home-page.html");
    case "/contact":
      return sendFile(response, 200, "text/html", "./client/contact.html");
    case "/img/niklas.jpeg":
      return sendFile(response, 200, "image/jpeg", "./client/niklas.jpeg");
    case "/styles.css":
      return sendFile(response, 200, "text/css", "./client/styles.css");
    default:
      return sendFile(response, 200, "text/html", "./client/404.html");
  }
}).listen(3000);

console.log("Niklas' personal website runnning on port 3000");