const mongoose = require('mongoose')
const User = require('../src/schemas/user')

async function getUser()
{
    // console.log(`In script`)
    document.getElementById("a").innerHTML = "Test"
    // const user = await User.findOne({ userName: "urmum#5267" })
    // console.log(`user is ${!!user}`);
    // if(user)
    // {
    //     console.log(`User is ${user}`)
    // }
}