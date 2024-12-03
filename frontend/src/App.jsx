import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import MyMessages from "./components/MyMessages";
import { useEffect, useState } from "react";
import { googleLogout } from '@react-oauth/google';


import SignIn from "./SignIn";


export default function JoyMessagesTemplate() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleSuccess = (credentialResponse) => {
    console.log("Login Success:", credentialResponse);

    const decoded = JSON.parse(
      atob(credentialResponse.credential.split(".")[1])
    );
    console.log("User Info:", decoded);
    // setUser(decoded);
    
    const userId = decoded.sub;
    
    setUser(userId);
    // Save the user data in localStorage
    // localStorage.setItem("user", JSON.stringify(decoded));
    localStorage.setItem("user", userId);
  };

  const handleFailure = (error) => {
    console.error("Login Failed:", error);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    googleLogout();
    // localStorage.removeItem("canciones");
  };

  return (
      <CssVarsProvider disableTransitionOnChange>
        <CssBaseline />
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          {!user ? (
            <SignIn onLogin={handleSuccess} handleFailure={handleFailure} />
          ) : (
            <Box component="main" className="MainContent" sx={{ flex: 1 }}>
              <MyMessages handleLogout={handleLogout} user={user}/>
            </Box>
          )}
        </Box>
      </CssVarsProvider>
  );
}
