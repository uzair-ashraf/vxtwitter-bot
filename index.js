require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("VXTwitterBot is now ready");
});

client.on("message", async (message) => {
  try {
    let didFindTwitterLink = false;
    const data = message.content.split(" ").map((text) => {
      try {
        if (!text.trim().startsWith("https://twitter.com")) return text;
        const url = new URL(text);
        didFindTwitterLink = true;
        url.host = "vxtwitter.com";
        return url.toString();
      } catch (_) {
        return text;
      }
    });
    if (!didFindTwitterLink) return;
    return message.channel.send(
      `${message.author.username}: ${data.join(" ")}`
    );
  } catch (_) {}
});

client.login(process.env.DISCORD_TOKEN);
