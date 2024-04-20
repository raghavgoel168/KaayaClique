const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err){
        //console.log(err);
        return err;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch(err){
        //console.log(err);
        return err;
    }
}


module.exports = { hashPassword, comparePassword };
// exports.hashPassword = hashPassword;
// exports.comparePassword = comparePassword;