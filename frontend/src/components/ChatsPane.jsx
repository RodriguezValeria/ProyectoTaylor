import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { Box, Chip, IconButton, Input } from "@mui/joy";
import List from "@mui/joy/List";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChatListItem from "./ChatListItem";
import { toggleMessagesPane } from "../utils";
import { Button } from "@mui/joy";

export default function ChatsPane({
  songs,
  setSelectedChat,
  selectedChatId,
  handleLogout,
  setCanciones,
  updateChats,
}) {
  const handleNewChat = () => {
    const newChat = {
      id: songs.length + 1,
      info: {
        title: "New Chat",
        avatar: "/static/images/avatar/2.jpg",
        online: true,
      },
      time: "Just now",
      messages: [],
    };
    const updatedSongs = [...songs, newChat];
    setSelectedChat(newChat);
    setCanciones(updatedSongs);
    localStorage.setItem("canciones", JSON.stringify(updatedSongs));
    setSelectedChat(newChat);
  };

  const handleDeleteChat = (chatId) => {
    const updatedSongs = songs.filter((chat) => chat.id !== chatId);
    setCanciones(updatedSongs);
    localStorage.setItem("canciones", JSON.stringify(updatedSongs));
    if (selectedChatId === chatId && updatedSongs.length > 0) {
      setSelectedChat(updatedSongs[0]);
    } else if (updatedSongs.length === 0) {
      setSelectedChat(null);
    }
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid",
        borderColor: "divider",
        height: { sm: "calc(100dvh - var(--Header-height))", md: "100dvh" },
        overflowY: "auto",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          pb: 1.5,
        }}
      >
        <Typography
          component="h1"
          endDecorator={
            <Chip
              variant="soft"
              color="primary"
              size="md"
              slotProps={{ root: { component: "span" } }}
            >
              {songs.length}
            </Chip>
          }
          sx={{
            fontSize: { xs: "md", md: "lg" },
            fontWeight: "lg",
            mr: "auto",
          }}
        >
          Song Chats
        </Typography>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          sx={{ display: { xs: "none", sm: "unset" } }}
          onClick={handleNewChat}
        >
          <EditNoteRoundedIcon />
        </IconButton>
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          size="sm"
          onClick={() => {
            toggleMessagesPane();
          }}
          sx={{ display: { sm: "none" } }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </Stack>
      <Box sx={{ px: 2, pb: 1.5 }}>
        <Input
          size="sm"
          startDecorator={<SearchRoundedIcon />}
          placeholder="Search"
          aria-label="Search"
        />
      </Box>
      <List
        sx={{
          py: 0,
          "--ListItem-paddingY": "0.75rem",
          "--ListItem-paddingX": "1rem",
        }}
      >
        {songs.map((chat) => (
          <ChatListItem
            key={chat.id}
            {...chat}
            setSelectedChat={setSelectedChat}
            selectedChatId={selectedChatId}
            onDelete={handleDeleteChat}
          />
        ))}
      </List>
      <Box sx={{ mb: 2, px: 2 }}>
        <Button onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Box>
    </Sheet>
  );
}
