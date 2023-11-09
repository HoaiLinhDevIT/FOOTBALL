/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { RolesModel } from '@common/models';
import { isNull } from 'lodash';
import * as moment from 'moment';

export class Utils {
  public static endTimeISO = 'T23:59:59.999Z';
  public static userLoginLocalStore = 'user_login';

  public static getValueByKey(element: any, keyIn: string): any {
    if (!element) {
      return null;
    }

    // split by +
    const multiKeyArr: Array<any> = keyIn.split('+');
    const finalValue: Array<any> = [];

    multiKeyArr.forEach((eachKey) => {
      // split the key

      const keyArr: Array<any> = this.splitFirstOccur(eachKey, '.');
      // get first

      if (!keyArr) {
        finalValue.push(null);
      }

      if (keyArr.length === 2) {
        // have multiple
        const key = keyArr[0];
        const nextKey = keyArr[1];

        const value = this.processElementKey(element, key, nextKey);

        finalValue.push(value);
      } else if (keyArr.length === 1) {
        // only one left
        const key = keyArr[0];
        const value = this.processElementKey(element, key, null);

        finalValue.push(value);
      } else {
        finalValue.push(null);
      }
    });

    // post recursive processing
    if (finalValue.length <= 1) {
      const combineArr = finalValue[0];
      let filteredValue;

      if (Array.isArray(combineArr)) {
        filteredValue = combineArr.filter((el) => el !== null);
      } else {
        filteredValue = combineArr;
      }

      return !isNull(filteredValue) && typeof (filteredValue) !== 'undefined' ? filteredValue.toString() : null;
    } else if (finalValue.length === 2) { // supporting up to 2 for now
      // split and if only one then merge them
      const array1: any = finalValue[0];
      const array2: any = finalValue[1];

      if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 && array2 ? (array1 + ': ' + array2) : (array1 !== null ? array1 : null);
      } else {
        const combineArr = array1.map((e: any, i: any) => {
          if (array2[i]) { // need to fix this shit up
            return e + ': ' + array2[i];
          } else {
            return e;
          }
        });

        return combineArr.filter((el: any) => el !== null);
      }
    }

