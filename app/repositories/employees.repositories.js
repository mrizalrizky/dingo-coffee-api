function employeesRepository(db) {
    const getAllEmployees = () => {
      return db.employees.findAll({
        attributes: [
          'name',
          'username',
          'phone_number',
          'email',
          [db.sequelize.fn('COALESCE', db.sequelize.col('master_group.name'), '-'), 'employee_group'],
        ],
        include: [
          {
            model: db.masterGroups,
            attributes: [
                'id',
                'name'
            ],
            include: [
              {
                model: db.employeeGroupRoles,
                attributes: [
                    'group_role_id',
                ],
                include: [
                  {
                    model: db.groupRoles,
                    attributes: [
                        'role_name',
                        'description'
                    ],
                  }
                ]
              }
            ]
          }
        ]
      });
    };
    
    const findOneByIdentifier = (identifier) => {
      return db.employees.findOne({
        attributes: [
          'id',
          'name',
          'username',
          'password',
          'phone_number',
          'email',
          // [db.sequelize.fn('COALESCE', db.sequelize.col('master_group.name'), '-'), 'employee_group'],
        ],
        where: identifier,
        include: [
          {
            model: db.masterGroups,
            attributes: [
                'id',
                'name'
            ],
            include: [
              {
                model: db.employeeGroupRoles,
                attributes: [
                    'group_role_id',
                ],
                include: [
                  {
                    model: db.groupRoles,
                    attributes: [
                        'role_name',
                        'description'
                    ],
                  }
                ]
              }
            ]
          }
        ]
      })
    }

    const createEmployee = (data, transaction) => {
      return db.employees.create(data, transaction)
    }
    
    const updateDataByUsername = (username, dataToUpdate, transaction) => {
      return db.employees.update(dataToUpdate, {
        where: {
          username
        }
      }, transaction)
    }
  
    return {
      getAllEmployees,
      findOneByIdentifier,
      createEmployee,
      updateDataByUsername,
    };
  }
  
  module.exports = employeesRepository;