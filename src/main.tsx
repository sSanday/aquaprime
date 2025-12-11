import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./contexts/UserContext.tsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "900204021320-k615vikpqahen43qm5g5teo1f20ek0d0.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={clientId}>
        <UserProvider>
            <App />
        </UserProvider>
    </GoogleOAuthProvider>
);
