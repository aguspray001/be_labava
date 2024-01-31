const bcrypt = require("bcrypt");

module.exports = {
    saltPassword: (password, salt) => {
        return bcrypt.hashSync(password, salt)
    },
    hashPasswordComparation: (password, hashedPassword) => {
        return bcrypt.compareSync(password, hashedPassword)
    }
}