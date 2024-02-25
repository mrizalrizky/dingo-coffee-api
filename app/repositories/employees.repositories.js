function employeesRepository(db) {
    const getAllEmployees = () => {
      return db.employeesDB.findAll({});
    };
    
    const findOneByIdentifier = (identifier) => {
      return db.employeesDB.findOne({
        where: identifier,
      })
    }

    const createEmployee = (data, transaction) => {
      return db.employeesDB.create(data, transaction)
    }
    
    const updateEmployeeData = (username, dataToUpdate, transaction) => {
      return db.employeesDB.update(dataToUpdate, {
        where: {
          username
        }
      }, transaction)
    }
  
    return {
      getAllEmployees,
      findOneByIdentifier,
      createEmployee,
      updateEmployeeData,
    };
  }
  
  module.exports = employeesRepository;