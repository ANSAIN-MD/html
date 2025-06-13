const fs = require("fs");
const path = require("path");

const thumbnail = path.join(__dirname, "../media/anjay.jpg");
const audioFile = path.join(__dirname, "../media/menu.mp3");

module.exports = {
  autoRead: true,
  react: "🟢",
  presence: "composing",
  onlyOwner: false,
  handle: async (sock, m) => {
    
    // Tentukan salam sesuai waktu dengan emoji
    const hour = new Date().getHours();
const greeting =
  hour >= 4 && hour < 10
    ? "🌅 Selamat Pagi"
    : hour >= 10 && hour < 14
    ? "☀️ Selamat Siang"
    : hour >= 14 && hour < 18
    ? "🌇 Selamat Sore"
    : hour >= 18 && hour < 22
    ? "🌆 Selamat Petang"
    : "🌙 Selamat Malam";

    await sock.sendMessage(
      m.id,
      {
        image: { url: thumbnail },
        caption: `𝐇𝐢𝐢 ${m.pushName}, ${greeting}  

𝗕𝗢𝗧 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡  

➜ 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲 : ${botName}  
➜ 𝗕𝗼𝘁 𝗡𝗨𝗠𝗕𝗘𝗥 : ${botNumber}  
➜ 𝗢𝘄𝗻𝗲𝗿 : ${owner.name}  
➜ 𝗢𝘄𝗻𝗲𝗿 𝗡𝗨𝗠𝗕𝗘𝗥 : ${owner.number}`,
        footer: `© Powered by Dika Dev`,
        buttons: [
          { buttonId: ".bugmenu", buttonText: { displayText: "バグ報告" }, type: 1 },
          { buttonId: ".murbugmenu", buttonText: { displayText: "ムルバグメニュー" }, type: 1 },
        ],
        headerType: 1,
      },
      { quoted: m }
    );

    await sock.sendMessage(
      m.id,
      {
        audio: { url: audioFile },
        mimetype: "audio/mp4",
        ptt: true,
      },
      { quoted: m }
    );
  },
};