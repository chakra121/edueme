export interface RegistrationForm {
    lead: Member;
    teamSize: number;
    teamName: string;
    college: string;
    completedCourse: boolean;
    teamDetails?: Member[]
}

export interface Member {
    name: string;
    email: string;
    rollNo: string;
    phoneNumber: string;
    branch: string;
    year: string;
}