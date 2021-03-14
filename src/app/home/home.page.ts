import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
//import { AlertController } from '@ionic-angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

@Injectable()
export class HomePage {
  nickname='';
  constructor(
    private socket: Socket, 
    private router: Router
    ) {
      console.log("Test");
      this.sendMessage("hola");
 //     this.socket.connect();
 //     this.socket.emit('set-nickname', 'TEST');

  }

  async sendMessage(msg: string){
    console.log(this.socket.connect());
    this.socket.emit("set-name", "set-name");
    
}


  /* joinChat()
  {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.router.navigate(['chatroom',{nickname:this.nickname}])
  } */
  ngOnInit() {
  //  this.socket.connect();
  //  this.socket.emit('set-name', 'test');
  }
}

