import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import {PageLayout} from "./PageLayout.tsx";

interface ProfileAction {
    icon: ReactNode;
    label: string;
    onClick: () => void;
}

interface ProfileLayoutProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    imageAlt: string;
    contactInfo?: {
        email?: string;
        phone?: string;
    };
    actions: ProfileAction[];
    primaryAction?:ReactNode;
    children: ReactNode;
    backTo: string;
    selectedAction?: string;
    onActionChange: (actionKey: string) => void;
}

export function ProfileLayout({
                                  title,
                                  subtitle,
                                  imageUrl,
                                  imageAlt,
                                  contactInfo,
                                  actions,
                                  primaryAction,
                                  children,
                                  backTo,
                                  onActionChange
                              }: ProfileLayoutProps) {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <div className="flex gap-5 m-5">
                <Button
                    variant="SquareDashedButton"
                    onClick={() => navigate(backTo)}
                >
                    <ArrowLeft />
                </Button>
                <h1 className="font-bold font-slab text-2xl">{title}</h1>
            </div>

            <div className="grid grid-rows-[1fr_1fr] lg:grid-cols-[1fr_2fr] gap-6">
                <div className="flex flex-col gap-6 items-center justify-center bg-white shadow-xl border-3 rounded-lg p-5">
                    <div className="flex flex-col gap-1 items-center justify-center text-center">
                        <img
                            src={imageUrl}
                            alt={imageAlt}
                            className="w-40 h-40 rounded-full object-cover border border-dashed border-basic mb-4"
                        />
                        <h2 className="text-xl font-semibold">{title}</h2>
                        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
                        {contactInfo?.email && (
                            <p className="text-gray-600 text-xs">{contactInfo.email}</p>
                        )}
                        {contactInfo?.phone && (
                            <p className="text-sm mb-5">{contactInfo.phone}</p>
                        )}
                        {primaryAction}
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        {actions.map((action, index) => (
                            <Button
                                key={index}
                                variant="grayBackground"
                                onClick={() => onActionChange(action.label)}
                            >
                                {action.icon}
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    {children}
                </div>
            </div>
        </PageLayout>
    );
}