export interface WorkingHours {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}

export interface Doctor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialization: string;
    imageUrl: string;
    licenseNumber: string;
    isAvailable: boolean;
    workingHours: WorkingHours[];
    createdAt: string;
    updatedAt: string;
    userId?:string;
}