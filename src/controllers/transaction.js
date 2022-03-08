const {
  transaction,
  order,
  toppingorder,
  product,
  topping,
  user,
} = require("../../models");



exports.addTransaction = async (req, res) => {
  const path = process.env.PATH_FILE;
  try {
    const { body, user } = req;
    console.log(body,user);
    const userId = user.id;
  
  
    const transactions = await transaction.create({
      ...body,
      attachment:  req.file.filename,
      status: "Waiting Approve",
      idUser: userId,
    });

    console.log("prod",body.products)
    JSON.parse(body.products).map(async (item) => {
      const { idProduct, qty } = item;
      console.log("item", item);

      const orders = await order.create({
        idTransaction: transactions.id,
        idProduct: idProduct,
        qty: qty,
      });
    

      {
        item.toppings.map(async (items) => {
          console.log("items", items);
          const idTopping = items;
          const toppings = await toppingorder.create({
            idOrder: orders.id,
            idTopping: idTopping,
          });
        });
     }
    });

    res.status(201).send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "idTransaction", "createdAt", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "idUser",
              "password",
              "role",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: order,
          as: "orders",
          attributes: ["qty"],
          include: [
            {
              model: product,
              as: "products",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
            {
              model: toppingorder,
              as: "toppingorders",
              attributes: {
                exclude: [
                  "id",
                  "toppingId",
                  "idTopping",
                  "idTransaction",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: topping,
                  as: "toppings",
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      attributes: {
        exclude: ["idUser", "idTransaction", "createdAt", "updatedAt"],
      },
      order:[[
        "createdAt","DESC" 
      ]],
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "idUser",
              "password",
              "role",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: order,
          as: "orders",
          attributes: {
            exclude: [
              "id",
              "idOrder",
              "idTransaction",
              "idProduct",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: product,
              as: "products",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
            {
              model: toppingorder,
              as: "toppingorders",
              attributes: {
                exclude: [
                  "id",
                  "toppingId",
                  "idTopping",
                  "idTransaction",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: topping,
                  as: "toppings",
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
}; 
exports.getUserTransaction = async (req, res) => {
  try {
    const { id } = req.user;
    const transactions = await transaction.findAll({
      where: {
        idUser: id,
      },
      attributes: {
        exclude: ["idUser", "idTransaction", "updatedAt"],
      },
      include: [
        {
          model: user,
          as: "users",
          attributes: {
            exclude: [
              "id",
              "idUser",
              "password",
              "role",
              "createdAt",
              "updatedAt",
            ],
          },
        },
        {
          model: order,
          as: "orders",
          attributes: {
            exclude: [
              "id",
              "idOrder",
              "idTransaction",
              "idProduct",
              "createdAt",
              "updatedAt",
            ],
          },
          include: [
            {
              model: product,
              as: "products",
              attributes: {
                exclude: ["id", "createdAt", "updatedAt"],
              },
            },
            {
              model: toppingorder,
              as: "toppingorders",
              attributes: {
                exclude: [
                  "id",
                  "toppingId",
                  "idTopping",
                  "idTransaction",
                  "createdAt",
                  "updatedAt",
                ],
              },
              include: [
                {
                  model: topping,
                  as: "toppings",
                  attributes: {
                    exclude: ["id", "createdAt", "updatedAt"],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
    res.send({
      status: "success",
      data: {
        transactions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.updateTransaction = async (req, res) => {
  const path = process.env.PATH_FILE;

  try {
    const { id } = req.params;
    const body = req.body;

    const newTransaction = {
      ...body,
    };

    console.log(req.body);

    await transaction.update(newTransaction, {
      where: {
        id,
      },
    });

    const transactions = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["idUser", "createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data: { transactions },
    });
  } catch (error) {
    // console.log(error)
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await transaction.destroy({
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
