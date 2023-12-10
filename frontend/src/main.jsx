import React from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store } from './app/store';
import Background from './components/Background'
import { ThemeProvider } from './components/ThemeContext'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider>
            <Background>
                <App />
            </Background>
        </ThemeProvider>
    </Provider>
  </React.StrictMode>
);