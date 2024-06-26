module.exports = (app) => {
    const router = require('express').Router()
    const branchController = require('../controllers/branches.controller')

    router.get('/', branchController.getAllBranches)
    // router.post('/', branchController.addBranch)
    // router.put('/', branchController.editBranch)
    // router.delete('/', branchController.deleteBranch)

    app.use('/api/branches', router)
}