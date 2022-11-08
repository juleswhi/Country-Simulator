module.exports = {
    name: 'ready',
    once: true,
    async execute(client) 
    {
        console.log(`Logged On As ${client.user.tag}`)
    }
}