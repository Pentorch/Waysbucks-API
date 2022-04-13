const { user } = require("../../models");
const cloudinary = require("../utils/cloudinary");

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body);
    res.send({
      status: "success",
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

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
    let users = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    users = JSON.parse(JSON.stringify(users));

    res.send({
      status: "success",
      data: {
        ...users,
        image: path + users.image,
      },
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
      image: result.public_id,
    };
    await user.update(newUser, {
      where: {
        id,
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
      status: "failed",
      status: "Server Error",
    });
  }
};
exports.getProfile = async (req, res) => {
  const path = process.env.PATH_FILE;
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
