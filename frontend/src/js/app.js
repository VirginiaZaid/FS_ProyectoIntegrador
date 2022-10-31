const PRODUCTO_GATOS = 1
const PRODUCTO_PERROS = 2

const UNICO_PEDIDO_ID = 1

const addToPedido = async productoId => {
    const rawResponse = await fetch('api/pedidos/' + UNICO_PEDIDO_ID + '/items', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({productoId: productoId})
    });
    const content = await rawResponse.json();

    console.log(content);
    alert("El producto se agrego a su pedido");
}

const listProductos = async (categoriaId) => {
    const response = await fetch('api/productos/?categoria_id=' + categoriaId);
    const productos = await response.json(); //extract JSON from the http response
    return productos;
}

const crearCatalogo = (data, catalogo) => data.forEach(p => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const precio = document.createElement('div');
    const imagen = document.createElement('img');
    const titulo = document.createElement('span');

    div1.addEventListener('click', e => addToPedido(e.target.dataset.product_id));
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

    div1.setAttribute('data-product_id', p.id);
    div2.setAttribute('data-product_id', p.id);
    titulo.setAttribute('data-product_id', p.id);
    imagen.setAttribute('data-product_id', p.id);
    precio.setAttribute('data-product_id', p.id);

    catalogo.appendChild(div1);
});