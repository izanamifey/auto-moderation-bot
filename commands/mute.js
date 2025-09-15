const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a member (timeout)")
    .addUserOption(option =>
      option.setName("target").setDescription("Member to mute").setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("minutes").setDescription("Minutes to mute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const minutes = interaction.options.getInteger("minutes");

    if (!member.moderatable) {
      return interaction.reply("⚠️ I cannot mute this user!");
    }

    const duration = minutes * 60 * 1000;
    await member.timeout(duration);

    await interaction.reply(`🔇 ${member.user.tag} has been muted for ${minutes} minutes.`);
  },
};
