import {useChat} from "../../context/ChatContext.tsx";
import {User} from "../../types/User.ts";
import {Avatar} from "../ui/Avatar.tsx";

function UsersList() {
    const { filteredUsers, selectedUser, selectUser } = useChat();

    return (
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {filteredUsers && filteredUsers.length > 0 ? (
                filteredUsers.map((user: User) => (
                    <div
                        key={user.id}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            selectedUser?.id === user.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => selectUser(user)}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <Avatar role={user?.role}/>
                                <span
                                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                                        user.status === 1 ? 'bg-green-500' : 'bg-gray-400'
                                    }`}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">No users found</p>
                </div>
            )}
        </div>
    );
}

export default UsersList;