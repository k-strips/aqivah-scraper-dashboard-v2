import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import {useState} from 'react';
import { ToastContainer } from 'react-toastify';
import { LoadingContext } from 'hooks/useLoader';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);

  return <>
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <ToastContainer hideProgressBar />
      <Component {...pageProps} />
    </LoadingContext.Provider>
  </>;
}

export default MyApp;
