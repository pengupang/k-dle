import { MinusIcon } from '@heroicons/react/24/outline';
import SongCard from './SongCard';

export default function Grid({ adivinanzas, cancionDelDia }) {
  return (
    <div className="grid">
      <div className="flex justify-center space-x-4 mb-4">
        {["Album", "Title", "Duration", "Released Year", "Language", "Producer"].map((col) => (
          <div key={col} className="flex flex-col items-center text-slate-400 rounded-sm p-2">
            <span>{col}</span>
            <MinusIcon className="h-5 w-5 text-slate-400" />
          </div>
        ))}
      </div>

      {adivinanzas.map((adivinanza, index) => (
        <SongCard key={index} cancion={adivinanza} cancionDelDia={cancionDelDia} />
      ))}
    </div>
  );
}
