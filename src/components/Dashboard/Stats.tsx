import {Users, UserRound, Calendar, Package, LucideIcon ,Syringe} from 'lucide-react';
import {useCountStats} from "../Reports/hook/useReport.ts";
import {ErrorMessage} from "../ui/ErrorMessage.tsx";
import {Loading} from "../ui/Loading.tsx";
import {useEffect, useState} from "react";

interface Stats {
  name: string;
  icon: LucideIcon;
  value: number;
}

function getData(name: string, isIcon: true): LucideIcon;
function getData(name: string, isIcon?: false): string;

function getData(name: string, isIcon?: boolean): string | LucideIcon {
  switch (name) {
    case "appointments":
      return isIcon ? Calendar : "Appointments Today";
    case "doctors":
      return isIcon ? Users : "Total Doctors";
    case "patients":
      return isIcon ? UserRound : "Active Patients";
    case "products":
      return isIcon ? Package : "Products in Stock";
    case "treatments":
      return isIcon ? Syringe  : "Available Treatments";
    default:
      return isIcon ? Calendar : "Unknown";
  }
}

export function Stats() {
  const { getCountStats, CountStats, isLoading, error } = useCountStats();
  const [statsInfo, setStatsInfo] = useState<Stats[]>([]);

  useEffect(() => {
    getCountStats(); 
  }, []);

  useEffect(() => {
    if (CountStats) {
      const stats: Stats[] = CountStats.map((stat) => ({
        name: getData(stat.name, false),
        icon: getData(stat.name, true),
        value: stat.value,
      }));
      setStatsInfo(stats);
    }
  }, [CountStats]);

  return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {error && <ErrorMessage />}
        {isLoading && <Loading />}
        {statsInfo.map((stat) => (
            <div
                key={stat.name}
                className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow"
            >
              <dt>
                <div className="absolute rounded-md bg-secondary p-3">
                  <stat.icon className="h-6 w-6 text-basic" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
        ))}
      </div>
  );
}
