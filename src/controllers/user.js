const { user } = require("../../models");
const cloudinary = require("../utils/cloudinary");

exports.getUsers = async (req, res) => {
  try {
    const path = process.env.PATH_FILE;
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    let data = JSON.parse(JSON.stringify(users));

    data = data.map((item) => {
      return { ...item, image: path + item.image };
    });

    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getUser = async (req, res) => {
     const path = process.env.PATH_FILE;
  const { id } = req.params;
  try {
    const users = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    let data = JSON.parse(JSON.stringify(users));

    data = data.map((item) => {
      return { ...item, image: path + item.image };
    });
    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { body } = req;
    const id = req.user.id;

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
      use_filename: true,
      unique_filename: true,
    });

    const newUser = {
      ...body,
      id,
      image: result.public_id,
    };
    await user.update(newUser, {
      where: {
        id,
        image: result.public_id,
      },
    });

    let users = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      user: { users },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await user.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "Server Error",
    });
  }
};
exports.getProfile = async (req, res) => {
  const { id } = req.user;
  try {
    const users = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: "success",
      data: { users },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};
