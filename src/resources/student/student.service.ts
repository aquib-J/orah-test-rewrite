import Student from "./student.model";
import { IStudent,UpdateStudent } from 'resources/student/student.interface';

class StudentService {
  /**
   * Create a student
   */
    public async create(student: IStudent): Promise<IStudent> {
        try {
            const newStudent = new Student();
            newStudent.first_name = student.first_name;
            newStudent.last_name = student.last_name;
            newStudent.photo_url = student.photo_url;

            const savedStudent = await newStudent.save();
            console.log(savedStudent)
            return savedStudent;
        } catch (err) {
            console.error(err);
            throw new Error('Unable to create a Student,Please try again');
        }
    }
    
  /**
   * Update a student
   */
    
  /**
   * Remove a student
   */
    
  /**
   * get all students
   */
    public async getAllStudents() : Promise<Array<IStudent>> {
        try {
            
            let allStudents = await Student.find();
            return allStudents;
        } catch(err) {
            console.error(err);
            throw new Error(`Unable to fetch all the student info, Please try again`);
        }
    }
}

export default StudentService;