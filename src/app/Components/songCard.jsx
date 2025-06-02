// SongCard.js
import { getColor } from '../utils/getColor';

export default function SongCard({ cancion, cancionDelDia }) {
  return (
    <div className="grid grid-cols-6 gap-[2px] md:gap-4 lg:gap-6  mb-2 ">
      <div className={`h-24 flex items-center justify-center text-center p-2 rounded-sm ${getColor(cancion.generation, cancionDelDia.generation)}`}>
        {cancion.generation}
      </div>
      <div className={`h-24 flex items-center justify-center text-center p-2 rounded-sm ${getColor(cancion.artist, cancionDelDia.artist)}`}>
        {cancion.artist}
      </div>
      <div className={`h-24 flex items-center justify-center rounded-sm ${getColor(cancion.album, cancionDelDia.album)}`}>
        <img src={cancion.album} alt="" className="w-20 h-20 rounded object-cover" />
      </div>
      <div className={`h-24 flex items-center justify-center text-center p-2 rounded-sm text-shadow-black ${getColor(cancion.title, cancionDelDia.title)}`}>
        {cancion.title}
      </div>
      

      <div className={`h-24 flex items-center justify-center text-center p-2 rounded-sm ${getColor(cancion.language, cancionDelDia.language)}`}>
        {cancion.language}
      </div>
      
      <div className={`h-24 flex items-center justify-center text-center p-2 rounded-sm ${getColor(cancion.released, cancionDelDia.released)}`}>
        {cancion.released}
      </div>
    </div>
  );
}
