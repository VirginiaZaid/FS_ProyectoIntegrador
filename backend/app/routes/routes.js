module.exports = (app) => {
  const pedidos = require("../controllers/pedido.controller.js");
  const productos = require("../controllers/producto.controller.js");

  // Pedidos
  var router = require("express").Router();

  // Create a new Pedido
  router.post("/", pedidos.create);

  // Create a new Pedido Item
  router.post("/:id/items", pedidos.createItem);

  // Retrieve all Pedidos
  router.get("/", pedidos.findAll);

  // Retrieve all Pedido Items
  router.get("/:id/items", pedidos.findAllItems);

  // Clean all items
  router.get("/:id/reset", pedidos.reset);

  // Retrieve a single Pedido with id
  router.get("/:id", pedidos.findOne);

  // Update a Pedido with id
  router.put("/:id", pedidos.update);

  // Delete a Pedido with id
  router.delete("/:id", pedidos.delete);

  // Delete all Pedidos
  router.delete("/", pedidos.deleteAll);

  app.use('/api/pedidos', router);

  // Productos
  router = require("express").Router();
  
  // Retrieve all Productos
  router.get("/", productos.findAll);

  app.use('/api/productos', router);
};
