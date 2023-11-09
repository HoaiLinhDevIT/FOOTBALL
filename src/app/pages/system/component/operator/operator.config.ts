import * as Model from '@common/models';
import { InputSearch, IRadioOption, RolesModel } from '@common/models';

export const OPTIONS_OPERATOR: Array<Model.IOption> = [
  { id: 'edit', name: 'Chỉnh sửa', icon:'icon-edit'},
  { id: 'delete', name: 'Xoá', icon: 'icon-delete-op' }
];

export const valueRadioRoleColum: Array<IRadioOption> = [
  {
    value: '管理者',
    key: RolesModel.ADMIN
  },
  {
    value: '一般ユーザー',
    key: RolesModel.USER
  },
  {
    value: 'EXPORTER',
    key: RolesModel.EXPORTER
  }
];

export const valueRadioGenderColum: Array<IRadioOption> = [
  {
    value: '男性',
    key: '1'
  },
  {
    value: '女性',
    key: '2'
  },
  {
    value: 'その他',
    key: '3'
  }
];

export const TABLE_OPERATOR_CONFIG: Model.ITableConfig = {
  columnDefinition: [

    new Model.GroupText('email','Mail',200,false,'center',false),
    new Model.TextColumn('description','Mô tả',300,false,'center',false),
    new Model.OptionButtonColumn(OPTIONS_OPERATOR, 64, false, true)

  ],
  title: 'screen.user-system.tbl-title',
  btnExport: true,
  btnAddMore: false,
  idFocusedRow: 'userId'
};


export const OPERATOR_SEARCH_CONFIG: Model.IConfigSearch = {
  title: 'common.menu.master.user',
  config: [
    new InputSearch('keyWord', 'common.search.free-word-search', 423, 'screen.user-system.search-placeholder')
  ]
};
