import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter} from "react-router";
<<<<<<< HEAD
=======
import { AuthProvider } from "./context/AuthContext";
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < BrowserRouter>
<<<<<<< HEAD
      <App/>
=======
      <AuthProvider><App/></AuthProvider>
>>>>>>> e6c3a6ba2f47ec74061ed3ca7217615339a27290
    </BrowserRouter>
  </StrictMode>,
)
