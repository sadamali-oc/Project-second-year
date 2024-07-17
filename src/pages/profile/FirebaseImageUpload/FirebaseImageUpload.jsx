import React, { useState, useEffect } from "react";
import { storage } from "./Config";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Avatar } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import StyleBadge from "../../../components/StyleBadge";

const FirebaseImageUpload = ({ userId, onUpload }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [isDefaultImage, setIsDefaultImage] = useState(true);

  useEffect(() => {
    axios
      .get(`https://plazer-backend-production.up.railway.app/plazer-user/${userId}/image`)
      .then((response) => {
        setUrl(response.data.image);
        setIsDefaultImage(false);
      })
      .catch((error) => {
        console.error("Error fetching image URL:", error);
      });
  }, [userId]); // Include userId in the dependency array

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setIsDefaultImage(false);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url);
          if (typeof onUpload === "function") {
            onUpload(url);
          }
          axios
            .put(`https://plazer-backend-production.up.railway.app/plazer-user/${userId}/image`, {
              image: url,
            })
            .then(() => {
              console.log("Image URL saved to database");
            })
            .catch((error) => {
              console.error("Error saving image URL to database", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <StyleBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Uploaded"
              src={isDefaultImage ? "No image Found" : url}
              sx={{ width: 156, height: 156, border: "2px solid #1976d2" }}
            />
          </StyleBadge>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload your Image
            <VisuallyHiddenInput type="file" onChange={handleChange} />
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!image}
          >
            Confirm Upload
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default FirebaseImageUpload;
