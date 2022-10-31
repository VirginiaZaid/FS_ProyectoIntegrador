const comidaParaPerros = listProductos(PRODUCTO_PERROS)

const catalogo = document.querySelector('.catalogo')

catalogo.innerHTML = '';

comidaParaPerros.then(data => crearCatalogo(data, catalogo))
