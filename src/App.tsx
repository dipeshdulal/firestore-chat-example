import { stringify } from "querystring";
import { useState } from "react";
import { Chat } from "./Chat";
import { InitialScreen } from "./InitialScreen";

type Screens = "chat" | "initial"
interface ChatState {
  username: string;
  room_id: string;
}

function App() {

  const [chatState, setChatState] = useState<ChatState>({ room_id: "", username: "" });
  const [screenState, setScreenState] = useState<Screens>("initial")

  return (
    <div className="mx-auto h-screen flex flex-col items-center justify-center">
      {screenState === "chat" && <Chat chatState={chatState} onBackPress={() => setScreenState("initial")} />}
      {screenState === "initial" && <InitialScreen onSubmit={(room_id, username) => {
        setChatState({ room_id, username })
        setScreenState("chat")
      }} />}
    </div>
  );
}

export default App;
