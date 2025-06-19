// WrapperComponent.tsx
"use client";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./Supplements/CartContext";
import dynamic from "next/dynamic";

const ToastContainer = dynamic(
  () => import("react-toastify").then((mod) => mod.ToastContainer),
  { ssr: false }
);

interface WrapperComponentProps {
  children: React.ReactNode;
}

const WrapperComponent: React.FC<WrapperComponentProps> = ({ children }) => {
  return (
    <CartProvider>
      <div>
        <NavBar />
        {children}
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </CartProvider>
  );
};

export default WrapperComponent;