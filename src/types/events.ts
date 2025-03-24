export interface Event {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  location: string;
}

export const categories = [
  "Academic",
  "Cultural",
  "Sports",
  "Workshop",
  "Seminar",
  "All"
];