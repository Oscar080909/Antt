function enviarPedido(boton) {
    const card = boton.parentElement; 

   
    const nombre = card.querySelector("h3").textContent;

  
    const textoPrecio = card.querySelector("p").textContent;
    const precio = textoPrecio.replace("Precio:", "").replace("$", "").trim();

  
    const textarea = card.querySelector("textarea");
    const comentario = textarea ? textarea.value : "";

    
    const mesaSelect = card.querySelector(".mesa-select");
    const mesa = mesaSelect ? mesaSelect.value : "";

    if (!mesa) {
        alert("Por favor selecciona un número de mesa.");
        return;
    }

   
    const pedido = {
        nombre: nombre,
        precio: precio,
        extra: comentario,
        mesa: mesa,
        fecha: new Date().toLocaleString()
    };

    let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    pedidos.push(pedido);
    localStorage.setItem("pedidos", JSON.stringify(pedidos));

    alert(`Pedido enviado correctamente ✓\nMesa: ${mesa}`);
}