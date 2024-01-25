import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import { dataDecrypt } from "../../util/encrypt";
import { getPhotoComment } from "../../services/users.services";
import "./PerfilCard.css";
// import profilePhoto from "../../assets/img/defaultPhoto.jpg";
// import pencil from "../../assets/icons/editA.svg";

const PerfilCard = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userPhotoUrl, setUserPhotoUrl] = useState(profilePhoto);
  const user = dataDecrypt(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchUserPhoto = async () => {
      try {
        const url = await getPhotoComment(user.id); // Assuming user.id is the ID of the user
        if (url) {
          setUserPhotoUrl(url);
          setAvatarUrl(url)

        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserPhoto();
  }, [user.id]);

  return (
    <>
      <div className="perfilCard">
        <figure>
        {avatarUrl ? (
            <>
              <img src={avatarUrl} alt="" />
            </>
          ) : (
            <img src={userPhotoUrl} alt="" />
          )}

        </figure>

        <div>
          <NavLink to="editar_perfil">
            <img className="pencilIcon" src={pencil} alt="Pencil" />
          </NavLink>
        </div>

        <div className="perfilDetails">
          <h3>
            {user.nombre.split(" ")[0]} {user.apellido.split(" ")[0]}
          </h3>
          <p>{user.cargo.toLowerCase()}</p>
          <span>{user.puntos} pts</span>
        </div>
      </div>
    </>
  );
};

export { PerfilCard };
