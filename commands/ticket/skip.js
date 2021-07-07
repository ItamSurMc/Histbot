const moment = require("moment");
moment.locale("fr");
const config = require("../../config.json");

module.exports.run = async(client, message) => {
    if (!message.channel.parent || !config.tickets.allchannels.includes(message.channel.parent.id)) return message.reply("Cette commande est à exécuter dans un ticket.");
    await message.delete();
    message.channel.messages.fetch({ limit: 10 }).then(messages => {
        messages.forEach(base => {
            try{
                if(base.embeds[0].title === "**__Nouveau Ticket__**"){
                    base.edit({
                        embed: {
                            title: `**__Nouveau Ticket__**`,
                            color: config.color,
                            timestamp: new Date(),
                            footer: {
                                icon_url: config.image_url,
                                text: "@Histeria " + new Date().getFullYear()
                            },
                            fields: [
                                {
                                    name: "Sujet du ticket",
                                    value: "Skipped"
                                },
                                {
                                    name: "Pseudo in game",
                                    value: "Skipped"
                                },
                                {
                                    name: "Description approfondie",
                                    value: "Skipped"
                                }
                            ],
                        }
                    });
                }
                base.reactions.removeAll();
                let categoryid = message.guild.id === config.serveridjava ? config.tickets.java.categoryopened : config.tickets.bedrock.categoryopened;

                let topic = message.channel.topic;
                if(!topic) topic = "";
                let splitted = topic.split('@').pop();
                splitted = splitted.split('>').shift();
                message.channel.setTopic("Ticket ouvert pour skip par <@" + splitted ?? message.author.id+"> (skip)");
                message.channel.setParent(categoryid, { lockPermissions: false });
            }catch(e){}
        })
    });
};

module.exports.config = {
    name: "skip",
    description: "Sauter toutes les étapes de la création d'un ticket",
    format: "+skip",
    alias: ["skipped"],
    canBeUseByBot: false,
    category: "Ticket"
};