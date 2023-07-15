import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';
import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';
import { LocationsService } from '../../../Service/locations.service';
import { AddDataComponent } from '../../../popup/popup-component/add-data/add-data.component';
import { HostServiceService } from '../../../Service/host-service.service';
import { EditDataComponent } from '../../../popup/popup-component/edit-data/edit-data.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public router_Name:any=[]
  public GenderList: any = []
  public CountryList: any = [];
  agPaginatorConfig:any;
  user_Id:any;
  countryForm:FormGroup;
  maxSize = "7";
  search:any
  AddEditUi:any[]=[
    {
      lable:'Country Name',
      inputType:'text',
      InputDataType:'text',
      formcontrolName:'name',
      sortOrder:1,
      colwidth:'col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12',
      maxLenth:'50',
      isMandatory:true,
      options:null
    },
    {
      lable:'Country Description',
      inputType:'text',
      InputDataType:'text',
      formcontrolName:'description',
      sortOrder:2,
      colwidth:'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth:'50',
      isMandatory:true,
      options:null
    },
    {
      lable:'Country Code',
      inputType:'text',
      InputDataType:'text',
      formcontrolName:'code',
      sortOrder:3,
      colwidth:'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth:'10',
      isMandatory:true,
      options:null
    }
  ];
  uiBtnLst:any[]=[
    {
      name:'Save',
      style:'mr-1',
      function:'submit',
      size:'small',
      status:'success'
    },
    {
      name:'Cancel',
      style:'mr-1',
      function:'close',
      size:'small',
      status:'primary'
    }
  ];
  uiAnswer:any[]=[]
  constructor(
    private location: LocationsService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,
    private hostservice:HostServiceService,
    private fb: FormBuilder,
  ) {
    this.ngOnInitAPIDatas();
    this.user_Id=this.hostservice.getUserId()
  }

  ngOnInit(): void {
    this.setPageHeader();

  
   this.agPaginatorConfig={
    id: 'ANGULAR_PAGINATOR_DEFAULT',
    itemsPerPage: this.maxSize,
    currentPage: 1
  }
  this.ngPreparForm();
  }
  ngPreparForm(){
    this.countryForm = this.fb.group({
      search:[null],
    })
  }
  ngOnInitAPIDatas() {
    this.location.getCountry().subscribe((res: any) => {
      console.log("userRoll", res);
      if (res.statuscode == 200) {
        this.CountryList = res.data
        console.log("CountryList", this.CountryList);

      }
      else {
        this.message.info( res.message,'Information',
         {
          status: 'info'
        })
      }
    })
  }
  AddCountry(){
  this.dialog.open(AddDataComponent,{
    context: {
      title: 'Add New Country',
      action:'Add',
      uiLst:this.AddEditUi,
      uiBtnLst:this.uiBtnLst
    },
  }).onClose.subscribe((res:any)=>{
    if(res!=false){
      res['createdBy']=this.user_Id
    this.location.addCountry(res).
    subscribe((res:any)=>{
      if(res.statuscode===200){
        this.message.show( res.message,'SUCCESS',
        {
         status: 'success'
       })
       this.ngOnInitAPIDatas();
      }
      // code
      else if(res.statuscode===300){
        this.message.show( res.message,'Info',
        {
         status: 'info'
       })
      }
      else{
        this.message.show( res.message?.code,'ERROR',
        {
         status: 'danger'
       })
      }
    },(error:any)=>{
      this.message.show( error.message,'ERROR',
      {
       status: 'danger'
     })
    })
    }
  })
  }
  editExistsRoll(id:any){
    this.location.getCountryById(id).subscribe((res:any)=>{
      this.uiAnswer=[]
      if(res.statuscode===200){
        this.uiAnswer=res.data;
      }
      else{
        this.message.show( res.message,'Info',
        {
         status: 'info'
       })
      }
      this.dialog.open(EditDataComponent,{
        context: {
          title: 'Update Country',
          action:'Edit',
          uiLst:this.AddEditUi,
          uiBtnLst:this.uiBtnLst,
          uiAnswer:this.uiAnswer
        },
    }).onClose.subscribe((res:any)=>{
      console.log("edit res",res);
      
      if(res!=false){
        this.ngOnInitAPIDatas();
        this.location.updateCountry(res).subscribe((res:any)=>{
          if(res.statuscode===200){
            this.message.show( res.message,'SUCCESS',
            {
             status: 'success'
           })
           this.ngOnInitAPIDatas();
          }
          // code
          else if(res.statuscode===300){
            this.message.info( res.message,'Info',
            {
             status: 'info'
           })
          }
          else{
            this.message.show( res.message?.code,'ERROR',
            {
             status: 'danger'
           })
          }
        },(error:any)=>{
          this.message.show( error.message,'ERROR',
          {
           status: 'danger'
         })
        })
      }
    })
    },(error:any)=>{
      this.message.show( error.message?.code,'ERROR',
      {
       status: 'danger'
     })
    })

  }
  deleteRoll(roll_Id:number,roll_Name){
    this.dialog.open(ConfirmationPopupComponent,{
      context: {
        title: 'Confirmation Popup',
        CPMessage:`Are You Sure You Want To Delete the ${roll_Name}?`,
        id:roll_Id,
       
      },
  }).onClose.subscribe((res:any)=>{
    if(res.action===true){
      this.location.deleteCountry(res.id).subscribe((res:any)=>{
        if(res.statuscode===200){
          this.message.show('Success',res.message,{
            status:'success'
          })
        }
        else{
          this.message.show('Info',res.message,{
            status:'info'
          })
        }
      })
    }
    this.ngOnInitAPIDatas()
  })
  }
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,3)  
    console.log("menu",this.router_Name);
    
  }
  onKeyUpEvent(event:any){
    this.search=this.countryForm.controls['search'].value;
  }
  AddNewMenu(){

  }
  onChange(data:any){

  }
  currentPage(event:any){
    this.agPaginatorConfig={
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: event
    }

}
}

