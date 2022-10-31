const sql = require("./db.js");

// constructor
const Pedido = function(pedido) {
  this.numero_pedido = pedido.numero_pedido;
  this.observaciones = pedido.observaciones;
  this.email = pedido.email;
  this.celular = pedido.celular;
  this.cliente_nombre = pedido.cliente_nombre;
  this.enviado = pedido.enviado;
};

Pedido.create = (newPedido, result) => {
  sql.query("INSERT INTO pedidos SET ?", newPedido, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pedido: ", { id: res.insertId, ...newPedido });
    result(null, { id: res.insertId, ...newPedido });
  });
};

Pedido.findById = (id, result) => {
  sql.query(`SELECT * FROM pedidos WHERE id = ${id}`, (err, res) => {
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

    // not found Pedido with the id
    result({ kind: "not_found" }, null);
  });
};

Pedido.getAll = (numero_pedido, result) => {
  let query = "SELECT * FROM pedidos";

  if (numero_pedido) {
    query += ` WHERE numero_pedido = '${parseInt(numero_pedido)}'`;
  }

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

Pedido.updateById = (id, pedido, result) => {
  sql.query(
    "UPDATE pedidos SET numero_pedido = ?, observaciones = ?, email = ?, celular = ?, cliente_nombre = ?, enviado = ? WHERE id = ?",
    [pedido.numero_pedido, pedido.observaciones, pedido.email, pedido.celular, pedido.cliente_nombre, pedido.enviado, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Pedido with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pedido: ", { id: id, ...pedido });
      result(null, { id: id, ...pedido });
    }
  );
};

Pedido.remove = (id, result) => {
  sql.query("DELETE FROM pedidos WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Pedido with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pedido with id: ", id);
    result(null, res);
  });
};

Pedido.removeAll = result => {
  sql.query("DELETE FROM pedidos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} pedidos`);
    result(null, res);
  });
};

module.exports = Pedido;
