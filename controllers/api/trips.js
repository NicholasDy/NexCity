const router = require('express').Router();
const { Destination, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req,res)=>{
    try{
        const postData = await Destination.create({
            budget: req.body.budget,
            carrier: req.body.carrier,
            hotel: req.body.hotel, 
            user_id: req.session.user_id
        });

        res.status(200).json(postData);
        res.render("/")
    } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router