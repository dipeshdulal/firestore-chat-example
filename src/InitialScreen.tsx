import React from 'react'
import { useState } from 'react'

interface InitialScreenProps {
    onSubmit: (roomId: string, username: string) => void;
}

export const InitialScreen: React.FC<InitialScreenProps> = ({
    onSubmit
}) => {

    const [roomID, setRoomID] = useState("");
    const [username, setUsername] = useState("");

    return (
        <div className="flex items-center justify-center flex-col px-10 max-w-lg">
            <h1 className="text-lg font-bold font-mono my-5">🔥 firestore chat 💬 </h1>
            <h3 className="py-5">Enter <span className="font-mono bg-gray-200">room_id</span> and <span className="font-mono bg-gray-200">username</span> to join.</h3>
            <form className="flex flex-row" onSubmit={() => {
                onSubmit(roomID, username)
            }}>
                <input required className="flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-r-none font-mono" placeholder="room_id" />
                <input required className="flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-r-none font-mono" placeholder="username" />
                <input type="submit" className={`transition-all delay-300 ease flex-shrink-0 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 rounded-l-none bg-purple-600`} value="JOIN" />
            </form>
        </div>
    )
}
