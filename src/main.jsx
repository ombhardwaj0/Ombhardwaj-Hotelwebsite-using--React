import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import {createRoot} from 'react-dom/client';
import {Provider} from  'react-redux'
import {wishlistStore} from './Class2/Redux/Store/wishlistStore.js'
import { Bounce, ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')).render(
  //<StrictMode>

      <Provider store={wishlistStore}>
            <ToastContainer
                 position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                 newestOnTop={false}
                  closeOnClick={false}
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
                theme="light"
               transition={Bounce}/>
               <App />
          </Provider>
 // </StrictMode>,
)
