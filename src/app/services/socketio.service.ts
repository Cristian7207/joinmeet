import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SocketioService 
{
  constructor(private socket: Socket, public toastCtrl: ToastController) 
  {
  }  
  async sendUser(msg: string)
  {
    this.socket.connect();
    this.socket.emit("set-name",msg);

   // 
    console.log(this.socket);
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getMessages(messages)
  {
    this.socket.fromEvent('message').subscribe(message => {
      console.log(message);
      messages.push(message);
    });
  }

  sendMessage(message)
  {
    this.socket.emit('send-message', { text: message});
  }

printtoast(){
  this.getUsers().subscribe(data => {
    let user = data['user'];
    if (data['event'] === 'left') {
      this.showToast('El Usuario '+user+' ha dejado la sala');
    } else {
      this.showToast('El Usuario '+user+' ha ingresado la sala');
    }
  });
}

async showToast(msg) {
  const toast = await this.toastCtrl.create({
    message: msg,
    duration: 2000
  });
  toast.present();
}

connect()
{
  this.socket.connect();
}
disconnect ()
{
  this.socket.disconnect();
}
}
