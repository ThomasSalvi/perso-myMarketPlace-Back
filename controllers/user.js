const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash,
            name: req.body.name
        });
        user.save()
            .then(() => {res.status(201).json({message: 'utilisateur crée'})
            }) 
            .catch((error) => {res.status(400).json({error: error});  
            })
    })
    .catch((error) => {res.status(500).json({error: error})
    });
};
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email})
    .then((user) => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            if(!valid) {
                return res.status(401).json({error: 'Password incorrect'}) 
            }
            res.status(200).json({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                token: jwt.sign(
                    {userId: user._id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn: '2h'}
                )
            })

        })
        .catch((error) => {res.status(500).json({error})});
    })
    .catch((error) => {res.status(500).json({ error })});
};
exports.findUser = (req, res, next) => {
    User.findOne({_id: req.body.id})
    .then((user) => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé'})
        }
        res.status(200).json({
            userId: user._id,
            userName: user.name,
        })
    })
};
exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.body.id }, { ...req.body, _id: req.body.id })
        .then((user) => {
            res.status(200).json({ message: 'Utilisateur modifié !'})
        })
        .catch((error) => {res.status(400).json({ error })});
};