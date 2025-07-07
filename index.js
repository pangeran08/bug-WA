process.env.TZ = "Asia/Jakarta";
const exitTime = new Date().setHours(21, 45) - new Date().getTime();
setTimeout(process.exit, exitTime);

import {
  makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  generateWAMessageFromContent,
  DisconnectReason
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import fs from "fs";
import pino from "pino";
let nomorRequest;
let relayMsg;
let blob;

function tunggu(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function updateData() {
  return fetch("https://jsonblob.com/api/jsonBlob/1389135762926264320", {
    body: JSON.stringify(blob),
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  });
}

let wait;
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

let resEnd;
function end() {
  resEnd();
}

let sock;
let pairing;
async function bot(session,res) {
  wait = setTimeout(process.exit, 60000);

  if (!session) {
    //const { state } = await useMultiFileAuthState("session");
    await fetch("https://jsonblob.com/api/jsonBlob/1389135762926264320", {
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(r => {
        blob = r;
        if (r.session.creds) {
          nomorRequest = r.session.creds.me.id.split(":")[0];
          session = reviveBuffer(r.session);
          session.keys.get = async (type, ids) => {
            const data = {};
            return data;
          };
          session.keys.set = async data => {
            const tasks = [];
            await Promise.all(tasks);
          };
        } else {
          nomorRequest = r.nomor;
          session = {};
        }
      });

    /*blob = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    if (blob.session.creds) {
      nomorRequest = blob.session.creds.me.id.split(":")[0];
      session = reviveBuffer(blob.session);
      session.keys.get = state.keys.get;
      session.keys.set = state.keys.set;
    } else {
      nomorRequest = blob.nomor;
      session = state;
    }*/
  }

  const { version } = await fetchLatestBaileysVersion();
  sock = makeWASocket({
    version,
    printQRInTerminal: false,
    keepAliveIntervalMs: 30000,
    browser: ["Windows", "Chrome", "138.0.7204.50"],
    auth: session,
    logger: pino({ level: "silent" }).child({ level: "silent" })
  });

  if (!sock.user && !sock.authState.creds.registered) {
    await tunggu(2000);
    const code = await sock.requestPairingCode(nomorRequest.replace(/\D/g, ""));
    clearTimeout(wait);
    pairing = code;
    wait = setTimeout(process.exit, 60000 * 3);
    console.log(`\x1b[44;1m\x20PAIRING CODE\x20\x1b[0m\x20${code}`);
  }

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      clearTimeout(wait);
      const shouldReconnect =
        (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (lastDisconnect.error.output && lastDisconnect.error.output.payload) {
        const { statusCode, error } = lastDisconnect.error.output.payload;
        if (statusCode === 401 && error === "Unauthorized") {
          console.log("Unauthorized 401");
          blob.session = {};
          await updateData();
          //fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
          return bot(undefined,res);
        }
      }
      if (shouldReconnect) {
        console.log("reconnecting...");
        return bot(sock.authState,res);
      }
    }
    if (connection === "open") {
      clearTimeout(wait);
      console.log("Terhubung " + new Date().toLocaleString("id-ID"));
      await sock.sendMessage(nomorRequest + "@s.whatsapp.net", { text: "ok" });
      res.write(`200 OK${pairing ? " " + pairing : ""}`);
        res.end();
    }
  });

  sock.ev.on("creds.update", async () => {
    blob.session = sock.authState;
    await updateData();
    //fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
  });
}

//bot();

import http from "http";
const port = 3000;

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
        console.log("ok");
        if (!sock) bot(undefined,res);
        
      // renderHTML("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
