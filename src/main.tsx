import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './app/store.ts'
import { BrowserRouter } from 'react-router-dom'
import NavigateSetter from './router/NavigateSetter.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <NavigateSetter />
          <App />
      </BrowserRouter>
      </PersistGate>
    </Provider>

)
