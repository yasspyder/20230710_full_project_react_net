import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { showModal } from "../store/slices/modalSlice";
import SvgCamera from "../assets/svg/icon-camera.svg";

function ImageUploader({ setImageBase64, initialBase64 }) {
  const [base64, setBase64] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setBase64(initialBase64);
  }, [initialBase64]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        dispatch(
          showModal({
            message: `Формат ${file.type} не поддерживается. Используйте форматы jpg, jpeg или png`,
          })
        );
        return;
      }

      if (file.size > 1024 * 1024) {
        dispatch(
          showModal({
            message: "Файл слишком большой, максимальный размер - 1Мб",
          })
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.toString();
        setBase64(base64String);
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <button
      type="button"
      className="image-upload"
      {...getRootProps()}
      title={base64 === "" ? "Загрузите изображение." : undefined}
    >
      <input {...getInputProps({ accept: "image/jpeg, image/png" })} />
      <img
        src={base64 === "" ? SvgCamera : `${base64}`}
        alt={base64 === "" ? "Загрузить картинку" : "Загруженное изображение"}
        className={
          base64 === "" ? "image-upload__svgIcon" : "image-upload__preview"
        }
      />
      {base64 === "" ? (
        <span className="image-upload__text">Загрузить картинку</span>
      ) : null}
    </button>
  );
}

export default ImageUploader;
