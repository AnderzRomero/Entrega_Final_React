const productos = [
    { nombre: "Caja", precio: 480000, id: "1", img: "../img/Caja.png", descripcion: "Gabinete de torre mediana de alto rendimiento con un diseño de panel frontal de vidrio templado y un panel lateral de vidrio templado completo, lo que le permite exhibir el interior de su equipo.", stock:5, idCat: "1"},
    { nombre: "Portatil", precio: 401600, id: "2", img: "../img/Portatil.png", descripcion:"PORTATIL ACER NITRO 5 AN515 CORE i5 11400H 8G RAM SATA SSD512 4G GTX-1650 15,6″FULL HD W11 NEGRO", stock:10, idCat: "2"},
    { nombre: "Board", precio: 700000, id: "3", img: "../img/Board.png", descripcion:"BOARD AMD ASROCK A520M-HDV Micro USB3 A.V.R Pciexp 2 DDR 4 RYZ", stock:10, idCat: "3"},
    { nombre: "Teclado", precio: 458000, id: "4", img: "../img/Teclado.png", descripcion:"teclado inalámbrico para juegos K57 RGB, que presenta SLIPSTREAM WIRELESS de menos de 1 ms y una brillante retroiluminación RGB por tecla de los LED CAPELLIX.", stock:10, idCat: "4"},
    { nombre: "Mouse", precio: 57000, id: "5", img: "../img/Mouse.png", descripcion:"MOUSE GAMER TRUST YVI FX INALAMBRICO RGB BLANCO", stock:10, idCat: "4"},
    { nombre: "Disco SSD", precio: 367000, id: "6", img: "../img/Disco.png", descripcion:"UNIDAD DE ESTADO SOLIDO M.2 VIPER PATRIOT VPR400 512GB GEN4 X4 RGB 4600 X 3600", stock:10, idCat: "4"},
    { nombre: "Memoria Ram", precio: 215000, id: "7", img: "../img/Memoria.png", descripcion:"MEMORIA RAM DDR4 8G 3200 CORSAIR VENGEANCE RGB RS", stock:10, idCat: "4"},
    { nombre: "Monitor", precio: 1601000, id: "8", img: "../img/Monitor.png", descripcion:"MONITOR LED ASUS 28″ GAMING (UHD-DP-1MS-HDMI ) VP28UQG 4K", stock:10, idCat: "5"}
]

export const getProductos = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productos);
        }, 2000)
    })
}

//Creamos una función similar pero que nos retorne un solo item: 

export const getUnProducto = (id) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const producto = productos.find(prod => prod.id === id);
            resolve(producto);
        }, 2000)
    })
}

//Creamos una función que retorne toda una categoría de productos: 

export const getProductosPorCategoria = (idCategoria) => {
    return new Promise( resolve => {
        setTimeout( ()=> {
            const productosCategoria = productos.filter(prod => prod.idCat === idCategoria);
            resolve(productosCategoria);
        }, 100)
    })
}

