import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
