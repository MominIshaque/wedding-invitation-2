export interface WeddingEvent {
  id: string;
  name: string;
  subtitle?: string;
  dayOfWeek: string;
  dayNumber: string;
  month: string;
  year: string;
  hijriDate: string;
  timeAndDetails: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
}

export interface WeddingTheme {
  id: string;
  name: string;
  ink: string;
  muted: string;
  gold: string;
  accent: string;
  paper: string;
  cream: string;
  line: string;
  lineSoft: string;
  page1: string;
  page2: string;
  gateBg: string;
  gateBg2: string;
  gateLine: string;
  gateInk: string;
}

export interface WeddingData {
  gate: {
    bismillahArabic: string;
    bismillahEnglish: string;
    shortGroomName: string;
    shortBrideName: string;
    tagline: string;
    buttonText: string;
  };
  hero: {
    bismillahArabic: string;
    bismillahEnglish: string;
    guardianLabel: string;
    guardianName: string;
    guardianDegree: string;
    invitersText: string;
    groomName: string;
    groomDegree: string;
    groomParentage: string;
    groomGrandfather: string;
    brideName: string;
    brideDegree: string;
    brideParentage: string;
    closingWord: string;
  };
  monogram: {
    groomInitial: string;
    brideInitial: string;
    quote: string;
  };
  eventsTitle: string;
  events: WeddingEvent[];
  footer: {
    complimentsHeader: string;
    complimentsFrom: string;
    countdownLabel: string;
    countdownTargetIso: string;
    shareMessageTemplate: string;
  };
  themeId: string;
  isDarkMode: boolean;
}
