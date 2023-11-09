import { ChangeMailComponent } from '@auth/components/change-mail/change-mail.component';
import { ForgotPaswordComponent } from '@auth/components/forgot-pasword/forgot-pasword.component';
import { DialogEmailUsComponent } from 'src/app/pages/trouble-logging/dialog-help/dialog-email-us/dialog-email-us.component';
import { EmailVertificationComponent } from 'src/app/pages/trouble-logging/dialog-help/email-vertification/email-vertification.component';
import { Country, IListHelp, ISideMenuNode, SlideToggle } from '../../layout/models/menu.model';

//---------------- list menu header -----------//
export const MENU_SELECTED_OPERATOR = [

];

export const MENU_LIST_ORDER_TAB = [
  'Tất cả',
  'Chờ xác nhận',
  'Đang giao',
  'Hoàn thành'
];

export const MENU_DATA_SYSTEM: Array<ISideMenuNode> = [
  {
    id: '1',
    icon: '',
    category: 'Quản trị viên',
    name: '/system/operator',
    route: '/system/operator',
    order: 1,
    level: 1,
    children: []
  }
];

export const MENU_DATA_ADMIN: Array<ISideMenuNode> = [

  {
    id: '1',
    icon: '',
    category: 'Người mua',
    name: '/admin/buyer',
    route: '/admin/buyer',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: '',
    category: 'Người bán',
    name: '/admin/seller',
    route: '/admin/seller',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '3',
    icon: '',
    category: 'Quản lý hóa đơn',
    name: '/admin/order',
    route: '/admin/order',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '4',
    icon: '',
    category: 'Danh mục',
    name: '/admin/remittance',
    route: '/admin/remittance',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '5',
    icon: '',
    category: 'Tin tức',
    name: '/admin/news',
    route: '/admin/news',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '6',
    icon: '',
    category: 'Bình luận',
    name: '/admin/comment',
    route: '/admin/comment',
    order: 1,
    level: 1,
    children: []
  }
];

export const MENU_DATA_CUSTOMER: Array<ISideMenuNode> = [

  {
    id: '1',
    icon: 'order-icon',
    category: 'Order',
    name: '/customer/order',
    route: '/customer/order',
    order: 1,
    level: 1,
    children: []
  }
];

export const MENU_DATA_EXPORTER: Array<ISideMenuNode> = [

  {
    id: '1',
    icon: 'order-icon',
    category: 'Đơn hàng',
    name: '/exporter/order',
    route: '/exporter/order',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: 'order-icon',
    category: 'Sản phẩm',
    name: '/exporter/product',
    route: '/exporter/product',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '3',
    icon: 'dashboard-icon',
    category: 'Sân bóng',
    name: '/exporter/pitch',
    route: '/exporter/pitch',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '4',
    icon: 'dashboard-icon',
    category: 'Bài đăng',
    name: '/exporter/post',
    route: '/exporter/post',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '5',
    icon: 'dashboard-icon',
    category: 'Khuyến mãi',
    name: '/exporter/promotion',
    route: '/exporter/promotion',
    order: 1,
    level: 1,
    children: []
  }
];

//---------------- list menu setting in profile icon -----------//

export const MENU_SETTING_CUSTOMER: Array<ISideMenuNode> = [
  {
    id: '1',
    icon: 'icon-user-profile',
    category: 'Hồ sơ',
    name: '/customer/profile',
    route: '/customer/profile',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: 'icon-change-pass',
    category: 'Đổi mật khẩu',
    name: 'changePassowrd',
    route: '',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '3',
    icon: 'icon-logout',
    category: 'Đăng xuất',
    name: 'logOut',
    route: '',
    order: 1,
    level: 1,
    children: []
  }
];
export const MENU_SETTING_EXPORTER: Array<ISideMenuNode> = [
  {
    id: '1',
    icon: 'icon-user-profile',
    category: 'Thông tin cá nhân',
    name: '/exporter/profile',
    route: '/exporter/profile',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: 'icon-user-profile',
    category: 'Lịch sử mua hàng',
    name: '/exporter/history',
    route: '/exporter/history',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '3',
    icon: 'icon-change-pass',
    category: 'Đổi mật khẩu',
    name: 'changePassowrd',
    route: '',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '4',
    icon: 'icon-logout',
    category: 'Đăng xuất',
    name: 'logOut',
    route: '',
    order: 1,
    level: 1,
    children: []
  }
];
export const MENU_SETTING_SYSTEM: Array<ISideMenuNode> = [
  {
    id: '1',
    icon: 'icon-change-pass',
    category: 'Đổi mật khẩu',
    name: 'changePassowrd',
    route: '',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: 'icon-logout',
    category: 'Đăng xuất',
    name: 'logOut',
    route: '',
    order: 1,
    level: 1,
    children: []
  }
];

