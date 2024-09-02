import userService from "../services/userService";

let handleUserLogin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                errCode: 2,
                errMessage: "Missing input's parameter",
            });
        }

        let loginInfor = await userService.handleUserLogin(req.body);

        if (loginInfor.errCode === 0) {
            // set refresh token in http-only cookie
            res.cookie('refreshToken', loginInfor.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 24 * 60 * 60 * 1000,
            });
        }

        delete loginInfor.refreshToken;
        
        return res.status(200).json({
            loginInfor,
        });
    } catch (error) {
        console.log(error);
    }
}

let handleUserRegist = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(200).json({
                errCode: 2,
                errMessage: "Missing input's parameter",
            });
        }

        let registInfor = await userService.handleUserRegist(req.body);

        return res.status(200).json({
            registInfor
        });
    } catch (error) {
        console.log(error);
    }
}

let refreshToken = async (req, res) => {
    try {
        if (!req.cookies.refreshToken) {
            return res.status(400).json({
                errCode: 2,
                errMessage: "Missing input's parameter!!!",
            });
        } else {
            let refreshTokenInfor = await userService.refreshToken(req.cookies.refreshToken);

            if (refreshTokenInfor.errCode === 1) {
                return res.status(400).json({
                    errCode: 1,
                    errMessage: "User is expired!!!",
                });
            }

            if (refreshTokenInfor.errCode === 0) {
                res.cookie('refreshToken', refreshTokenInfor.token.newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "Strict",
                    maxAge: 24 * 60 * 60 * 1000,
                });

                return res.status(200).json({
                    errCode: 0,
                    errMessage: "OK",
                    newAccessToken: refreshTokenInfor.token.newAccessToken,
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server!!!",
        });        
    }
}

module.exports = {
    handleUserLogin, handleUserRegist,
    refreshToken,
}
