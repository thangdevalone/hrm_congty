import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx'
import { persistor, store } from './app/store.ts'
import './index.css'
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
