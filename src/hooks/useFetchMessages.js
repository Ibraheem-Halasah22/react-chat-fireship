import { useState } from "react";
import { firestore } from "../App";
import { useEffect } from "react";

export default function useFetchMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const unsubscribe = query.onSnapshot((snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  return messages;
}
