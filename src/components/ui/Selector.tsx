import {useSelector} from "../../hooks/useSelector.ts";
import {useEffect, useState} from "react";

interface  SelectorProps{
    dataName:string;
    register:(data:any)=>void;
    defaultValue?:string;
}

function getValue(data: any, dataName: string ) {
    if (dataName === "Doctors" || dataName === "Patients") return `${data.firstName} ${data.lastName}`;
    return data.name;
}
export function Selector({ dataName, register, defaultValue }: SelectorProps) {
    const { getSelectorData, SelectorData, isLoading, error } = useSelector<any>();
    const [selectDefaultValue, setSelectDefaultValue] = useState<string | undefined>(undefined);

    useEffect(() => {
        getSelectorData(dataName);
    }, [dataName]);

    useEffect(() => {
        if (SelectorData.length > 0) {
            const defaultItem = SelectorData.find((x) => x.id === defaultValue);
            if (defaultItem) {
                setSelectDefaultValue(defaultItem.id); 
            }
        }
    }, [SelectorData, defaultValue]);

    if (error) return <p>Something went wrong</p>;

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <select
                    value={selectDefaultValue} 
                    {...register}
                    onChange={(e) => setSelectDefaultValue(e.target.value)} 
                    className={StyledSelect}
                >
                    <option value="" disabled>{defaultValue}</option>
                    {SelectorData.map((data) => (
                        <option key={data.id} value={data.id} >
                            {getValue(data, dataName)}
                        </option>
                    ))}
                </select>
            )}
        </>
    );
}
const StyledSelect ="mt-1 block w-full p-2 border rounded-md bg-white text-gray-500 text-sm hover:bg-white focus:outline-basic ";
