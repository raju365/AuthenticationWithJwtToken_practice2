const express = require('express');

const router = express.Router();

/* POST /register req.body = {username,password} */
router.post('/register', (req, res) => {
    const { username, password } = req.body;
     
})



module.exports = router;
