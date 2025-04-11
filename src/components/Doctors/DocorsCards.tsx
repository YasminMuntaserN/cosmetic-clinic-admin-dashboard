import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay } from 'swiper/modules';
import {useDoctorsList} from "../Doctors/hooks/useDoctor.ts";
import {useEffect} from "react";
import {Doctor} from "../../types/doctor.ts";
import {DoctorCard} from "./DoctorCard.tsx";

import 'swiper/css';
import 'swiper/css/autoplay';

export function DoctorsCards() {
    const { getDoctorsList, doctors, isLoading, error } = useDoctorsList();

    useEffect(() => {
        getDoctorsList();
    }, []);

    if (error) return <p>Something went wrong</p>;

    return (
        <div className="relative rounded-lg border font-slab bg-white px-4 py-5 lg:px-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="border-b-2 mb-4">
                <h1 className="text-xl lg:text-2xl font-bold text-center">Doctors</h1>
            </div>
            {isLoading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 1 },
                        1024: { slidesPerView:1 },
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                >
                    {doctors?.map((doctor: Doctor) => (
                        <SwiperSlide key={doctor.id}>
                            <DoctorCard doctor={doctor} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}