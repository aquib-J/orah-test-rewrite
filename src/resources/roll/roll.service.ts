import Roll from "./roll.model";
import StudentRollState from "./roll.student.state.model";
import { IRollInterface, IStudentRollStates } from "types/roll.interface";


class RollService{
    /**
     * 
     * Create a Roll entry
     */
    async create(roll:IRollInterface): Promise<IRollInterface>{
        try {
            const newRoll = new Roll();
            newRoll.name = roll.name;
            newRoll.completed_at = roll.completed_at
            
            return await newRoll.save();

        } catch (err) {
            console.error(err);
            throw new Error('Unable to create a Roll, Please try again later');
        }
    }
    async addStudentRollStates(studentRollStates: Array<IStudentRollStates>): Promise<Array<IStudentRollStates>>{
    
        try {     
            console.log(studentRollStates);
            let newStudentRollStates = StudentRollState.getRepository();
            let savedEntities = await newStudentRollStates.save(studentRollStates)
            return savedEntities;
        } catch (err) {
            console.error(err);
            throw new Error('Unable to push the roll states for the students, Please try again later');
        }
    }
}

export default RollService;