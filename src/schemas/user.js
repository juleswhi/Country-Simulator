const { Schema, model } = require('mongoose')

const userSchema = new Schema
({
    _id: Schema.Types.ObjectId,
    userName: String,
    Country: String,
    ApprovalRating: String,
    Resources: 
    {
        InvestMoney: String,
        YearlyIncome: String,
        SpecialResource: String,
        InvestedCompanies: []
    },
    land: []
})

module.exports = model("User", userSchema, "users")