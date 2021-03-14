import { Socket } from 'ngx-socket-io';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.page.html',
  styleUrls: ['./chatroom.page.scss'],
})
export class ChatroomPage implements OnInit {

  messages = [];
  nickname = '';
  message = '';

  constructor(private socket: Socket, public toastCtrl: ToastController,    private router: ActivatedRoute) {
    this.nickname = this.router.snapshot.paramMap.get('nickname');
    this.getMessages().subscribe(message=>
          {
            this.messages.push(message);
          }
      );

      console.log(this.getUsers())

      this.getUsers().subscribe(data => {
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('User left: ' + user);
        } else {
          this.showToast('User joined: ' + user);
        }
      });
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessage()
  {
    this.socket.emit('add-message', { text: this.message});
    this.message = '';
  }

  getMessages()
  {
    let observable = new Observable(observer=> 
      {
        this.socket.on('message', data=>
        {
          observer.next(data);
        })
      });
      return observable;
  }

  ionViewWillLeave()
  {
    this.socket.disconnect();
  }

  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {  
  
  }

}
