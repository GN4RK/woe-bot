const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listing')
        .setDescription('list all the players that reacted to the class-you-can-play message.')
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('The message id of the class-you-can-play message.')
                .setRequired(true)),

    async execute(interaction) {
        const message_id = interaction.options.getString('message_id');
        const message = await interaction.channel.messages.fetch(message_id);
        const reactions = message.reactions.cache;
        
        // get all the users that reacted to the message sorted by the emoji they reacted with
        let users = {};
        reactions.forEach(reaction => {
            const emoji = reaction.emoji.name;
            users[emoji] = reaction.users.cache.map(user => user.displayName);
        });

        console.log(users);

        // send the message to the user
        const jsonResponse = JSON.stringify(users, null, 2);
        await interaction.reply({ 
            content: `\`\`\`json\n${jsonResponse}\n\`\`\`` , 
            ephemeral: true 
        });

        // adding log
        console.log(`Listing command used.`);
        
    },
};