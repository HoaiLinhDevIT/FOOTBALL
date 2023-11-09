import { environment } from '@env/environment';
import { ApiPathConfig } from '.';

export class ApiPath {
  //AUTH MODULE
  public static LOGIN = environment.API_AUTH.concat(ApiPathConfig.auth.login);
  public static OTHER_LOGIN = environment.API_AUTH.concat(ApiPathConfig.auth.otherLogin);
  public static USER_LOGIN = environment.API_AUTH.concat(ApiPathConfig.auth.detailUser);
  public static LOGOUT = environment.API_AUTH.concat(ApiPathConfig.auth.logOut);
  public static FORGOT_PASSWORD = environment.API_AUTH.concat(ApiPathConfig.auth.forgotPassword);
  public static EMAIL_US = environment.API_AUTH.concat(ApiPathConfig.auth.emailUs);
  public static CHANGE_PHONE = environment.API_AUTH.concat(ApiPathConfig.auth.changePhone);
  public static CHANGE_MAIL = environment.API_AUTH.concat(ApiPathConfig.auth.changeMail);
  public static SEND_LINK_VERTIFICATION = environment.API_AUTH.concat(ApiPathConfig.auth.sendLinkVertification);
  public static ACTIVATED_ACCOUNT = environment.API_AUTH.concat(ApiPathConfig.auth.activatedAccount);
  public static ACTIVATED_EXPORTER = environment.API_AUTH.concat(ApiPathConfig.auth.activatedExpoxter);

