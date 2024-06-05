import { Request, Response } from 'express';
import { UserService } from '../services/userService.js';
import { ResponseHandler } from '../utils/responseHandler.js';
import { Utils } from '../utils/utils.js';
import { ERROR_ENVIRONMENT } from '../config/environment.js';

class UserController {
    private userService: UserService;
    private responseHandler: ResponseHandler;
    private utils: Utils;

    constructor({ userService, responseHandler, utils }: { userService: UserService, responseHandler: ResponseHandler, utils: Utils }) {
        this.userService = userService;
        this.responseHandler = responseHandler;
        this.utils = utils;
    }

    async register(req: Request, res: Response) {
        try {
            const userData = req.body;

            if(!userData.name || !userData.surname1 || !userData.surname2 || !userData.gender || !userData.mobile || !userData.birthDate ||!userData.municipality || !userData.workPermit === null || !userData.autonomousDischarge === null || !userData.ownVehicle === null) throw new Error(ERROR_ENVIRONMENT.MISSING_PARAMETERS);

            const newUser = await this.userService.createUser(userData);
            
            this.responseHandler.created(res, newUser, 'User registered successfully', );
        } catch (error: any) {
            this.responseHandler.handleErrors(res ,error.message);
        }
    }

    async update(req: Request, res: Response) {
        try {

            const userData = req.body;

            if(!userData.name || !userData.surname1 || !userData.surname2 || !userData.gender || !userData.mobile || !userData.birthDate ||!userData.municipality || !userData.workPermit === null || !userData.autonomousDischarge === null || !userData.ownVehicle === null) throw new Error(ERROR_ENVIRONMENT.MISSING_PARAMETERS);

            const newUser = await this.userService.updateUser(req.params.token.trim() ,userData);
            
            this.responseHandler.created(res, newUser, 'User registered successfully', );
        } catch (error: any) {
            this.responseHandler.handleErrors(res ,error.message);
        }
    }

    async getUserById(req: Request, res: Response){
        try {
            const userData = await this.userService.getUserById(req.params.token.trim());

            if(userData){
                this.responseHandler.success(res, userData);
            }

        } catch (error: any) {
            this.responseHandler.handleErrors(res ,error.message);
          }
    }

    async getAllUsers(req: Request, res: Response){
        try {
            const userData = await this.userService.getAllUsers(req.params.token.trim());

            if(userData){
                this.responseHandler.success(res, userData);
            }

        } catch (error: any) {
            this.responseHandler.handleErrors(res ,error.message);
          }
    }

    async login(req: Request, res: Response) {
        try {
            var { email, password } = req.body;

            email = email.trim();
            password = password.trim();
            
            if (!email || !password) {
                throw new Error( ERROR_ENVIRONMENT.MISSING_PARAMETERS);
            }

            if(!this.utils.isValidEmail(email)){
                throw new Error( ERROR_ENVIRONMENT.EMAIL_FORMAT_ERROR);
            }

            const token = await this.userService.loginUser(email, password);

            if (token) {
                this.responseHandler.success(res, token);
            }
            
        } catch (error: any) {
            console.log(error.message);
            this.responseHandler.handleErrors(res ,error.message);
        }
    }
}

export {UserController};
