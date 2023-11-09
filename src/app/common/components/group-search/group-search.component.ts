/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { BreadcrumbService } from '@common/services/breadcrumb.service';
import { Utils } from '@common/utils/utils';
import { LanguageService } from '@core/services';
import { ActionSearchModel, ButtonActionModel, ButtonConfig, IConfigSearch, SelectSearchModel } from '../../models';
import { DialogSeachApiComponent } from '../dialog-seach-api/dialog-search-api.component';
import { DialogSearchComponent } from '../dialog-seach/dialog-seach.component';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnChanges {
  // #region Decorator
  @Input() public searchConfig!: IConfigSearch;
  @Input() public btnConfig!: ButtonConfig;
  @Output() public btnSearchClicked: EventEmitter<ActionSearchModel> = new EventEmitter<ActionSearchModel>();
  @Output() public btnsHeaderClk: EventEmitter<ButtonActionModel> = new EventEmitter<any>();
  @Output() public btnBtnClearClk: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public selectChange: EventEmitter<SelectSearchModel> = new EventEmitter<SelectSearchModel>();
  // #endregion
  public panelOpenState = true;
  public searchGroup: FormGroup = new FormGroup({});

  public icon: string = 'keyboard_arrow_up';
  public parentName: string = '';
  public inline: boolean = false;
  public titleHeader: string = '';
  public utils = Utils;
  public constructor(
    private dialog: MatDialog,
    public breadcrumbService: BreadcrumbService,
    private elemenRef: ElementRef,
    public languageService: LanguageService
  ) {

    this.parentName = this.breadcrumbService.getParentNameForBreadcrumb();
    let userLogin = JSON.parse(sessionStorage.getItem('user_login') || '{}');
    let roleName = userLogin.roles[0].role === 'ADMIN' ? '管理者' : userLogin.roles[0].role === 'USER' ? '一般ユーザー' : userLogin.roles[0].role === 'EXPORTER' ? 'EXPORTER' :'システム';

    this.titleHeader = `${userLogin.userName} - ${roleName}`;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchConfig'].currentValue) {
      const group: any = {};
      let widthRow = 0;

      this.searchConfig.config.map((el) => {
        if (el.type.includes('input-from-to')) {
          group[`${el.id}From`] = el.defaultValue ? new FormControl(el.defaultValue, [this.utils.checkFromValue(`${el.id}To`)]) : new FormControl(null, [this.utils.checkFromValue(`${el.id}To`)]);
          group[`${el.id}To`] = el.defaultValue ? new FormControl(el.defaultValue, [this.utils.checkToValue(`${el.id}From`)]) : new FormControl(null, [this.utils.checkToValue(`${el.id}From`)]);
          widthRow += (el.width || 0);
        }else  if (el.type.includes('date-from-to')) {
          group[`${el.id}From`] = el.defaultValue ? new FormControl(el.defaultValue, [this.utils.checkFromDate(`${el.id}To`)]) : new FormControl(null, [this.utils.checkFromDate(`${el.id}To`)]);
          group[`${el.id}To`] = el.defaultValue ? new FormControl(el.defaultValue, [this.utils.checkToDate(`${el.id}From`)]) : new FormControl(null, [this.utils.checkToDate(`${el.id}From`)]);
          widthRow += (el.width || 0);
        }else  if (el.type.includes('select-from-to')) {
          group[`${el.id}From`] = el.defaultValue ? new FormControl(el.defaultValue, []) : new FormControl('', []);
          group[`${el.id}To`] = el.defaultValue ? new FormControl(el.defaultValue, []) : new FormControl('', []);
          widthRow += (el.width || 0);
        }else if(el.type === 'select'){
          group[el.id] = el.defaultValue ? new FormControl(el.defaultValue, []) : new FormControl('', []);
        }else  if (el.type.includes('input-text')) {
          group[`${el.id}`] = el.defaultValue ? new FormControl(el.defaultValue, [this.utils.validHalfSize]) : new FormControl(el.defaultValue, [this.utils.validHalfSize]);
          widthRow += (el.width || 0);
        }
         else {
          group[el.id] = el.defaultValue ? new FormControl(el.defaultValue, []) : new FormControl(null, []);
        }

        widthRow += (el.width || 0);
      });
      this.searchGroup = new FormGroup(group);
      const containerWidth = (this.elemenRef.nativeElement as HTMLDivElement).offsetWidth - 241;

      if (widthRow < containerWidth) this.inline = true;
    }
  }

  public onBtnSearchClk(): void {
    this.btnSearchClicked.emit({ action: 'search', form: this.searchGroup });
  }

  public onBtnClearClk(): void {
    this.searchGroup.reset();
    this.btnSearchClicked.emit({ action: 'reset', form: this.searchGroup });
  }

  public handleExpansion(): void {
    this.panelOpenState = !this.panelOpenState;

    if (this.panelOpenState) {
      this.icon = 'keyboard_arrow_up';
    } else {
      this.icon = 'search';
    }
  }

  public onBtnAddClick(): void {
    this.btnsHeaderClk.emit({ action: 'add' });
  }
  public onBtnExportClick(): void {
  }
  public handleGetDataDialog(data: any, id: string): void {
    if (!data.dataDialogSearch) return;

    if (data.isDialogApi){
      let dialog = this.dialog.open(DialogSeachApiComponent, {
        data: data?.dataDialogSearch,
        width: data?.dataDialogSearch.width,
        height: data?.dataDialogSearch.height
      });

      dialog.afterClosed().subscribe((x: Map<string, string>) => {
        this.searchGroup.get(id)?.setValue(x.get(data.dataDialogSearch.columReturn));
      });
    }else{

      let dialog = this.dialog.open(DialogSearchComponent, {
        data: data?.dataDialogSearch,
        width: data?.dataDialogSearch.width,
        height: data?.dataDialogSearch.height
      });

      dialog.afterClosed().subscribe((x: Map<string, string>) => {
        this.searchGroup.get(id)?.setValue(x.get(data.dataDialogSearch.columReturn));
      });
    }
  }

  public handelSelectChange(event:MatSelectChange,formcontrolName:string):void{
    let selectSeachData: SelectSearchModel= {
      fromControlName: formcontrolName,
      value: event.value
    };

    this.selectChange.emit(selectSeachData);
  }
}
