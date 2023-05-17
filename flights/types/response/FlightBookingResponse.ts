export interface FlightBookingResponse {
  errorMessage: null;
  pnrReply: PnrReply;
}

export interface PnrReply {
  generalErrorInfo: any[];
  pnrHeader: PnrHeader[];
  securityInformation: SecurityInformation;
  queueInformations: null;
  numberOfUnits: null;
  pnrType: null;
  freetextData: FreetextDatum[];
  pnrHeaderTag: PnrHeaderTag;
  freeFormText: any[];
  historyData: any[];
  sbrPOSDetails: SbrPosDetails;
  sbrCreationPosDetails: SbrPosDetails;
  sbrUpdatorPosDetails: SbrPosDetails;
  technicalData: TechnicalData;
  travellerInfo: TravellerInfo[];
  originDestinationDetails: OriginDestinationDetail[];
  segmentGroupingInfo: any[];
  dataElementsMaster: DataElementsMaster;
  tstData: TstDatum[];
  pricingRecordGroup: PricingRecordGroup;
  dcsData: null;
}

export interface DataElementsMaster {
  marker2: Marker;
  dataElementsIndiv: DataElementsIndiv[];
}

export interface DataElementsIndiv {
  elementManagementData: ElementManagement;
  pnrSecurity: null;
  accounting: null;
  miscellaneousRemarks: MiscellaneousRemarks | null;
  extendedRemark: ExtendedRemark | null;
  serviceRequest: ServiceRequest | null;
  seatPaxInfo: any[];
  reasonForIssuanceCode: null;
  railSeatPreferences: null;
  cityPair: null;
  railSeatDetails: any[];
  dateAndTimeInformation: null;
  frequentFlyerInformationGroup: null;
  ticketElement: TicketElement | null;
  referencedRecord: null;
  optionElement: null;
  otherDataFreetext: FreetextDatum[];
  structuredAddress: null;
  monetaryInformation: any[];
  elementErrorInformation: null;
  mcoRecord: null;
  totalPrice: null;
  elementsIndicators: ElementsIndicator[];
  eltPosDetails: null;
  accessLevel: any[];
  referenceForDataElement: ReferenceFor | null;
  structuredFop: any[];
  ssrPackageInformation: any[];
}

export interface ElementManagement {
  status: null;
  reference: ElementManagementPassengerReference;
  segmentName: string;
  lineNumber: number;
}

export interface ElementManagementPassengerReference {
  qualifier: string;
  number: number;
}

export interface ElementsIndicator {
  statusDetails: Status;
}

export interface Status {
  indicator: string;
}

export interface ExtendedRemark {
  structuredRemark: StructuredRemark;
}

export interface StructuredRemark {
  type: string;
  category: null;
  freetext: string;
  status: null;
  encoding: null;
}

export interface MiscellaneousRemarks {
  remarks: Remarks;
  individualSecurity: any[];
}

export interface Remarks {
  type: string;
  category: null;
  freetext: string;
  providerType: null;
}

export interface FreetextDatum {
  freetextDetail: FreetextDetail;
  longFreetext: string;
}

export interface FreetextDetail {
  subjectQualifier: string;
  type: string;
  status: null;
  companyId: null;
}

export interface ReferenceFor {
  reference: ReferenceElement[];
}

export interface ReferenceElement {
  qualifier: string;
  number: string;
}

export interface ServiceRequest {
  ssr: Ssr;
  ssrb: any[];
}

export interface Ssr {
  type: string;
  status: string;
  quantity: number;
  companyId: string;
  indicator: null;
  processingIndicator: null;
  boardpoint: null;
  offpoint: null;
  freeText: string[];
}

export interface TicketElement {
  passengerType: null;
  ticket: Ticket;
  printOptions: null;
}

export interface Ticket {
  indicator: string;
  date: string;
  time: null;
  officeId: string;
  freetext: null;
  transactionFlag: null;
  electronicTicketFlag: null;
  airlineCode: null;
  queueNumber: null;
  queueCategory: null;
  sitaAddress: any[];
}

export interface Marker {}

export interface OriginDestinationDetail {
  originDestination: OriginDestination;
  itineraryInfo: ItineraryInfo[];
}

