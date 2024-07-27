import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <p>root</p>
      <Outlet />
    </div>
  );
}
