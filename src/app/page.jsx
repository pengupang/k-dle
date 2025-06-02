"use client";
import { useState, useEffect } from "react";
import Grid from "./Components/Grid";
import SearchBar from "./Components/SearchBar";
import Title from "./Components/Tittle";
import songs from '@/Data/Songs.json';

const normalizeString = (str) => {
  // Convierte a minúsculas y luego normaliza
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Paso 1: Función para comparar atributos
const compararAtributos = (adivinada, correcta) => {
  const comparar = (a, b) => {
    // Normalizar ambos strings para una comparación justa
    const normalizedA = normalizeString(a || ''); // Asegura que a no sea null/undefined
    const normalizedB = normalizeString(b || ''); // Asegura que b no sea null/undefined

    if (normalizedA === normalizedB) return "correcto";
    // Ejemplo de "casi": si ambos strings comparten alguna parte,
    // o puedes ajustar la lógica según tus necesidades.
    // Esto es más aplicable a atributos como "genre" o "artist" si tienen múltiples valores
    // Para title/released/duration, "casi" es menos común en un Wordle de adivinanza exacta.
    if (normalizedA && normalizedB && normalizedA.split(",").some(val => normalizedB.includes(val.trim()))) return "casi";
    return "incorrecto";
  };

  return {
    title: comparar(adivinada.title, correcta.title),
    artist: comparar(adivinada.artist, correcta.artist),
    released: comparar(adivinada.released, correcta.released),
    language: comparar(adivinada.language, correcta.language),
    genre: comparar(adivinada.genre, correcta.genre),
    duration: comparar(adivinada.duration, correcta.duration),
  };
};

export default function Page() {
  const [cancionDelDia, setCancionDelDia] = useState(null);
  const [cancionIngresada, setCancionIngresada] = useState("");
  const [sugerencias, setSugerencias] = useState([]);
  const [intentos, setIntentos] = useState(5);
  const [adivinanzas, setAdivinanzas] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [showDetalle, setShowDetalle] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  useEffect(() => {
    seleccionarCancionDelDia();
    setShowModal(true);
    // Exponer sortearNuevaCancion globalmente si lo usas en la consola
    window.sortearNuevaCancion = sortearNuevaCancion;
  }, []);

  const seleccionarCancionDelDia = () => {
    const hoy = new Date().toLocaleDateString();
    const cancionGuardada = localStorage.getItem("cancionDelDia");

    if (cancionGuardada) {
      const { cancion, fecha } = JSON.parse(cancionGuardada);
      if (fecha === hoy) {
        setCancionDelDia(cancion);
      } else {
        const cancionAleatoria = songs[Math.floor(Math.random() * songs.length)];
        setCancionDelDia(cancionAleatoria);
        localStorage.setItem("cancionDelDia", JSON.stringify({ cancion: cancionAleatoria, fecha: hoy }));
      }
    } else {
      const cancionAleatoria = songs[Math.floor(Math.random() * songs.length)];
      setCancionDelDia(cancionAleatoria);
      localStorage.setItem("cancionDelDia", JSON.stringify({ cancion: cancionAleatoria, fecha: hoy }));
    }
  };

  const sortearNuevaCancion = () => {
    const cancionAleatoria = songs[Math.floor(Math.random() * songs.length)];
    setCancionDelDia(cancionAleatoria);
    console.log("Nueva canción sorteada:", cancionAleatoria);
    // Reiniciar el juego cuando se sortea una nueva canción
    setCancionIngresada("");
    setSugerencias([]);
    setIntentos(5);
    setAdivinanzas([]);
    setShowDetalle(false);
    setSelectedSuggestionIndex(-1);
  };

  // --- Se encarga de los cambios en el searchbar ---
  // en este caso compara combinaciones de palabras (ET == gET up  ) para mostrarlas como sugerencia
  // a su vez se encarga de no volver a mostrar las sugerencias de canciones ya seleccionadas.
  const handleInputChange = (e) => {
    const query = normalizeString(e.target.value);
    setCancionIngresada(query);
    setSelectedSuggestionIndex(-1);

    if (query.length > 0) {
      // Obtener los títulos de las canciones que ya se han intentado
      const titulosAdivinadas = adivinanzas.map(adivinanza => normalizeString(adivinanza.title));

      const filtered = songs.filter(song => {
        const normalizedTitle = normalizeString(song.title);
        
        // 1. Filtrar por coincidencia en título o artista
        const matchesQuery = normalizedTitle.includes(query) 
        
        // 2. Excluir canciones que ya han sido adivinadas
        const isAlreadyGuessed = titulosAdivinadas.includes(normalizedTitle);

        return matchesQuery && !isAlreadyGuessed;
      });
      setSugerencias(filtered);
    } else {
      setSugerencias([]);
    }
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const suggestion =
        selectedSuggestionIndex >= 0
          ? sugerencias[selectedSuggestionIndex]
          : sugerencias.length > 0 ? sugerencias[0] : null; // Si no hay selección, toma la primera si existe
      
      if (suggestion) {
        handleSuggestionClick(suggestion);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevenir el desplazamiento de la página
      setSelectedSuggestionIndex(prev => Math.min(prev + 1, sugerencias.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevenir el desplazamiento de la página
      setSelectedSuggestionIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (showDetalle) return; // Si ya se adivinó, no permitir más intentos
    
    // Si la sugerencia seleccionada no es la cancionDelDia y los intentos son 0, no permitir más
    if (intentos === 0 && suggestion.title !== cancionDelDia.title) {
        setSugerencias([]); // Oculta sugerencias
        return; 
    }

    setCancionIngresada(suggestion.title);
    
    // Decrementar intentos solo si no hemos ganado aún y si quedan intentos
    if (suggestion.title !== cancionDelDia.title && intentos > 0) {
      setIntentos(intentos - 1);
    }
    
    setSugerencias([]);
    setSelectedSuggestionIndex(-1); // Resetea la selección

    // Paso 2: Comparar y guardar la adivinanza con resultados de la comparación
    const resultadoComparacion = compararAtributos(suggestion, cancionDelDia);
    setAdivinanzas(prev => [{ ...suggestion, resultadoComparacion }, ...prev]);

    if (normalizeString(suggestion.title) === normalizeString(cancionDelDia.title)) {
      setShowDetalle(true); // Muestra el detalle si se adivinó
      setCancionDelDia(suggestion); // Asegúrate de tener toda la info de la canción adivinada
    } else if (intentos - 1 === 0) { // Si este fue el último intento y no se adivinó
        setShowDetalle(true); // Muestra el detalle de la canción correcta
    }
  };

  const handleOpenModal = () => {
    if (!showDetalle) setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);
  const handleCloseDetalle = () => setShowDetalle(false);

  return (
    <div>
      <div className={`p-6 ${showModal ? 'opacity-50' : ''}`}>
        <Title />
        <div className="px-50">
          <SearchBar
            cancionIngresada={cancionIngresada}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            sugerencias={sugerencias}
            selectedSuggestionIndex={selectedSuggestionIndex}
            handleSuggestionClick={handleSuggestionClick}
            disabled={showDetalle || intentos === 0} 
          />
        </div>
      
        <div>
        <Grid adivinanzas={adivinanzas} cancionDelDia={cancionDelDia} />
        </div>
      </div>
    </div>
  );
}