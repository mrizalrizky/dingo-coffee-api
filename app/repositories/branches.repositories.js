function branchesRepository(db) {
    const getAllBranches = () => {
      return db.employeesDB.findAll({});
    };

    return {
      getAllBranches
    };
  }
  
  module.exports = branchesRepository;