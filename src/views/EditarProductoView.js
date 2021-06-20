import React,{useState,useEffect} from 'react'
import FormProducto from '../components/FormProducto'
import {editarProducto,obtenerProductoPorId} from "../services/productoService"
import {useParams} from "react-router-dom"
import {obtenerCategorias} from "../services/categoriaService"

function EditarProductoView() {

    let {id}=useParams()
    
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

    const actualizarInput=(e)=>{
        e.preventDefault()
        // setValue({
        //     ...value,
        //     [e.target.name]:e.target.value
        // })
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

    const manejarSubmit= async (e,urlsFotos)=>{
        e.preventDefault()
        try {
            await editarProducto({...value,image:[...value.image,...urlsFotos]},id)

            // await Swal.fire({
            //     icon:'success',
            //     title:'Producto Creado Exitosamente',
            //     showConfirmButton:false,
            //     timer:2000
            // })
            // history.push("/")    
        } catch (error) {
            console.log(error)                        
        }        
    }

    const getProducto = async()=>{
        try {
            let productoObtenido=await obtenerProductoPorId(id)
            setValue({...productoObtenido})
        } catch (error) {
            console.log(error)             
        }
    }

    const getCategorias=async()=>{
        try {
            let categoriasObtenidas=await obtenerCategorias()
            setCategorias([...categoriasObtenidas])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProducto()
        //getCategorias()
        
    },[])
    //[] vacio para que se ejecute en el montaje del form, es como el constructor

    return (
        <div>
            <h1>Editar Producto</h1>
            <FormProducto
                value={value}
                setValue={setValue}
                actualizarInput={actualizarInput}
                manejarSubmit={manejarSubmit}
                categorias={categorias}
            />
        </div>
    )
}

export default EditarProductoView
