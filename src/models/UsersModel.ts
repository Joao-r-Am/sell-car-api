import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/database';
import { IUser } from '../interfaces/users';

class UsersModel extends Model<IUser, Partial<IUser>> implements IUser {
  declare id: string;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare username: string;
  declare cnpjf: string;
  declare birthday: Date;
  declare is_company: boolean;
  declare roles: string[];
  declare password: string;
  declare address: string;
  declare zip_code: string;
  declare phone: string;
  declare active: boolean;
  declare entity: string;
  declare portager: string;
  declare municipal_inscription: string;
  declare taxpayer: string;
  declare created_at: Date;
  declare updated_at: Date;
  declare deleted_at: Date;
}

UsersModel.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnpjf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    entity: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    portager: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    municipal_inscription: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    taxpayer: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    is_company: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'users',
    sequelize: sequelize,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
);

const associate = () => {};

export default UsersModel;
