import {PageLayout} from "../components/ui/PageLayout.tsx";
import ProductCategoriesReport from "../components/Reports/ProductCategoriesReport.tsx";
import TreatmentCategoriesReport from "../components/Reports/TreatmentCategoriesReport.tsx";
import AppointmentStatusReport from "../components/Reports/AppointmentStatusReport.tsx";
import ProductStockLevel from "../components/Reports/ProductStockLevel..tsx";


export function Reports() {
    return (
        <PageLayout>
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