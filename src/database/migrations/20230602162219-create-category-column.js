'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('categories', 'path',{ 
      type: Sequelize.STRING
    });
    
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.removeColumn('categories','path');

  }
};
