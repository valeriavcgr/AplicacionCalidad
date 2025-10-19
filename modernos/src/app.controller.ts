import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

//INDEX
  @Get()
  @Render('index')
  getHome(){
    return { title: ' ModerNosLandingPage' };
  }
//ruta para ver si el backend funciona
  @Get('status')
  getStatus(){
    return this,this.appService.getStatus();
  }

}