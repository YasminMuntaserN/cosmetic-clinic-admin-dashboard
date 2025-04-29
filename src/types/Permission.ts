export enum Permission {
    CreateDoctor = 1 << 0,
    ViewDoctors = 1 << 1,
    MangeDoctor = 1 << 2,
    DeleteDoctor = 1 << 3,

    ViewAppointments = 1 << 4,
    CreateAppointment = 1 << 5,
    MangeAppointment = 1 << 6,
    CancelAppointment = 1 << 7,

    ViewPatients = 1 << 8,
    CreatePatient = 1 << 9,
    MangePatient = 1 << 10,
    DeletePatient = 1 << 11,

    ViewTreatments = 1 << 12,
    CreateTreatment = 1 << 13,
    MangeTreatment = 1 << 14,
    DeleteTreatment = 1 << 15,

    ViewProducts = 1 << 16,
    CreateProduct = 1 << 17,
    MangeProduct = 1 << 18,
    DeleteProduct = 1 << 19,

    ViewReports = 1 << 20,
    ManageUsers = 1 << 21,
    MangeChats = 1 << 22,
}

export type UserRole = 'Admin' | 'Doctor' | 'Patient';

export function hasPermission(userPermissions: number, permission: Permission): boolean {
    return (userPermissions & permission) === permission;
}

export function getPermissionsForRole(role: UserRole): number {
    switch (role) {
        case 'Admin':
            return (
                Permission.CreateDoctor |
                Permission.ViewDoctors |
                Permission.MangeDoctor |
                Permission.DeleteDoctor |
                Permission.ViewAppointments |
                Permission.CreateAppointment |
                Permission.MangeAppointment |
                Permission.CancelAppointment |
                Permission.ViewPatients |
                Permission.CreatePatient |
                Permission.MangePatient |
                Permission.DeletePatient |
                Permission.ViewTreatments |
                Permission.CreateTreatment |
                Permission.MangeTreatment |
                Permission.DeleteTreatment |
                Permission.ViewProducts |
                Permission.CreateProduct |
                Permission.MangeProduct |
                Permission.DeleteProduct |
                Permission.ViewReports |
                Permission.ManageUsers |
                Permission.MangeChats
            );

        case 'Doctor':
            return (
                Permission.ViewAppointments |
                Permission.CreateAppointment |
                Permission.MangeAppointment |
                Permission.CancelAppointment |
                Permission.ViewPatients |
                Permission.ViewProducts |
                Permission.ViewTreatments |
                Permission.ViewDoctors |
                Permission.CreateTreatment |
                Permission.MangeTreatment |
                Permission.MangeChats
            );

        case 'Patient':
            return (
                Permission.ViewDoctors |
                Permission.ViewProducts |
                Permission.ViewPatients |
                Permission.ViewTreatments |
                Permission.ViewAppointments 
            );

        default:
            return 0;
    }
}