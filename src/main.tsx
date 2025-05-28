import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import App from './App.tsx'
import { Theme, ThemePanel } from "@radix-ui/themes";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      accentColor="mint"
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="full"
    >
      <App />
      <ThemePanel />
    </Theme>
  </StrictMode>,
)
