import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({ inicial, stock, funcionAgregar }) => {
    const [contador, setContador] = useState(inicial);

    const incrementar = () => {
        if (contador < stock) {
            setContador(contador + 1);
        }
    }

    const decrementar = () => {
        if (contador > inicial) {
            setContador(contador - 1);
        }
    }

    return (
        <>
            <div className='contador'>
                <button className='btnCont' onClick={ decrementar }> - </button>
                <p className='numContador'> {contador} </p>
                <button className='btnCont' onClick={ incrementar }> + </button>
            </div>
            <button className='btnAgregar' onClick={() => funcionAgregar(contador)}> Agregar al Carrito </button>
        </>
    )
}

export default ItemCount