import { Outlet } from "react-router-dom";
import { Pizza } from "lucide-react";

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-2">
      <div className="
        h-full border-r border-r-foreground/5 bg-muted
        p-10 text-muted-foreground flex flex-col justify-between
      ">
        <div className="flex items-center ga-3 text-lg font-medium text-foreground">
          <Pizza className="size-5" />
          <span className="font-semibold">pizza.shop</span>
        </div>

        <footer className="text-sm">
          Painel do parceiro &coy; pizza.shop - {new Date().getFullYear()}
        </footer>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
