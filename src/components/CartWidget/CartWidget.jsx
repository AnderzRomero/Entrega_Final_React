import './CartWidget.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CarritoContext } from '../../context/CarritoContext';

const CartWidget = () => {
    const { carrito } = useContext(CarritoContext);

    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const imgCarrito = "../src/assets/carritosf.png";

    return (

        <Link to='/cart' className='btnCarrito'>
            <img className="imgCarrito" src={imgCarrito} alt="Carrito de compras" />
            {
                totalCantidad > 0 && <span className='numeroCarrito'> {totalCantidad}</span>
            }           
        </Link>
    )
}
export default CartWidget
