/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataUserLoginModel } from '@auth/models';
import { RegisterService } from '@auth/services/register.service';
import { DialogConfirmService } from '@common/services/dialog-confirm.service';
import { Utils } from '@common/utils/utils';
import {  GROUP_COUNTRY_ORDER, MENU_DATA_ADMIN, MENU_SETTING_ADMIN } from '@core/config';
import { Country, ISideMenuNode } from '@layout/models/menu.model';
import { LoadingSpinnerDialogService } from '@layout/services';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FileModel, RegisterOrderOperator } from '../../../model';

@Component({
  selector: 'app-add-edit-order',
  templateUrl: './add-edit-order.component.html',
  styleUrls: ['./add-edit-order.component.scss']
})
export class AddEditOrderComponent implements OnInit {
  public groupCountry: Country[] = GROUP_COUNTRY_ORDER;
  public dataMenu: Array<ISideMenuNode> = MENU_DATA_ADMIN;
  public menuSetting: Array<ISideMenuNode> = MENU_SETTING_ADMIN;
  public utils = Utils;
  public isValidateBusinessLicense: boolean = false;
  public files: NgxFileDropEntry[] = [];
  public phoneNumberCode!: string;
  public businessLicense: string = "";
  public indentificationCardFill: string = "";
  public isNameBusinessLicense: boolean = true;
  public isNameIndentificationCardFill: boolean = true;
  public imageBusinessPDF!: any;
  public isValidateInput: boolean = true;
  public registerOrderForm !: FormGroup;
  public options: string[] = this.utils.LIST_MAKER;
  public filteredOptions !: Observable<string[]>;
  public myControl = new FormControl('');
  public selectedCountry !: string;
  public isSend: boolean = true;
  public items!: FormArray;
  public isDisableAddItem: boolean = true;
  public name = 'Angular';
  public formattedAmount: any;
  public amount!: string;
  public totalPrice: string = "0";
  public isShowDialogInput: boolean = false;
  public inputIcon: string = '../../../assets/icon-svg/icon-jpy-dropdown.svg';
  public inputName: string = 'JPY';
  public nameCustomer!: string;
  public nameExporter!: string;
  public listFileUpload : FileModel[] = [];
  public addFileUpload : FileModel[] = [];
  public validateFile: boolean = true;
  public sessionStorage: any = sessionStorage.getItem('user_login');
  public user = JSON.parse(this.sessionStorage);
  public userId = this.user.userId;
  public userName = this.user.userName;
  @ViewChild('inputBusinessLicense') public inputBusinessLicense!: ElementRef;
  public constructor(private registerService: RegisterService,
    private fb: FormBuilder,
    private dialogService: DialogConfirmService,
    private loadingDialog: LoadingSpinnerDialogService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initialForm();
    this.selectedCountry = 'JPY';
    this.filteredOptions = this.registerOrderForm.controls['maker'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.utils.addYear(1980);
  }



  public totalPricePayment() {

    const lengItem = this.registerOrderForm.controls['payment'].value;
    let totalPrice = 0;
    for(let item of lengItem){
      const replaceOne = item.priceItem.replace(',','');
      const replaceTwo = replaceOne.replace(',','');
      totalPrice+= parseInt(replaceTwo);
    }
    const config = { style: 'currency', currency: 'JPY', maximumFractionDigits: 8};
    this.totalPrice = new Intl.NumberFormat('vi-VN', config).format(totalPrice).replace('¥','').replace('.',',').replace('.',',');
  }

  public initialForm() {
    this.registerOrderForm = this.fb.group({
      emailCustomer: new FormControl(null, []),
      requestNo: new FormControl(null, []),
      maker: new FormControl(null, []),
      model: new FormControl(null, []),
      chassiNumber: new FormControl(null, []),
      year: new FormControl(null, []),
      month: new FormControl(null, []),
      typeCountry: new FormControl(null, []),
      totalPrice: new FormControl(null, []),
      emailExporter: new FormControl(null, []),
      statusRequest: new FormControl(null, []),
      invoiceImage: new FormControl(null, []),
      payment: new FormArray([
        this.payment(),
        this.payment()
      ])
    });
  }
  public formatCurrency(value : any,index: number) {
    console.log(value);
    if(value === ""){
      this.payments.at(index).get('priceItem')?.setValue("0");
      value = 0;
    }
    let a = value.toString().replace(',','');
      let b = a.replace(',','').trim();
      console.log(a, b);
    if (b && !isNaN(b)) {

      const config = { style: 'currency', currency: 'JPY', maximumFractionDigits: 8};
      const formated = new Intl.NumberFormat('vi-VN', config).format(b).replace('¥','').replace('.',',').replace('.',',');


      this.payments.at(index).patchValue({priceItem: formated});

      }
      this.totalPricePayment();

    }

  public addPayment() {
    this.items = this.registerOrderForm.get("payment") as FormArray;
    this.items.push(this.payment());
    if (this.items.length === 3) {
      this.isDisableAddItem = false;
    }
    this.totalPricePayment();
  }

  public get payments() {
    return this.registerOrderForm.get('payment') as FormArray;
  }

  public payment() {
    return new FormGroup({
      priceItem: new FormControl('0', [])
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    var totalFile = files.length + this.listFileUpload.length;
    this.files = files;
    if (files.length > 3 || totalFile>3) {
      this.dialogService.customMessage('error', 'common.message.error-upload-length-images');
      return;
    }
    for (const droppedFile of files) {
      console.log(droppedFile);
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const fileName = file.name;
          const idxDot = fileName.lastIndexOf(".") + 1;
          const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
          if(file.size>5120000){
            this.dialogService.customMessage('error', 'common.message.error-upload-data');
            return;
          }
          if (extFile === "png" || extFile === "jpg" || extFile === "jpeg" || extFile === "jpeg ") {
            if(this.listFileUpload.length < 3){
              this.imageBusinessPDF = file;
              this.businessLicense = file.name;
              this.isNameBusinessLicense = false;
              this.isValidateBusinessLicense = false;
              this.listFileUpload.push({"name" :file.name, "file": file});
              this.checkValidateFile();
            }else{
              this.dialogService.customMessage('error', 'common.message.error-upload-length-images');
              return;
            }
          } else {
            this.inputBusinessLicense.nativeElement.value = '';
            this.dialogService.customMessage('error', 'common.message.error-upload-images');
            return;
          }
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public validateFileType(event: any) {
    const target = event.target as HTMLInputElement;
    let fileName = '';
    if (target.files && target.files.length > 0) {
      fileName = target.files[0].name;
    }
    const idxDot = fileName.lastIndexOf(".") + 1;
    const extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if(event.target.files[0].size > 5200000){
            this.dialogService.customMessage('error', 'common.message.error-upload-data');
            return;
    }
    if (extFile === "png" || extFile === "jpg" || extFile === "jpeg" || extFile === "jpeg") {

      if(this.listFileUpload.length < 3){
        this.imageBusinessPDF = event.target.files[0];
        this.businessLicense = event.target.files[0].name;
        this.isNameBusinessLicense = false;
        this.isValidateBusinessLicense = false;
        this.listFileUpload.push({"name" :event.target.files[0].name, "file": event.target.files[0]});
        this.checkValidateFile();
      }else{
        this.dialogService.customMessage('error', 'common.message.error-upload-length-images');
      }


    } else {
      this.inputBusinessLicense.nativeElement.value = '';
      this.dialogService.customMessage('error', 'common.message.error-upload-pdf');
    }

  }

  public deleteFileBL(id: number) {
    this.listFileUpload.splice(id,1);
    this.checkValidateFile();
  }

  public blurEmail() {
    this.registerOrderForm.get('emailCustomer')?.setValidators([Validators.required, this.utils.checkMail]);
    this.registerOrderForm.get('emailCustomer')?.updateValueAndValidity();
    this.nameCustomer = "";
    if (this.registerOrderForm.controls['emailCustomer']?.invalid) return;
    if (this.registerOrderForm.controls['emailCustomer'].value !== null
      && this.registerOrderForm.controls['emailCustomer'].value !== ''
      && this.registerOrderForm.controls['emailCustomer'].valid) {

      this.registerService.checkIsEmail({ email: this.registerOrderForm.controls['emailCustomer'].value ,role: "3"})
        .subscribe({
          next: (res : any) => {
            if(res.data === null){
              this.registerOrderForm.get('emailCustomer')?.setValidators(this.utils.validEmailCustomer);
              this.registerOrderForm.get('emailCustomer')?.updateValueAndValidity();
              this.nameCustomer = "";
            }else{
              console.log(res.data);
              this.nameCustomer = res.data.userName;
              console.log(this.nameCustomer);
            }
          },
          error: (err) => {
            this.nameCustomer = "";
            this.registerOrderForm.get('emailCustomer')?.setValidators(this.utils.validEmailCustomer);
              this.registerOrderForm.get('emailCustomer')?.updateValueAndValidity();
          },
          complete: () => {

          }
        });

    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public replaceName(value: string): void {
    this.registerOrderForm.controls[value].setValue(this.registerOrderForm.get(value)?.value.replace(/[^0-9]+/g, ""));
  }

  public blurMaker() {
    this.registerOrderForm.get('maker')?.setValidators([Validators.required]);
    this.registerOrderForm.get('maker')?.updateValueAndValidity();
    const filterValue = this.registerOrderForm.controls['maker'].value.toLowerCase();
    var option =  this.options.filter(option => option.toLowerCase().includes(filterValue));
    if(option.length === 0){
      this.registerOrderForm.get('maker')?.setValidators([this.utils.validHalfSize,this.utils.validMaker]);
      this.registerOrderForm.get('maker')?.updateValueAndValidity();
    }
  }

  public blurModel() {
    this.registerOrderForm.get('model')?.setValidators([Validators.required,this.utils.validHalfWidth]);
    this.registerOrderForm.get('model')?.updateValueAndValidity();
  }

  public blurChassiNumber() {
    this.registerOrderForm.get('chassiNumber')?.setValidators([Validators.required,this.utils.validHalfWidth,this.utils.validateChassiNumber]);
    this.registerOrderForm.get('chassiNumber')?.updateValueAndValidity();
  }

  public blurEmailExporter() {
    this.registerOrderForm.get('emailExporter')?.setValidators([Validators.required,this.utils.validHalfSize, this.utils.checkMail]);
    this.registerOrderForm.get('emailExporter')?.updateValueAndValidity();
    this.nameExporter = "";
    if (this.registerOrderForm.controls['emailExporter']?.invalid) return;
    if (this.registerOrderForm.controls['emailExporter'].value !== null
      && this.registerOrderForm.controls['emailExporter'].value !== ''
      && this.registerOrderForm.controls['emailExporter'].valid) {

        this.registerService.checkIsEmail({ email: this.registerOrderForm.controls['emailExporter'].value,role: "4" })
        .subscribe({
          next: (res : any) => {
            if(res.data === null){
              this.registerOrderForm.get('emailExporter')?.setValidators(this.utils.validEmailExporter);
              this.registerOrderForm.get('emailExporter')?.updateValueAndValidity();
              this.nameExporter = "";
            }else{
              this.nameExporter = res.data.companyName;              ;
            }
          },
          error: (err) => {
            this.nameExporter = "";
            this.registerOrderForm.get('emailExporter')?.setValidators(this.utils.validEmailExporter);
              this.registerOrderForm.get('emailExporter')?.updateValueAndValidity();
          },
          complete: () => {

          }
        });

    }
  }


  public submit() {
    this.checkValidateFile();
    this.registerOrderForm.get('emailCustomer')?.setValidators([Validators.required, this.utils.checkMail]);
    this.registerOrderForm.get('emailCustomer')?.updateValueAndValidity();
    this.registerOrderForm.get('maker')?.setValidators(Validators.required);
    this.registerOrderForm.get('maker')?.updateValueAndValidity();
    this.registerOrderForm.get('model')?.setValidators(Validators.required);
    this.registerOrderForm.get('model')?.updateValueAndValidity();
    this.registerOrderForm.get('year')?.setValidators(Validators.required);
    this.registerOrderForm.get('year')?.updateValueAndValidity();
    this.registerOrderForm.get('month')?.setValidators(Validators.required);
    this.registerOrderForm.get('month')?.updateValueAndValidity();
    this.registerOrderForm.get('chassiNumber')?.setValidators([Validators.required,this.utils.validateChassiNumber]);
    this.registerOrderForm.get('chassiNumber')?.updateValueAndValidity();
    this.registerOrderForm.get('emailExporter')?.setValidators([Validators.required, this.utils.checkMail]);
    this.registerOrderForm.get('emailExporter')?.updateValueAndValidity();

    if (this.registerOrderForm.controls['emailCustomer'].invalid) {return;};
    if (this.registerOrderForm.controls['emailCustomer']?.value === null || this.registerOrderForm.controls['emailCustomer']?.value === '') return;
    if (this.registerOrderForm.controls['maker']?.value === null || this.registerOrderForm.controls['maker']?.value === '') return;
    if (this.registerOrderForm.controls['model']?.value === null || this.registerOrderForm.controls['model']?.value === '') return;
    if (this.registerOrderForm.controls['year']?.value === null || this.registerOrderForm.controls['year']?.value === '') return;
    if (this.registerOrderForm.controls['month']?.value === null || this.registerOrderForm.controls['month']?.value === '') return;
    if (this.registerOrderForm.controls['chassiNumber']?.value === null || this.registerOrderForm.controls['chassiNumber']?.value === '') return;
    if (this.registerOrderForm.controls['emailExporter'].invalid) {return;};
    if (this.registerOrderForm.controls['emailExporter']?.value === null || this.registerOrderForm.controls['emailExporter']?.value === '') return;
    console.log(this.registerOrderForm.value);
    if(!this.nameCustomer){return;}
    if(!this.nameExporter){return;}
    if(this.listFileUpload.length<=0){return;}
    this.registerOrderForm.controls['typeCountry'].setValue(this.inputName);
    this.registerOrderForm.controls['totalPrice'].setValue(this.totalPrice);
    this.isSend = false;
  }
  public back(){
    this.isSend = true;
  }
  public openDialogInput(): void {
    this.isShowDialogInput = !this.isShowDialogInput;
  }
  public onClickMenuInput(item: Country): void{
    this.inputIcon = item.iconUrl;
    this.inputName = item.money;

    this.isShowDialogInput = false;

  }

  public send(){

    const data: RegisterOrderOperator = {
      emailCustomer: this.registerOrderForm.controls['emailCustomer'].value,
      chassiNumber: this.registerOrderForm.controls['chassiNumber'].value,
      emailExporter: this.registerOrderForm.controls['emailExporter'].value,
      maker: this.registerOrderForm.controls['maker'].value,
      model: this.registerOrderForm.controls['model'].value,
      totalPrice: this.totalPrice,
      typeCountry: this.registerOrderForm.controls['typeCountry'].value,
      month: this.registerOrderForm.controls['month'].value,
      year: this.registerOrderForm.controls['year'].value,
      payment: this.registerOrderForm.controls['payment'].value,
      invoiceImage: this.listFileUpload.length.toString()
    };
    this.addFileUpload = this.listFileUpload ;
    if(this.listFileUpload.length===1){
      this.addFileUpload.push({"name" :"", "file": this.listFileUpload[0].file});
      this.addFileUpload.push({"name" :"", "file": this.listFileUpload[0].file});
    }
    if(this.listFileUpload.length===2){
      this.addFileUpload.push({"name" :"", "file": this.listFileUpload[0].file});
    }
    console.log(this.addFileUpload);
    this.registerService.operatorCreateOrder(data, this.addFileUpload[0].file,this.addFileUpload[1].file,this.addFileUpload[2].file)
      .subscribe({

        next: () => {
          this.dialogService.customMessage('success', 'common.message.order.create-success');
          this.loadingDialog.showSpinner(false);
          this.router.navigate(['/admin/order']);
        },
        error: (err) => {
          this.dialogService.customMessage('error', 'common.message.order.create-failed');
          this.loadingDialog.showSpinner(false);
        },
        complete: () => {

        }
      });
  }
  public checkValidateFile(){
    if(this.listFileUpload.length>0){
      this.validateFile = true;
    }else{
      this.validateFile = false;
    }
  }
  public replaceInputNumber(id: number){
    this.payments.at(id).get("priceItem")?.setValue(this.payments.at(id).get('priceItem')?.value.replace("[ぁ-んァ-ン]", ""));
  }
}
