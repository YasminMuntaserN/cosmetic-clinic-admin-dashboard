export interface Treatment {
    id: string;
    name: string;
    description: string;
    category: string;
    durationMinutes: number; 
    price: number;
    requiredEquipments: string[];
    preRequisites: string[];
    afterCare: string[];
    risks: string[];
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export const CategoriesOptions =
[
    "FacialTreatments",
    "LaserTreatments",
    "Injectables",
    "BodyContouring",
    "SkinRejuvenation",
    "HairTreatments",
    "AcneTreatments",
    "AntiAgingTreatments",
    "PigmentationTreatments",
    "PostSurgeryCare"
];