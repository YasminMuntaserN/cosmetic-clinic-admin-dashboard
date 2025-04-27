import {Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import { useStockQuantityReport} from "./hook/useReport.ts";
import {useEffect} from "react";
import {Loading} from "../ui/Loading.tsx";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";

function ProductStockLevel() {
    const {getStockQuantityReport , StockQuantityReport  , isLoading, error} =useStockQuantityReport();

    useEffect(() => {
        getStockQuantityReport();
    }, []);
    
    const getColorByValue = (value: number) => {
        if (value < 10) return "#FD0000";     
        if (value >= 10 && value < 20) return "#ff4d4f";
        if (value >= 20 && value < 30) return "#fa8c16";
        if (value >= 30 && value < 40) return "#fadb14";
        if (value >= 40 && value <= 50) return "#CFECD8";
        return "#52c41a";                       
    };
   
    if(isLoading) return <Loading />;
    if (error) return <ErrorMessage/>;
    
    return (
        <div className="bg-white p-6 rounded-lg shadow w-full">
            <h3 className="text-lg font-semibold mb-4">📦 Product Stock Levels</h3>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={StockQuantityReport}>
                    <CartesianGrid strokeDasharray="3 3" /> 
                    <XAxis dataKey="name" tick={{ fontSize: 8 }} interval={0} angle={-10} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                        {StockQuantityReport?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getColorByValue(entry.value)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ProductStockLevel;