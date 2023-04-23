import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageServiceService } from '../../Service/message-service.service';
import { HostServiceService } from '../../Service/host-service.service';
import { UserServiceService } from '../../Service/user-service.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-chat-part',
  templateUrl: './chat-part.component.html',
  styleUrls: ['./chat-part.component.scss']
})
export class ChatPartComponent implements OnInit {
  router_Name: any = [];
  showEmojiPicker = false;
  message: any;
  SeachedUse: any[] = []
  messages: any[] = []
  previousChatMemberList: any[] = [];
  userID: number
  chating: any[] = [
    {
      text: 'Hi, what are you doing?!',
      sender: 'left'
    },
    {
      text: 'Doing Work!',
      sender: 'right'
    },
    // {
    //   text:'And you?!',
    //   sender:'right'
    // },
    // {
    //   text:'Hi, what are you doing?!',
    //   sender:'left'
    // }
  ]
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger'
  ]
  set = 'twitter';
  userList: any;
  userName: any;
  receiverID: any;
  constructor(
    private router: Router,
    private messageService: MessageServiceService,
    private userInfo: HostServiceService,
    private userService: UserServiceService,
    private Tmessage: NbToastrService,
  ) {
    this.userID = this.userInfo.getUserId();
    this.userName = this.userInfo.getUserName();
  }

  ngOnInit(): void {
    this.setPageHeader();
    this.prepareMemberList(this.userID);
    this.getPreviousChatMemberList();
    this.ngOnMessageSetUp();
    this.getNewMessage();
    this.getUserList();
    // this.
  }
  setPageHeader() {
    this.router_Name = this.router.url.split('/')
    console.log("this.router_Name", this.router_Name);

    this.router_Name = this.router_Name.splice(2, 3)
  }
  ngOnMessageSetUp() {
    this.messageService.socketConnection()
  }
  addEmoji(event) {
    console.log(this.message)
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`)
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }
  toggleEmojiPicker() {
    console.log(this.showEmojiPicker);
    this.showEmojiPicker = !this.showEmojiPicker;
  }
  getUserList() {
    this.userService.getUsers().subscribe((res: any) => {
      if (res.statuscode === 200) {
        this.userList = res.data
      } else {
        this.Tmessage.show(res.message, 'Info',
          {
            status: 'info'
          })
      }
    }, (error: any) => {
      this.Tmessage.show(error.message, 'Info',
        {
          status: 'info'
        })
    })
  }
  sendMessage(event: any) {
  
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });
    var model={
      message:event.message,
      receiverID:this.receiverID,
      senderID:this.userID,
      view_Status:0,
      files:''
    }
    console.log("message", model,event);
    this.messageService.sendMessage(model)
   

  }
  getNewMessage() {
    this.messageService.getNewMessage().subscribe((res: any) => {
      console.log('newMessage', res);
      if (res) {
        this.messages.push(res)
        // this.messages.push({
        //   text: res.text,
        //   date: res.createdAt,
        //   reply: res.reply,
        //   type: res.type,
        //   files: res.files,
        //   user: {
        //     // name: res.name,
        //     name: res.text,
        //     avatar: res.avatar,
        //   }
        // })
      }

    })
  }
  onSearch(name: any) {
    if (name) {
      this.SeachedUse = this.userList.filter((data: any) => data.email_Id === name)
    }

  }
  prepareMemberList(userID: any) {
    this.messageService.emitMembarList(userID)
  }
  getPreviousChatMemberList() {
    this.messageService.getPreviousChatMembersList().subscribe((res: any) => {
      console.log("getPreviousChatMembersList", res);

      this.previousChatMemberList = res
    })
  }
  previousChat(id) {
    console.log("rsID", id);
    this.receiverID=id
    var model: any = {
      receiver_id: id,
      sender_Id: this.userID
    }
    this.messageService.emitPreviousChat(model)
    this.getChat()
  }
  getChat() {
    this.messageService.getchatList().subscribe((res: any) => {
      console.log("succesfuiuhdkv", res);

      this.messages = res
    })
  }
}
