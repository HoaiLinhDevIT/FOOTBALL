import { TemplateRef } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { ComponentType } from "ngx-toastr";

export interface ISideMenuNode {
  id: string;
  category: string;
  icon?: string;
  name: string;
  route?: string;
  order: number;
  parentId?: string | null;
  level: number;
  children: ISideMenuNode[];
  role?:string;
}

export interface IListHelp {
  id: string;
  name: string;
  dialog?: ComponentType<unknown> | TemplateRef<unknown>;
  route?: string;
  disableClose?: boolean;
  confirm?: string;
  dialogConfirm?: ComponentType<unknown> | TemplateRef<unknown>;
}
export interface Country {
  id: number;
  iconUrl: string;
  iconSvg: string;
  money: string;
  name: string;
}
export interface SlideToggle {
  id: number;
  name: string;
  checked: boolean;
  active: string;
}
