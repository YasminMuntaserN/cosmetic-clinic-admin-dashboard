import {PageLayout} from "../components/ui/PageLayout.tsx";
import ProductCategoriesReport from "../components/Reports/ProductCategoriesReport.tsx";
import TreatmentCategoriesReport from "../components/Reports/TreatmentCategoriesReport.tsx";
import AppointmentStatusReport from "../components/Reports/AppointmentStatusReport.tsx";
import ProductStockLevel from "../components/Reports/ProductStockLevel..tsx";
import {Button} from "../components/ui/Button.tsx";
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";


export function Reports() {
    const navigate =useNavigate();
    return (
        <PageLayout>
            <Button
                variant="SquareDashedButton"
                onClick={() => navigate('/dashboard')}
            >
                <ArrowLeft/>
            </Button>
            <div className="space-y-8 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TreatmentCategoriesReport/>
                    <ProductCategoriesReport/>
                </div>
                <AppointmentStatusReport/>
                <ProductStockLevel/>
            </div>
        </PageLayout>
);
}