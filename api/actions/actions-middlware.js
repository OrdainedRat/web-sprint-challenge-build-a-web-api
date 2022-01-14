// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionID(req, res, next) {
    console.log('validating action ID')
    try {
        const action = await Actions.get(req.params.id)
        if(!action) {
            res.status(404).json({message: 'Action Not Found'})
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json(err)
    }
}

async function validateAction(req, res, next) {
    console.log("validating action")
    const { project_id, description, notes } = req.body
    try{
        if(!project_id || !description || !notes) {
            res.status(400).json({message: 'missing fields!'})
        } else {
            next()
        }
    } catch(err) {
        res.status(500).json(err)
    }
}

module.exports = {
    validateActionID,
    validateAction,
}