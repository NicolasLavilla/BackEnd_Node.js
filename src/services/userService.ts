// src/services/userService.ts

import { UserRepository } from "../repositories/userRepository.js";
import { Utils } from "../utils/utils.js";
import { TokenService } from "./tokenService.js";
import { ERROR_ENVIRONMENT } from "../config/environment.js";

class UserService {
  private userRepository: UserRepository;
  private utils: Utils;
  private tokenService: TokenService;

  constructor({
    userRepository,
    utils,
    tokenService,
  }: {
    userRepository: UserRepository;
    utils: Utils;
    tokenService: TokenService;
  }) {
    this.userRepository = userRepository;
    this.utils = utils;
    this.tokenService = tokenService;
  }

  async createUser(userData: any) {
    userData.password = this.utils.encrypt(userData.password);
    const user = await this.userRepository.createUser(userData);
    return user;
  }

  async updateUser(token: string, updateData: any) {

    const payload = this.tokenService.decodeToken(token);

    const user = await this.userRepository.updateUser(payload.decoded.userId, updateData);
    return user;
  }

  /*async deleteUser(idUser: number) {
    const response = await this.userRepository.deleteUser(idUser);
    return response;
  }*/

  async getUserById(token: string) {
    const payload = this.tokenService.decodeToken(token);

    const user = await this.userRepository.getUserById(payload.decoded?.userId);

    if (!user) {
      throw new Error(ERROR_ENVIRONMENT.RESULTS_NOT_FOUND);
    } else {
      return user;
    }
  }

  async getAllUsers(token: string) {
    const payload = this.tokenService.decodeToken(token);

    if (payload.decoded?.typeUser !== 4) {
      throw new Error(ERROR_ENVIRONMENT.INSUFFICIENT_PERMISSIONS);
    }
    const users = await this.userRepository.getAllUsers();
    return users;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userRepository.loginUser(email);

    if (!user) throw new Error(ERROR_ENVIRONMENT.EMAIL_NOT_FOUND);

    const isPasswordValid = await this.utils.compareEncrypt(
      password,
      user.password
    );

    if (!isPasswordValid)
      throw new Error(ERROR_ENVIRONMENT.INVALID_LOGIN_REQUEST);

    const token = this.tokenService.generateToken(user.idUser, user.typeUser);

    if (token) {
      return token;
    }
  }
}

export { UserService };
