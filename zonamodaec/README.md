# ZonaModaEC - Tienda de Zapatos Online

ZonaModaEC es una aplicación web moderna para la venta de zapatos, desarrollada con HTML, CSS y JavaScript puro.

## 🚀 Características

- **Catálogo de Productos**: Muestra zapatos en diferentes categorías (Deportivos, Casuales, Formales)
- **Filtros por Categoría**: Filtra productos fácilmente
- **Carrito de Compras**: Agrega, modifica y elimina productos del carrito
- **Persistencia de Datos**: El carrito se guarda en el navegador (LocalStorage)
- **Diseño Responsivo**: Funciona perfectamente en dispositivos móviles y desktop
- **Formulario de Contacto**: Sección para que los clientes se comuniquen
- **Interfaz Moderna**: Diseño atractivo y fácil de usar

## 📁 Estructura del Proyecto

```
zonamodaec/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos de la aplicación
├── js/
│   └── app.js          # Lógica y funcionalidad
├── images/             # Carpeta para imágenes (opcional)
└── README.md           # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Grid/Flexbox)
- JavaScript (Vanilla JS)
- LocalStorage para persistencia

## 📦 Instalación y Uso

1. **Clonar o descargar el proyecto**
   ```bash
   cd zonamodaec
   ```

2. **Abrir en el navegador**
   - Simplemente abre el archivo `index.html` en tu navegador web
   - O usa un servidor local:
     ```bash
     # Con Python
     python -m http.server 8000
     
     # Con Node.js (http-server)
     npx http-server
     ```

3. **Acceder a la aplicación**
   - Abre tu navegador y ve a `http://localhost:8000` (o el puerto que uses)

## 🎯 Funcionalidades Principales

### Catálogo de Productos
- Visualiza todos los productos disponibles
- Filtra por categoría: Todos, Deportivos, Casuales, Formales
- Cada producto muestra: imagen, nombre, categoría y precio

### Carrito de Compras
- Agrega productos al carrito
- Modifica la cantidad de cada producto
- Elimina productos del carrito
- Visualiza el total de la compra
- El carrito se guarda automáticamente en el navegador

### Secciones Adicionales
- **Inicio**: Hero section con llamada a la acción
- **Nosotros**: Información sobre la tienda
- **Contacto**: Formulario de contacto e información de la empresa

## 🎨 Personalización

### Agregar Productos
Edita el array `productos` en `js/app.js`:

```javascript
const productos = [
    {
        id: 10,
        nombre: "Nombre del Zapato",
        categoria: "deportivos", // o "casuales" o "formales"
        precio: 99.99,
        imagen: "👟" // o URL de imagen
    },
    // ... más productos
];
```

### Cambiar Colores
Modifica las variables CSS en `css/styles.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #e74c3c;
    --accent-color: #3498db;
    /* ... más variables */
}
```

### Agregar Imágenes Reales
1. Coloca las imágenes en la carpeta `images/`
2. Reemplaza los emojis en el array de productos con las rutas de las imágenes:
   ```javascript
   imagen: "images/zapato1.jpg"
   ```
3. Actualiza el CSS para mostrar imágenes reales en lugar de emojis

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)

## 🔮 Próximas Mejoras

- Integración con backend para productos dinámicos
- Sistema de autenticación de usuarios
- Pasarela de pagos
- Panel de administración
- Búsqueda de productos
- Sistema de reseñas y calificaciones
- Galería de imágenes para cada producto

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 👨‍💻 Desarrollo

Desarrollado con ❤️ para ZonaModaEC

---

**Nota**: Este es un proyecto frontend básico. Para producción, se recomienda integrar un backend y una base de datos real.

