// Write your "actions" router here!
const express = require("express");
const Actions = require('./actions-model')
const {
    validateActionID,
    validateAction,
} = require('./actions-middlware');
const { actionToBody } = require("../../data/helpers/mappers");

const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/:id', validateActionID, (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateActionID, validateAction, (req, res) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(err => res.status(500).json(err))
})

router.put('/:id', validateActionID, validateAction, (req, res) =>{
    Actions.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/:id', validateActionID, (req, res) => {
    Actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(req.action)
            console.log(action)
        })
        .catch(err => res.status(500).json(err))
} )

module.exports = router