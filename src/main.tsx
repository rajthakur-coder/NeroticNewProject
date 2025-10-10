import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'animate.css';

// import { createRipple } from './hooks/useRipple.ts';

import { createRipple } from './hooks/useRipple.ts';

document.addEventListener("mousedown", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest("[data-no-ripple]")) {
    return; 
  }

  const clickable = target.closest("button, a, [data-ripple]") as HTMLElement;
  if (clickable) {
    if (!clickable.hasAttribute("data-ripple")) {
      clickable.setAttribute("data-ripple", "");
    }
    createRipple({ ...e, currentTarget: clickable } as any);
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
