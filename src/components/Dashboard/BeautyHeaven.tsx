import {useClinic} from "../../context/ClinicContext.tsx";

export function BeautyHeaven() {
    const {clinicName} = useClinic();
    
    return (
        <div className="relative overflow-hidden rounded-lg bg-[#ededcc] shadow">
            <div className="absolute inset-0 bg-amber-900 opacity-10 z-10"></div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.3fr]">
                <div className="relative z-20 px-6 py-10 lg:px-24 lg:py-20">
                    <h1 className="font-bold font-slab text-3xl lg:text-4xl text-secondary">
                        Welcome to {clinicName}
                    </h1>
                    <p className="mt-5 font-slab text-base lg:text-lg">
                        Yara's Beauty Heaven is a premier destination for luxury skincare and advanced cosmetic
                        treatments.
                        Our platform empowers you to manage appointments, oversee patient records, track inventory, and
                        collaborate
                        with our team of expert dermatologists and estheticians. Together, we create transformative
                        beauty experiences
                        that inspire confidence and trust. Let's continue delivering excellence one client at a time.
                    </p>
                </div>
                <div className="relative z-20 hidden lg:block">
                    <img
                        src="./BeautyHeaven.png"
                        alt="BeautyHeaven"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
