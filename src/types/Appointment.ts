export interface Appointment {
    id: string;
    patientId?: string;
    patientName?: string;
    doctorId?: string;
    doctorName?: string;
    treatmentId?: string;
    treatmentName?: string;
    scheduledDateTime: Date;
    durationMinutes: number;
    status: string;
    notes?: string | null;
    cancellationReason?: string | null;
    createdAt:Date;
    updatedAt:Date;
}

export const AppointmentStatus:string[] =[
    "Scheduled",
    "Confirmed",
    "InProgress",
    "Completed",
    "Cancelled",
    "NoShow"
]