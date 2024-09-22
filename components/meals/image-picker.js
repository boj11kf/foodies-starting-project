"use client";
import { useRef, useState } from "react";
import Image from "next/image";


import classes from "./image-picker.module.css";

/* 
    Az input alapértelmezetten megjeleníti a 
    default file csatoláshoz szükséges formot, gombot.

    Itt azonban ezt css-el eltüntetjük, majd egy <button>
    onClick eventjen belül az input referenciáját használva
    elsütjünk annak click event-jét.

*/

const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const input = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  const handlePickClick = () => {
    //event.preventDefault();
    input.current.click();
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="The image selected by user." fill />
          )}
        </div>
        <input
          ref={input}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          // multiple // ezt a propot használhatuk, ha több file feltöltését is szeretnénk kezelni
          onChange={handleImageChange}
          required
        />
      </div>
      <button className={classes.button} type="button" onClick={handlePickClick}>
        Pick an Image
      </button>
    </div>
  );
};

export default ImagePicker;
