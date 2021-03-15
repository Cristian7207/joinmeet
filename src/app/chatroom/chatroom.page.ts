import { Socket } from 'ngx-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import {SocketioService} from '../services/socketio.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {
  
  nickname = '';
  message = '';
  messages = [];
  onlineusers=[];
  
  constructor(private socket: SocketioService, private router: ActivatedRoute) {
  }

  ionViewWillLeave()
  {
    this.socket.getUsers().subscribe(data =>
      {
        this.onlineusers.push(data["onlineusers"]);
      })

   this.socket.disconnect();
  }

  sendMessage() {
    this.socket.sendMessage(this.message);
    this.message = '';
  }


  ngOnInit() {  
    this.socket.connect();
    this.nickname = this.router.snapshot.paramMap.get('nickname');

    this.socket.printtoast();
    this.socket.getMessages(this.messages);

    this.socket.sendMessage(this.message);

    this.socket.getUsers().subscribe(data =>
      {
        this.onlineusers.push(data["onlineusers"]);
      })


    console.log(this.onlineusers[0]);
   

  }

}
