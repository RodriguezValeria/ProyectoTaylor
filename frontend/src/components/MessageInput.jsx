import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import { Stack, Typography } from "@mui/joy";
import Slider from "./Slider";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

export default function MessageInput(props) {
  const { textAreaValue, setTextAreaValue, onSubmit } = props;
  const textAreaRef = React.useRef(null);

  const [temperature, setTemperature] = React.useState(0.3);
  const handleClick = () => {
    if (textAreaValue.trim() !== "") {
      onSubmit(temperature);
      setTextAreaValue("");
    }
  };
  return (
    <Box sx={{ px: 2, pb: 3 }}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          ref={textAreaRef}
          onChange={(event) => {
            setTextAreaValue(event.target.value);
          }}
          value={textAreaValue}
          minRows={3}
          maxRows={10}
          endDecorator={
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                flexGrow: 1,
                py: 1,
                pr: 1,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ pl: 2, pr: 3, color: "text.secondary" }}
                  >
                    Tempearature:
                  </Typography>
                </Box>
                <Slider
                  temperature={temperature}
                  setTemperature={setTemperature}
                />
              </Box>
              <Button
                size="sm"
                color="primary"
                sx={{ alignSelf: "center", borderRadius: "sm" }}
                endDecorator={<SendRoundedIcon />}
                onClick={handleClick}
              >
                Send
              </Button>
            </Stack>
          }
          onKeyDown={(event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
              handleClick();
            }
          }}
          sx={{
            "& textarea:first-of-type": {
              minHeight: 72,
            },
          }}
        />
      </FormControl>
    </Box>
  );
}
