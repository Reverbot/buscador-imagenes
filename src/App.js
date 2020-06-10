import React, {useState, useEffect} from 'react';
import Formulario from './Components/Formulario'
import Listadomagenes from './Components/ListadoImagenes'

function App() {

  const [state, guardarState] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [paginaAct, guardarPaginaAct] = useState(1)
  const [totalPaginas, guardarTotalPaginas] = useState(1)

  useEffect(e => {
    if(state === "") return;

    const consultarAPI = async () => {
      const ImagenesPorPagina = 30;
      const key="15908679-b8dfb62ec649aa8e3135a1f33"
      const url = `https://pixabay.com/api/?key=${key}&q=${state}&per_page=${ImagenesPorPagina}&page=${paginaAct}`

    const respuesta = await fetch(url)
    const Imagen = await respuesta.json()
    guardarImagenes(Imagen.hits)

    //calcular total de paginas
    const calcularTotalPaginas = Math.ceil(Imagen.totalHits / ImagenesPorPagina );
    guardarTotalPaginas(calcularTotalPaginas)

    //mover la pagina arriba
    const jumbotron = document.querySelector('.jumbotron')
    jumbotron.scrollIntoView({behavior: 'smooth'})

    }
    consultarAPI()
    
  }, [state, paginaAct])

  //definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaAct - 1
    

    if(nuevaPaginaActual === 0) return;
    guardarPaginaAct(nuevaPaginaActual)
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaAct + 1
    

    if(nuevaPaginaActual > totalPaginas) return;
    guardarPaginaAct(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de imagenes</p>
        <Formulario guardarState={guardarState}/>
      </div>
      <div className="row justify-content-center">
      <Listadomagenes imagenes={imagenes} />
      
      {(paginaAct === 1) ? null :
      <button
      type="button"
      className="bbtn btn-info mr-1"
      onClick={paginaAnterior}
      >
        &laquo; Anterior 
    </button>
      }

      {(paginaAct >= totalPaginas) ? null :
      <button
      type="button"
      className="bbtn btn-info"
      onClick={paginaSiguiente}
      >
        Siguiente &raquo;
    </button>
      }
      </div>
    </div>
  );
}

export default App;
