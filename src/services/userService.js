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

let generateToken = (userInfor, expriredTime) => {
    let token = jwt.sign(
        {
            id: userInfor.id,
            roleID: userInfor.roleID,
            email: userInfor.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: `${expriredTime}`,
        }
    )

    return token;
}

let refreshToken = (refreshToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(refreshToken, process.env.JWT_SECRET, (error, userInfor) => {
                if (error) {
                    reject({
                        errCode: 1,
                        errMessage: "Refresh Token is not valid!!!",
                    });
                } else {
                    let token = {};
                    token.newAccessToken = generateToken(userInfor, "1h");
                    token.newRefreshToken = generateToken(userInfor, "24h");

                    resolve({
                        errCode: 0,
                        errMessage: "OK",
                        token,
                    });
                }
            });
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
                    address: userInfor.address,
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
                        let accessToken = generateToken(user, "1h");
                        let refreshToken = generateToken(user, "24h")

                        resolve({
                            errCode: 0,
                            errMessage: "OK",
                            accessToken,
                            refreshToken,
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
                delete userInfor["password"];

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

            if (users && users.length > 0) {
                users = users.map((item) => {
                    let user = item;
                    delete user["password"];
                    return user;
                });

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
                    errMessage: "OK",
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

let createUser = (newUserInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkUserEmail(newUserInfor.email)

            if (isEmailExist) {
                resolve({
                    errCode: -1,
                    errMessage: "The email already exists in the system!!!",
                });
            } else {
                let newPassword = await hashPassword(newUserInfor.password);

                await db.User.create({
                    firstName: newUserInfor.firstName,
                    lastName: newUserInfor.lastName,
                    email: newUserInfor.email,
                    password: newPassword,
                    roleID: newUserInfor.roleID,
                    address: newUserInfor.address,
                    phoneNumber: newUserInfor.phoneNumber,
                    gender: newUserInfor.gender,
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

let updateUser = (updateUserInfor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: updateUserInfor.id,
                },
                raw: false,
            });

            if (user) {
                user.firstName = updateUserInfor.firstName;
                user.lastName = updateUserInfor.lastName;
                user.roleID = updateUserInfor.roleID;
                user.address = updateUserInfor.address;
                user.phoneNumber = updateUserInfor.phoneNumber;
                user.gender = updateUserInfor.gender;

                await user.save();
                
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "User can not found!!!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    handleUserLogin, handleUserRegist,
    refreshToken,
    getAllUser, handleGetUserInfor,
    createUser, deleteUser, updateUser,
}
