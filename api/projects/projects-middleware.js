// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectID(req, res, next) {
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
    const { name, description } = req.body
    console.log('here', name, description)
    try {
        if(!name || !description) {
            res.status(400).json({message: 'Missing Required Fields!!'})
        } else {
            next()
        }
    } catch {
        res.status(500).json({message:'Could Not Validate Project'})
    }
}

        module.exports = {
    validateProjectID,
    validateProject
}