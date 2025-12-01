const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
const container = document.getElementById("cuentas-container");

if (pedidos.length === 0) {
    container.innerHTML = "<p>No hay pedidos registrados.</p>";
} else {
    const mesas = {};

   
    pedidos.forEach(pedido => {
        if (!mesas[pedido.mesa]) mesas[pedido.mesa] = [];
        mesas[pedido.mesa].push(pedido);
    });

    
    for (const mesa in mesas) {
        const pedidosMesa = mesas[mesa];
        let total = 0;
        let detalles = "<ul>";

        pedidosMesa.forEach(p => {
            total += Number(p.precio);
            detalles += `<li>${p.nombre} - $${p.precio} ${p.extra ? `(Extra: ${p.extra})` : ""}</li>`;
        });

        detalles += "</ul>";

        const cuentaHTML = `
            <div class="cuenta-mesa">
                <h3>Mesa ${mesa}</h3>
                ${detalles}
                <p><strong>Total:</strong> $${total}</p>
                <button onclick="cerrarCuenta(${mesa})">Cerrar cuenta</button>
            </div>
        `;

        container.innerHTML += cuentaHTML;
    }
}


function cerrarCuenta(numeroMesa) {
    if (confirm(`¿Cerrar cuenta de la mesa ${numeroMesa}? Esto eliminará los pedidos de esa mesa.`)) {
        const restantes = pedidos.filter(p => p.mesa != numeroMesa);
        localStorage.setItem("pedidos", JSON.stringify(restantes));
        location.reload(); 
    }
}