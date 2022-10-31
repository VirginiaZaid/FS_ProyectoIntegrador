const comidaParaGatos = listProductos(PRODUCTO_GATOS)

const catalogo = document.querySelector('.catalogo')

catalogo.innerHTML = '';

comidaParaGatos.then(data => crearCatalogo(data, catalogo))
