export type QRCodeType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "vcard"
  | "mecard"
  | "wifi"
  | "event"
  | "bitcoin"
  | "facebook"
  | "twitter"
  | "youtube";

export interface QRCodeBase {
  type: string;
}

export interface QRCodeURL extends QRCodeBase {
  type: "url";
  url: string;
}

export interface QRCodeText extends QRCodeBase {
  type: "text";
  text: string;
}

export interface QRCodeEmail extends QRCodeBase {
  type: "email";
  email: string;
  subject?: string;
  body?: string;
}

export interface QRCodePhone extends QRCodeBase {
  type: "phone";
  number: string;
}

export interface QRCodeSMS extends QRCodeBase {
  type: "sms";
  number: string;
  message?: string;
}

export interface QRCodeVCard extends QRCodeBase {
  type: "vcard";
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  workPhone?: string;
  homePhone?: string;
  mobilePhone?: string;
  workFax?: string;
  homeFax?: string;
  email?: string;
  website?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface QRCodeMeCard extends QRCodeBase {
  type: "mecard";
  name: string;
  phone?: string;
  email?: string;
  website?: string;
  address?: string;
}

export interface QRCodeLocation extends QRCodeBase {
  type: "location";
  latitude: number;
  longitude: number;
  name?: string;
}

export interface QRCodeWiFi extends QRCodeBase {
  type: "wifi";
  ssid: string;
  password?: string;
  encryption: "WEP" | "WPA" | "nopass";
  hidden?: boolean;
}

export interface QRCodeEvent extends QRCodeBase {
  type: "event";
  title: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  allDay?: boolean;
}

export interface QRCodeBitcoin extends QRCodeBase {
  type: "bitcoin";
  address: string;
  amount?: number;
  label?: string;
  message?: string;
}

export interface QRCodeSocial extends QRCodeBase {
  type: "facebook" | "twitter" | "youtube";
  username: string;
}

export interface QRCodeCustomization {
  foreground?: string;
  background?: string;
  gradient?: {
    type: "linear" | "radial";
    colorStops: Array<{ offset: number; color: string }>;
  };
}

export interface QRCodeOutput {
  format: "png" | "svg" | "pdf" | "eps";
  size: number; // pixel size
  margin: number; // quiet zone size in modules
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
}

export type QRCodeContent =
  | QRCodeURL
  | QRCodeText
  | QRCodeEmail
  | QRCodePhone
  | QRCodeSMS
  | QRCodeVCard
  | QRCodeMeCard
  | QRCodeLocation
  | QRCodeWiFi
  | QRCodeEvent
  | QRCodeBitcoin
  | QRCodeSocial;
