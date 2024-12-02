import * as React from "react";
import Box from "@mui/joy/Box";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import AvatarWithStatus from "./AvatarWithStatus";
import IconButton from "@mui/joy/IconButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { toggleMessagesPane } from "../utils";

//Set sender as name of song

export default function ChatListItem({
  id,
  info,
  messages,
  time,
  selectedChatId,
  setSelectedChat,
  onDelete,
}) {
  const selected = selectedChatId === id;
  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={() => {
            toggleMessagesPane();
            setSelectedChat({ id, info, messages });
          }}
          selected={selected}
          color="neutral"
          sx={{ flexDirection: "column", alignItems: "initial", gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={true} src={info.avatar} />
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
              <Typography level="title-sm">{info.title}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: "right" }}>
              <Typography
                level="body-xs"
                noWrap
                sx={{ display: { xs: "none", md: "block" } }}
              >
                {time}
              </Typography>
            </Box>
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              <DeleteRoundedIcon />
            </IconButton>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {!messages[0] ? "No messages yet" : messages[0].content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
