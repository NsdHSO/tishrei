import {
  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import {Permission} from '../../permission/entities/permission.entity';
import {
  ShiftEntryBridging,
} from '../../shift-entry-bridging/entities/shift-entry-bridging.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() employee_id: number;
  @ManyToOne(() => Permission, { eager : true }) // Define the relationship
  permission: Permission;
  @Column({
    type : 'varchar',
    length : 255,
    nullable : false,
  }) full_name: string;
  @Column({
    type : 'varchar',
    length : 255,
    nullable : true,
  }) email: string;
  @Column({
    type : 'varchar',
    length : 20,
    nullable : true,
  }) phone_number: string;
  @Column({
    type : 'date',
    nullable : true,
  }) date_of_birth: Date;
  @Column({
    type : 'varchar',
    length : 255,
    nullable : true,
  }) address: string;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) city: string;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) state_province: string;
  @Column({
    type : 'varchar',
    length : 20,
    nullable : true,
  }) zip_postal_code: string;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) country: string;
  @Column({
    type : 'varchar',
    length : 10,
    nullable : true,
  }) gender: string;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) nationality: string;
  @Column({
    type : 'date',
    nullable : true,
  }) date_of_joining: Date;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) job_title: string;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) department: string;
  @Column({
    type : 'decimal',
    precision : 10,
    scale : 2,
    nullable : true,
  }) salary: number;
  @Column({
    type : 'varchar',
    length : 100,
    nullable : true,
  }) work_schedule: string;
  @Column({
    type : 'varchar',
    length : 255,
    nullable : true,
  }) emergency_contact_name: string;
  @Column({
    type : 'varchar',
    length : 20,
    nullable : true,
  }) emergency_contact_phone: string;
  @OneToMany(
    () => ShiftEntryBridging,
    (shiftEntry) => shiftEntry.user,
  ) shiftEntries: ShiftEntryBridging[];
}
