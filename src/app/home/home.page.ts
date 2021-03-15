import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SocketioService} from '../services/socketio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  nickname='';
  constructor(private router: Router, private socket: SocketioService ) {  }    

  async joinChat()
  {
    this.socket.sendUser(this.nickname);
    this.router.navigate(['chatroom',{nickname:this.nickname}])
  };
}