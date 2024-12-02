import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import MyMessages from "./components/MyMessages";
import { useEffect, useState } from "react";

import SignIn from "./SignIn";

export default function JoyMessagesTemplate() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogin = (authToken) => {
    localStorage.setItem("user", authToken);
    setUser(authToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("canciones");
    setUser(null);
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        {!user ? (
          <SignIn onLogin={handleLogin} />
        ) : (
          <Box component="main" className="MainContent" sx={{ flex: 1 }}>
            <MyMessages handleLogout={handleLogout} />
          </Box>
        )}
      </Box>
    </CssVarsProvider>
  );
}
