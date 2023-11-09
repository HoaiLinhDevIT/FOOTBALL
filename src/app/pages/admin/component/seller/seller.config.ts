import * as Model from '@common/models';
import { InputSearch } from '@common/models';
export const OPTIONS_SELLER: Array<Model.IOption> = [
  { id: 'delete', name: 'Xoá', icon: 'icon-delete-op' }
];



export const TABLE_SELLER_CONFIG: Model.ITableConfig = {
  columnDefinition: [
    new Model.GroupText('email', 'Email', 200, false, 'center', false),
    new Model.TextColumn('phoneCompany', 'Số điện thoại', 120, false, undefined, false),
    new Model.GroupAdd('address', 'Địa chỉ', 280, false, undefined, false),
    new Model.OptionButtonColumn(OPTIONS_SELLER, 10, false, true)
  ],
  title: 'screen.user-system.tbl-title',
  btnExport: false,
  btnAddMore: false,
  idFocusedRow: 'userId'
};


export const USER_SEARCH_CONFIG: Model.IConfigSearch = {
  title: 'common.menu.master.user',
  config: [
    new InputSearch('keyWord', 'common.search.free-word-search', 423, 'screen.user-system.search-placeholder')
  ]
};
