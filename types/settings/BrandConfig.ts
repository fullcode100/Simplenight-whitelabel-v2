export interface BrandConfig {
  information: Information;
  theme: Theme;
  images: Images;
  analytics: Analytics;
  features: Features;
  homepage: Homepage;
  legalInformation: LegalInformation;
  email: Email;
}

export interface Features {
  hotels: boolean;
}

export interface Analytics {
  measurementId: string;
}

export interface Email {
  upsell: boolean;
}

export interface Homepage {
  perks: boolean;
  upsell: boolean;
  heroSectionTitle: string;
  comingSoonCategory: boolean;
  whiteLabelBackground: string;
}

export interface Images {
  logo: string;
  emailLogo: string;
}

export interface Information {
  aboutLink: string;
  corporateLink: string;
  partnerName: string;
  customerSupportEmail: string;
  customerSupportPhone: CustomerSupportPhone;
}

export interface CustomerSupportPhone {
  number: string;
  prefix: string;
  country: string;
}

export interface LegalInformation {
  partnerPrivacyPolicy: string;
  partnerTermsOfService: string;
  simplenightPrivacyPolicy: string;
  simplenightTermsOfService: string;
}

export interface Theme {
  primaryTheme: { [key: string]: string };
  primaryColor: { [key: string]: string };
  secondaryTheme: { [key: string]: string };
  secondaryColor: { [key: string]: string };
}
