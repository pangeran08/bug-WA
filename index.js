import http from "http";
const port = 3000;

import { makeWASocket, DisconnectReason } from "@whiskeysockets/baileys";
import { default as P } from "pino";
import { Boom } from "@hapi/boom";
import fs from "fs";

const reviveBuffer = obj => {
  if (obj && typeof obj === "object") {
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return Buffer.from(obj.data);
    }
    for (const key in obj) {
      obj[key] = reviveBuffer(obj[key]);
    }
  }
  return obj;
};

let blob;
let nomorRequest;
let session;
if (!fs.existsSync("./data.json")) {
  console.error("data.json tidak ditemukan");
  process.exit(1);
}
blob = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
nomorRequest = blob.session.creds.me.id.split(":")[0];
session = reviveBuffer(blob.session);
session.keys.get = async (type, ids) => {
  const data = {};
  return data;
};
session.keys.set = async data => {
  const tasks = [];
  await Promise.all(tasks);
};

const sock = makeWASocket({
  printQRInTerminal: false,
  keepAliveIntervalMs: 30000,
  browser: ["Windows", "Chrome", "138.0.7204.50"],
  auth: session,
  logger: P({ level: "silent" })
});

let pairing;
if (!sock.user && !sock.authState.creds.registered) {
  const code = sock.requestPairingCode(nomorRequest.replace(/\D/g, ""));
  pairing = code;
  wait = setTimeout(() => {
    process.exit();
  }, 60000 * 3);
  console.log(`\x1b[44;1m\x20PAIRING CODE\x20\x1b[0m\x20${code}`);
}

sock.ev.on("creds.update", async () => {
  if (JSON.stringify(blob.session) != JSON.stringify(sock.authState)) {
    blob.session = sock.authState;
    fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
  }
});

sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
  if (connection === "close") {
    const shouldReconnect =
      (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output?.statusCode !==
      DisconnectReason.loggedOut;

    if (lastDisconnect.error.output && lastDisconnect.error.output.payload) {
      const { statusCode, error } = lastDisconnect.error.output.payload;
      if (statusCode === 401 && error === "Unauthorized") {
        console.log("Unauthorized 401");
        return process.exit();
      }
    }
    if (shouldReconnect) {
      console.log("should Reconnect");
      process.exit();
      //return bot(sock.authState);
    }
  }
  if (connection === "open") {
    console.log("Terhubung " + new Date().toLocaleString("id-ID"));
    await sock.sendMessage(nomorRequest + "@s.whatsapp.net", {
      text: "bug-WA OK"
    });
  }
});

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
          res.write(`200 OK${pairing ? " " + pairing : ""}`);
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
