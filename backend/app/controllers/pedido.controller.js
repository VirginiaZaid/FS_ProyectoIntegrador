const Pedido = require("../models/pedido.model.js");
const PedidoItem = require("../models/pedido_item.model.js");

// Create and Save a new Pedido
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }

    // Create a Pedido
    const pedido = new Pedido({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });

    // Save Pedido in the database
    Pedido.create(pedido, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pedido."
        });
      else res.send(data);
    });
};

// Create and Save a new Pedido
exports.createItem = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Pedido
  const pedidoItem = new PedidoItem({
    pedido_id: req.params.id,
    producto_id: req.body.productoId
  });

  // Save Pedido in the database
  PedidoItem.create(pedidoItem, (err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Pedido Item."
      });
    else res.send(data);
  });
};

// Retrieve all Pedidos from the database (with condition).
exports.findAll = (req, res) => {
  const numero_pedido = req.query.title;

    Pedido.getAll(numero_pedido, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pedidos."
        });
      else res.send(data);
    });
};

// Retrieve all Pedido Items from the database (with condition).
exports.findAllItems = (req, res) => {
  const pedidoId = req.params.id;

  PedidoItem.getAll(pedidoId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving pedidos."
      });
    else res.send(data);
  });
};

// Retrieve all Pedido Items from the database (with condition).
exports.reset = (req, res) => {
  const pedidoId = req.params.id;

  PedidoItem.reset(pedidoId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
            err.message || "Some error occurred while resetting pedidos."
      });
    else res.send({ message: `This pedido has been reset!` });
  });
};

// Find a single Pedido with a id
exports.findOne = (req, res) => {
  Pedido.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pedido with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Pedido with id " + req.params.id
          });
        }
      } else res.send(data);
    });
};

// Update a Pedido identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Pedido.updateById(
    req.params.id,
    new Pedido(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pedido with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Pedido with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Pedido with the specified id in the request
exports.delete = (req, res) => {
  Pedido.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pedido with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Pedido with id " + req.params.id
          });
        }
      } else res.send({ message: `Pedido was deleted successfully!` });
    });
};

// Delete all Pedidos from the database.
exports.deleteAll = (req, res) => {
  Pedido.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all pedidos."
        });
      else res.send({ message: `All Pedidos were deleted successfully!` });
    });
};