    return finalValue.filter((el) => el !== null);
  }

  public static processElementKey(element: any, key: any, nextKey: any): string | null {
    if (key.slice(-1) === ']') {
      // is array slice it apart
      const splitKey = key.split('[');

      const keyId = splitKey[0];
      const arrNumber = splitKey[1].slice(0, -1);

      if (arrNumber === 'all') {
        // loop and print all
        const value: any = [];

        if (!element[keyId]) {
          return null;
        }

        element[keyId].forEach((el: any) => {
          value.push(nextKey ? this.getValueByKey(el, nextKey) : el);
        });

        return value;
      } else {
        return nextKey ? this.getValueByKey(element[keyId] ? element[keyId][arrNumber] : null, nextKey) :
          element[keyId] ? element[keyId][arrNumber] : null;
      }
    } else {
      return nextKey ? this.getValueByKey(element[key], nextKey) : element[key];
    }
  }

  public static splitFirstOccur(str: any, spliyBy: any): any[] {
    const keyArr = [];
    const first = str.substr(0, str.indexOf(spliyBy));

    if (first) {
      keyArr.push(first);
    }

    const second = str.substr(str.indexOf(spliyBy) + 1);

    if (second) {
      keyArr.push(second);
    }

    return keyArr;
  }

  public static isDate(input: any): boolean {
    if (Object.prototype.toString.call(input) === '[object Date]') {
      return true;
    }

    return false;
  }

  // check validate date
  public static validDate(date: any): boolean {
    if (moment(date, 'YYYY/MM/DD', true).isValid()) {
      date = date.split('/');
      const dd = +date[0];
      const mm = +date[1];
      const yy = +date[2];
      const listofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      if (mm === 1 || mm > 2) {
        if (dd > listofDays[mm - 1]) {
          new Error('Invalid date format!');

          return false;
        }
      }

      if (mm === 2) {
        let leapYear = false;

        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
          leapYear = true;
        }

        if ((leapYear === false) && (dd >= 29)) {
          new Error('Invalid date format!');

          return false;
        }

        if ((leapYear === true) && (dd > 29)) {
          new Error('Invalid date format!');

          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  public static formatZeroFill(value: number, type: number): string {
    return value.toString().padStart(type, '0');
  }

  public static validateFaxPhonePostCode(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/) || val.toString().length < 6) return { 'invalidFaxPhonePostCode': true };

    return null;
  }


  public static validateZipcode(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/〒?[0-9]{3}-?[0-9]{4}/) || val.toString().length < 7) return { 'invalidFaxPhoneZipcode': true };

    return null;
  }

  public static validateBank(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]*$/)) return { 'dataIncorrect': true };

    return null;
  }

  public static validateBank1(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[a-zA-Z0-9 _.-]*$/)) return { 'dataIncorrect': true };

    return null;
  }

  public static validatePhoneNumber(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/) || val.toString().length < 9 || val.toString().length > 9) return { 'dataIncorrect': true };

    return null;
  }

  public static validatePhoneNumberFullSize(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9０-９]\+$/) || val.toString().length < 9 || val.toString().length > 15) return { 'invalidPhoneNumber': true };

    return null;
  }

  public static validateChassiNumber(control: AbstractControl): null | object {
    let val = control.value ? control.value.toString().replace(/-/g, '') : '';

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidChassiNumber': true };
    // if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/) || val.toString().length < 9 || val.toString().length > 20 )  return { 'invalidPhoneNumber': true };

    return null;
  }

  public static requireValidator(control: AbstractControl): null | object {
    let val = control.value;
    if (
      val === null ||
      val === ''
    ) return { required: true };
    return null;
  }

  public static checkMail(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return { 'invalidMail': true };

    if (val.length && !val.toString().match(/^([a-z0-9A-Z](\.?[a-z0-9A-Z]){1,})\@\w+([\.-]?\w+)(\.\w{2,3})+$/)) return { 'invalidMail': true };

    return null;
  }

  public static checkPassword(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return { 'invalidPassword': true };

    if (!val.toString().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/g)) return { 'invalidPassword': true };

    return null;
  }



  public static checkCode(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    val = val.toString().replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    if (val.toString().match(/[^a-zA-Z0-9]/)) return { 'errorFormat': true };

    return null;
  }


  public static convertDateFormat(inputDate: Date, format: 'YYYYMMDD' | 'YYYYMMDDHHMM' | 'YYYYMMDDHHMMSS' | 'YYYYMMDDHHMMSSMS', separator: string = '/'): string {

    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() < 9 ? '0' + (inputDate.getMonth() + 1) : (inputDate.getMonth() + 1); // getMonth() is zero-based
    let date = inputDate.getDate() < 10 ? '0' + inputDate.getDate() : inputDate.getDate();
    let hours = inputDate.getHours() < 10 ? '0' + inputDate.getHours() : inputDate.getHours();
    let minutes = inputDate.getMinutes() < 10 ? '0' + inputDate.getMinutes() : inputDate.getMinutes();
    let seconds = inputDate.getSeconds() < 10 ? '0' + inputDate.getSeconds() : inputDate.getSeconds();
    const miliSeconds = inputDate.getMilliseconds();

    switch (format) {
      case 'YYYYMMDD':
        return [year, month, date].join(separator);

      case 'YYYYMMDDHHMM':
        return [year, month, date].join(separator) + ' ' + [hours, minutes].join(':');

      case 'YYYYMMDDHHMMSS':
        return [year, month, date].join(separator) + ' ' + [hours, minutes, seconds].join(':');

      case 'YYYYMMDDHHMMSSMS':
        return [year, month, date].join(separator) + ' ' + [hours, minutes, seconds].join(':') + '.' + miliSeconds;

      default:
        return inputDate.toString();
    }
  }

  public static getCurrentDateChatFormat(): string {
    const date = new Date();
    let result = this.MONTH_NAME[date.getMonth()].concat(' ', date.getDate().toString(), ', ', date.getFullYear().toString());
    return result.concat('  ', date.getHours().toString(), ':', date.getMinutes().toString(), date.getHours() > 12 ? 'PM' : 'AM');;
  }

  public static formatDateTimeToTime(date: string): string {
    let d = new Date(Date.parse(date));

    return d.getTime().toString();
  }

  public static checkPermission(): boolean {
    return JSON.parse(sessionStorage.getItem('user_login') || '{}').roles[0].role !== RolesModel.ADMIN ? true : false;
  }

  public static JsonToString(object: object): string {
    return object && JSON.stringify(object);
  }

  public static checkNumberic(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;
  }
  public static checkOtp(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;
    if (!val.toString().match(/^(\d\s*){6}$/g)) return { 'invalidNumber': true };

    return null;
  }
  public static checkLengthPhone(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;
    if (!val.toString().match(/^(\d\s*){10}$/g)) return { 'invalidNumber': true };
    return null;
  }
  public static checkNewPass(control: AbstractControl): null | object {
    let val = control.value;
    if (val === null || val === '') return null;
    if (!val.toString().match(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{9,}$/))
      return { 'validPassword': true };

    return null;
  }

  public static checkPass(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;
    if (!val.toString().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/g)) return { 'invalidNumber': true };

    return null;
  }
  public static checkFromValue(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      control.parent?.get(formControlName)?.setErrors(null);

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (val > control.parent?.get(formControlName)?.getRawValue()) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });

        return { 'dateInvalidFrom': true };
      }

      return null;
    };
  }
  public static checkToValue(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      control.parent?.get(formControlName)?.setErrors(null);

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if (control.parent?.get(formControlName)?.getRawValue() > val) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });

        return { 'dateInvalidTo': true };
      }

      return null;
    };
  }
  public static checkFromDate(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      control.parent?.get(formControlName)?.setErrors(null);

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if ((new Date(val)) > (new Date(control.parent?.get(formControlName)?.getRawValue()))) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });

        return { 'dateInvalidFrom': true };
      }

      return null;
    };
  }
  public static checkToDate(formControlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let val = control.value;

      control.parent?.get(formControlName)?.setErrors(null);

      if (val === null || val === '') return null;


      if (control.parent?.get(formControlName)?.getRawValue() === null || control.parent?.get(formControlName)?.getRawValue() === '') return null;

      if ((new Date(control.parent?.get(formControlName)?.getRawValue())) > (new Date(val))) {
        control.parent?.get(formControlName)?.setErrors({ 'dateInvalidTo': true });

        return { 'dateInvalidTo': true };
      }

      return null;
    };
  }

  public static coverStringToInt(value: string): number {
    return typeof (value) === 'number' ? parseInt(value) : 0;
  }

  public static validMaker(): object | null {
    return { validMaker: true };
  }
  public static validEmailExporter(): object | null {
    return { validEmailExporter: true };
  }
  public static validEmailCustomer(): object | null {
    return { validEmailCustomer: true };
  }

  public static wrongCfPassword(): object | null {
    return { notMatch: true };
  }

  public static phoneAlreadyExits(): object | null {
    return { phoneAlreadyExits: true };
  }

  public static invalidFaxPhoneZipcode(): object | null {
    return { invalidFaxPhoneZipcode: true };
  }

  public static wrongCfPhone(): object | null {
    return { invalidPhoneNumber: true };
  }

  public static getMessError(error: ValidationErrors | null | undefined, fieldName?: string): string {
    if (!error) return '';


    let key = Object.keys(error).toString().split(',')[0];
    let mess = '';

    switch (key) {
      //---------------- ESCROW--------------//
      case 'invalidMail':
        mess = 'common.message.login.E00001';
        break;

      case 'invalidPhoneNumber':
        mess = 'common.message.invalid-phone';
        break;

      //-------------------//----------------
      case 'invalidFaxPhonePostCode':
        mess = 'common.message.invalid-otp';
        break;

      case 'invalidFaxPhoneZipcode':
        mess = 'common.message.register.customer.invalid-zipcode';
        break;

      case 'postcode':
        mess = 'common.message.error-zipcode';
        break;

      case 'errorFormat':
        mess = 'common.message.register.error-data-format';
        break;

      case 'notMatch':
        mess = 'common.message.password-not-match';
        break;

      case 'invalidNumber':
        mess = 'common.message.error-data-format';
        break;

      case 'email':
        mess = 'common.message.register.customer.error-email';
        break;

      case 'invalidPassword':
        mess = 'common.message.error-password';
        break;

      case 'required':
        mess = 'common.message.error-required';
        break;

      case 'matDatepickerParse':
        mess = 'common.message.error-data-format';
        break;

      case 'matDatepickerMin':
        mess = 'common.message.error-data-format';
        break;

      case 'requireLogin':
        mess = 'common.message.login-infor-required';
        break;

      case 'maxlength':
        mess = 'common.message.error-maxlenght';
        break;

      case 'minlength':
        mess = 'common.message.error-minlenght';
        break;

      case 'existing':
        mess = 'common.message.data-existed';
        break;

      case 'emailNotExisted':
        mess = 'common.message.email-not-existed';
        break;

      case 'emailExisted':
        mess = 'common.message.email-existed';
        break;

      case 'dateInvalidFrom':
        mess = `${fieldName}Fromは${fieldName}To以下の値を指定してください。`;
        break;

      case 'dateInvalidTo':
        mess = `${fieldName}Toは${fieldName}From以上の値を指定してください。`;
        break;

      case 'notFound':
        mess = 'common.message.not-existed';
        break;

      case 'passwordWrong':
        mess = 'common.message.register.password-wrong';
        break;

      case 'wrongCfPassword':
        mess = 'common.message.register.cfPassword-wrong';
        break;
      case 'phoneAlreadyExits':
        mess = 'common.message.register.phoneAlreadyExits';
        break;
      case 'passwordDuplicate':
        mess = 'common.message.password-duplicate';
        break;
      case 'invalidChassiNumber':
        mess = 'common.message.order.chassi-number';
        break;
      case 'invalidUserName':
        mess = 'common.message.register.operator.invalid-username';
        break;

      case 'requiredJp':
        mess = 'common.message.register.operator.error-requirejp';
        break;

      case 'invalidMailJp':
        mess = 'common.message.register.operator.invalid-mailjp';
        break;
      case 'validMaker':
        mess = 'common.message.order.maker-wrong';
        break;
      case 'validEmailCustomer':
        mess = 'common.message.order.email-customer-wrong';
        break;
      case 'validEmailExporter':
        mess = 'common.message.order.email-exporter-wrong';
        break;
      case 'dataIncorrect':
        mess = 'common.message.error-data';
        break;
    }

    return mess;
  }

  public static validHalfWidth(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (val.toString().match(/[^a-zA-Z0-9]/)) return { 'errorFormat': true };

    return null;
  }

  public static validHalfSize(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;

    if (val.toString().match(/[^\w!@#$%^&*(),.?":{}[\]\`\~\_\+\=\-\/\\;'|<>]/)) return { 'errorFormat': true };

    return null;
  }

  //system-operator
  public static checkUserName(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return null;
    if (val.toString().match(/[]/)) return { 'invalidUserName': true };

    return null;
  }

  public static requireValidatorJp(control: AbstractControl): null | object {
    let val = control.value;
    if (
      val === null ||
      val === ''
    ) return { requiredJp: true };
    return null;
  }

  public static checkMailJp(control: AbstractControl): null | object {
    let val = control.value;

    if (val === null || val === '') return { 'invalidMailJp': true };

    if (val.length && !val.toString().match(/^([a-z0-9A-Z](\.?[a-z0-9A-Z]){1,})\@\w+([\.-]?\w+)(\.\w{2,3})+$/)) return { 'invalidMailJp': true };

    return null;
  }
  public static MONTH_NAME = ["Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];

  public static LIST_YEAR: number[] = [];

  public static addYear(value: number) {
    const currentYear = new Date().getFullYear();
    for (var i = value; i <= currentYear; i++) {
      this.LIST_YEAR.push(i);
    }
  }

  public static LIST_MONTH = ['01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];
  public static LIST_DAY = ['01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12', '13', '14', '15', '16',
    '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
    '27', '28', '29', '30', '31'];
  public static LIST_ALC = [
    { value: "Super Admin" },
    { value: "承認者（経理)" },
    { value: "担当者（経理)" },
    { value: "承認者（BL、INVOICE確認)" },
    { value: "担当者（BL、INVOICE確認)" },
    { value: "参照のみ（現地スタッフ)" }

  ];

  public static LIST_MAKER = [
    "アルファロメオ",
    "AMC",
    "AMG",
    "アストンマーティン",
    "アウディ",
    "オースチン",
    "アウトビアンキ",
    "ベントレー",
    "バーキン",
    "BMW",
    "BMWアルピナ",
    "ビュイック",
    "キャデラック",
    "ケータハム",
    "シボレー",
    "クライスラー",
    "シトロエン",
    "ダイハツ",
    "デイムラー", "デ・トマソ",
    "ダッジ",
    "ドンカーブート",
    "ユーノス",
    "ヨーロッパフォード",
    "フェラーリ",
    "フィアット",
    "フォード",
    "日本フォード",
    "大宇", "ＧＭマティス",
    "GMC",
    "ヒーレー",
    "日野",
    "ホンダ",
    "ハマー",
    "ヒュンダイ",
    "イノチェンティ",
    "いすゞ",
    "ジャガー", "クライスラー・ジープ",
    "起亜",
    "ラーダ",
    "ランボルギーニ",
    "ランチア",
    "ランドローバー",
    "レクサス",
    "リンカーン",
    "ロータス",
    "マーコス", "マセラティ",
    "マイバッハ",
    "マツダ",
    "メルセデスＡＭＧ",
    "メルセデス・ベンツ",
    "マーキュリー",
    "MINI",
    "MG",
    "三菱",
    "三菱ふそう", "ミツオカ",
    "モーガン",
    "モーリス",
    "日産",
    "日産ディーゼル",
    "オールズモービル",
    "オペル",
    "パンサー",
    "プジョー",
    "プリムス", "ポンテアック",
    "ポルシェ",
    "ルノー",
    "ライレー",
    "ロールスロイス",
    "ローバー",
    "ルーフ",
    "サーブ",
    "サリーン",
    "サターン", "スマート",
    "サンヨン",
    "スバル",
    "スズキ",
    "トヨタ",
    "トライアンフ",
    "TVR",
    "フォルクスワーゲン",
    "ボルボ",
    "ウエストフィールド",
    "ウィネベーゴ",
    "ウーズレー",
    "その他"
  ];
  public static LIST_STATUS_ORDER = [
    { value: "Open", status: '1' },
    { value: "Agree to terms of payment. Require to payment", status: '2' },
    { value: "Make your deposit", status: '3' },
    { value: "Confirm deposit", status: '4' },
    { value: "Prepare for export", status: '5' },
    { value: "Make final Payment", status: '6' },
    { value: "Confirm final payment", status: '7' },
    { value: "Export item", status: '8' },
    { value: "Confirm export", status: '9' },
    { value: "Confirm export", status: '10' },
    { value: "Release funds to EXPORTER", status: '11' },
    { value: "close", status: '12' }
  ];
  public static LIST_STATUS_ORDER_JAPAN = [
    { value: "➀ Terms of paymentに同意する。支払いを求める", status: '1' },
    { value: "➁ デポジットを入れる", status: '2' },
    { value: "➂ 入金確認", status: '3' },
    { value: "➃ 輸出準備中", status: '4' },
    { value: "➄ 全額支払いを行う", status: '5' },
    { value: "➅ 最終支払いを確認する", status: '6' },
    { value: "➆ 輸出作業開始", status: '7' },
    { value: "➇ 輸出確認", status: '8' },
    { value: "➈ 輸出確認", status: '9' },
    { value: "➉ セラーに資金放出する", status: '10' },
    { value: "クローズ", status: '11' }
  ];
  public static LIST_THELOAI = [
    { value: "Sản phẩm", role: '1' },
    { value: "Sân bóng", role: '2' }
  ];
}





