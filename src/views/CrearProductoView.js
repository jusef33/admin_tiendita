import React,{useState,useEffect } from 'react'
import FormProducto from "../components/FormProducto"
import {crearProducto} from "../services/productoService"
import Swal from "sweetalert2"
import {useHistory} from "react-router-dom"
//import {obtenerCategorias} from "../services/categoriaService"

function CrearProductoView() {

    const [value,setValue]=useState({
        name:'',
        description:'',
        price:0,
        rating:0,
        image:'',
        //colores:[],
        producType:''
    })

    const [categorias,setCategorias]=useState([])
    

    const history=useHistory()
    
    const actualizarInput=(e)=>{
        e.preventDefault()
        if ((e.target.name==="price")||(e.target.name==="rating")){
            setValue({
                ...value,
                [e.target.name]:parseInt(e.target.value,10)        
            })
        }
        else{
        setValue({
            ...value,
            [e.target.name]:e.target.value
        })
        }
                
    }

    // const getCategorias=async()=>{
    //     try {
    //         let categoriasObtenidas=await obtenerCategorias()
    //         setCategorias([...categoriasObtenidas])
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const manejarSubmit= async (e,urlsFotos)=>{
        e.preventDefault()
        try { console.log(value)
            await crearProducto({...value,image:[...urlsFotos]})
            await Swal.fire({
                icon:'success',
                title:'Producto Creado Exitosamente',
                showConfirmButton:false,
                timer:2000
            })
            history.push("/")    
        } catch (error) {
            console.log(error)                        
        }        
    }

    // useEffect(()=>{
    //     getCategorias()
    // },[])

    return (
        <div>
            <h1>Crear Producto</h1>
            <FormProducto 
                value={value} 
                actualizarInput={actualizarInput} 
                setValue={setValue}
                manejarSubmit={manejarSubmit}
                categorias={categorias}
            />
        </div>
    )
}

export default CrearProductoView
