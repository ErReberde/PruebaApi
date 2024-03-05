import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Todo Api")
    .setDescription("Prueba técnica para backend developer")
    .setVersion("1.0.0")
    .addTag("todo")
    .addBearerAuth(
      { 
        
        description: `Bearer + JWTToken`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http', 
        in: 'Header'
      },
      'BearerToken',
    )
    .build()
    
    

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("documentation", app, document)

  await app.listen(3000);
}
bootstrap();
