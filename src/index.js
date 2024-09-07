import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';
import App from './App'
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
      <HashRouter >
	  	<PersistGate persistor={persistor}>
            <App />
		</PersistGate>
        </HashRouter>
	</Provider> 
)