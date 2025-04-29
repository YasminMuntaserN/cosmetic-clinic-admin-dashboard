import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {useTreatmentCategoriesReport} from "./hook/useReport.ts";
import {Loading} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {useEffect} from "react";

function TreatmentCategoriesReport() {
    
    const { getTreatmentCategoriesReport , TreatmentCategoriesReport  , isLoading , error} =useTreatmentCategoriesReport();

    useEffect(() => {
        getTreatmentCategoriesReport();
    }, []);
    
    if(isLoading) return <Loading />;
    if (error) return <ErrorMessage/>;
    

    const COLORS = ['#34495e', '#5d6d7e', '#aab7c8', '#1F2F3E', '#C1CAD2'];

    return (
        <div className="bg-white p-6 rounded-lg shadow font-slab">
            <h3 className="text-lg font-semibold mb-1">Treatment Categories Distribution</h3>
            <p className="text-gray-600 mb-4 text-sm">
                This chart illustrates how treatments are distributed among the different categories, helping visualize
                the most and least common types of treatments provided.
            </p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={TreatmentCategoriesReport}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({categoryName, percent}) => `${categoryName} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {TreatmentCategoriesReport?.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Tooltip/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
        ;
}

export default TreatmentCategoriesReport;