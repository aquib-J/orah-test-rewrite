import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number ;

  @Column("text")
  first_name!: string;

  @Column("text")
  last_name!: string;

  @Column("text")
  photo_url!: string;
}
