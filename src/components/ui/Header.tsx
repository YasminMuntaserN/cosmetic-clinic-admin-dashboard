import {Searchbar} from "./Searchbar.tsx";
import UserHeader from "../User/UserHeader.tsx";
import UnreadMessagesCount from "../User/UnreadMessagesCount.tsx";

export function Header() {
    
    return (
        <header>
            <div className="ml-10 flex h-16 items-center justify-between px-6 font-slab">
                <Searchbar/>
                <div className="flex items-center gap-4">
                   <UnreadMessagesCount/>
                    <UserHeader/>
                </div>
            </div>
        </header>
    );
}