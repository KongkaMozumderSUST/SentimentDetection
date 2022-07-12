import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
export default function Home() {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("/favicon.ico");
  const [file, setFile] = useState([]);
  const handleChange = (e) => {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadfiles(file);
  };
  const handleInput = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const src = URL.createObjectURL(e.target.files[0]);
      setImage(src);
    }
  };
  const uploadfiles = (files) => {
    if (!files) return;
    const imageRef = ref(storage, `/files/${files.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const body = {
          url: url,
        };

        const res = await axios.post("/api/hello", body);
        setText(res.data.text);
        setUrl(url);
      });
    });
  };
  return (
    <Box
      sx={{
        margin: "100px",
        width: 500,
        maxWidth: "100%",
      }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id='fullWidth'
          sx={{ paddingBottom: "20px" }}
          value={url}
          type='text'
          onChange={handleChange}
          placeholder='paste url'
        />
        <input
          type='file'
          id='avatar'
          name='files'
          accept='image/png, image/jpeg'
          onChange={handleInput}></input>
        <div
          style={{ position: "relative", width: "100%", paddingBottom: "20%" }}>
          <Image
            src={image}
            alt='your image'
            layout={"fill"}
            objectFit={"contain"}
          />
        </div>
        <Button variant='contained' type='submit'>
          Analyze Text
        </Button>
      </form>

      <pre>{text}</pre>
    </Box>
  );
}
