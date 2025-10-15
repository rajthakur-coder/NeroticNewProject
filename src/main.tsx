import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'animate.css';
import { store } from "./components/app/store.ts";
import { Provider } from "react-redux"; 
import { createRipple } from './hooks/useRipple.ts';

// Ripple effect
document.addEventListener("mousedown", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest("[data-no-ripple]")) return;

  const clickable = target.closest("button, a, [data-ripple]") as HTMLElement;
  if (clickable) {
    if (!clickable.hasAttribute("data-ripple")) {
      clickable.setAttribute("data-ripple", "");
    }
    createRipple({ ...e, currentTarget: clickable } as any);
  }
});

const root = createRoot(document.getElementById('root')!);

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
