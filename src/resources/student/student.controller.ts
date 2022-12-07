import {Router,Request,Response,NextFunction} from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from '../../resources/student/student.validation';
import StudentService from '../../resources/student/student.service';


class StudentController implements Controller {
  public path = "/student";
  public router = Router();
  private StudentService = new StudentService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(`${this.path}/get-all`, this.getAll);
    this.router.post(
      `${this.path}/create`,
      validationMiddleware(validate.create),
      this.create
    );
  }

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const allStudents = await this.StudentService.getAllStudents();
      res.status(201).json({ allStudents });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { first_name, last_name, photo_url } = req.body;
      const student = await this.StudentService.create({
        first_name,
        last_name,
        photo_url,
      });
      res.status(201).json({ student });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default StudentController;


