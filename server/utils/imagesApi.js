const cloudinary = require("cloudinary");
const Game = require("../models/game");

// const types = ["t_thumb", "t_720p"];

cloudinary.config({
  cloud_name: "hjihgo1pd",
  api_key: "895646755928623",
  api_secret: "_xROAc1eiDqLrhIxV0m_TKzcABU"
});

// used by saveImgById
const saveImgCallback = result => {
  const { secure_url: secureUrl } = result;
  return secureUrl;
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
  saveImgById,
  allGames
};
