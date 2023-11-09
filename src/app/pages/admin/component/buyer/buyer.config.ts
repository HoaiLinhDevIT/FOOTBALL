import * as Model from '@common/models';
import { InputSearch, IRadioOption, RolesModel } from '@common/models';

export const OPTIONS_BUYER: Array<Model.IOption> = [
  { id: 'delete', name: 'Xoá', icon: 'icon-delete-op' }
];

export const TABLE_BUYER_CONFIG: Model.ITableConfig = {
  columnDefinition: [

    // new Model.CheckboxColumn(50, true, false, true),
    // new Model.OptionAvtColumn(AVT_OPERATOR, 51, false, true),
    new Model.GroupText('email', 'Email', 200, false, 'center', false),
    new Model.TextColumn('phone', 'Số điện thoại', 120, false, undefined, false),
    new Model.TextColumn('address', 'Địa chỉ', 280, false, undefined, false),
    new Model.OptionButtonColumn(OPTIONS_BUYER, 64, false, true)

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
