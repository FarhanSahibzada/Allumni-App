"use client"; // Ye Client Component hai

import { Provider } from "react-redux";
import { store } from "./Store/store"; // Apne Redux store ka sahi path check karein
import { SiteHeader } from "./layout/header";
import { usePathname } from "next/navigation";

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
    const hidden_Routes = ['/Login' ,'/Register','/'];

  
  return (
    <Provider store={store}>
      <div className="relative flex min-h-screen flex-col">
         {!hidden_Routes.includes(pathname) && <SiteHeader />}
        <main className="flex-1">{children}</main>
      </div>
    </Provider>
  )
}
