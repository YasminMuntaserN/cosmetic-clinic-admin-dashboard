import {Dispatch, SetStateAction, useEffect, useState} from "react";
import { Minus, X } from "lucide-react";
import toast from "react-hot-toast";
import {useClinic} from "../../context/ClinicContext.tsx";

interface InputChipsProps {
    name: string;
    handleData:Dispatch<SetStateAction<string[]>> | any;
    data:string[];
    required?: boolean;
    addMode?: boolean;
}

export function InputChips({ name ,data ,handleData ,required}: InputChipsProps) {
    const {formMode} =useClinic();
    const [inputValue, setInputValue] = useState<string>("");
    const [isShown, setIsShown] = useState<boolean>(false);
    
    console.log(formMode);
    console.log(formMode.isAdd);
    
    useEffect(() => {
        if(required){
            if(data.length === 0 && !formMode.isAdd){
               if(inputValue === "" ) {
                   toast.error(`Please enter  at least one ${name}`);
               }}}
            
    } ,[required ,inputValue ,data]);
    
    return (
        <div className="mt-1 p-2 border-2 border-dashed border-basic rounded-lg text-gray-500">
            <div className="flex justify-between items-center border-b-2">
                <h1 className="font-semibold">{name}</h1>
                <Minus className="cursor-pointer" onClick={() => setIsShown(!isShown)} />
            </div>

            {isShown && (
                <>
                    <input
                        className="mt-2 w-full p-2 border rounded-md text-gray-500 text-sm focus:outline-basic"
                        placeholder={`Enter a ${name} and press Enter`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && inputValue.trim()) {
                                e.preventDefault();
                                if (!data.includes(inputValue.trim())) {
                                    handleData([...data, inputValue.trim()]);
                                    setInputValue("");
                                }
                            }
                        }}
                    />

                    <div className="mt-2 flex flex-wrap gap-2">
                        {data.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-1 px-2 py-1 bg-gray-200 rounded-full text-sm"
                            >
                                <span>{item}</span>
                                <X
                                    className="w-4 h-4 cursor-pointer"
                                    onClick={() => handleData(data.filter((c) => c !== item))}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

