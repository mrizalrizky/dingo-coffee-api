const db = require('../models/index')
const branchRepo = require('../repositories/branches.repositories')(db)
const service = require('../services/messageHandler')

const getAllBranches = async (req, res) => {
    try {
        const data = await branchRepo.getAllBranches()

        const dataToDisplay = {
            branch_name: data?.name,
            branch_contact: data?.phone_number,
            branch_address: data?.address,
            branch_gmaps: data?.gmaps_url,
            branch_operational_days: data?.operational_days,
            branch_operational_hour: data?.operational_hour,
            delivery_flag: data?.delivery_flag,
            pickup_flag: data?.pickup_flag,
            dinein_flag: data?.dinein_flag
        }

        const successMsg = {
            "indonesian": "Berhasil mengambil data branch",
            "english": "Branch data fetched successfully"
        }
        res.status(200).send(service.jsonSuccess(200, successMsg, dataToDisplay))
    } catch (error) {
        service.throwError(res, error)
    }
}

module.exports = {
    getAllBranches,
    // addBranch,
    // editBranch,
    // deleteBranch
}