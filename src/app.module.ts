import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { LoginUserModule } from './login-user/login-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares';

config({
  path: ".env"
})

@Module({
  imports: [
    TypeOrmModule.forRoot(
    {
      type: 'mysql',
      username: process.env.USERNAME_DATABASE,
      password: process.env.PASSWORD_DATABASE,
      host: process.env.HOST_DATABASE,
      database: process.env.NAME_DATABASE,
      entities: [__dirname+ '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    TaskModule, 
    UserModule, 
    LoginUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(LoggerMiddleware)
        .exclude( 
          {path: "api/login", method: RequestMethod.POST},
          {path: "api/user", method: RequestMethod.POST}
          )
        .forRoutes(
            {
              path: "api*", method: RequestMethod.GET
            },
            {
              path: "api*", method: RequestMethod.POST
            },
            {
              path: "api*", method: RequestMethod.PUT
            },
            {
              path: "api*", method: RequestMethod.DELETE
            }
        )
  }
}
