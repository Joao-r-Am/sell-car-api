'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE users (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        lastname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(255) NOT NULL UNIQUE,
        cnpjf VARCHAR(255) NOT NULL UNIQUE,
        birthday DATE,
        is_company BOOLEAN DEFAULT false,
        roles TEXT [],
        password VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        zip_code VARCHAR(255),
        phone VARCHAR(255),
        active BOOLEAN DEFAULT true,
        entity VARCHAR(10),
        portager VARCHAR(100),
        municipal_inscription VARCHAR(50),
        taxpayer VARCHAR(50),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        deleted_at TIMESTAMP
    );
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`DROP TABLE IF EXISTS users;`);
  },
};
