import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext.jsx";  
import GameProvider from "./context/GameContext.jsx";
import RealtimeProvider from "./context/RealtimeProvider.jsx";

import "./index.css";
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <GameProvider>
                    <RealtimeProvider>
                        <App />
                    </RealtimeProvider>
                </GameProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>,
);
