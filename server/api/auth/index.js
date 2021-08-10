module.exports = (req, res, next) => {
    // console.log(req)
    try {
        if (false) {
            throw 'Invalid user ID';
        } else {
            res.json()
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};