import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {useProductCategoriesReport} from "./hook/useReport.ts";
import {Loading} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {useEffect} from "react";

function ProductCategoriesReport() {
    
    const { getProductCategoriesReport , ProductCategoriesReport  , isLoading , error} =useProductCategoriesReport();

    useEffect(() => {
        getProductCategoriesReport();
    }, []);
    
    if(isLoading) return <Loading />;
    if (error) return <ErrorMessage/>;
    

    const COLORS = ['#f9e1a1', '#f4c54a', '#f0ab2e', '#d68a1e', '#9a6a1f'];

    return (
        <div className="bg-white p-6 rounded-lg shadow font-slab">
            <h3 className="text-lg font-semibold mb-1 text-[#4D3502]">Product Categories Distribution</h3>
            <p className="text-gray-600 mb-4 text-sm text-[#9a6a1f]">
                This chart shows how products are grouped across different categories, offering a visual overview of
                inventory distribution by type.
            </p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={ProductCategoriesReport}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({categoryName, percent}) => `${categoryName} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {ProductCategoriesReport?.map((entry, index) => (
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

export default ProductCategoriesReport;