const router = require('express').Router();

const User = require('../models/User.js');

// Async function
router.get('/users', async (req, res) => {
    const allUsersWithComments = await User.query().select('username').withGraphFetched('comments');
    return res.send({ response: allUsersWithComments });
});

router.get('/setsessionvalue', (req, res) => {
    req.session.payingAttention = true;
    return res.send({ response: "OK" });
});

router.get('/getsessionvalue', (req, res) => {
    return res.send({ response: req.session.payingAttention });
});

module.exports = router;