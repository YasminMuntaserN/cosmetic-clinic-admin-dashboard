import { TrendingUp, Clock } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export function DashboardHeader(){
  const navigate =useNavigate();
  return (
    <div className="flex justify-end">
    <div className="flex items-center space-x-4">

      <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-basic bg-secondary hover:bg-gray-700"
      onClick={()=>navigate("/schedule")}>
        <Clock className="h-4 w-4 mr-2" />
        Today's Schedule
      </button>

      <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-basic bg-secondary hover:bg-gray-700"
          onClick={()=>navigate("/reports")}>
        <TrendingUp className="h-4 w-4 mr-2" />
        View Reports
      </button>
    </div>
  </div>
  )
}