import { Outlet } from "react-router-dom";
import Sidebar from "../drawer";
// interface layOutProps {
//   children: ReactNode;
// }

const index = () => (
  <div>
    <Sidebar>
      <main>
        <Outlet />
      </main>
    </Sidebar>
  </div>
);

export default index;
