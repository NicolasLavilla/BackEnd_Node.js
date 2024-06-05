import { DataTypes } from 'sequelize';
import { DATA_BASE } from '../config/database.js';

const MunicipalityModel = DATA_BASE.define('Municipality', {
  idMunicipality: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  },
  codCountry: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codAuto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  idProvince: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codMunicipality: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nameMunicipality: {
    type: DataTypes.STRING(100),
    allowNull: false,
  }
}, {
  tableName: 'municipality',
  timestamps: false,
});

export {MunicipalityModel};
