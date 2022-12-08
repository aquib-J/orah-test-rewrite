import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class GroupStudent extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("int")
  student_id!: number;

  @Column("int")
  group_id!: number;

  @Column("int")
  incident_count!: number;
}
