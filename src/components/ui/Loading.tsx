
import { Loader2 } from 'lucide-react';

interface LoadingProps {
    fullPage?: boolean;
    size?: number;
}

export function Loading({ fullPage = false, size = 24 }: LoadingProps) {
    if (fullPage) {
        return (
            <div className="flex items-center justify-center min-h-screen p-8">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-basic" size={48} />
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
            <Loader2 className="animate-spin text-basic" size={size} />
        </div>
    );
}

export function ButtonLoader({ size = 16 }: { size?: number }) {
    return <Loader2 className="animate-spin" size={size} />;
}