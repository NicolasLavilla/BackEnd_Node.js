import * as awilix from "awilix";

import { UserModel } from "./models/userModel.js";
import { UserController } from "./controllers/userController.js";
import { UserService } from "./services/userService.js";
import { UserRepository } from "./repositories/userRepository.js";

import { MunicipalityModel } from "./models/municipalityModel.js";

import { TokenService } from "./services/tokenService.js";

import { DATA_BASE } from "./config/database.js";
import { Utils } from "./utils/utils.js";
import { ResponseHandler } from "./utils/responseHandler.js";
import { ENVIRONMENT, ERROR_ENVIRONMENT } from "./config/environment.js";

const container = awilix.createContainer();

container.register({
  userModel: awilix.asClass(UserModel).singleton(),
  userService: awilix.asClass(UserService).singleton(),
  userController: awilix.asClass(UserController).singleton(),
  userRepository: awilix.asClass(UserRepository).singleton(),

  municipalityModel: awilix.asClass(MunicipalityModel).singleton(),

  tokenService: awilix.asClass(TokenService).singleton(),

  sequelize: awilix.asValue(DATA_BASE),
  utils: awilix.asClass(Utils).singleton(),
  responseHandler: awilix.asClass(ResponseHandler).singleton(),
  environment: awilix.asValue(ENVIRONMENT),
  errorEnvironment: awilix.asValue(ERROR_ENVIRONMENT),
});

export { container };
