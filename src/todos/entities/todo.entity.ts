import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  description: string;

  @Column()
  done: boolean;
}
