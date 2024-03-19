const db = require("../models/index");
const branchRepo = require("../repositories/branches.repositories")(db);
const service = require("../utils/messageHandler");

const getAllBranches = async (req, res) => {
  try {
    const branches = await branchRepo.getAllBranches();

    const data = branches.map((branch) => ({
      branch_name: branch?.name,
      branch_contact: branch?.phone_number,
      branch_latitude: branch?.latitude,
      branch_longitude: branch?.longitude,
      branch_address: branch?.address,
      branch_gmaps: branch?.gmaps_url,
      branch_operational_days: branch?.operational_days,
      branch_operational_hour: branch?.operational_hour,
      delivery_flag: branch?.delivery_flag,
      pickup_flag: branch?.pickup_flag,
      dinein_flag: branch?.dinein_flag,
    }));

    const successMsg = {
      indonesian: "Berhasil mengambil data branch",
      english: "Branch data fetched successfully",
    };
    res.status(200).send(service.jsonSuccess(200, successMsg, data));
  } catch (error) {
    service.throwError(res, error);
  }
};

const getNearestBranch = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const branches = await branchRepo.getAllBranches();
  } catch (error) {
    service.throwError(res, error);
  }
};

module.exports = {
  getAllBranches,
  getNearestBranch,
  // addBranch,
  // editBranch,
  // deleteBranch
};