export const MENU_SETTING_ADMIN: Array<ISideMenuNode> = [
  {
    id: '1',
    icon: 'icon-change-pass',
    category: 'Đổi mật khẩu',
    name: 'changePassowrd',
    route: '',
    order: 1,
    level: 1,
    children: []
  },
  {
    id: '2',
    icon: 'icon-logout',
    category: 'Đăng xuất',
    name: 'logOut',
    route: '',
    order: 1,
    level: 1,
    children: []
  }
];
//----------------list menu in trobble loggin -----------------//
export const MENU_LIST_HELP: Array<IListHelp> = [
  {
    id: '1',
    name: 'screen.trouble-loggin.title.S00001',
    confirm: 'forgot-pwd',
    dialogConfirm: ForgotPaswordComponent
  },
  {
    id: '2',
    name: 'screen.trouble-loggin.title.S00002',
    dialogConfirm: EmailVertificationComponent,
    confirm: '2-step'
  }
  ,
  {
    id: '3',
    name: 'screen.trouble-loggin.title.S00003',
    dialog: EmailVertificationComponent
  },
  {
    id: '4',
    name: 'screen.trouble-loggin.title.S00004',
    dialog: ChangeMailComponent
  }
  ,
  {
    id: '5',
    name: 'screen.trouble-loggin.title.S00005',
    dialog: DialogEmailUsComponent,
    disableClose: true
  },
  {
    id: '6',
    name: 'screen.trouble-loggin.title.S00006',
    dialog: DialogEmailUsComponent,
    disableClose: true
  }
];

//------------------other-------------------//
export const GROUP_COUNTRY: Country[] = [
  { id: 1, iconUrl: '../../../assets/icon-svg/icon-jpy-dropdown.svg', iconSvg: 'icon-jpy', money: 'JPY', name: 'Japanese Yen' },
  { id: 2, iconUrl: '../../../assets/icon-svg/icon-usd.svg', iconSvg: 'icon-usd', money: 'USD', name: 'United States Dollar' },
  { id: 3, iconUrl: '../../../assets/icon-svg/icon-kes.svg', iconSvg: 'icon-kes', money: 'KES', name: 'Kenyan Shillings' },
  { id: 4, iconUrl: '../../../assets/icon-svg/icon-vnd.svg', iconSvg: 'icon-vnd', money: 'VND', name: 'Vietnam Dong' }
];
export const GROUP_COUNTRY_ORDER: Country[] = [
  { id: 1, iconUrl: '../../../assets/icon-svg/icon-jpy-dropdown.svg', iconSvg: 'icon-jpy', money: 'JPY', name: 'Japanese Yen' },
  { id: 2, iconUrl: '../../../assets/icon-svg/icon-usd.svg', iconSvg: 'icon-usd', money: 'USD', name: 'United States Dollar' }
];

export const SLIDE_TOGGLE: SlideToggle[] = [
  { id: 0, name: 'Buyer and seller agree on terms', checked: true, active: 'is-outstanding' },
  { id: 1, name: 'Buyer pays Escrow.com', checked: false, active: '' },
  { id: 2, name: 'Seller ships the vehicle', checked: false, active: '' },
  { id: 3, name: 'Buyer inspects & approves vehicle', checked: false, active: '' },
  { id: 4, name: 'Escrow.compays the seller', checked: false, active: '' }
];
