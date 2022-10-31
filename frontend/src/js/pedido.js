const listPedidoItems = async () => {
    const response = await fetch('api/pedidos/' + UNICO_PEDIDO_ID + '/items');
    const items = await response.json(); //extract JSON from the http response
    return items;
}

const resetPedido = async () => {
    const response = await fetch('api/pedidos/' + UNICO_PEDIDO_ID + '/reset');
    await response.json(); //extract JSON from the http response
}

const items = listPedidoItems();

const detalle = document.querySelector('#pedido-detalle')

detalle.innerHTML = '';

items.then(data => crearDetalle(data, detalle))

const crearDetalle = (data, catalogo) => data.forEach(p => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const precio = document.createElement('div');
    const imagen = document.createElement('img');
    const titulo = document.createElement('span');

    div1.appendChild(div2);
    div2.appendChild(imagen);
    div4.appendChild(titulo);
    div3.appendChild(div4);
    div3.appendChild(precio);
    div2.appendChild(div3);

    imagen.src = p.imagen;
    titulo.textContent = p.nombre;
    precio.textContent = p.precio;

    div1.setAttribute('class', 'c_cajon');
    div2.setAttribute('class', 'c_caja');
    titulo.setAttribute('class', 'titulo-producto');
    precio.setAttribute('class', 'precio-producto');

    catalogo.appendChild(div1);
});

// Get the form element
const form = document.getElementById("pedido-form");

// Add 'submit' event handler
form.addEventListener("submit", (event) => {
    event.preventDefault();
    resetPedido();
    alert("Su pedido ha sido enviado con exito !! Muchas gracias por confiar en Nutri Firulais");
    window.location.href = 'index.html';
});