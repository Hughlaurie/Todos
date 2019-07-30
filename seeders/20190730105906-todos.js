'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Todos', [{
       text: 'Learn Vue',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], 
    {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Todos', null, {});
  }
};
