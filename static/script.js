async function calcularPrimos() {
    const limite = document.getElementById('limite').value;
    const errorDiv = document.getElementById('error');
    const resultadoDiv = document.getElementById('resultado');

    // Limpiar mensajes de error
    errorDiv.classList.add('hidden');

    // Validar entrada
    if (!limite || limite < 2) {
        errorDiv.textContent = 'Por favor ingrese un número mayor o igual a 2';
        errorDiv.classList.remove('hidden');
        return;
    }

    try {
        // Realizar la solicitud al servidor
        const response = await fetch('/calcular', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ limite: parseInt(limite) })
        });

        const data = await response.json();

        if (!response.ok) {
            errorDiv.textContent = data.error || 'Error al calcular los números primos';
            errorDiv.classList.remove('hidden');
            resultadoDiv.classList.add('hidden');
            return;
        }

        // Mostrar resultados
        mostrarResultados(data);
        resultadoDiv.classList.remove('hidden');

    } catch (error) {
        errorDiv.textContent = 'Error de conexión: ' + error.message;
        errorDiv.classList.remove('hidden');
        resultadoDiv.classList.add('hidden');
    }
}

function mostrarResultados(data) {
    const primosList = document.getElementById('primos-list');
    const cantidad = document.getElementById('cantidad');
    const rango = document.getElementById('rango');
    const infoResultados = document.getElementById('info-resultados');

    // Limpiar lista anterior
    primosList.innerHTML = '';

    // Crear elementos para cada número primo
    data.primos.forEach(primo => {
        const elemento = document.createElement('span');
        elemento.className = 'primo';
        elemento.textContent = primo;
        primosList.appendChild(elemento);
    });

    // Actualizar estadísticas
    cantidad.textContent = data.cantidad;
    rango.textContent = `2 a ${data.limite}`;
    infoResultados.textContent = `Se encontraron ${data.cantidad} números primos en el rango de 2 a ${data.limite}`;
}

// Permitir calcular con Enter
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('limite').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calcularPrimos();
        }
    });
});
