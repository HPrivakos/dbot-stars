import 'dotenv/config'
import { Client, Events, GatewayIntentBits, Partials, TextChannel } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
})
async function main() {
  await client.login(process.env.DISCORD_API_KEY!)
  const starredChannel = (await client.channels.fetch(process.env.STAR_CHANNEL!)) as TextChannel
  const guild = await client.guilds.fetch(process.env.GUILD_ID!)

  client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (reaction.message.guildId !== guild.id) return
    if (reaction.emoji.name == process.env.REACTION) {
      await reaction.message.fetch(true)
      await reaction.message.author?.fetch(true)
      await starredChannel.send(
        `<@${reaction.message.author?.id}> (starred by <@${user.id}>) said: ${reaction.message.content}`
      )
    }
  })
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

void main()