export interface ItineraryInfo {
  elementManagementItinerary: ElementManagement;
  travelProduct: TravelProduct;
  itineraryMessageAction: ItineraryMessageAction;
  itineraryReservationInfo: null;
  relatedProduct: RelatedProduct;
  elementsIndicators: ElementsIndicators;
  reasonForIssuanceCode: null;
  flightDetail: FlightDetail;
  cabinDetails: ItineraryInfoCabinDetails;
  selectionDetails: SegmentAssociation;
  segmentAttribute: null;
  carbonDioxydeInfo: CarbonDioxydeInfo;
  itineraryfreeFormText: any[];
  itineraryFreetext: null;
  distributionMethod: DistributionMethod;
  hotelProduct: null;
  rateInformations: null;
  generalOption: any[];
  country: null;
  taxInformation: any[];
  customerTransactionData: null;
  yieldGroup: null;
  legInfo: LegInfo[];
  flixInfo: any[];
  dateTimeDetails: null;
  lccTypicalData: null;
  insuranceInformation: any[];
  insuranceDetails: null;
  hotelReservationInfo: null;
  typicalCarData: null;
  typicalCruiseData: null;
  railInfo: null;
  markerRailTour: Marker;
  tourInfo: null;
  ferryLegInformation: null;
  errorInfo: null;
  referenceForSegment: null;
}

export interface ItineraryInfoCabinDetails {
  cabinDetails: CabinDetailsCabinDetails;
}

export interface CabinDetailsCabinDetails {
  classDesignator: string;
}

export interface CarbonDioxydeInfo {
  carbonDioxydeAmount: CarbonDioxydeAmount;
  carbonDioxydeInfoSource: CarbonDioxydeInfoSource;
}

export interface CarbonDioxydeAmount {
  quantityDetails: QuantityDetails;
}

export interface QuantityDetails {
  qualifier: string;
  value: number;
  unit: string;
}

export interface CarbonDioxydeInfoSource {
  freeTextDetails: FreeTextDetails;
  freeText: string[];
}

export interface FreeTextDetails {
  textSubjectQualifier: string;
  source: string;
  encoding: string;
}

export interface DistributionMethod {
  distributionMethodDetails: DistributionMethodDetails;
}

export interface DistributionMethodDetails {
  distriProductCode: string;
}

export interface ElementsIndicators {
  statusInformation: Status;
}

export interface FlightDetail {
  productDetails: FlightDetailProductDetails;
  departureInformation: null;
  arrivalStationInfo: ArrivalStationInfo;
  mileageTimeDetails: MileageTimeDetails;
  timeDetail: null;
  facilities: Facility[];
}

export interface ArrivalStationInfo {
  terminal: string;
}

export interface Facility {
  entertainement: string;
  entertainementDescription: string;
  productQualifier: null;
  productExtensionCode: any[];
}

export interface MileageTimeDetails {
  flightLegMileage: number;
  unitQualifier: string;
}

export interface FlightDetailProductDetails {
  equipment: string;
  numOfStops: number;
  duration: string;
  weekDay: number;
}

export interface ItineraryMessageAction {
  business: Business;
}

export interface Business {
  function: string;
}

export interface LegInfo {
  markerLegInfo: Marker;
  legTravelProduct: LegTravelProduct;
  interactiveFreeText: InteractiveFreeText[];
}

export interface InteractiveFreeText {
  freeTextQualification: FreeTextQualification;
  freeText: string;
}

export interface FreeTextQualification {
  textSubjectQualifier: string;
  informationType: null;
  language: null;
}

export interface LegTravelProduct {
  flightDate: FlightDate;
  boardPointDetails: PointDetails;
  offpointDetails: PointDetails;
  companyDetails: null;
  flightIdentification: null;
}

export interface PointDetails {
  trueLocationId: string;
}

export interface FlightDate {
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
}

export interface RelatedProduct {
  quantity: number;
  status: string[];
}

export interface SegmentAssociation {
  selection: Selection[];
}

export interface Selection {
  option: string;
  optionInformation: null;
}

export interface TravelProduct {
  product: Product;
  boardpointDetail: PointDetail;
  offpointDetail: PointDetail;
  companyDetail: CompanyDetail;
  productDetails: TravelProductProductDetails;
  typeDetail: TypeDetail;
  processingIndicator: null;
}

export interface PointDetail {
  cityCode: string;
  cityName: null;
}

export interface CompanyDetail {
  identification: string;
  secondIdentification: null;
  sourceCode: null;
}

export interface Product {
  depDate: string;
  depTime: string;
  arrDate: string;
  arrTime: string;
  dayChangeIndicator: null;
}

export interface TravelProductProductDetails {
  identification: string;
  classOfService: string;
  subtype: null;
  description: null;
}

export interface TypeDetail {
  detail: string;
}

export interface OriginDestination {
  origin: null;
  destination: null;
}

export interface PnrHeader {
  reservationInfo: ReservationInfo;
  referenceForRecordLocator: null;
}

export interface ReservationInfo {
  reservation: Reservation[];
}

