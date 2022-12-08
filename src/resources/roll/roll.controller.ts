import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "../../resources/roll/roll.validation";
import RollService from "../../resources/roll/roll.service";
import { IRollInterface,IStudentRollStates } from "types/roll.interface";

class RollController implements Controller {
  public path = "/roll";
  public router = Router();
  private RollService = new RollService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(`${this.path}/create`,validationMiddleware(validate.create), this.create);
    this.router.post(
      `${this.path}/add-student-states`,
      validationMiddleware(validate.addStudentRollStates),
      this.addStudentRollStates
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
      try {
      const rollToCreate: IRollInterface = req.body;
      const created :IRollInterface = await this.RollService.create(rollToCreate);
      res.status(201).json({ created });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private addStudentRollStates = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
      try {
          const rollStatesToAdd: IStudentRollStates[] = req.body;
      const addedRollStates :IStudentRollStates[] = await this.RollService.addStudentRollStates(rollStatesToAdd);
      res.status(201).json({ addedRollStates });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default RollController;
