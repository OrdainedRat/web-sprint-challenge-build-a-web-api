// Write your "projects" router here!
const express = require("express");
const Projects = require('./projects-model')
const {
    validateProjectID,
    validateProject
} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: 'could not get projects',
                error: err
            })
        
        })
    
})

router.get('/:id', validateProjectID, (req, res) => {
    res.status(200).json(req.project)
})

router.post('/',validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Could Not Create Project',
                error: err,
                request: req.body
            })
        })
    console.log(req.body)
})

router.put('/', (req, res) => {
    console.log('endpoint here')
})

router.delete('/', (req, res) => {
    console.log('endpoint here')
})

router.get('/:id/actions', validateProjectID, (req, res) => {
    console.log('endpoint here')
})

module.exports = router