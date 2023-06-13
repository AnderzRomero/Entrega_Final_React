import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import { getProductos, getProductosPorCategoria } from '../../asyncmock'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ greeting }) => {
  const [productos, setProductos] = useState([]);

  const { idCategoria } = useParams();

  useEffect(() => {

    const funcionProductos = idCategoria ? getProductosPorCategoria : getProductos

    funcionProductos(idCategoria)
      .then(res => setProductos(res))
      .catch(error => console.error(error))

  }, [idCategoria])
  return (
    <div>
      <h2 className="ItemsContainer"> {greeting} </h2>
      <h3 className='ItemsContainerProductos' >Productos</h3>
      <ItemList productos={productos} />
    </div>
  )
}

export default ItemListContainer
