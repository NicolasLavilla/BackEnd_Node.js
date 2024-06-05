import { DataTypes } from 'sequelize';
import { DATA_BASE } from '../config/database.js';
import { MunicipalityModel } from './municipalityModel.js';

const UserModel = DATA_BASE.define('User', {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  surname1: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  surname2: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING(9),
    allowNull: true,
  },
  nie: {
    type: DataTypes.STRING(9),
    allowNull: true,
  },
  passport: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  municipality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: MunicipalityModel,
      key: 'idMunicipality',
    },
  },
  dateCreation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DATA_BASE.literal('CURRENT_TIMESTAMP'),
  },
  nameProfession: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  workPermit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  autonomousDischarge: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ownVehicle: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  currentPractices: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  idTypePermissionsRoleUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  verifiedUser: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CODE_VERIFICATION: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

export {UserModel};
