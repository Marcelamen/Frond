import "./UserConfig.css";
import { ChangePassword } from "../../components/EditUser/ChangePassword";
import { ChangeImage } from "../../components/EditUser/ChangeImage";
const UserConfig = () => {
  return (
    <div className="userconfig">
      <h2>Editar usuario</h2>
      <ChangePassword />
      <ChangeImage />
    </div>
  );
};

export default UserConfig;
