import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column({ default: "customer" })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Optional inverse relation for refresh tokens
  // @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  // refreshTokens?: RefreshToken[];
}
