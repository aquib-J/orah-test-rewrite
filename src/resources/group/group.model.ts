import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ltmt } from "types/group.interface";

@Entity()
export default class Group extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column("text")
  name!: string;

  @Column("int")
  number_of_weeks!: number;

  @Column("text")
  roll_states!: string;

  @Column("int")
  incidents!: number;

  @Column("text")
  ltmt!: ltmt;

  @Column({
    nullable: true,
  })
  run_at: Date;

    @Column({
      default:0
  })
  student_count: number;
}
