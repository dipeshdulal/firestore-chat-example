import firebase from "firebase";
import { InfiniteData, MutationFunction, QueryFunction, QueryKey } from "react-query"
import { db } from "./firebase"
import { queryClient } from "./queryClient";

export interface ChatMessage {
    text: string;
    username: string;
    roomId: string;
    createdAt?: Date;
    id?: string;
}

const PER_PAGE = 20;

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
    let date = new Date();
    if (key.pageParam) {
        date = key.pageParam;
    }

    const snapshot = await db.collection(`Chats/${roomId}/messages`).orderBy("createdAt", "desc").where("createdAt", "<", date).limit(PER_PAGE).get();
    const retMessage: ChatMessage[] = []
    for (const message of snapshot.docs) {
        const data = message.data() as any;
        retMessage.push({ ...data, createdAt: data.createdAt.toDate() })
    }
    return retMessage;
}

const hasMessageBefore = async (roomId: string, date?: Date) => {
    if (!date) {
        return false;
    }
    const data = await db.collection(`Chats/${roomId}/messages`).orderBy("createdAt", "desc").where("createdAt", "<", date).limit(1).get()
    return !!data.docs.length;
}

const attachMessageListener = (key: QueryKey): () => void => {
    const roomId = key[1];
    return db.collection(`Chats/${roomId}/messages`).orderBy("createdAt", "desc").where("createdAt", ">", new Date()).onSnapshot((snap) => {
        const changes = snap.docChanges()
        for (const change of changes) {
            if (change.type === "added") {
                const data = change.doc.data();
                const message = { ...data, createdAt: data.createdAt.toDate() } as ChatMessage;
                addMessageToQueryCache(key, message);
            }
        }
    })
}

const addMessageToQueryCache = (key: QueryKey, message: ChatMessage) => {
    const cache = queryClient.getQueryData<InfiniteData<ChatMessage[]>>(key);
    const messages = cache?.pages.flat() || [];
    messages.unshift(message);

    const newData: ChatMessage[][] = [];
    for (let i = 0; i < messages.length; i += PER_PAGE) {
        const currentPage = messages.slice(i, i + PER_PAGE);
        newData.push(currentPage);
    }

    queryClient.setQueryData<InfiniteData<ChatMessage[]>>(key, data => {
        return {
            pageParams: data?.pageParams || [],
            pages: newData,
        }
    })
}

export const chatService = {
    sendMessage,
    getMessages,
    attachMessageListener,
    PER_PAGE,
    hasMessageBefore,
}