function branchesRepository(db) {
  const getAllBranches = () => {
    return db.masterBranches.findAll({});
  };

  return {
    getAllBranches,
  };
}

module.exports = branchesRepository;
