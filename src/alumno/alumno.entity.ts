import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'alumno' })
export class Alumno {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ length: 50, nullable: true })
  nombre: string;

  @Column({ length: 50, nullable: true })
  curso: string;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  nota1: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  nota2: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, nullable: false })
  promedio: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  fechaRegistro: Date;
}
