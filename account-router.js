const express = require('express');
const db = require('./data/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('accounts')
    .then(accounts =>  
            res.status(200).json({ data:accounts }))
    .catch(err => console.log(err));       
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('accounts')
        .where('id', id)
        .first()
        .then(accounts => {
            res.status(200).json({data: accounts})
        })
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const accData = req.body;
    db('accounts')
        .insert(accData)
        .then(res.status(201).json({data: accData}))
        .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    db('accounts')
        .where({id: req.params.id})
        .update(req.body)
        .then(count => {
            if (count) {
                res.status(200).json({message: "count updated"});
            } else {
                res.status(404).json({message: "account not found"})
            }
        })
        .catch(() => {
            res.status(500).json({message: "error updating"})
        })
})

router.delete("/:id", (req, res, next) => {
    db('accounts')
        .where({id: req.params.id})
        .del()
        .then(count => {
            res.status(200).json({message: "account deleted"})
        })
        .catch(() => {
            res.status(500).json({message: "error deleting"})
        })
})

module.exports = router