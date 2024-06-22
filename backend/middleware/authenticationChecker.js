

function authenticate(req, res, next) {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).send("Access Denied / Unauthorized request");
        return;
    }
    next();
}


module.exports = authenticate;
