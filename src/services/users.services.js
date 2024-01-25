import axios from "axios";


export const getAllUsers = async () => {
  try {
    const users = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}usuarios/`
    );
    return users.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};


export const getUserAvatarUrl = async (avatarName) => {
  try {
    return `${
      import.meta.env.VITE_REACT_APP_API_URL
    }usuarios/${avatarName}/avatar`;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getPhotoComment = async (idUser) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}usuarios/perfil/${idUser}`,
      { responseType: 'arraybuffer' } 
    );

    if (res.status === 200) {
      const contentType = res.headers['content-type'];
      const blob = new Blob([res.data], { type: contentType });
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } else {
      console.error(`Failed to fetch image. Status: ${res.status}`);
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const updateAvatar = async (userId, archivo) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_REACT_APP_API_URL}usuarios/${userId}/avatar`,
      archivo,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

