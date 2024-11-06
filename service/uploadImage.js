const cloudinary = require("cloudinary").v2;

const uploadImage = async (file) => {
  let url = null;
  let error = "";

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
        {
          width: 1200,
          height: 1200,
          crop: "fill",
          gravity: "auto",
        },
      ],
    });

    url = result.secure_url;
  } catch (err) {
    error = err.message;
  }

  return { url, error };
};

module.exports = uploadImage;
