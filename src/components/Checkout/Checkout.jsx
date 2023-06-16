import { useState, useContext } from "react"
import { CarritoContext } from "../../context/CarritoContext"
import { db } from "../../services/config"
import { collection, addDoc } from "firebase/firestore"
import { Link } from 'react-router-dom'
import './Checkout.css';

const Checkout = () => {
    const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfimarcion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");
    const [ordenId, setOrdenId] = useState("");


    const manejadorSubmit = (event) => {
        event.preventDefault();

        //Validar que los campos esten completos: 
        if (!nombre || !apellido || !telefono || !email || !emailConfimarcion) {
            setError("Por favor complete los campos");
            return;
        }

        //Validamos que los campos del email coincidan
        if (email !== emailConfimarcion) {
            setError("Los campos del email no coinciden");
            return;
        }

        //Creamos el objeto de la orden: 

        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad,
            })),
            total: carrito.reduce((total, producto) => total + producto.item.precio * producto.cantidad, 0),
            nombre,
            apellido,
            telefono,
            email
        };

        //Guardamos la orden en la base de datos: 
        addDoc(collection(db, "ordenes"), orden)
            .then((docRef) => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch((error) => {
                console.log("Error al crear la orden", error);
                setError("Se produjo un error al crear la orden, vuelva más tarde");
            })

    }

    return (
        <div>
            <h2>Checkout</h2>
            <form onSubmit={manejadorSubmit}>

                {carrito.map(producto => (
                    <div key={producto.item.id}>
                        <p> {producto.item.nombre} x {producto.cantidad} </p>
                        <p>Precio Unidad: $ {producto.item.precio} </p>
                        <p>Precio total: $ {producto.item.precio*producto.cantidad} </p>
                        <hr />
                    </div>
                ))}
                
                <h3>Cantidad Final: {cantidadTotal} Productos</h3>   
                <h3>Total de la Compra: ${total} </h3>

                <hr />

                <div>
                    <label htmlFor=""> Nombre </label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>

                <div>
                    <label htmlFor=""> Apellido </label>
                    <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </div>

                <div>
                    <label htmlFor=""> Telefono</label>
                    <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>

                <div>
                    <label htmlFor=""> Email </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <label htmlFor=""> Email Confirmación </label>
                    <input type="email" value={emailConfimarcion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <button className="" type="submit"> Finalizar Orden </button>

                {
                    ordenId && (
                        <strong>¡Gracias por tu compra! Tu número de orden es: {ordenId} </strong>
                    )
                }
            </form>
        </div>
    )
}

export default Checkout