export interface Class {
  id: string;
  classTitle: string;
  youTubeLink: string;
}

export interface Chapter {
  id: string;
  chapterName: string;
  isCompleted: boolean;
  classes: Class[];
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  chapters: Chapter[];
}
