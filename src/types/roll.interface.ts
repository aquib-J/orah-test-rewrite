export type RollState = "unmark" | "present" | "absent" | "late";

export interface IRollInterface {
    name: string,
    completed_at: Date,
    id?:number,    
}

export interface IStudentRollStates{
    student_id: number,
    roll_id: number,
    state: RollState,
    id?:number,
}