import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // Enable CORS only in development
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: ['http://localhost:4200', 'http://localhost:4201'],
      credentials: true,
    })
  }

  await app.listen(process.env.PORT ?? 3000)
}
void bootstrap()
