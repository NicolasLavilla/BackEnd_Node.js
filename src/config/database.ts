import { Sequelize } from "sequelize";
import { Console } from "./console.js";
import { ENVIRONMENT } from "./environment.js";

const console = new Console("DATABASE");

// Configuración de la conexión a la base de datos
const DATA_BASE = new Sequelize("aprexi", "root", "", {
  host: ENVIRONMENT.host,
  dialect: "mysql",
});


// Conectar a la base de datos
DATA_BASE.authenticate()
  .then(() => {
    console.success("Conexión exitosa a la base de datos MySQL");
  })
  .catch((err) => {
    console.error("Error al conectar a la base de datos");
    throw new Error(err);
  });

  DATA_BASE.sync()
  .then(() => {
    console.success("La base de datos ha sido sincronizada.");
  })
  .catch((err) => {
    console.error("Error al sincronizar la base de datos:");
  });

export { DATA_BASE };
