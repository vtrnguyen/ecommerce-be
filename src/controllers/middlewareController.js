import jwt from "jsonwebtoken";

let verifyToken = (req, res, next) => {
    let token = req.headers.token;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, userInfor /*user infor is decoded by jwt verify*/) => {
            if (error) {
                return res.status(400).json("Token is not valid!!!");
            } else {
                req.user = userInfor;
                next();
            }
        });
    } else {
        return res.status(400).json("You're not authenticated!!!");
    }
}

let verifyDeleteUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === Number(req.query.id) || req.user.roleID === "R0") {
            next();
        } else {
            return res.status(400).json("You are not allowed to delete other!!!");
        }
    });
}

module.exports = {
    verifyToken,
    verifyDeleteUser
}
