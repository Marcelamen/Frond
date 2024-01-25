import React, { useState } from 'react';
import "./ChangeImage.css";
import { updateAvatar } from '../../../services/users.services';
import { dataDecrypt } from "../../../util/encrypt";

const ChangeImage = () => {
  const user = dataDecrypt(sessionStorage.getItem("user"));
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Crear una URL para la vista previa de la imagen
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("Seleccione un archivo");
        return;
      }
  
      const formData = new FormData();
      formData.append('archivo', selectedFile);
  
      await updateAvatar(user.id, formData);
      console.log("Avatar actualizado exitosamente");
  
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
    }
  };
  

  return (
    <div className='ChangeImage'>
     <h3 class="titulo">Cambia tu imagen</h3>
      <label>
      Seleccionar Archivo
      <input type="file" onChange={handleFileChange} />
    </label>
      {previewImage && <img src={previewImage} alt="Vista previa de la imagen" />}
      <button onClick={handleUpload}>Subir Imagen</button>
      </div>
  );
};

export { ChangeImage };
