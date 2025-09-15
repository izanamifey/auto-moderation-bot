const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server")
    .addUserOption(option =>
      option.setName("target").setDescription("Member to kick").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("target");
    if (!member.kickable) {
      return interaction.reply("⚠️ I cannot kick this user!");
    }
    await member.kick();
    await interaction.reply(`✅ ${member.user.tag} has been kicked.`);
  },
};
