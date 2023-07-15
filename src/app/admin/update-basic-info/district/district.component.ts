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
import { Observable, forkJoin, observable } from 'rxjs';

@Component({
  selector: 'ngx-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {
  public router_Name: any = []
  public GenderList: any = []
  public StateList: any = [];
  public DistrictList: any = [];
  agPaginatorConfig: any;
  CountryList: any[] = []
  user_Id: any;
  stateForm: FormGroup;
  maxSize = "7";
  search: any
  AddEditUi: any[] = [
    {
      lable: 'District Name',
      inputType: 'text',
      InputDataType: 'text',
      formcontrolName: 'name',
      sortOrder: 3,
      colwidth: 'col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12',
      maxLenth: '50',
      isMandatory: true,
      options: null
    },
    {
      lable: 'District Description',
      inputType: 'text',
      InputDataType: 'text',
      formcontrolName: 'description',
      sortOrder: 4,
      colwidth: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth: '50',
      isMandatory: true,
      options: null
    },
    {
      lable: 'District Code',
      inputType: 'text',
      InputDataType: 'text',
      formcontrolName: 'code',
      sortOrder: 5,
      colwidth: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth: '10',
      isMandatory: true,
      options: null
    },
    {
      lable: 'Country',
      inputType: 'select',
      InputDataType: 'number',
      formcontrolName: 'countryID',
      sortOrder: 1,
      colwidth: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth: '3',
      isMandatory: true,
      options: this.CountryList
    },
    {
      lable: 'State',
      inputType: 'select',
      InputDataType: 'number',
      formcontrolName: 'stateId',
      sortOrder: 2,
      colwidth: 'col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12',
      maxLenth: '3',
      isMandatory: true,
      options: this.StateList
    },


  ];
  uiBtnLst: any[] = [
    {
      name: 'Save',
      style: 'mr-1',
      function: 'submit',
      size: 'small',
      status: 'success'
    },
    {
      name: 'Cancel',
      style: 'mr-1',
      function: 'close',
      size: 'small',
      status: 'primary'
    }
  ];
  uiAnswer: any[] = []
  constructor(
    private location: LocationsService,
    private message: NbToastrService,
    private window: NbWindowService,
    private dialog: NbDialogService,
    private router: Router,
    private hostservice: HostServiceService,
    private fb: FormBuilder,
  ) {
    this.ngOnInitAPIDatas();
    this.user_Id = this.hostservice.getUserId()
  }

  ngOnInit(): void {
    this.setPageHeader();


    this.agPaginatorConfig = {
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: 1
    }
    this.ngPreparForm();
  }
  ngPreparForm() {
    this.stateForm = this.fb.group({
      search: [null],
    })
  }
  ngOnInitAPIDatas() {
    const observable: Observable<any>[] = []
    observable.push(this.location.getState())
    observable.push(this.location.getCountry())
    observable.push(this.location.getDistrict())
    forkJoin(observable).subscribe((resArray: any) => {
      resArray.forEach((res: any, index: number) => {
        if (res.statuscode === 200 && index === 0) {
          this.StateList = res.data
          this.AddEditUi[4]['options'] = this.StateList
        }
        else if (res.statuscode === 200 && index === 1) {
          this.CountryList = res.data;
          this.AddEditUi[3]['options'] = this.CountryList
        }
        else if (res.statuscode === 200 && index === 2) {
          this.DistrictList = res.data;
         
        }
        else if (res.statuscode === 300) {
          this.message.show(res.message, 'Information',
            {
              status: 'info'
            })
        }
        else {
          this.message.show(res.message?.code, 'ERROR',
            {
              status: 'danger'
            })
        }
      })
    }, (error: any) => {
      this.message.show(error.message?.code, 'ERROR',
        {
          status: 'danger'
        })
    })

  }
  AddState() {
    this.AddEditUi.sort((a, b) => a.sortOrder - b.sortOrder);
    this.dialog.open(AddDataComponent, {
      context: {
        title: 'Add New Country',
        action: 'Add',
        uiLst: this.AddEditUi,
        uiBtnLst: this.uiBtnLst
      },
    }).onClose.subscribe((res: any) => {
      if (res != false) {
        res['createdBy'] = this.user_Id
        this.location.addDistrict(res).
          subscribe((res: any) => {
            if (res.statuscode === 200) {
              this.message.show(res.message, 'SUCCESS',
                {
                  status: 'success'
                })
              this.ngOnInitAPIDatas();
            }
            // code
            else if (res.statuscode === 300) {
              this.message.show(res.message, 'Info',
                {
                  status: 'info'
                })
            }
            else {
              this.message.show(res.message?.code, 'ERROR',
                {
                  status: 'danger'
                })
            }
          }, (error: any) => {
            this.message.show(error.message, 'ERROR',
              {
                status: 'danger'
              })
          })
      }
    })

  }
  editState(id: any) {
    this.AddEditUi.sort((a, b) => a.sortOrder - b.sortOrder);
    this.location.geDistrictById(id).subscribe((res: any) => {
      this.uiAnswer = []
      if (res.statuscode === 200) {
        this.uiAnswer = res.data;
      }
      else {
        this.message.show(res.message, 'Info',
          {
            status: 'info'
          })
      }
      this.dialog.open(EditDataComponent, {
        context: {
          title: 'Update Country',
          action: 'Edit',
          uiLst: this.AddEditUi,
          uiBtnLst: this.uiBtnLst,
          uiAnswer: this.uiAnswer
        },
      }).onClose.subscribe((res: any) => {
        console.log("edit res", res);

        if (res != false) {
          this.ngOnInitAPIDatas();
          this.location.updateDistrict(res).subscribe((res: any) => {
            if (res.statuscode === 200) {
              this.message.show(res.message, 'SUCCESS',
                {
                  status: 'success'
                })
              this.ngOnInitAPIDatas();
            }
            // code
            else if (res.statuscode === 300) {
              this.message.info(res.message, 'Info',
                {
                  status: 'info'
                })
            }
            else {
              this.message.show(res.message?.code, 'ERROR',
                {
                  status: 'danger'
                })
            }
          }, (error: any) => {
            this.message.show(error.message, 'ERROR',
              {
                status: 'danger'
              })
          })
        }
      })
    }, (error: any) => {
      this.message.show(error.message?.code, 'ERROR',
        {
          status: 'danger'
        })
    })

  }
  deleteState(Id: number, Name:any) {
    this.dialog.open(ConfirmationPopupComponent, {
      context: {
        title: 'Confirmation Popup',
        CPMessage: `Are You Sure You Want To Delete the ${Name}?`,
        id: Id,

      },
    }).onClose.subscribe((res: any) => {
      if (res.action === true) {
        this.location.deleteDistrict(res.id).subscribe((res: any) => {
          if (res.statuscode === 200) {
            this.message.show('Success', res.message, {
              status: 'success'
            })
          }
          else {
            this.message.show('Info', res.message, {
              status: 'info'
            })
          }
        })
      }
      this.ngOnInitAPIDatas()
    })
  }
  setPageHeader() {
    this.router_Name = this.router.url.split('/')
    this.router_Name = this.router_Name.splice(1, 3)
    console.log("menu", this.router_Name);

  }
  onKeyUpEvent(event: any) {
    this.search = this.stateForm.controls['search'].value;
  }
  AddNewMenu() {

  }
  onChange(data: any) {

  }
  currentPage(event: any) {
    this.agPaginatorConfig = {
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: event
    }

  }
}
