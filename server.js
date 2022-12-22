const http = require("http");
const fs = require("fs");
const getUsers = require("./getUsers");

const PORT = process.env.PORT || 3003;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http:127.0.0.1");

  if (url.searchParams.has("hello")) {
    if (url.searchParams.get("hello")) {
      res.status = 200;
      res.statusMessage = "OK";
      res.header = "Content-type: text/plain";
      res.write(`Hello, ${url.searchParams.get("hello")}`);
    } else {
      res.status = 400;
      res.statusMessage = "EMPTY NAME";
      res.header = "Content-type: text/plain";
      res.write("Enter a name");
    }
  } else if (url.searchParams.has("users")) {
    res.status = 200;
    res.statusMessage = "OK";
    res.header = "Content-type: application/json";
    res.write(getUsers());
  } else if (req.url.slice(0, 2) === "/?") {
    res.status = 500;
    res.statusMessage = "PARAM NOT EXIST";
    res.write("");
  } else if (req.url === "/") {
    res.status = 200;
    res.statusMessage = "OK";
    res.header = "Content-type: text/plain";
    res.write("Hello, world");
  }

  res.end();
});

server.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is listening on PORT ${PORT}`);
});
