import { Outlet, Link } from "react-router-dom";
import App from "../../App";
interface indexProps {}

const index: React.FC<indexProps> = ({}) => {
  return (
    <>
      <App />
      <Outlet />
    </>
  );
};

export default index;
