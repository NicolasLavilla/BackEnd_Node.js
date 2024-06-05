// src/models/index.ts
import { DATA_BASE } from '../config/database.js';
import { UserModel } from './userModel.js';
import { MunicipalityModel } from './municipalityModel.js';

// Establecer relaciones
UserModel.belongsTo(MunicipalityModel, { foreignKey: 'municipality' });
MunicipalityModel.hasMany(UserModel, { foreignKey: 'municipality' });

// Sincronizar modelos con la base de datos
(async () => {
  await DATA_BASE.sync({ force: false });
})();

export { UserModel, MunicipalityModel };
