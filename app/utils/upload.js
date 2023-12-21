require("dotenv").config();
const axios = require("axios");

async function uploadToImgBB(screenshotInBase64) {
  const form = new FormData();
  form.append("image", screenshotInBase64);

  try {
    const response = await axios.post("https://api.imgbb.com/1/upload", form, {
      headers: {
        ...(form.getHeaders?.() ?? {
          "Content-Type": "multipart/form-data",
        }),
      },
      params: {
        key: process.env.IMGBB_API_KEY,
        expiration: 1296000, // 15 days
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

module.exports = { uploadToImgBB };
