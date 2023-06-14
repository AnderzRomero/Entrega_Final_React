import { useState, createContext } from "react";

export const CarritoContext = createContext({ carrito: [] });

export const CarritoProvider = ({ children }) => {

    const [carrito, setCarrito] = useState([]);


    //Función para agregar productos al carrito: 
    const agregarProducto = (item, cantidad) => {
        // Verificamos si el producto ya está en el carrito
        const productoExistente = carrito.find(prod => prod.item.id === item.id);

        if (!productoExistente) {
            // Si el producto no existe, lo agregamos al carrito
            setCarrito(prev => [...prev, { item, cantidad }]);
        } else {
            // Si el producto ya existe, actualizamos su cantidad
            const carritoActualizado = carrito.map(prod => {
                if (prod.item.id === item.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    return prod;
                }
            });

            setCarrito(carritoActualizado);
        }
    }

    const eliminarProducto = (id) => {
        const carritoActualizado = carrito.filter(prod => prod.item.id !== id);
        setCarrito(carritoActualizado);
    }


    const vaciarCarrito = () => {
        setCarrito([]);
    }


    return (
        <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito }} >
            {children}
        </CarritoContext.Provider>

    )
}