  public static CREATE_AND_UPDATE_USER = environment.API_SERVICE.concat(ApiPathConfig.user.user);
  //public static GET_CUSTOMER_INFO = environment.API_SERVICE.concat(ApiPathConfig.user.user);
  public static DELETE_USER = environment.API_SERVICE.concat(ApiPathConfig.user.user);
  public static GET_DATA_DIALOG_COMMON = environment.API_SERVICE.concat(ApiPathConfig.service.dialogSeach.dialogCommon);
  public static OTP_SMS = environment.API_AUTH.concat(ApiPathConfig.auth.sendOtp);
  public static OTP_VERIFICATION = environment.API_AUTH.concat(ApiPathConfig.auth.verifyOtp);
  public static EXIST_EMAIL_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.checkEmailCustomer);
  public static EXIST_EMAIL_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.checkEmailExporter);


  // REGISTER
  public static EXIST_USER = environment.API_AUTH.concat(ApiPathConfig.auth.checkExistUser);
  public static EXIST_PHONE = environment.API_AUTH.concat(ApiPathConfig.auth.checkExistPhone);
  public static REGISTER_USER = environment.API_AUTH.concat(ApiPathConfig.auth.registerUser);
  public static ACTIVATED_EMAIL = environment.API_AUTH.concat(ApiPathConfig.auth.activated);
  public static GET_USER_INFO = environment.API_AUTH.concat(ApiPathConfig.auth.registerUser);
  public static UPDATE_SETTING_NOTIFY = environment.API_AUTH.concat(ApiPathConfig.auth.registerUser);
  public static UPDATE_PROFILE_CUSTOMER = environment.API_AUTH.concat(ApiPathConfig.auth.profile);

  public static REGISTER_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.auth.registerExporter);

  // CUSTOMER
  public static GET_CUSTOMER_INFO = environment.API_SERVICE.concat(ApiPathConfig.customer.customer);
  public static UPDATE_CUSTOMER_INFO = environment.API_SERVICE.concat(ApiPathConfig.customer.customer);
  public static UPDATE_AVATAR_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.avatar);
  public static UPDATE_PASSWORD_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.password);
  public static UPDATE_ADDRESS_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.address);
  public static VERIFY_PHONE_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.phone);
  public static UPDATE_PHONE_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.phone);
  public static CHECK_PASSWORD_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.password);
  public static UPDATE_EMAIL_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.email);
  public static UPDATE_NAME_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.name);
  public static CHECK_EMAIL_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.email);
  public static VERIFY_OTP = environment.API_SERVICE.concat(ApiPathConfig.customer.verifyOtp);
  public static LIST_COUNTRY = environment.API_SERVICE.concat(ApiPathConfig.customer.country);
  public static LOCK_ACCOUNT_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.customer.lockAccount);
  public static CREATE_CUSTOMER = environment.API_AUTH.concat(ApiPathConfig.customer.create);


  // COMMON API
  public static ZIP_CODE = environment.API_SERVICE.concat(ApiPathConfig.common.zipcode);
  public static CHECK_PHONE = environment.API_SERVICE.concat(ApiPathConfig.common.checkPhone);
  public static COMMON_CHAT = environment.API_SERVICE.concat(ApiPathConfig.common.chat);

  // MASTER USER
  public static USER_MASTER = environment.API_SERVICE.concat(ApiPathConfig.user.user);
  public static USER_SEND_MAIL = environment.API_SERVICE.concat(ApiPathConfig.user.sendMail);
  public static USER_EXPORT_CSV = environment.API_SERVICE.concat(ApiPathConfig.user.exportCSV);
  public static CHANGE_PASSWORD = environment.API_SERVICE.concat(ApiPathConfig.user.changePassword);


  // SYSTEM USER
  public static USER_SYSTEM = environment.API_SERVICE.concat(ApiPathConfig.system.user);
  public static USER_SYSTEM_EXPORT_CSV = environment.API_SERVICE.concat(ApiPathConfig.system.userCsv);


  //API DIALOG API
  public static GET_PRODUCT_BY_SET = environment.API_SERVICE.concat(ApiPathConfig.service.dialogSeach.getProductBySet);
  public static GET_PRODUCT_CHILD = environment.API_SERVICE.concat(ApiPathConfig.service.dialogSeach.getProductChild);

  //Common
  public static COMMON_COUNTRY = environment.API_AUTH.concat(ApiPathConfig.auth.country);
  public static COMMON_UPLOAD_PDF = environment.API_SERVICE.concat(ApiPathConfig.service.pdfUpload);
  public static COMMON_BANKS = environment.API_SERVICE.concat(ApiPathConfig.common.banks);
  public static COMMON_ADDRESS = environment.API_SERVICE.concat(ApiPathConfig.common.getAddress);

  //BUYER
  public static LIST_BUYER = environment.API_SERVICE.concat(ApiPathConfig.auth.listBuyer);

  //SELLER
  public static LIST_SELLER = environment.API_SERVICE.concat(ApiPathConfig.auth.listSeller);
  public static CREATE_SELLER = environment.API_SERVICE.concat(ApiPathConfig.exporter.exporter);
  public static CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.category);
  public static CATEGORYSP = environment.API_SERVICE.concat(ApiPathConfig.operator.categorySp);
  public static CATEGORYSB = environment.API_SERVICE.concat(ApiPathConfig.operator.categorySb);
  public static ALLCATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.getAllCategory);
  public static DELETE_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.deleteCategory);
  public static ADD_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.addCategory);
  public static UPDATE_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.updateCategory);
  public static ACTIVE_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.operator.activeCategory);
  public static DELETE_PROMOTION = environment.API_SERVICE.concat(ApiPathConfig.exporter.deletePromotion);
  public static CREATE_PROMOTION = environment.API_SERVICE.concat(ApiPathConfig.exporter.createPromotion);
  public static UPDATE_PROMOTION = environment.API_SERVICE.concat(ApiPathConfig.exporter.updatePromotion);
  public static GET_PROMOTION = environment.API_SERVICE.concat(ApiPathConfig.exporter.getAllPromotion);
  public static DELETE_PRODUCT = environment.API_SERVICE.concat(ApiPathConfig.exporter.deleteProduct);
  public static CREATE_PRODUCT = environment.API_SERVICE.concat(ApiPathConfig.exporter.createProduct);
  public static UPDATE_PRODUCT = environment.API_SERVICE.concat(ApiPathConfig.exporter.updateProduct);
  public static GET_LIST_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.exporter.getListCategory);
  public static GET_LIST_CATEGORY_PITCH = environment.API_SERVICE.concat(ApiPathConfig.exporter.getListCategoryPitch);
  public static GET_LIST_TIME = environment.API_SERVICE.concat(ApiPathConfig.exporter.getListTime);
  public static GET_ALL_PITCH = environment.API_SERVICE.concat(ApiPathConfig.exporter.getAllPitch);
  public static GET_PRODUCT_BY_CATEGORY = environment.API_SERVICE.concat(ApiPathConfig.exporter.getProductByCategory);
  public static ADD_COMMENT = environment.API_SERVICE.concat(ApiPathConfig.exporter.addComment);
  public static GET_COMMENT = environment.API_SERVICE.concat(ApiPathConfig.exporter.getComment);
  public static ADD_CART = environment.API_SERVICE.concat(ApiPathConfig.exporter.addCart);
  public static GET_LIST_CART = environment.API_SERVICE.concat(ApiPathConfig.exporter.getListCart);
  public static DELETE_CART = environment.API_SERVICE.concat(ApiPathConfig.exporter.deleteCart);
  public static ADD_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.addOrder);
  public static ADD_HISTORY = environment.API_SERVICE.concat(ApiPathConfig.exporter.addHistory);
  public static SELLER_GET_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.sellerGetOrder);
  public static CONFIRM_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.confirmOrder);
  public static BUYER_GET_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.buyerGetOrder);
  public static DELETE_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.deleteOrder);
  public static ADD_PITCH = environment.API_SERVICE.concat(ApiPathConfig.exporter.addPitch);
  public static ADMIN_GET_ORDER = environment.API_SERVICE.concat(ApiPathConfig.exporter.adminGetOrder);

  //news
  public static ALLPOST = environment.API_SERVICE.concat(ApiPathConfig.operator.getPost);
  public static ALLNEWS = environment.API_SERVICE.concat(ApiPathConfig.operator.getAllNews);
  public static ADD_NEWS = environment.API_SERVICE.concat(ApiPathConfig.operator.createNew);
  public static UPDATE_NEWS = environment.API_SERVICE.concat(ApiPathConfig.operator.updateNews);
  public static DELETE_NEWS = environment.API_SERVICE.concat(ApiPathConfig.operator.deleteNews);
  public static ACTIVE_NEWS = environment.API_SERVICE.concat(ApiPathConfig.operator.activeNews);
  public static CHECK_LOGIN = environment.API_SERVICE.concat(ApiPathConfig.operator.checkLogin);

  //Operator
  public static CREATE_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.operator);
  public static GETBYID_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.getById);
  public static GETALL_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.getAll);
  public static EXIST_OPERATOR = environment.API_AUTH.concat(ApiPathConfig.operator.checkExistUser);
  public static DELETE_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.deleteByid);
  public static UPDATE_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.updateOperator);
  public static DELETE_LIST_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.daleteList);
  public static RESET_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.resetPass);

  // EXPORTER
  public static GET_EXPORTER_INFO = environment.API_SERVICE.concat(ApiPathConfig.exporter.exporter);
  public static UPDATE_EXPORTER_INFO = environment.API_SERVICE.concat(ApiPathConfig.exporter.exporter);
  public static UPDATE_AVATAR_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.avatar);
  public static UPDATE_PASSWORD_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.password);
  public static VERIFY_PHONE_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.phone);
  public static UPDATE_PHONE_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.phone);
  public static CHECK_PASSWORD_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.password);
  public static UPDATE_NAME_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.name);
  public static UPDATE_ADDRESS1_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.address1);
  public static UPDATE_ADDRESS2_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.address2);
  public static UPDATE_EMAIL_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.email);
  public static CHECK_EMAIL_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.email);
  public static CHECK_PHONE_COMPANY = environment.API_SERVICE.concat(ApiPathConfig.exporter.checkPhoneCompany);
  public static CHECK_PHONE_REPRESENTATIVE = environment.API_SERVICE.concat(ApiPathConfig.exporter.checkPhoneRepresentative);
  public static GET_PRODUCT = environment.API_SERVICE.concat(ApiPathConfig.exporter.getProduct);
  public static GET_PITCH = environment.API_SERVICE.concat(ApiPathConfig.exporter.getPitch);



  //ORDER
  public static GET_LIST_ORDER_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.order);
  public static CHECK_EMAIL = environment.API_SERVICE.concat(ApiPathConfig.order.checkEmail);


  public static VERIFY_OTP_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.verifyOtp);
  public static LIST_COUNTRY_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.country);
  public static LOCK_ACCOUNT_EXPORTER = environment.API_SERVICE.concat(ApiPathConfig.exporter.lockAccount);

  // order customer
  public static GET_ORDER_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.orderCustomer.getAll);
  public static DELETE_ORDER_CUSTOMER = environment.API_SERVICE.concat(ApiPathConfig.orderCustomer.deleteByid);

  public static GET_LIST_ORDER_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.operator.order);
  public static CREATE_ORDER_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.order.createOrder);
  public static DELETE_LIST_ORDER_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.order.deleteOrder);
  public static UPDATE_ORDER_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.order.updateOrderOperator);
  public static CONFIRM_BL_OPERATOR = environment.API_SERVICE.concat(ApiPathConfig.order.confirmBlOperator);
  public static GET_LIST_REMITTANCE = environment.API_SERVICE.concat(ApiPathConfig.operator.remittanceList);
  public static UPDATE_STATS_CONFIRM = environment.API_SERVICE.concat(ApiPathConfig.operator.updateStatusConfirm);
}