export interface Reservation {
  companyId: string;
  controlNumber: string;
  controlType: null;
  date: string;
  time: number;
}

export interface PnrHeaderTag {
  statusInformation: StatusInformation[];
}

export interface StatusInformation {
  indicator: string;
  description: null;
}

export interface PricingRecordGroup {
  pricingRecordData: PricingRecordData;
  productPricingQuotationRecord: ProductPricingQuotationRecord[];
}

export interface PricingRecordData {
  idNumber: null;
}

export interface ProductPricingQuotationRecord {
  pricingRecordId: PricingRecordID;
  passengerTattoos: PassengerTattoo[];
  ptcDiscountCode: any[];
  fareIds: any[];
  documentDetailsGroup: DocumentDetailsGroup;
}

export interface DocumentDetailsGroup {
  totalFare: TotalFare;
  otherFares: any[];
  taxInformation: any[];
  issueIdentifier: IssueIdentifier;
  originDestination: null;
  rfics: any[];
  manualIndicator: ManualIndicator;
  flags: any[];
  generalIndicators: any[];
  fareCalcRemarks: any[];
  officeInformation: OfficeInformation;
  negoDetails: null;
  creationDate: CreationDate;
  otherDates: any[];
  atcFares: null;
  airlineServiceFeeGroup: any[];
  couponDetailsGroup: DocumentDetailsGroupCouponDetailsGroup[];
  fareComponentDetailsGroup: FareComponentDetailsGroup[];
}

export interface DocumentDetailsGroupCouponDetailsGroup {
  productId: ProductID;
  rfisc: null;
  feeOwner: null;
  couponValue: null;
  icw: any[];
  couponFlags: any[];
  presentToAtAndRemarks: any[];
  flightConnectionType: null;
  fareQualifier: null;
  validityDates: any[];
  baggageInformation: null;
  couponTaxDetailsGroup: any[];
}

export interface ProductID {
  referenceDetails: PassengerReference;
}

export interface PassengerReference {
  type: string;
  value: string;
}

export interface CreationDate {
  businessSemantic: string;
  dateTime: CreationDateDateTime;
}

export interface CreationDateDateTime {
  year: string;
  month: string;
  day: string;
  hour: null;
  minutes: null;
  seconds: null;
  milliseconds: null;
}

export interface FareComponentDetailsGroup {
  fareComponentID: FareComponentID;
  marketFareComponent: MarketFareComponent;
  monetaryInformation: MonetaryInformation;
  componentClassInfo: ComponentClassInfo;
  fareQualifiersDetail: FareQualifiersDetail;
  fareFamilyDetails: FareFamilyDetails;
  fareFamilyOwner: FareFamilyOwner;
  couponDetailsGroup: FareComponentDetailsGroupCouponDetailsGroup[];
}

export interface ComponentClassInfo {
  fareBasisDetails: FareBasisDetails;
}

export interface FareBasisDetails {
  rateTariffClass: string;
  otherRateTariffClass: null;
}

export interface FareComponentDetailsGroupCouponDetailsGroup {
  productId: ProductID;
}

export interface FareComponentID {
  itemNumberDetails: ItemNumberDetail[];
}

export interface ItemNumberDetail {
  number: string;
  type: string;
}

export interface FareFamilyDetails {
  fareFamilyname: string;
  hierarchy: null;
  commercialFamilyDetails: any[];
}

export interface FareFamilyOwner {
  companyIdentification: CompanyIdentification;
}

export interface CompanyIdentification {
  otherCompany: string;
}

export interface FareQualifiersDetail {
  discountDetails: DiscountDetail[];
}

export interface DiscountDetail {
  fareQualifier: string;
}

export interface MarketFareComponent {
  boardPointDetails: PointDetails;
  offpointDetails: PointDetails;
}

export interface MonetaryInformation {
  monetaryDetails: MonetaryDetails;
  otherMonetaryDetails: any[];
}

export interface MonetaryDetails {
  typeQualifier: string;
  amount: string;
  currency: string;
}

export interface IssueIdentifier {
  priceTicketDetails: null;
  priceTariffType: string;
}

export interface ManualIndicator {
  statusDetails: StatusDetails;
}

export interface StatusDetails {
  indicator: string;
  action: string;
}

export interface OfficeInformation {
  originIdentification: OriginIdentification;
}

export interface OriginIdentification {
  originatorId: number | null;
  inHouseIdentification1: string;
  inHouseIdentification2: null | string;
}

export interface TotalFare {
  monetaryDetails: MonetaryDetails;
}

export interface PassengerTattoo {
  passengerReference: PassengerReference;
}

export interface PricingRecordID {
  referenceType: string;
  uniqueReference: string;
  actionCategory: null;
  idSection: any[];
}

