import React from 'react'

interface BubbleProps {
    right?: boolean;
    username?: string;
    time?: string;
    message?: string;
}

export const Bubble: React.FC<BubbleProps> = ({
    right,
    username,
    time,
    message,
}) => {
    return (
        <div className={`mt-2 mx-2 flex items-end ${right ? 'flex-row-reverse' : ""}`}>
            {!right && <div className="bg-blue-800 text-white p-5 rounded-full h-10 w-10 flex justify-center items-center"><p>{username?.substr(0,1).toUpperCase()}</p></div>}
            <div className={`p-3 m-2 mb-0 rounded-xl shadow-md ${right ? 'bg-purple-800 rounded-br-none' : 'bg-white'}`}>
                <p className={right ? 'text-white' : `text-gray-500`}>{message}</p>
            </div>
            <p className="text-sm mb-2 text-gray-400 whitespace-nowrap">{time}</p>
        </div>
    )
}
