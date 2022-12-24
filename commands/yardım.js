const { MessageEmbed,CommandInteraction,Client,Permissions } = require("discord.js");
module.exports = {
    name:"yardım",
    description: 'Yardım Menüsü',
    type:1,
    options:[],
/**
 * 
 * @param {Client} client 
 * @param {CommandInteraction} interaction 
 */
    run: async (client, interaction) => {
        interaction.reply({embeds:[
            {
                title: "RiaS Bot Yardım",
                description: "RiaS bot' un yardım komutlarını gösterir!",
                color: 0x00ff00,
                fields:[
                    {name: "", value: "", inline: true},
                    {name: "", value: "", inline: true},
                    {name: "", value: "", inline: true},
                    {name: "", value: "", inline: true},
                    {name: "", value: "", inline: true},
                    {name: "", value: "", inline: true},
                    

                ],
                thumbnail: {url: client.user.avatarURL({dynamic:true})},
            }
        ]});
}
};
