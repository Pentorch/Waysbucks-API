const { topping } = require("../../models");

exports.addTopping = async (req, res) => {
  try {
    const {body} = req;
		const idUser = req.user.id;
    
    const newTopping = await topping.create({
      ...body,
      idUser: idUser,
      image: req.file.filename,
    });

    res.send({
      status: "success",
      data : {newTopping}
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getToppings = async (req, res) => {
  const path = process.env.PATH_FILE
  try { 
    const toppings = await topping.findAll({
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    let data = JSON.parse(JSON.stringify(toppings));

    data = data.map((item) => {
      return { ...item, image: path + item.image };
    });


    res.send({
      status: "success",
      data: { data },
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      status: "failed get resources",
    });
  }
};

exports.getTopping = async (req, res) => {
  const { id } = req.params;
  const path = process.env.PATH_FILE
 
  try {
    let toppings = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    toppings = JSON.parse(JSON.stringify(toppings));
    

    res.send({
      status: "success",
      data: {
        ...toppings,
        image: path + products.image,
      },
    });

    res.send({
      status: "success",
      data : {toppings},
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.update(req.body, {
      where: {
        id,
      },
    });

    let toppings = await topping.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });

    res.send({
      status: 'success',
      data: {toppings},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.deleteTopping = async (req, res) => {
  try {
    const { id } = req.params;

    await topping.destroy({
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
    });
  }
};
