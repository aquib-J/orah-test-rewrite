import Group from "./group.model";
import GroupStudent from "./group.student.model";
import { IGroupInterface, IStudentGroupInterface,GroupStudentMapping } from "types/group.interface";

class GroupService {
  /**
   *
   * Create a Group entry
   */
  async create(group: IGroupInterface): Promise<IGroupInterface> {
    try {
      const newGroup = new Group();

      newGroup.name = group.name;
      newGroup.number_of_weeks = group.number_of_weeks;
      newGroup.roll_states = group.roll_states;
      newGroup.incidents = group.incidents;
      newGroup.ltmt = group.ltmt;

      return await newGroup.save();
    } catch (err) {
      console.error(err);
      throw new Error("Unable to create a Group, Please try again later");
    }
  }
  /**
   *
   *  Get all groups
   */
  async getAllGroups(): Promise<Array<IGroupInterface>> {
    try {
      let allGroups = await Group.find();
      return allGroups;
    } catch (err) {
      console.error(err);
      throw new Error("Unable to fetch all the groups, Please try again later");
    }
  }
  /**
   *
   * Delete a particular Group wrt Id
   */
  async deleteGroup(id: any): Promise<IGroupInterface | { message: string }> {
    try {
      let groupToDelete = await Group.findOne({
        where: { id },
      });
      if (groupToDelete) {
        let deletedGroup = await Group.remove(groupToDelete);
        return deletedGroup;
      }
      return { message: `The Group doesn't exist or is already deleted` };
    } catch (err) {
      console.error(err);
      throw new Error(
        "Unable to Delete the required Group, Please try again later"
      );
    }
  }
  /**
   *
   * Update a particular Group wrt Id
   */
  async updateGroup(
    id: any,
    group: IGroupInterface
  ): Promise<IGroupInterface | { message: string }> {
    try {
      let groupToUpdate: IGroupInterface = (await Group.findOne({
        where: { id },
      })) as IGroupInterface;

      if (groupToUpdate) {
        let updatedGroup: IGroupInterface = (await Group.save({
          ...groupToUpdate, // existing fields
          ...group, // updated fields
        })) as unknown as IGroupInterface;
        return updatedGroup;
      }
      return { message: `The Group doesn't exist` };
    } catch (err) {
      console.error(err);
      throw new Error(
        "Unable to Update the required Group, Please try again later"
      );
    }
  }
  /**
   *
   *  Get all Students in a group
   */
  async getAllGroupStudents(): Promise<Array<IStudentGroupInterface>> {
    try {
      let allGroups = await Group.query(
        `SELECT id,
                first_name,
                last_name,
                first_name
                || ' '
                || last_name AS full_name
        FROM   student
        WHERE  id IN (SELECT student_id
                      FROM   group_student);
        `
      );
      return allGroups;
    } catch (err) {
      console.error(err);
      throw new Error("Unable to fetch all the groups, Please try again later");
    }
  }
  /**
   *
   *  Run Group Filters
   */
  async runGroupFilters(): Promise<{ message: string }> {
    try {
      let allGroups = await this.getAllGroups();
        if (allGroups && allGroups.length) {
            let queryDefinition = (
                date: string,
                rollStates: string[],
                incidents: number,
                ltmtFilter: string
            ): string =>
                `SELECT studentId,
            Count(*) AS incidentCount
            FROM   (
                  SELECT     srs.student_id    AS studentId,
                             srs.roll_id       AS rollId,
                             srs.state         AS rollState,
                             roll.completed_at AS date
                  FROM       student_roll_state srs
                  INNER JOIN roll
                  ON         roll.id=srs.roll_id
                  WHERE      date>=${date}
                  AND        rollState IN (${rollStates})
                    )
                  GROUP BY   studentId
                  HAVING     incidentCount ${ltmtFilter}${incidents};
         `;
            let requiredDate = (week: number): string => {
                let date = new Date();
                date.setDate(date.getDate() - week * 7);
                return date.toISOString().split("T")[0];
            };
            let groupUpdateObject: {
                id: number;
                run_at: string;
                student_count: number;
            }[] = [];
            // let studentGroupCreateObject: IStudentGroupInterface[] = [];
            let studentGroupCreateObject: any[] = [];
            let groupStudentMap: GroupStudentMapping = {};

            for (const group of allGroups) {
                groupStudentMap[group.id as any] = await Group.query(
                    queryDefinition(
                        requiredDate(group.number_of_weeks),
                        group.roll_states.split(",").map(state => `'${state}'`),
                        group.incidents,
                        group.ltmt
                    )
                );
            }

            for (let key in groupStudentMap) {
                let groupObj = {
                    id: Number(key),
                    run_at: requiredDate(0),
                    student_count: groupStudentMap[key].length,
                };
                if (groupStudentMap[key].length) {
                    groupStudentMap[key].forEach(info => {
                        let studentGroupObj = {
                            group_id: Number(key),
                            student_id: info.studentId,
                            incident_count: info.incidentCount,
                        };
                        studentGroupCreateObject.push(studentGroupObj);
                    });
                }
                groupUpdateObject.push(groupObj);
            }

            //TODO: wrap the below DB calls in a transaction using the appropriate non-deprecated Typeorm methods
        
            await GroupStudent.clear();
            await Group.save(groupUpdateObject);
            await GroupStudent.save(studentGroupCreateObject);

            return {
                message: "The group filters have been successfully Applied",
            };

    
        }
      return {
        message:
          "There are no group defined currently, please create the group definitions before running the filters",
      };
    } catch (err) {
      console.error(err);
      throw new Error(
        "Error in apply the group filters, Please try again later"
      );
    }
  }
}

export default GroupService;
