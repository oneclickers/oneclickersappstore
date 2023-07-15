import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogConfig, NbDialogRef, NbToastrService } from '@nebular/theme';
import { HostServiceService } from '../../../Service/host-service.service';
import { UserServiceService } from '../../../Service/user-service.service';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @ViewChild("fileSelector", { static: false }) fileSelector: ElementRef;
  public loginFrom: FormGroup;
  public PSAInfo: any[] = [];
  public genderList: any[] = [];
  public userRollList: any[] = [];
  public tabData: any[] = [];
  public progressBar:number=0
  public tabId: number
  formSubmitted: boolean = false;
  base64textString:any;
  base64Output:any
  baseImage:any="src/assets/images/human-icon.png"; 
  constructor(
    private formBuilder: FormBuilder,
    private message: NbToastrService,
    private userService: UserServiceService,
    private hostservice: HostServiceService,
    private router: Router,
    protected ref: NbDialogRef<AddUserComponent>,
  ) {
    this.ngPrepareFromControls()
    this.getInitialData()
    this.tabId = 1;
    this.PSAInfo = [
      {
        tabName: 'Personel Info',
        tapId: 1
      },
      {
        tabName: 'Account Info',
        tapId: 2
      },
      {
        tabName: 'Social Media Info',
        tapId: 3
      }
    ]
  }

  ngOnInit(): void {
  }
  
close():any{
  this.ref.close()

}
  ngPrepareFromControls() {
    if(this.tabData.length>0){
     this.tabData.findIndex((element:any)=>element.tabId===this.tabId)
    }
    this.loginFrom = this.formBuilder.group(
      {
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        dateofbirth: [null, Validators.required],
        age: [null, Validators.required],
        gender: [null, Validators.required],
        biodata: [null, Validators.required],
        country: [null, Validators.required],
        state: [null, Validators.required],
        district: [null, Validators.required],
        city: [null, Validators.required],
        streetname: [null, Validators.required],
        doorno: [null, Validators.required],
      }
    )
  }


  get formStatus() {
    return this.loginFrom.controls;
  }
  onSubmit() {
    // this.formSubmitted = true
    // if (this.loginFrom.invalid) {
    //   this.message.info('Info', 'Please Fill All Mandatory', {
    //     status: 'info'
    //   })
    //   return;
    // }
    // else {
    //   if(this.tabData.length>0){
    //     var index=this.tabData.findIndex((res:any)=>res.tabId===this.tabId)
    //     if(index>=0){
    //       this.message.info('Info', 'Data Already Available', {
    //         status: 'info'
    //       }) 
    //     }
    //     else{
    //       var tabData: any = {};
    //       tabData.tabId=this.tabId
    //       tabData.data= this.loginFrom.value
    //       this.tabData.push(tabData)
    //       if(this.tabData.length===3){
    //         this.message.success('Success', 'Data Added Successfully', {
    //           status: 'success'
    //         }) 
    //       }
    //     }
       
       
    //   }
    //   else{
    //     var tabData: any = {};
    //     tabData.tabId=this.tabId
    //     tabData.data= this.loginFrom.value
    //     this.tabData.push(tabData)
    //     this.progressBar=35
    //     this.ngPrepareFromControls()
    //     this.tabId=2
    //     console.log("personel data",this.tabData);
    //   }

    //   // this.tabData=
    //   // this.userService.login(this.loginFrom.value).subscribe((res:any)=>{


    //   //   if(res.statuscode===200){
    //   //     console.log(" this.router.navigate['/Admin'] ", this.router.navigate['/Admin'] );
    //   //    this.router.navigate['/Admin'] 
    //   //    this.hostservice.setAuth(res.token)
    //   //    this.message.success('Success',res.message,{
    //   //       status:'success'
    //   //     })

    //   //   }
    //   //   else{
    //   //     this.message.info('Info',res.message,{
    //   //       status:'info'
    //   //     })
    //   //   }
    //   // })
    // }


  }
  openTab(id: number) {
    this.tabId = id
  }
  getInitialData() {
    this.userService.get_UserRoll_Gender().subscribe((res: any) => {
      console.log("gender", res);
      res.forEach((element: any, index: number) => {
        if (element.statuscode === 200 && index === 0) {
          this.userRollList = element.data
          this.userRollList = this.userRollList.filter((element: any) => element.roll_Id === 2 || element.roll_Id === 3)
          console.log("userRollList", this.userRollList);
        }
        else if (element.statuscode === 200 && index === 1) {
          this.genderList = element.data
          console.log("genderList", this.userRollList);
        }
        else {
          this.message.info('Info', element.message, {
            status: 'info'
          })

        }
      });


    })
  }
  openWindow(){
    console.log("dvdsvwdsv");
    document.getElementById('fileSelector').click()
    document.querySelector("input").click();
  }
  selectFile(evt:any){
    console.log("selected ",evt);
    var files = evt.target.files;
    var file = files[0];
console.log("file",file);

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }






_handleReaderLoaded(readerEvt:any) {
   var binaryString = readerEvt.target.result;
          this.base64textString=`data:image/png;base64,${btoa(binaryString)}`;
          console.log("base 64",this.base64textString);
  }
  removeImage(){

 this.base64textString=""
  }

  onFileSelected(event:any) {
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output =`data:image/png;base64, ${ base64}`;
      console.log("this.base64Output", this.base64Output);
    });
   
    
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

}
