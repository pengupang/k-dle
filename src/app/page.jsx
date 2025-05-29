"use client";
import { useState, useEffect } from "react";
import Grid from "./Components/Grid";
import SearchBar from "./Components/SearchBar";
import Title from "./Components/Tittle";
import songs from '@/Data/Songs.json';

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Paso 1: Función para comparar atributos
const compararAtributos = (adivinada, correcta) => {
  const comparar = (a, b) => {
    if (a === b) return "correcto";
    // Ejemplo de "casi": si ambos strings comparten alguna parte,
    // o puedes ajustar la lógica según tus necesidades.
    if (a && b && a.split(",").some(val => b.includes(val.trim()))) return "casi";
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
  };

  const handleInputChange = (e) => {
    if (showDetalle) return;
    const value = e.target.value;
    setCancionIngresada(value);
    setSelectedSuggestionIndex(-1);
    if (value.length > 0) {
      const normalizedValue = normalizeString(value.toLowerCase());
      const filteredSugerencias = songs.filter(song =>
        normalizeString(song.title.toLowerCase()).includes(normalizedValue)
      );
      setSugerencias(filteredSugerencias);
    } else {
      setSugerencias([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const suggestion =
        selectedSuggestionIndex >= 0
          ? sugerencias[selectedSuggestionIndex]
          : sugerencias[0];
      if (suggestion) {
        handleSuggestionClick(suggestion);
      }
    } else if (e.key === "ArrowDown") {
      setSelectedSuggestionIndex(prev => Math.min(prev + 1, sugerencias.length - 1));
    } else if (e.key === "ArrowUp") {
      setSelectedSuggestionIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (showDetalle) return;
    setCancionIngresada(suggestion.title);
    if (intentos > 0) {
      setIntentos(intentos - 1);
    }
    setSugerencias([]);

    // Paso 2: Comparar y guardar la adivinanza con resultados de la comparación
    const resultadoComparacion = compararAtributos(suggestion, cancionDelDia);
    setAdivinanzas(prev => [{ ...suggestion, resultadoComparacion }, ...prev]);

    if (suggestion.title === cancionDelDia.title) {
      setShowDetalle(true);
      setCancionDelDia(suggestion); // Asegúrate de tener toda la info
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
            disabled={showDetalle}
          />
        </div>
        {/* Por ejemplo, podrías mostrar aquí el número de intentos o pistas */}
        <Grid adivinanzas={adivinanzas} cancionDelDia={cancionDelDia} />
      </div>
    </div>
  );
}
