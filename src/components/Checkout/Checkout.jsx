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
        <>
            <div id="container">                
                <h1>&bull; Checkout &bull;</h1>
                <div class="underline">
                </div>                
                
                <form onSubmit={manejadorSubmit} id="contact_form">

                {carrito.map(producto => (
                        <div key={producto.item.id}>
                            <p> {producto.item.nombre} x {producto.cantidad} </p>
                            <p>Precio Unidad: $ {producto.item.precio} </p>
                            <p>Precio total: $ {producto.item.precio * producto.cantidad} </p>
                            <hr />
                        </div>
                    ))}

                    <h3>Cantidad Final: {cantidadTotal} Productos</h3>
                    <h3>Total de la Compra: ${total} </h3>

                    <hr />
                    <hr />

                    <div className="name">
                        <label htmlFor="name"></label>
                        <input type="text" placeholder="Nombre" name="name" id="name_input" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="email">
                        <label htmlFor="apellido"></label>
                        <input type="text" placeholder="Apellido" name="apellido" id="email_input" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div class="telephone">
                        <label htmlFor="telephone"></label>
                        <input type="text" placeholder="Telefono" name="telephone" id="telephone_input" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="telephone">
                        <label htmlFor="email"></label>
                        <input type="email" placeholder="Email" name="email" id="email_input" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="telephone">
                        <label htmlFor="emailconfirmacion"></label>
                        <input type="email" placeholder="Email Confirmación" name="emailconfirmacion" id="email_input" value={emailConfimarcion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
                    </div>

                    {
                        error && <p style={{ color: "red" }}> {error} </p>
                    }

                    <button className="submit" type="submit" value="Send Message" id="form_button"> Finalizar Orden </button>

                    {
                        ordenId && (
                            <strong>¡Gracias por tu compra! Tu número de orden es: {ordenId} </strong>
                        )
                    } 
                </form>
            </div>
        </>
    )
}

export default Checkout