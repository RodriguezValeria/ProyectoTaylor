import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { GoogleOAuthProvider} from "@react-oauth/google";
// const clientId = "756174210779-ijm5lcm6e57o0petom68t4mv4feqsec7.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="756174210779-2k6gjqs5bona11epub57hecfee1splpa.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
