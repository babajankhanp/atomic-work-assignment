import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer} from 'react-toastify';


const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <>
     {/* <ToastContainer> */}
     <Component className={inter.className} {...pageProps} />
    {/* </ToastContainer> */}
    </>
);
}
