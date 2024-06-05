// src/repositories/userRepository.ts

import { UserModel } from '../models/index.js';
import { ERROR_ENVIRONMENT } from '../config/environment.js';

class UserRepository {

    async loginUser(email: string): Promise<any> {
        // Implement logic to find user by email (using Sequelize)
        const user = await UserModel.findOne({
          where: { email },
          //include: [{ model: this.userModel }],//UserRole // Assuming you have a UserRole model
        });
    
        if (!user) return user;
    
        return user;
      }

  async createUser(userData: any) {
    try {
      const user = await UserModel.create(userData);
      
      return user;
    } catch (error: any) {
      throw new Error('Error creating user: ' + error.message);
    }
  }

  async getUserById(idUser: number) {
    try {
      const user = await UserModel.findByPk(idUser);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error: any) {
      throw new Error('Error fetching user: ' + error.message);
    }
  }

  async updateUser(idUser: number, updateData: any) {
    try {
      const user = await UserModel.findByPk(idUser);
      if (!user) {
        throw new Error(ERROR_ENVIRONMENT.RESULTS_NOT_FOUND);
      }
      await user.update(updateData);
      return user;
    } catch (error: any) {
      throw new Error('Error updating user: ' + error.message);
    }
  }

  /*async deleteUser(idUser: number) {
    try {
      const user = await UserModel.findByPk(idUser);
      if (!user) {
        throw new Error('User not found');
      }
      await user.destroy();
      return { message: 'User deleted successfully' };
    } catch (error: any) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }*/

  async getAllUsers() {
    try {
      const users = await UserModel.findAll();
      return users;
    } catch (error: any) {
      throw new Error('Error fetching users: ' + error.message);
    }
  }
}

export {UserRepository};
