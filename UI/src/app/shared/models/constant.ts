export class Constant {
  public static readonly toastrConfig: any = {
    positionClass: "toast-top-center",
    closeButton: true,
    progressBar: true,
    timeOut: 2000,
  };
  public static readonly MaxLengthConstants = {
    Name: 32,
    CompanyName: 25,
    PropertyName: 250,
    Street: 25,
    City: 15,
    State: 15,
    Email: 50,
    Phone: 15,
    Wish: 250,
    Comment: 500,
    Zip: 10,
    Password: 16,
    OTP: 8,
    CouponCode: 8,
    UserName: 20,
    Website: 100,
    Fax: 50,
    description: 100,
  };
  public static readonly ReservationMaxLengthonstants = {
    Name: 25,
    Email: 50,
    ZipCode: 10,
    Mobile: 15,
    City: 50,
    Address: 100,
    ReservationNo: 15,
  };
  public static readonly CURRENCY = "USD"; //  For Dollar set it to  'USD' and For Ruppee set it to 'INR' DATE_FORMAT_IMPRESSION
  public static readonly DATE_FORMAT = "MM-dd-y";
  public static DATE_FORMAT_IMPRESSION = "MM-dd-y hh:mm:ss";
  public static readonly DATE_FORMAT_DATEPICKER = "MM/DD/YYYY";
  public static readonly USERNAME = /^\S*$/;
  public static readonly DateFormat = "dd/mm/yyyy";
  // tslint:disable-next-line:max-line-length
  // public static readonly EMAIL_REGEXP = '^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$';
  // tslint:disable-next-line:max-line-length
  public static readonly EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // tslint:disable-next-line:max-line-length
  // public static readonly EMAIL_REGEXP_TS = /^[A-Za-z0-9!#$%&\'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
  public static SPACE_REGEXP = /^[A-Za-z]+([\s-][A-Za-z]+)*$/;
  public static NAME_REGEXP = /^[A-Za-z]+$/;
  public static readonly WISH_TEXT = "^[a-zA-Z ]*$";
  public static readonly NUMBER_REGEXP = "^[a-zA-Z0-9]+$";
  public static readonly ALPHANUMRIC_REGEXP = /^[A-Za-z\d\s]+$/;
  public static readonly PHONE_REGEXP = /^[(]{0,1}[6-9]{1}[)]{0,1}[-\s\.]{0,1}[0-9]{5}[-\s\.]{0,1}[0-9]{4}$/;
  public static readonly PHONE_REGEX_US = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  // public static readonly PHONE_REGEXP-TS = '^[6-9]\d{9}$';
  public static readonly PASSWORD_REGEXP = /^[a-zA-Z0-9!#$%&/\@=?^_`{|}~.]{6,16}$/;
  public static readonly ZIP_REGEXP = "^[0-9]{5,6}(-[0-9]{4})?$";
  public static readonly FAX_REGEXP =
    "^(?=(?:D*d){10,12}D*$)[0-9 -()\\/]{1,16}$";
  public static readonly WEBSITE_REGEXP = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
  public static readonly EXCLUDE_SPACES_REGEXP = "(?!^ +$)^.+$";
  public static readonly URL =
    "\b((http|https)://?)[^s()<>]+(?:([wd]+)|([^[:punct:]s]|/?))";
  public static readonly SPECIAL_CHAR_EMAIL = /[~`!#$%^\&*+=\-\[\]\\';/{}|\\":<>\?]/;
  public static readonly SPECIAL_CHAR_MOBILE = /[~`@!#$%\^&*_+=\-\[\]\\';/{}|\\":<>\?]/;
  public static readonly CITY = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  public static Digits_REGEXP = /^\d{0,6}(?:\.\d{0,2})?$/;
}
