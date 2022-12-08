import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {  RollState } from "types/roll.interface";

@Entity()
export default class StudentRollState extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  public id!: number;

  @Column("int")
  student_id!: number;

  @Column("int")
  roll_id!: number;

  @Column("text")
  state!: RollState;

  }
