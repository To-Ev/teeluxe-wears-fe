import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';import './index.css'
import App from './App.jsx'
import { history } from './navigation.js'

import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById('root')

if (!window.__REACT_ROOT__) {
  window.__REACT_ROOT__ = createRoot(container)
}

window.__REACT_ROOT__.render(
  <StrictMode>
    <Provider store={store}>
      <HistoryRouter history={history} basename="/teeluxe-wears-fe">
        <App />
      </HistoryRouter>
    </Provider>
  </StrictMode>,
)
