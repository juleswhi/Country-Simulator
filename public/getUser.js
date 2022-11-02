const mongoose = require('mongoose')
const User = require('../src/schemas/user')

async function getUser()
{
    const user = await User.findOne({ userName: "urmum#5267" })
    console.log(`user is ${!!user}`);
    if(user)
    {
        console.log(`User is ${user}`)
    }
}