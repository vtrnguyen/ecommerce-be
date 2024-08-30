import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

let generateToken = (userInfor) => {
    let token = jwt.sign(
        {
            id: userInfor.id,
            roleID: userInfor.roleID,
            email: userInfor.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30s",
        }
    )

    return token;
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
                    
                    if (isPasswordExist) {
                        // customize user infor to return to Client
                        let returnedUserInfor = {};
                        returnedUserInfor.id = user.id;
                        returnedUserInfor.roleID = user.roleID;

                        // generate token
                        let accessToken = generateToken(user);

                        resolve({
                            errCode: 0,
                            errMessage: "OK",
                            accessToken,
                            user: returnedUserInfor,
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

let handleGetUserInfor = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userInfor = await db.User.findOne({
                where: {
                    id: userID,
                }
            });

            if (!userInfor) {
                resolve({
                    errCode: 1,
                    errMessage: "User can not found!!!",
                });
            } else {
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                    userInfor
                });
            }
        } catch (error) {
            console.log(error);
        }
    })
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

let deleteUser = (userID) => {
    return new Promise(async (resolve, reject) => {
        try {
            let deletedUser = await db.User.findOne({
                where: {
                    id: userID,
                },
                raw: false
            });

            if (deletedUser) {
                deletedUser.destroy();

                resolve({
                    errCode: 0,
                    errMessage: "Delete user successfully...",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User does not exist in the system!!!",
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    handleUserLogin, handleUserRegist,
    getAllUser, handleGetUserInfor,
    deleteUser
}
