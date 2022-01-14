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

router.post('/',validateProject, validateProject, (req, res) => {
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

router.put('/:id', validateProjectID, validateProject, async (req, res) => {
    const { completed } = req.body
    try {
        const project = await Projects.update(req.params.id, req.body)
        if(completed != true && completed != false) {
            res.status(400).json({message:'Missing Completed Value'})
            console.log(req.project)
        } else {
            res.status(200).json(project)
        } 
    } catch(err) {
            res.status(500).json(err)
            console.log(req.project)
        }
})

router.delete('/:id',validateProjectID, (req, res) => {
    Projects.remove(req.params.id)
        .then(project => {
            res.status(200).json(req.project)
            console.log(project)
        })
        .catch(err => {
            res.status(500).json({message: 'Could not Delete Project',
            error: err
        })
        })
})

router.get('/:id/actions', validateProjectID, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router