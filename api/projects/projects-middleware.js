// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectID(req, res, next) {
   console.log('validating ID')
    try {
       const project = await Projects.get(req.params.id)
       if(!project) {
           res.status(404).json({message: 'Could Not Find Project'})
       } else {
           req.project = project
           next()
       }
   } catch(err) {
       res.status(500).json(err)
   }
}

async function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    console.log('here', name, description, completed)
    try {
        if(!name || !description ) {
            res.status(400).json({message: 'Missing Required Fields!!'})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json(err)
    }
}

        module.exports = {
    validateProjectID,
    validateProject
}