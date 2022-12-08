export type ltmt = "<" | ">";

export interface IGroupInterface {
  name: string;
  number_of_weeks: number;
  roll_states: string;
  incidents: number;
  ltmt: ltmt;
  id?: number;
  run_at?: Date;
  student_count?: number;
}

export interface IStudentGroupInterface {
  student_id: number;
  group_id: number;
  incident_count: number;
  id?: number;
}


export type GroupStudentMap = {
  studentId: number;
  incidentCount: number;
};

export interface GroupStudentMapping {
  [groupId: string]: [GroupStudentMap];
}