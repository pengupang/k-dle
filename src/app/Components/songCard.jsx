import { getColor } from '../utils/getColor'; 
export default function SongCard({ cancion, cancionDelDia }) {
  const ancho = "w-24"; // ancho fijo para todos los div

  return (
    <div className="flex justify-center space-x-4 mb-2">
      <div className={`w-24 h-auto rounded-sm p-2 ${getColor(cancion.album, cancionDelDia.album)}`}>
        <img src={cancion.album} alt="" className="w-12 h-12 rounded object-cover" />
      </div>
      <div className={`w-24 h-auto rounded-sm p-2 text-center ${getColor(cancion.title, cancionDelDia.title)}`}>
        {cancion.title}
      </div>
      <div className={`w-24 h-auto rounded-sm p-2 text-center ${getColor(cancion.duration, cancionDelDia.duration)}`}>
        {cancion.duration}
      </div>
      <div className={`w-24  h-auto rounded-sm p-2 text-center ${getColor(cancion.released, cancionDelDia.released)}`}>
        {cancion.released}
      </div>
      <div className={`w-24  h-auto rounded-sm p-2 text-center ${getColor(cancion.language, cancionDelDia.language)}`}>
        {cancion.language}
      </div>
      <div className={`w-24 h-auto rounded-sm p-2 text-center ${getColor(cancion.producer, cancionDelDia.producer)}`}>
        {cancion.producer}
      </div>
    </div>
  );
}
