const { user } = require("../../models");

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
    const users = await user.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: "success",
      data: { users },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getUser = async (req, res) => {
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

    res.send({
      status: "success",
      data: { users },
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

    const newUser = {
      ...body,
      image: req.file.filename,
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
