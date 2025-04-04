import { useChat } from "../../context/ChatContext";
import {format} from "date-fns";
import {Avatar} from "../ui/Avatar.tsx";

function ChatHeader(){
  const {selectedUser  }=useChat();
  return (
            <div className={`p-4  bg-white `}>
                <div className="flex items-center space-x-4">
                    <Avatar role={selectedUser?.role}/>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            {selectedUser?.firstName} {selectedUser?.lastName}
                        </h2>
                        {selectedUser?.status === 0 ?   
                            <p className="text-xs text-gray-400">
                                Last seen: {format(new Date(selectedUser?.lastSeen), 'HH:mm')}
                            </p>
                            :
                            <p className="text-green-600 font-medium ">
                             Online
                            </p>
                        }
                    </div>
                </div>
            </div>
  );
}

export default ChatHeader;