import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  token!: string;

  @Column({ type: "datetime" })
  expiresAt!: Date;

  @Column({ type: "datetime", nullable: true })
  revokedAt?: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user!: User;
}
