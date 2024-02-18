"use client"
import { Navbar } from "@/layout/navbar";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./globals.css";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <Provider store={store}>
      <html lang="en">
        <title>Todo</title>
        <body>
          <Navbar />
          <Toaster position="bottom-right" toastOptions={{ style: { boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", } }} />
          <main>{children}</main>
        </body>
      </html>
    </Provider>
  );
}
