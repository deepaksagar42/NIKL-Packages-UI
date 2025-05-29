import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@radix-ui/themes/styles.css";
import App from './App.tsx'
import { Theme, ThemePanel } from "@radix-ui/themes";
import { createStore, Provider as JotaiProvider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import 'jotai-devtools/styles.css';

export const customStore = createStore();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider store={customStore}>
      <DevTools store={customStore} />
      <Theme
        accentColor="mint"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        radius="full"
      >
        <App />
        <ThemePanel defaultOpen={false} />
      </Theme>
    </JotaiProvider>
  </StrictMode>,
)
