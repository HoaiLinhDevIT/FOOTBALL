/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ButtonActionModel, IDisplayColumn, IRadioOption, ITableConfig } from '@common/models';
import { DataSearchModel } from '@core/models';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnChanges, AfterContentChecked, AfterViewChecked {
  // #region Decorator
  @Input() public isShowOption!: boolean;
  @Input() public tableConfig!: ITableConfig;
  @Input() public dataSource!: DataSearchModel;
  @Output() public tableClick: EventEmitter<ButtonActionModel> = new EventEmitter<ButtonActionModel>();
  @Output() public handleSort: EventEmitter<any> = new EventEmitter<any>();
  @Output() public handleBtnAction: EventEmitter<ButtonActionModel> = new EventEmitter<ButtonActionModel>();

  @ViewChild('matTable', { static: false }) public matTable!: MatTable<any>;
  @ViewChild('btnAddMoreTable') public btnAddMoreTable: ElementRef | undefined;
  @ViewChild('container') public container!: ElementRef;
  // #endregion
  @Input() public isDisableButton!: boolean;

  public utils = Utils;
  public columnDefinition: Array<IDisplayColumn> = [];
  public displayColumns: Array<string> = [];

  public noScroll: boolean = false;
  public fixSecondColumnLeftPos = false;
  public data = new MatTableDataSource();
  public toolTipText: boolean = false;
  public selectedRow: any;
  public selectionModel: SelectionModel<any> = new SelectionModel<any>(true, []);

  public constructor(
    private cdr: ChangeDetectorRef
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && changes['dataSource'].currentValue) {
      const data: unknown[] = changes['dataSource'].currentValue.results;

      this.data = new MatTableDataSource(data);
    }

    if (changes['tableConfig'] && changes['tableConfig'].currentValue) {
      this.columnDefinition = this.tableConfig.columnDefinition;
      this.initData();
    }
  }

  public  ngAfterContentChecked(): void {
    if (this.matTable) {
      this.matTable.updateStickyColumnStyles();
    }
  }

  public ngAfterViewChecked(): void {
    if (this.matTable) {
      this.matTable.updateStickyColumnStyles();
    }

    this.cdr.detectChanges();
  }

  public isNumber(format: any): boolean {
    return typeof format === 'number';
  }

  public isDateTime(format: any): boolean {
    return typeof format === 'string';
  }

  public onBtnClick(action: string, event: object): void {
    switch (action) {
      case 'delete':
        this.handleBtnAction.emit({ action: 'deleted', rowItem: event });
        break;

        case 'edit':
      this.handleBtnAction.emit({ action: 'edit', rowItem: event });
        break;

        case 'resetPass':
      this.handleBtnAction.emit({ action: 'resetPass', rowItem: event });
        break;

      default:
        break;
    }
  }

  public onBtnExportClick(target: HTMLElement): void {
    this.handleBtnAction.emit({ action: 'export' });
    target.closest('button')?.blur();
  }

  public onBtnAddMoreClick(): void {
    this.handleBtnAction.emit({ action: 'add' });
  }

  public onClickable(event: any): void {
  }

  public announceSortChange(event: any): void {
  }

  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selectionModel.clear();

      return;
    }

    this.selectionModel.select(...this.dataSource.results);

    return;
  }

  public isAllSelected(): boolean {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.results.length;

    return numSelected === numRows;
  }

  public isSelectedItem(row: object): boolean {
    if (this.selectionModel.isSelected(row)) {
      return true;
    }

    return false;
  }

  public pipeNumber(format: number | string): number {
    return typeof format === 'number' ? format : 0;
  }

  public pipeDateTime(format: number | string): string {
    return typeof format === 'string' ? format : '0';
  }

  public onMouseOver(event: any, data: string): void {
    if (event.target.className.split(' ').includes('cell-overflow')) {
      const selectElement = event.target;

      if (selectElement.offsetWidth === selectElement.scrollWidth || Array.isArray(data)) {
        this.toolTipText = true;
      } else {
        this.toolTipText = false;
      }
    }
  }

  public isLastChildNotSticky(index: number): string {
    const lastColumn = this.columnDefinition[index + 1];

    if (lastColumn && lastColumn.stickyEnd) {
      return `${this.columnDefinition[index] ? this.columnDefinition[index].weight : 0} px`;
    }

    return 'auto';
  }

  private initData(): void {
    this.noScroll = this.tableConfig.noScroll || false;
    this.displayColumns = this.columnDefinition
      .map((value) => value.id);
  }

  public dataRadioColum(element: Array<IRadioOption>, data: string): string {
    return element.length > 0 && data ? (element.filter((x) => x.key === data))[0]?.value : '';
  }

  public dataZeroFill(data: string, numberZero: number): string {
    return data.toString().padStart(numberZero, '0');
  }

  public handelchangeHidenOption(isHiden: boolean): void {
    this.isShowOption = isHiden;
  }



  public checkFocus(row: any): boolean {
    let idFocusedR = this.tableConfig.idFocusedRow;

    if(idFocusedR && this.selectedRow){
      return this.selectedRow[idFocusedR] === row[idFocusedR];
    }else
    return this.utils.JsonToString(this.selectedRow) === this.utils.JsonToString(row);
  }


  @HostListener('click', ['$event'])
  public clickout(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.parentElement?.parentElement?.parentElement?.parentElement?.id === 'previous' || target.id === 'previous'
      || target.parentElement?.parentElement?.id === 'previous' || target.parentElement?.id === 'previous' || target.parentElement?.parentElement?.parentElement?.id === 'previous') {
      this.handleBtnAction.emit({ action: 'previous' });
      target.closest('button')?.blur();
    } else
      if (target.parentElement?.parentElement?.parentElement?.parentElement?.id === 'next' || target.id === 'next'
        || target.parentElement?.parentElement?.id === 'next' || target.parentElement?.id === 'next'
        || target.parentElement?.parentElement?.parentElement?.id === 'next') {
        this.handleBtnAction.emit({ action: 'next' });
        target.closest('button')?.blur();
      }
  }
}