export interface SbrPosDetails {
  sbrUserIdentificationOwn: SbrUserIdentificationOwn;
  sbrSystemDetails: SbrSystemDetails;
  sbrPreferences: SbrPreferences;
}

export interface SbrPreferences {
  userPreferences: UserPreferences;
}

export interface UserPreferences {
  codedCountry: string;
  codedCurrency: null;
  codedLanguage: null;
}

export interface SbrSystemDetails {
  deliveringSystem: DeliveringSystem;
}

export interface DeliveringSystem {
  companyId: string;
  locationId: string;
}

export interface SbrUserIdentificationOwn {
  originIdentification: OriginIdentification;
  originatorTypeCode: string;
}

export interface SecurityInformation {
  responsibilityInformation: ResponsibilityInformation;
  queueingInformation: QueueingInformation;
  cityCode: string;
  secondRpInformation: SecondRpInformation;
}

export interface QueueingInformation {
  queueingOfficeId: string;
  location: null;
}

export interface ResponsibilityInformation {
  typeOfPnrElement: string;
  agentId: string;
  officeId: string;
  iataCode: string;
}

export interface SecondRpInformation {
  creationOfficeId: string;
  agentSignature: string;
  creationDate: string;
  creatorIataCode: string;
  creationTime: string;
}

export interface TechnicalData {
  enveloppeNumberData: EnveloppeNumberData;
  lastTransmittedEnvelopeNumber: LastTransmittedEnvelopeNumber;
  purgeDateData: PurgeDateData;
  generalPNRInformation: null;
}

export interface EnveloppeNumberData {
  actionRequest: null;
  sequenceDetails: SequenceDetails;
}

export interface SequenceDetails {
  number: string;
}

export interface LastTransmittedEnvelopeNumber {
  currentRecord: number;
}

export interface PurgeDateData {
  dateTime: PurgeDateDataDateTime;
}

export interface PurgeDateDataDateTime {
  year: number;
  month: string;
  day: string;
}

export interface TravellerInfo {
  elementManagementPassenger: ElementManagement;
  passengerData: PassengerDatum[];
  enhancedPassengerData: EnhancedPassengerDatum[];
  nameError: null;
}

export interface EnhancedPassengerDatum {
  enhancedTravellerInformation: EnhancedTravellerInformation;
  groupCountersInEnhancedPaxData: null;
  dateOfBirthInEnhancedPaxData: null;
}

export interface EnhancedTravellerInformation {
  travellerNameInfo: TravellerNameInfo;
  otherPaxNamesDetails: OtherPaxNamesDetail[];
}

export interface OtherPaxNamesDetail {
  nameType: string;
  referenceName: string;
  displayedName: string;
  romanizationMethod: null;
  surname: string;
  givenName: string;
  title: null;
}

export interface TravellerNameInfo {
  qualifier: null;
  quantity: number;
  type: string;
  otherType: null;
  infantIndicator: null;
  travellerIdentificationCode: null;
  age: null;
}

export interface PassengerDatum {
  travellerInformation: TravellerInformation;
  groupCounters: null;
  dateOfBirth: null;
}

export interface TravellerInformation {
  traveller: Traveller;
  passenger: Passenger[];
}

export interface Passenger {
  firstName: string;
  type: string;
  infantIndicator: null;
  identificationCode: null;
}

export interface Traveller {
  surname: string;
  qualifier: null;
  quantity: number;
  staffType: null;
}

export interface TstDatum {
  tstGeneralInformation: TstGeneralInformation;
  tstFreetext: FreetextDatum[];
  fareBasisInfo: FareBasisInfo;
  fareData: FareData;
  segmentAssociation: SegmentAssociation;
  referenceForTstData: ReferenceFor;
}

export interface FareBasisInfo {
  fareElement: FareElement[];
}

export interface FareElement {
  primaryCode: string;
  connection: null;
  notValidBefore: string;
  notValidAfter: string;
  baggageAllowance: string;
  fareBasis: string;
  ticketDesignator: null;
}

export interface FareData {
  issueIdentifier: string;
  monetaryInfo: MonetaryInfo[];
  taxFields: TaxField[];
}

export interface MonetaryInfo {
  qualifier: string;
  amount: string;
  currencyCode: string;
}

export interface TaxField {
  taxIndicator: string;
  taxCurrency: string;
  taxAmount: string;
  taxCountryCode: string;
  taxNatureCode: null | string;
}

export interface TstGeneralInformation {
  generalInformation: GeneralInformation;
}

export interface GeneralInformation {
  tstReferenceNumber: string;
  tstCreationDate: string;
  salesIndicator: null;
}
