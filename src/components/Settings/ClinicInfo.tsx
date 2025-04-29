import {WorkHours} from "../Dashboard/WorkHours.tsx";
import {Activity, FolderPen, MapPin} from "lucide-react";
import {useClinic} from "../../context/ClinicContext.tsx";
import {usePermission} from "../User/hooks/usePermission.ts";
import {Permission} from "../../types/Permission.ts";

export function ClinicInfo() {
    const {clinicName ,setClinicName , clinicAddress ,setClinicAddress}=useClinic();
    const hasRequiredPermission =usePermission(Permission.ManageUsers);
    
    
    return (
        <div className="flex space-y-6 flex-col">
            <div className="rounded-lg bg-white p-6 shadow-md font-slab">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Clinic Information</h2>
                    <Activity className="h-6 w-6 text-basic"/>
                </div>
                <div className="mt-6 space-y-4">

                    <div className="grid grid-cols-[0.1fr_0.5fr_2fr]">
                        <FolderPen size={14} className="text-gray-700"/>
                        <label className="block text-sm font-medium text-gray-700"> Clinic Name</label>
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border-b-2 rounded-md text-gray-500 text-sm focus:outline-basic disabled:cursor-not-allowed"
                            defaultValue={clinicName}
                            disabled={!hasRequiredPermission}
                            onChange={(e)=>setClinicName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-[0.1fr_0.5fr_2fr]">
                        <MapPin size={14} className="text-gray-700"/>
                        <label className="block text-sm font-medium text-gray-700"> Address</label>
                        <textarea
                            className="mt-1 w-full p-2 border-b-2 rounded-md text-gray-500 text-sm focus:outline-basic disabled:cursor-not-allowed"
                            defaultValue={clinicAddress}
                            disabled={!hasRequiredPermission}
                            onChange={(e)=>setClinicAddress(e.target.value)}
                        />
                    </div>

                </div>
            </div>
            <WorkHours/>
        </div>
    );
}
