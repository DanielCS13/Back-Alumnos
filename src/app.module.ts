import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlumnoModule } from './alumno/alumno.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      host: 'localhost',
      port: 3306,
      password: '',
      database: 'alumno',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AlumnoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
