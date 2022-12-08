import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/group/group.validation";
import GroupService from "../../resources/group/group.service";
import { IGroupInterface, IStudentGroupInterface } from "types/group.interface";
import { group } from "console";

class GroupController implements Controller {
  public path = "/group";
  public router = Router();
  private GroupService = new GroupService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.create),
      this.create
    );
    this.router.get(`${this.path}/get-all`, this.getAllGroups);
    this.router.patch(
      `${this.path}/update/:id`,
      validationMiddleware(validate.update),
      this.updateGroup
    );
    this.router.delete(`${this.path}/:id`, this.deleteGroup);
    this.router.get(
      `${this.path}/get-students-in-group`,
      this.getAllStudentsInGroup
    );
    this.router.post(`${this.path}/run-group-filters`, this.runGroupFilters);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const groupToCreate: IGroupInterface = req.body;
      const created: IGroupInterface = await this.GroupService.create(
        groupToCreate
      );
      res.status(201).json({ created });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllGroups = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let allGroups: IGroupInterface[] = await this.GroupService.getAllGroups();
      res.status(201).json({ allGroups });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let { id } = req.params;
      if (!id || !(Number(id) > 0))
        throw Error(`Invalid Id was provided,please enter a correct Id`);
      const groupToUpdate: IGroupInterface = req.body;
      const updated: IGroupInterface | { message: string } =
        await this.GroupService.updateGroup(id, groupToUpdate);
      res.status(201).json({ updated });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
  private deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      let { id } = req.params;
      if (!id || !(Number(id) > 0))
        throw Error(`Invalid Id was provided,please enter a correct Id`);

      const deleted: IGroupInterface | { message: string } =
        await this.GroupService.deleteGroup(id);
      res.status(201).json({ deleted });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
    private getAllStudentsInGroup = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        const AllStudentsInGroup: IStudentGroupInterface[] = await this.GroupService.getAllGroupStudents();
        res.status(201).json({ AllStudentsInGroup });
      } catch (error: any) {
        next(new HttpException(400, error.message));
      }
    };
    private runGroupFilters = async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<Response | void> => {
      try {
        const response : {message:string} = await this.GroupService.runGroupFilters();
        res.status(201).json({ response });
      } catch (error: any) {
        next(new HttpException(400, error.message));
      }
    };
}

export default GroupController;
