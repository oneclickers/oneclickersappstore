import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageServiceService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public memberList$: BehaviorSubject<string> = new BehaviorSubject('');
  public chatList$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private socket:Socket) { }
  socketConnection(){
  this.socket.emit('connection')
  console.log('this.socket',this.socket);
  
  }
  sendMessage(message:any){
    this.socket.emit('message',message);
    console.log('this.socket',this.socket);
  }
  public getNewMessage = () => {
    this.socket.on('message', (message:any) =>{
      this.message$.next(message);
    });
    return this.message$.asObservable();
  };
  emitMembarList(userID:any){
    console.log("member list",userID);
    
    this.socket.emit('getChatMemberList',userID)
  }
  public getPreviousChatMembersList = () => {
    this.socket.on('getChatMemberList', (MemberList:any) =>{
      this.memberList$.next(MemberList);
    });
    return this.memberList$.asObservable();
  };

  emitPreviousChat(data:any){
    this.socket.emit('getChat',data)
  }

  public getchatList = () => {
    this.socket.on('getChat', (ChatList:any) =>{
      this.chatList$.next(ChatList);
    });
    return this.chatList$.asObservable();
  };
  // socketDisconnect(){
  //   this.socket.emit('disconnect')
  //   this.message$.unsubscribe()
  // }
}
