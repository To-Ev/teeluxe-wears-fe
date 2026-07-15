import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById('root')

if (!window.__REACT_ROOT__) {
  window.__REACT_ROOT__ = createRoot(container)
}

window.__REACT_ROOT__.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/teeluxe-wears-fe">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
