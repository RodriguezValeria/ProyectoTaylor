import * as React from "react";
import { useState, useEffect } from "react";

import Sheet from "@mui/joy/Sheet";

import MessagesPane from "./MessagesPane";
import ChatsPane from "./ChatsPane";

const songsEmpty = [
  {
    id: "1",
    info: {
      title: "New Chat",
      avatar: "/static/images/avatar/2.jpg",
      online: true,
    },
    time: "Just now",
    messages: [],
  },
];

export default function MyProfile({handleLogout}) {
  const [canciones, setCanciones] = useState([]);
  const [selectedChat, setSelectedChat] = React.useState(songsEmpty[0]);

  useEffect(() => {
    const storedSongs = localStorage.getItem("canciones");
    if (!storedSongs) {
      localStorage.setItem("canciones", JSON.stringify(songsEmpty));
      setCanciones(songsEmpty);
    } else {
      setCanciones(JSON.parse(storedSongs));
    }
  }, []);

  useEffect(() => {
    if (canciones.length > 0) {
      setSelectedChat(canciones[0]);
    }
  }, [canciones]);

  const updateChats = (chatId, newMessages) => {
    const updatedChats = canciones.map((chat) =>
      chat.id === chatId ? { ...chat, messages: newMessages } : chat
    );
    setCanciones(updatedChats);
    localStorage.setItem("canciones", JSON.stringify(updatedChats));
  };



  return (
    <Sheet
      sx={{
        flex: 1,
        width: "100%",
        mx: "auto",
        pt: { xs: "var(--Header-height)", md: 0 },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(min-content, min(30%, 400px)) 1fr",
        },
      }}
    >
      <Sheet
        sx={{
          position: { xs: "fixed", sm: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--MessagesPane-slideIn, 0) - 1)))",
            sm: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 100,
          width: "100%",
          top: 52,
        }}
      >
        <ChatsPane
          songs={canciones}
          setCanciones={setCanciones}
          selectedChatId={selectedChat.id}
          setSelectedChat={setSelectedChat}
          handleLogout={handleLogout}
          updateChats={updateChats}
        />
      </Sheet>
      <MessagesPane chat={selectedChat} updateChats={updateChats} />
    </Sheet>
  );
}
