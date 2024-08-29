import db from "../models";
import bcrypt from "bcrypt";

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    email: userEmail,
                }
            });

            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }

        } catch (error) {
            reject(error);
        }
    })
}

let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = await bcrypt.hashSync(password, salt);

            resolve(hashedPassword);
        } catch (error) {
            reject(error);
        }
    });
}

let handleUserRegist = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(userInfor.email)

            if (isEmailExist) {
                resolve({
                    errCode: -1,
                    errMessage: "The email already exists in the system!!!",
                });
            } else {
                let newPassword = await hashPassword(userInfor.password);

                await db.User.create({
                    firstName: userInfor.firstName,
                    lastName: userInfor.lastName,
                    email: userInfor.email,
                    password: newPassword,
                    roleID: userInfor.roleID,
                    phoneNumber: userInfor.phoneNumber,
                    gender: userInfor.gender,
                });

                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            }

        } catch (error) {
            reject(error);
        }
    });
}

let handleUserLogin = (userInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(userInfor.email);

            if (isEmailExist) {
                let user = await db.User.findOne({
                    where: {
                        email: userInfor.email,
                    },
                });

                if (user) {
                    let isPasswordExist = bcrypt.compareSync(userInfor.password, user.password);
                    let { password, ...userWithoutPassword } = user;
                    
                    if (isPasswordExist) {
                        resolve({
                            errCode: 0,
                            errMessage: "OK",
                            user: userWithoutPassword,
                        });
                    } else {
                        resolve({
                            errCode: -1,
                            errMessage: "Wrong password!!!",
                        });
                    }
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Username does not exist in the system!!!",
                });
            }

        } catch (error) {
            reject(error);
        }
    });
}

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
    handleUserLogin,
    handleUserRegist,
    getAllUser
}
