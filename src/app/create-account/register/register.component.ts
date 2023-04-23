import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HostServiceService } from '../../Service/host-service.service';
import { UserServiceService } from '../../Service/user-service.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public loginFrom: FormGroup;
  public PSAInfo: any[] = [];
  public genderList: any[] = [];
  public userRollList: any[] = [];
  public tabData: any[] = [];
  public progressBar:number=0
  public tabId: number
  formSubmitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private message: NbToastrService,
    private userService: UserServiceService,
    private hostservice: HostServiceService,
    private router: Router
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
    this.formSubmitted = true
    if (this.loginFrom.invalid) {
      this.message.info('Info', 'Please Fill All Mandatory', {
        status: 'info'
      })
      return;
    }
    else {
      if(this.tabData.length>0){
        var index=this.tabData.findIndex((res:any)=>res.tabId===this.tabId)
        if(index>=0){
          this.message.info('Info', 'Data Already Available', {
            status: 'info'
          }) 
        }
        else{
          var tabData: any = {};
          tabData.tabId=this.tabId
          tabData.data= this.loginFrom.value
          this.tabData.push(tabData)
          if(this.tabData.length===3){
            this.message.success('Success', 'Data Added Successfully', {
              status: 'success'
            }) 
          }
        }
       
       
      }
      else{
        var tabData: any = {};
        tabData.tabId=this.tabId
        tabData.data= this.loginFrom.value
        this.tabData.push(tabData)
        this.progressBar=35
        this.ngPrepareFromControls()
        this.tabId=2
        console.log("personel data",this.tabData);
      }

      // this.tabData=
      // this.userService.login(this.loginFrom.value).subscribe((res:any)=>{


      //   if(res.statuscode===200){
      //     console.log(" this.router.navigate['/Admin'] ", this.router.navigate['/Admin'] );
      //    this.router.navigate['/Admin'] 
      //    this.hostservice.setAuth(res.token)
      //    this.message.success('Success',res.message,{
      //       status:'success'
      //     })

      //   }
      //   else{
      //     this.message.info('Info',res.message,{
      //       status:'info'
      //     })
      //   }
      // })
    }


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
}
