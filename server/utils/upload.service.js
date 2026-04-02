const cloudinary = require("./cloudinary");
const streamifier = require("streamifier");

// Upload (buffer → cloud)
const uploadImage = (file, folder = "general") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

// Delete
const deleteImage = async (public_id) => {
  if (!public_id) return;
  await cloudinary.uploader.destroy(public_id);
};

module.exports = {
  uploadImage,
  deleteImage,
};
