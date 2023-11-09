import { HttpClientResponse, HttpClientResponseZipCode } from "@core/models";

export interface RegisterExporter {
    email: string;
    password: string;
    countryId: string;
    phonePersonal: string;
    companyName: string;
    phoneCompany: string;
    phoneRepresentative: string;
    zipCode1: string;
    address11: string;
    address12: string;
    address13: string;
    address14: string;
    zipCode2: string;
    address21: string;
    address22: string;
    address23: string;
    address24: string;
    companyRepresentative: string;
    representativeBirthday: string;
    jumveaNumber: string;
    businessLicense: string;
    indentificationCard: string;
    urlRedirect: string;
}
export interface Zipcode {
   address1: string;
   address2: string;
   address3: string;
   kana1: string;
   kana2: string;
   kana3: string;
   prefcode: string;
   zipcode: string;
}
export interface PhoneNumber {
    value: string;
    code: string;
}
export interface ListDay {
    value: string;
}

export interface CountryModel {
    countryId: string;
    countryName: string;
    decription: string;
}
export interface HttpClientCountryResponse extends HttpClientResponse {
    data: Array<CountryModel>;
  }
  export interface HttpClientZipcodeResponse extends HttpClientResponseZipCode {
    results: Array<Zipcode>;
  }
