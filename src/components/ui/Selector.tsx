import {useSelector} from "../../hooks/useSelector.ts";
import {useEffect} from "react";
import {useFormContext} from "react-hook-form";
import {useClinic} from "../../context/ClinicContext.tsx";
import {ErrorMessage} from "./ErrorMessage.tsx";

interface SelectorProps {
    dataName: string;
    defaultValue?: string;
}

function getValue(data: any, dataName: string) {
    if (dataName === "Doctors" || dataName === "Patients")
        return `${data.firstName} ${data.lastName}`;
    return data.name;
}

export function Selector({dataName, defaultValue}: SelectorProps) {
    const {register, setValue} = useFormContext();
    const {getSelectorData, SelectorData, isLoading, error} = useSelector<any>();
    const {setSelectedUserId} = useClinic();

    useEffect(() => {
        getSelectorData(dataName, {
            onSuccess: (data: any[]) => {
                if (defaultValue) {
                    console.log(defaultValue)
                    const defaultItem = data.find((x) => getValue(x, dataName) === defaultValue);
                    console.log(defaultItem)
                    if (defaultItem) {
                        setValue(dataName, defaultItem.id);
                        if (dataName === "Doctors" || dataName === "Patients") {
                            setSelectedUserId(defaultItem.userId);
                        }
                    }
                }
            }
        });
    }, [dataName, defaultValue, getSelectorData, setSelectedUserId, setValue]);

    const handleSelectData = (id: string) => {
        const selected = SelectorData.find((x) => x.id === id);
        if (dataName === "Doctors" || dataName === "Patients") {
            setSelectedUserId(selected?.userId);
        }
    };

    if (error) return <ErrorMessage />;


    return isLoading ? (
        <p>Loading...</p>
    ) : (
        <select
            {...register(dataName, {
                required: "This field is required",
                onChange: (e) => handleSelectData(e.target.value),
            })}
            className={StyledSelect}
            defaultValue={defaultValue || ""}
        >
            <option value="" disabled>Select {dataName}</option>
            {SelectorData.map((data) => (
                <div key={data.id} className="py-2">
                    <option
                        value={data.id}
                        disabled={dataName === "Doctors" && !data.isAvailable}
                        className={`
                            py-2 px-3
                            ${dataName === "Doctors" && !data.isAvailable ? 'text-red-500 font-bold bg-gray-300' : ''}
                        `}>
                            <span className="font-medium">{getValue(data, dataName)}</span>
                        {dataName === "Doctors" && (<span>{data.isAvailable ? '' : '  _ ‼️Unavailable'}</span>
                        )}
                    </option>
                </div>
            ))}
        </select>
    );
}

const StyledSelect =
    "mt-1 block w-full p-2 border rounded-md bg-white text-gray-500 text-sm hover:bg-white focus:outline-basic";