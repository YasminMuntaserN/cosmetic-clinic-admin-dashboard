import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
    message?: string;
    fullPage?: boolean;
}

export function ErrorMessage({
                                 message = 'Something went wrong. Please try again later.',
                                 fullPage = false
                             }: ErrorMessageProps) {
    const content = (
        <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={20} />
            <p>{message}</p>
        </div>
    );

    if (fullPage) {
        return (
            <div className="flex items-center justify-center min-h-screen p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    {content}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            {content}
        </div>
    );
}