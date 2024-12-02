import * as React from "react";
import Alert from "@mui/joy/Alert";

import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import AvatarWithStatus from "./AvatarWithStatus";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import MessagesPaneHeader from "./MessagesPaneHeader";

export default function MessagesPane(props) {
  const { chat, updateChats } = props;
  const [chatMessages, setChatMessages] = React.useState(chat.messages);
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (temperature) => {
    if (chatMessages.length === 0) {
      chat.info.title = textAreaValue;
    }

    const newId = chatMessages.length + 1;
    const newIdString = newId.toString();

    // Add the new message to the chat list
    const newMessages = [
      ...chatMessages,
      {
        id: newIdString,
        sender: "You",
        content: textAreaValue,
        timestamp: "Just now",
      },
    ];
    setChatMessages(newMessages);

    updateChats(chat.id, newMessages);

    // Prepare the data for the POST request
    const postData = {
      model: "taylor_swift",
      messages: [{ start_string: textAreaValue }],
      temperature: temperature,
    };

    try {
      console.log("Sending POST request with data:", postData);
      setLoading(true);
      const response = await fetch("api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Handle the response data as needed
      // For example, you can add the response to the chat messages
      const updatedMessages = [
        ...newMessages,
        {
          id: (newMessages.length + 1).toString(),
          sender: "Taylor AI",
          content: data.response, // Adjust this based on the actual response structure
          timestamp: "Just now",
        },
      ];
      setChatMessages(updatedMessages);
      updateChats(chat.id, updatedMessages);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setChatMessages(chat.messages);
  }, [chat.messages]);

  return (
    <Sheet
      sx={{
        height: { xs: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      <MessagesPaneHeader info={chat.info} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          px: 2,
          py: 3,
          overflowY: "scroll",
          flexDirection: "column-reverse",
        }}
      >
        <Stack spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Box sx={
            {
              display: 'flex',
              justifyContent: 'center',

              width: "100%",
              textAlign: "center",
            }
          }>
            <Alert
              color="warning"
              sx={{ width: "300px", textAlign: "center" }}
            >
              Write a message to Taylor AI to get started!
            </Alert>
          </Box>
          {chatMessages.map((message, index) => {
            const isYou = message.sender === "You";
            return (
              <Stack
                key={index}
                direction="row"
                spacing={2}
                sx={{ flexDirection: isYou ? "row-reverse" : "row" }}
              >
                {message.sender !== "You" && (
                  <AvatarWithStatus
                    online={message.sender.online}
                    src={message.sender.avatar}
                  />
                )}
                <ChatBubble
                  variant={isYou ? "sent" : "received"}
                  {...message}
                />
              </Stack>
            );
          })}
          {loading && (
            <Stack direction="row" spacing={2} sx={{ flexDirection: "row" }}>
              <AvatarWithStatus
                online={chatMessages[0].sender.online}
                src={chatMessages[0].sender.avatar}
              />
              <ChatBubble
                variant={"received"}
                timestamp={"Just now"}
                content={"Loading..."}
                sender={"Taylor AI"}
              />
            </Stack>
          )}
        </Stack>
      </Box>
      <MessageInput
        textAreaValue={textAreaValue}
        setTextAreaValue={setTextAreaValue}
        onSubmit={handleSubmit}
      />
    </Sheet>
  );
}
