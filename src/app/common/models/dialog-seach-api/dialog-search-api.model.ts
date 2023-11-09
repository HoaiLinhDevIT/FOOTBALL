export interface IListHeaderApi {
  titleHeader: string,
  width: number,
  align?: 'right' | 'left' | 'center',
  format?: 'string' | 'YYYYMMDD' | 'YYYYMMDDHHMM' | 'YYYYMMDDHHMMSS',
  sticky?: boolean,
  isHiden?: boolean,
  nameColum:string;
}

export class ListHeaderApi implements IListHeaderApi {
  public titleHeader: string = '';
  public nameColum:string = '';
  public width: number = 100;
  public align?: 'right' | 'left' | 'center' = 'left';
  public sticky?: boolean = false;
  public isHiden?: boolean = false;
}

export interface IDialogOptionApi {
  title: string;
  listHeader: Array<ListHeaderApi>;
  width: number;
  height: number;
  url: string;
}

export class DialogOptionApi implements IDialogOptionApi {
  public title:string = '';
  public url: string = '';
  public width: number = 300;
  public height: number = 550;
  public listHeader: Array<ListHeaderApi> = [];
}
