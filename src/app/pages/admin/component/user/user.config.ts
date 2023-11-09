import * as Model from '@common/models';
import { InputSearch, IRadioOption, RolesModel } from '@common/models';

export const OPTIONS_USER: Array<Model.IOption> = [
  { id: 'delete', name: 'common.tooltip.delete', icon: 'icon-delete-red' }
];

export const valueRadioRoleColum: Array<IRadioOption> = [
  {
    value: '管理者',
    key: RolesModel.ADMIN
  },
  {
    value: '一般ユーザー',
    key: RolesModel.USER
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

export const TABLE_USER_CONFIG: Model.ITableConfig = {
  columnDefinition: [
    new Model.IndexColumn('index', 'screen.user-system.no', 32, false, false, true),
    new Model.TextZeroFillColumn('userId', 'screen.user-system.id', 80, false, 'center', true, false, false,undefined,false, false, 6),
    new Model.TextColumn('userName', 'screen.user-system.user-name', 140,false, 'center', true,false, false, undefined, false,undefined, false),
    new Model.TextValueRadiOColumn('role', 'screen.user-system.role', 96, false, undefined, false, true, false, undefined, false, valueRadioRoleColum, false),
    new Model.TextColumn('mail', 'screen.user-system.mail', 280, false, 'center', false),
    new Model.TextColumn('birthDay', 'screen.user.birthDay', 96,false,undefined,false,true,false,'',false,undefined,false),
    new Model.TextValueRadiOColumn('gender', 'screen.user-system.gender', 96, false, undefined, false, true, false, undefined, false, valueRadioGenderColum, false),
    new Model.TextColumn('phone', 'screen.user-system.phone-number', 120, false, undefined, false),
    new Model.TextColumn('address', 'screen.user-system.address', 150, false, undefined, false),
    new Model.OptionButtonColumn(OPTIONS_USER, 64, false, true)
  ],
  title: 'screen.user-system.tbl-title',
  btnExport: true,
  btnAddMore: false,
  idFocusedRow: 'userId'
};


export const USER_SEARCH_CONFIG: Model.IConfigSearch = {
  title: 'common.menu.master.user',
  config: [
    new InputSearch('keyWord', 'common.search.free-word-search', 423, 'screen.user-system.search-placeholder')
  ]
};
