import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";


export default function ChatBubble(props) {
  const { content, variant, timestamp, sender } = props;
  const isSent = variant === "sent";
  return (
    <Box sx={{ maxWidth: "60%", minWidth: "auto" }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: "space-between", mb: 0.25 }}
      >
        <Typography level="body-xs">
          {sender === "You" ? sender : sender}
        </Typography>
        <Typography level="body-xs">{timestamp}</Typography>
      </Stack>

      <Box
        sx={{ position: "relative" }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        <Sheet
          color={isSent ? "primary" : "neutral"}
          variant={isSent ? "solid" : "soft"}
          sx={[
            {
              p: 1.25,
              borderRadius: "lg",
            },
            isSent
              ? {
                  borderTopRightRadius: 0,
                }
              : {
                  borderTopRightRadius: "lg",
                },
            isSent
              ? {
                  borderTopLeftRadius: "lg",
                }
              : {
                  borderTopLeftRadius: 0,
                },
            isSent
              ? {
                  backgroundColor: "var(--joy-palette-primary-solidBg)",
                }
              : {
                  backgroundColor: "background.body",
                },
          ]}
        >
          <Typography
            level="body-sm"
            sx={[
              isSent
                ? {
                    color: "var(--joy-palette-common-white)",
                  }
                : {
                    color: "var(--joy-palette-text-primary)",
                    whiteSpace: "pre-wrap",
                  },
            ]}
          >
            {content}
          </Typography>
        </Sheet>
      </Box>
    </Box>
  );
}
