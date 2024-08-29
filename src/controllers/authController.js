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
            return res.status(400).json({
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

module.exports = {
    handleUserLogin,
    handleUserRegist
}
