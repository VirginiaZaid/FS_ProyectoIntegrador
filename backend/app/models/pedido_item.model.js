const sql = require("./db.js");

// constructor
const PedidoItem = function(item) {
  this.pedido_id = item.pedido_id;
  this.producto_id = item.producto_id;
};

PedidoItem.create = (newPedidoItem, result) => {
  sql.query("INSERT INTO pedido_items SET ?", newPedidoItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pedido: ", { id: res.insertId, ...newPedidoItem });
    result(null, { id: res.insertId, ...newPedidoItem });
  });
};

PedidoItem.findById = (id, result) => {
  sql.query(`SELECT * FROM pedido_items WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found pedido: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Pedido Item with the id
    result({ kind: "not_found" }, null);
  });
};

PedidoItem.getAll = (pedidoId, result) => {
  let query = `SELECT pr.nombre, pr.imagen, pr.precio FROM pedido_items i inner join productos pr on i.producto_id = pr.id WHERE i.pedido_id = '${parseInt(pedidoId)}'`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pedidos: ", res);
    result(null, res);
  });
};

PedidoItem.remove = (id, result) => {
  sql.query("DELETE FROM pedido_items WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pedido Item with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};

PedidoItem.reset = (pedidoId, result) => {
  sql.query("DELETE FROM pedido_items WHERE pedido_id = ?", pedidoId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pedido Item with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted items in pedido with id: ", pedidoId);
    result(null, res);
  });
};

module.exports = PedidoItem;
