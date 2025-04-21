import {Sidebar} from "./Sidebar.tsx";
import {Header} from "./Header.tsx";
import {ReactNode} from "react";

export function PageLayout({children}: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar/>
            <div className="flex flex-1 flex-col overflow-hidden">
                <Header/>
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
