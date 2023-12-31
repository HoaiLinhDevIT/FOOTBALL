import { FormGroup } from '@angular/forms';
import { IColumnData } from './column-data.model';
import { IDisplayColumn } from './display-column.model';

export interface IFilterBy {
  filterKey: string;
  condition: string | boolean;
}

export interface ITableConfig {
  columnDefinition: Array<IDisplayColumn>;
  pagination?: IColumnData;
  title: string;
  btnExport: boolean;
  btnAddMore: boolean;
  stickyHeader?: boolean;
  filterBy?: Array<IFilterBy>;
  expandable?: boolean;
  isDialog?: boolean;
  noScroll?: boolean;
  idFocusedRow?: string;
}

export class TableConfig implements ITableConfig {
  public constructor(
    public columnDefinition: Array<IDisplayColumn>,
    public pagination: IColumnData,
    public title: string,
    public btnExport: boolean = false,
    public btnAddMore: boolean = false,
    public stickyHeader?: boolean,
    public filterBy?: Array<IFilterBy>,
    public expandable?: boolean,
    public isDialog?: boolean,
    public noScroll?: boolean,
    public idFocusedRow?: string
  ) { }
}


export class ButtonActionModel {
  public action: 'add' | 'deleted' | 'edit' | 'resetPass' | 'previous' | 'next' | 'eye' | 'export' | 'clicked-outside' | 'submit' | 'reload' | 'showMore' | 'addMoreTable' = 'edit';
  public rowItem?: object;
  public data?: object[];
}

export interface ActionSearchModel {
  action: 'search' | 'reset',
  form: FormGroup
}
