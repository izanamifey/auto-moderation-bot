const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server")
    .addUserOption(option =>
      option.setName("target").setDescription("Member to ban").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("target");
    if (!member.bannable) {
      return interaction.reply("⚠️ I cannot ban this user!");
    }
    await member.ban();
    await interaction.reply(`🚫 ${member.user.tag} has been banned.`);
  },
};
