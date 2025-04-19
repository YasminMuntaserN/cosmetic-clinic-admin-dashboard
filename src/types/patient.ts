
export interface MedicalHistory {
    condition : string;
    diagnosis : string;
    diagnosisDate: string;
    medications: string[];
}

export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}


export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: string;
    address: Address;
    medicalHistory: MedicalHistory[];
    allergies: string[];
    emergencyContact:string;
    createdAt: string;
    updatedAt: string;
    userId?: string;
}
