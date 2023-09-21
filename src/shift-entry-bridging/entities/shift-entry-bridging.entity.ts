import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../user/entities/user.entity';

@Entity()
export class ShiftEntryBridging {
  @PrimaryGeneratedColumn() id: number;
  @Column({
    type : 'timestamp',
    default : () => 'CURRENT_TIMESTAMP',
  }) entry_time: Date;
  @ManyToOne(() => User, (user) => user.shiftEntries)
  user: User;
}
