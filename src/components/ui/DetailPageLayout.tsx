import {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "./Button.tsx";
import {
    ArrowLeft,
    Settings,
    Trash2,
} from "lucide-react";
import {format} from "date-fns";
import {Logo} from "./Logo.tsx";
import {Badge} from "./Badge.tsx";
import {useMediaQuery} from "../../hooks/useMediaQuery.ts";
import {EditModal} from "./EditModal.tsx";
import {DeleteModal} from "./DeleteModal.tsx";

interface DetailPageLayoutProps {
    title: string;
    imageUrl: string;
    category: string;
    price: number;
    addtionalData: ReactNode;
    backTo: string;
    createdAt: string;
    updatedAt: string;
    children: ReactNode;
    selectedData :any;
    dataType:"treatment" |"product";
}

export function DetailPageLayout({
                                     title,
                                     imageUrl,
                                     category,
                                     price,
                                     addtionalData,
                                     updatedAt,
                                     createdAt,
                                     backTo,
                                     selectedData,
                                      dataType,
                                     children,
                                 }: DetailPageLayoutProps) {
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div className="p-6 max-w-7xl mx-auto font-slab">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex gap-5">
                    <Button
                        variant="SquareDashedButton"
                        onClick={() => navigate(backTo)}
                    >
                        <ArrowLeft/>
                    </Button>
                    <h1 className="text-2xl font-bold font-slab">{title}</h1>
                </div>
                <div className="flex gap-5">
                    <EditModal dataType={dataType} selectedData={selectedData} button={<Button variant="BgDashedButton"> <Settings size={16} className="mr-3"/> Edit </Button>} />
                    <DeleteModal id={selectedData.id}  dataType={dataType} button={<Button variant="BgDashedButton"> <Trash2 size={16} className="mr-3"/> Delete</Button> } />
                </div>
            </div>

            <div className="bg-white p-5">
                {!isMobile && <div className="flex  justify-between m-3">
                    <div className="flex flex-col mt-5">
                        <div className="flex gap-3">
                            <p className="text-sm text-gray-500">Created At : </p>
                            <p className="font-medium">
                                {format(new Date(createdAt), 'MMMM dd, yyyy')}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <p className="text-sm text-gray-500">Last Updated : </p>
                            <p className="font-medium">
                                {format(new Date(updatedAt), 'MMMM dd, yyyy')}
                            </p>
                        </div>
                    </div>
                    <Logo style="w-1/5 "/>
                </div>}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 bg-white">
                    <div className="space-y-6 ">
                        <div className="border-2 rounded-lg  shadow-lg overflow-hidden">
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>

                        <div className="border-2 rounded-lg shadow-lg p-6 space-y-4">
                            <div className="flex justify-between items-center">
                                <Badge variant="info">{category}</Badge>
                                <span className="text-2xl font-bold text-green-600">
                              ${price} 
                            </span>
                            </div>

                            {addtionalData}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
}
