const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        // console.log(candidatePassword,this.password);
        // console.log(await bcrypt.compare(candidatePassword, this.password));
        // return await bcrypt.compare(candidatePassword, this.password);
        if(this.password == candidatePassword){
            return true
        }
    } catch (error) {
        throw error;
    }
};

const userModel = new mongoose.model("user_entities", userSchema);
module.exports = userModel;
