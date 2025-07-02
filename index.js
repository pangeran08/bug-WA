import http from "http";
const port = 3000;

fetch("https://jsonblob.com/api/jsonBlob/1389135762926264320", {
  headers: { Accept: "application/json", "Content-Type": "application/json" }
})
  .then(r => r.json())
  .then(r => console.log(r))
  .catch(r => console.log(r));

http
  .createServer((req, res) => {
    const url = req.url;
    res.writeHead(200, {
      "Content-Type": "text/html"
    });

    const renderHTML = (path, res) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          // res.writeHead(404);
          res.write("200 OK");
        } else {
          res.write(data);
        }
        res.end();
      });
    };

    switch (url) {
      default:
        renderHTML("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
