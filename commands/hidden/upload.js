const config = require("../../config.json");
const {PermissionsBitField} = require("discord.js");
const shell = require('shelljs')

module.exports.run = async(client, message, args) => {
    if (!config.owners.includes(message.author.id)) return message.channel.send(`**Seulement le bg peut faire ça** :sunglasses:`)

    let plugin = args[1] ?? "MiniCoreV6";
    let path = args[2] ?? "plugins";

    let SSHcommand = "";
    if(args[0]) {
        SSHcommand = "cp /root/servers/miscs/" + args[0] + "/"+path+"/"+plugin+"/ /root/servers/upload/ -r && ";
    }

    SSHcommand += "cd /root/servers/upload/ && ./upload.sh " + path + " " + plugin;
    message.reply();
    let replied = shell.exec("ssh root@192.168.1.100 \"" + SSHcommand + "\"", {silent:true}).stdout;
    //count lines of replied
    let lines = replied.split("\n").length;
    message.reply(SSHcommand+"\nOn va dire que ça a marché hein, réponse de "+lines+" lignes\n"+replied.split("\n").slice(0, 3).join("\n"));
};

module.exports.config = {
    name: "upload",
    description: "Upload le core",
    format: "upload",
    canBeUseByBot: true,
    category: "hidden",
    permission: PermissionsBitField.Flags.Administrator
};
