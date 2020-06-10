import React, {useState} from 'react';
import Error from './Error'

const Formulario = ({guardarState}) => {

    //state
    const [termino, guardarTermino] = useState('')
    const [error, guardarError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        //validar
        if(termino.trim() === ""){
            guardarError(true)
            return;
        }

        guardarError(false)
        //mandar el tertmino al componente principal
        guardarState(termino)
    }

    return ( 
        <form action="" onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una Imagen"
                        onChange={ e => guardarTermino(e.target.value) }
                        />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="buscar"
                        />
                </div>
            </div>
            {error ? <Error mensaje="Campo Vacio" /> : null}
        </form>
     );
}
 
export default Formulario;