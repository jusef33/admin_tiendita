import React,{useState,useEffect} from 'react'
import {obtenerProductos} from "../services/productoService"
import {Link} from "react-router-dom"

function ListaProductosView() {
    const[productos,setProductos]=useState([])   

    const getProductos=async ()=>{
        try {
            //1. ejecutamos la funcion que me devuelve los productos
            const productoObtenidos=await obtenerProductos()
            //2. Lo pongo en el estado
            setProductos(productoObtenidos)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProductos()
    },[])    

    return (
        <div>
            <h1>Productos Listados</h1>
            <Link className="btn btn-primary btn-lg my-2" to="/crearproducto">
                Crear Producto
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Precio
                        </th>
                        <th>
                            Descripcion
                        </th>
                        <th>
                            Rating
                        </th>
                        <th>
                            Tipo
                        </th>
                        <th>
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod,i)=>(
                    <tr key={i}>
                        <td>{prod.name}</td>
                        <td>{prod.price}</td>
                        <td>{prod.description}</td>
                        <td>{prod.rating}</td>
                        <td>{prod.producType}</td>
                        <td>
                            <Link className="btn btn-warning btn-sm" to={`/editarproducto/${prod.id}`}>
                                Editar
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaProductosView
