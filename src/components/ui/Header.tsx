import { Bell, User } from 'lucide-react';
import {Searchbar} from "./Searchbar.tsx";

export function Header() {
  return (
    <header>
      <div className="flex h-16 items-center justify-between px-6">
        <Searchbar />
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-1 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View profile</span>
            <User className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}