import React,{useRef} from 'react'
import {subirArchivo} from "../services/productoService"

//esta variable me va a permitir manejar mi archivo sin problemas
let imagenes=[];

const asyncForEach= async(array,callback)=>{
    console.log(array)
    for(let i=0;i<array.length;i++){
        await callback(array[i])
    }
}

function FormProducto({value,actualizarInput,setValue,manejarSubmit,categorias}) {

    // const [colores,setColores]=useState([])
    // const [fotos,setFotos]=useState([])

    //useRef, es como un Id interno de React
    const inputColor=useRef()
    const inputFotos=useRef()

    // const anadirColor=(e)=>{
    //     e.preventDefault()
    //     let nuevoColor=inputColor.current.value
    //     setValue({...value, colores:[...value.colores,nuevoColor]})
    //     // setColores([...colores,nuevoColor])
    // }

    // const anadirFoto=(e)=>{
    //     e.preventDefault()
        
    //     // let nuevaFoto=inputFotos.current.value
    //     // setValue({...value,fotos:[...,nuevaFoto]})
    // }

    const ejecutarSubmit=async(e)=>{
        e.preventDefault()
        //primero subimos las imagenes
        let urls=[]
        console.log(imagenes.length)
        await asyncForEach(imagenes,async(imagen)=>{
            let urlImagenSubida=await subirArchivo(imagen)
            urls.push(urlImagenSubida)
        })
        //Cuando editemos no vamos a poder editar las fotos
        //En caso no agreguemos fotos, no tocará las fotos anteriores
        if(urls.length>0){
            setValue({...value,image:[...urls]})
        }
        //segundo recien ejecutamos el submit de la vista
        manejarSubmit(e,urls)
    }

    const manejarImagen= async(e)=>{
        e.preventDefault()
        let misImagenes=e.target.files //esto es un array  
        imagenes=misImagenes      
    }

    return (
        <div>
            <form onSubmit={(e)=>{ejecutarSubmit(e)}}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={value.name}
                        onChange={(e)=>{actualizarInput(e)}}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        value={value.description}
                        onChange={(e)=>{actualizarInput(e)}}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        name="price"
                        value={value.price}
                        onChange={(e)=>{actualizarInput(e)}}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        name="rating"
                        value={value.rating}
                        onChange={(e)=>{actualizarInput(e)}}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tipo Producto</label>
                    <input
                        type="text"
                        className="form-control"
                        name="producType"
                        value={value.producType}
                        onChange={(e)=>{actualizarInput(e)}}
                    />
                </div>
                {/* <div className="mb-3"> 
                    <label className="form-label">Colores</label>
                    <input
                        type="color"
                        className="form-control"
                        ref={inputColor}
                    />
                    <button 
                        className="btn btn-primary btn-sm"
                        onClick={(e)=>{anadirColor(e)}}
                    >
                    Agregar Color
                    </button>

                    <div className="list-group">
                        {value.colores.map((color,i)=>(
                            <div className="list-group-item list-group-item-sm" key={i}>
                                Color:<span style={{border:"1px solid gray", backgroundColor:`${color}`}}>{color}</span>
                            </div>     
                        ))}                       
                    </div>
                </div> */}
                <div className="mb-3">
                    <label className="form-label">Fotos</label>
                    <input
                        type="file"
                        ref={inputFotos}
                        className="form-control"
                        onChange={(e)=>{manejarImagen(e)}}
                    />
                    {/* <div className="list-group">
                       {value.image.map((fotito,i)=>(
                           <li className="list-group-item" key={i}>{fotito}</li>
                       ))}     
                    </div>     */}
                </div>
                {/* <div className="mb-3">
                    <label className="form-label">Categoria</label>                            
                    <select 
                        className="form-control"
                        name="id_categoria"
                        value={value.id_categoria}
                        onChange={(e)=>{actualizarInput(e)}}
                    >
                        {categorias.map((cat,i)=>(
                                <option key={i} value={cat.id}>{cat.nombre}</option>
                            ))}
                    </select>                    
                </div>             */}
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Guardar
                    </button>                            
                </div>
            </form>
        </div>
    )
}

export default FormProducto

