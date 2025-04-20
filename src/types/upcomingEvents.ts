export type UpcomingEvent = {
  id: string;
  title: string;
  subTitle?: string | null;
  description: string;
  eventVenue: string;
  eventdate: string;
  contactUs: string;
  programs: string[];
  category: string;
  regFee: string;
  registrationLink: string;
  note?: string | null;
  published: boolean;
  slug: string;
  regEndDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
