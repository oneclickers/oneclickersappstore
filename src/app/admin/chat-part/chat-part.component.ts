import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  router_Name: any = [];
  showEmojiPicker = false;
  message: any;
  newMessage: String;
  SeachedUse: any[] = []
  messages: any[] = [];
  chatmemberList:any[]=[]
  previousChatMemberList: any[] = [];
  userID: number;
  r_id:number=0
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
  search:any
  constructor(
    private router: Router,
    private messageService: MessageServiceService,
    private userInfo: HostServiceService,
    private userService: UserServiceService,
    private Tmessage: NbToastrService,
    private hostService:HostServiceService
  ) {
    this.userID = this.userInfo.getUserId();
    this.ngOnMessageSetUp();
    // this.userID = this.hostService.userid;
    this.userName = this.userInfo.getUserName();
  }

  ngOnInit(): void {
    
    this.previousChatMemberList=[]
    this.setPageHeader();
    this.prepareMemberList(this.userID);
    this.getPreviousChatMemberList();
    this.getNewMessage();
    this.scrollToBottom();
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
        this.userList = res.data.map((data:any)=>{
          data.id=data.user_Id
          delete data.user_Id
          return data
        })
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
  
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'file-text-outline',
    //   };
    // });
    
    var model={
      message:this.newMessage,
      receiver_id:this.receiverID,
      sender_Id:this.userID,
      view_Status:0,
      // date:new Date(),
      files:''
    }
    this.newMessage=''
    console.log("message", model,event);
    this.messageService.sendMessage(model)
   

  }
  getNewMessage() {
    console.log("getNewMessagecalled");
    
    this.messageService.getNewMessage().subscribe((res: any) => {
      console.log('newMessage', res);
      if(this.r_id!=0){
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
      }
    

    })
  }
  onSearch(name: any) {
    console.log("onsearch",this.search);
    
    if(this.search.length>0){
      this.previousChatMemberList = this.userList.filter((data: any) => data.email_Id === this.search);
      console.log("onsearchvsvs", this.previousChatMemberList );
    }
  else{
    this.prepareMemberList(this.userID);
    //  this.previousChatMemberList=  this.chatmemberList
  }

  }
  prepareMemberList(userID: any) {
    this.messageService.emitMembarList(userID)
  }
  getPreviousChatMemberList() {
    this.messageService.getPreviousChatMembersList().subscribe((res: any) => {
      console.log("getPreviousChatMembersList", res);

      this.previousChatMemberList = res
      this.chatmemberList=res
    })
  }
  previousChat(id:any) {
    this.r_id=id
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


ngAfterViewChecked() {        
    this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
