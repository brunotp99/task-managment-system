import { Request, Response } from "express";

import log from "@/utils/logger";
import { UserInterface } from "@/interfaces/user.inteface";
import { ErrorInterface } from "@/errors/interface.error";

export class UserController {

  private userService: UserInterface;

  constructor(userService: UserInterface) {
    this.userService = userService;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getAll = this.getAll.bind(this);
    this.delete = this.delete.bind(this);
  }
    
  async create(req: Request, res: Response) {
    try {
        const { username, email, password } = req.body;
        
        const user = await this.userService.create({
            username, email, password
        });
        return res.status(200).json(user.toJSON());
    } catch (error : any) {
        const err = (error as ErrorInterface)
        log.error(`[USER_CONTROLLER_CREATE]: "${err.message}"`);
        res.status(err.statusCode).send(`[USER_CONTROLLER_CREATE]: "${err.message}"`)
    }

  }
  
  async update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const user = await this.userService.update(
            id,
            {username, email, password}
        );
        return res.status(200).json(user.toJSON());
    } catch (error : any) {
      const err = (error as ErrorInterface)
      log.error(`[USER_CONTROLLER_UPDATE]: "${err.message}"`);
      res.status(err.statusCode).send(`[USER_CONTROLLER_UPDATE]: "${err.message}"`)
    }
  }
  
  async getOne(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        const user = await this.userService.getOne(id);
        return res.status(200).json(user.toJSON());
    } catch (error : any) {
        const err = (error as ErrorInterface)
        log.error(`[USER_CONTROLLER_GETONE]: "${err.message}"`);
        res.status(err.statusCode).send(`[USER_CONTROLLER_GETONE]: "${err.message}"`)
    }
  }
  
  async getAll(req: Request, res: Response) {
    try {
      const users = await this.userService.getAll();
      
      return res.status(200).json(users);
    } catch (error: any) {
      const err = (error as ErrorInterface)
      log.error(`[USER_CONTROLLER_GETALL]: "${err.message}"`);
      res.status(err.statusCode).send(`[USER_CONTROLLER_GETALL]: "${err.message}"`)
    }
  }
  
  async delete(req: Request, res: Response) {
    try {
        const { id } = req.params;
        
        const result = await this.userService.delete(id);
        return res.status(200).json(result);
    } catch (error : any) {
        const err = (error as ErrorInterface)
        log.error(`[USER_CONTROLLER_DELETE]: "${err.message}"`);
        res.status(err.statusCode).send(`[USER_CONTROLLER_DELETE]: "${err.message}"`)
    }
  }
  
}