export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    stockQuantity: number;
    manufacturer: string;
    ingredients: string[];
    usage: string;
    sideEffects: string[];
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export const ProductsOptions =
    [
        "Skincare",
        "Haircare",
        "Bodycare",
        "SunProtection",
        "AcneTreatment",
        "Brightening",
        "LipCare",
        "EyeCare",
        "PostTreatmentCare"
    ];