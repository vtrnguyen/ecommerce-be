import db from "../models";

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll();

            if (users) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    users,
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'No users found!!!',
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    getAllUser
}
