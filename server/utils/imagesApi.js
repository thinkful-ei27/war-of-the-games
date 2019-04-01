const cloudinary = require("cloudinary");
const Game = require("../models/game");

const types = ["t_thumb", "t_720p"];

cloudinary.config({
  cloud_name: "hjihgo1pd",
  api_key: "895646755928623",
  api_secret: "_xROAc1eiDqLrhIxV0m_TKzcABU"
});

// const ageOfEmpires =
//   "https://images.igdb.com/igdb/image/upload/t_720p/yoqdjsssreh8sjs9nvtv.jpg";

// cloudinary.uploader.upload(
//   ageOfEmpires,
//   result => {
//     console.log(result);
//   },
//   { public_id: "5c9bfe5d054d8f2e1010f133" }
// );

const saveImgCallback = result => {
  const { secure_url } = result;
  console.log(result);
  return secure_url;
};

const saveImgById = (id, coverUrl) => {
  return cloudinary.uploader.upload(coverUrl, saveImgCallback, {
    public_id: id
  });
};

const allGames = async (id, log) => {
  const query = id ? { _id: id } : {};
  const all = await Game.find(query);
  if (log) console.log(all);

  return all;
};

module.exports = {
  saveImgCallback,
  saveImgById,
  allGames
};
