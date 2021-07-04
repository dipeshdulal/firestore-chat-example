import dayjs from "dayjs";
import firebase from "firebase";
import { MutationFunction, QueryFunction } from "react-query"
import { db } from "./firebase"

export interface ChatMessage {
    text: string;
    username: string;
    roomId: string;
    createdAt?: Date;
    id?: string;
}

const sendMessage: MutationFunction<any, ChatMessage> = async (message) => {
    const docRef = db.collection(`Chats/${message.roomId}/messages`).doc();
    await docRef.set({
        ...message,
        id: docRef.id,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

const getMessages: QueryFunction<ChatMessage[]> = async (key) => {
    const roomId = key.queryKey[1];

    const snapshot = await db.collection(`Chats/${roomId}/messages`).get();
    const retMessage: ChatMessage[] = []
    for (const message of snapshot.docs) {
        const data = message.data() as any;
        retMessage.push({ ...data, createdAt: data.createdAt.toDate() })
    }
    return retMessage;
}

export const chatService = {
    sendMessage,
    getMessages
}