import React from 'react'
import { Bubble } from './Bubble'

interface ChatProps {
    onBackPress: () => void;
}

export const Chat: React.FC<ChatProps> = ({
    onBackPress
}) => {
    return (
        <>
            <div className="w-screen px-5 flex flex-row items-center justify-between border-solid border-b-2 border-blue-100">
                <a className="bg-gray-200 p-2 rounded hover:bg-gray-300 cursor-pointer" onClick={onBackPress}>⬅️ Back</a>
                <h1 className="text-lg ml-5 font-bold font-mono my-5">🔥 firestore chat 💬 </h1>
            </div>
            <div className="flex-1 flex flex-col-reverse overflow-auto">
                <Bubble username="dipesh" time="11:20 AM" message="ramesh ko kancho choro" />
                <Bubble username="mukesh" time="11:20 AM" right message="test message" />
                <Bubble username="rakesh" time="11:20 AM" message="random and long message that is super long and longest and log that goes to multiple lines as being sent" />
                <Bubble username="rohan" time="11:20 AM" message="Test1" />
                <Bubble username="mukunda" time="11:20 AM" right message="test2" />
                <Bubble username="ramesh" time="11:20 AM" message="test3" />
                <Bubble username="dipesh" time="11:20 AM" right message="test4" />
                <Bubble username="dipesh" time="11:20 AM" message="test5" />
            </div>
            <div className="mx-auto w-screen flex p-10">
                <input className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent rounded-r-none" placeholder="Message..." />
                <button className={`transition-all delay-300 ease flex-shrink-0 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 rounded-l-none bg-purple-600`} >
                    Send
                </button>
            </div>
        </>
    )
}
