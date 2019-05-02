const passport = require('passport');
const router = require('express').Router();
const auth = require('../config/auth');
const { userRepository } = require('../repo/repoFactory');

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
    console.log("api/users/current, payload = " + JSON.stringify(req.payload))
    const { payload: { id } } = req;
    return userRepository.getById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }
            return res.json(user)
        });
});
        
module.exports = router;