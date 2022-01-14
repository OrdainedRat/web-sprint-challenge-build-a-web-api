// add middlewares here related to actions
const Actions = require('./actions-model')

async function validateActionID(req, res, next) {
    console.log('validating action')
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

module.exports = {
    validateActionID
}