import { MinusIcon } from '@heroicons/react/24/outline';
import SongCard from './songCard';

export default function Grid({ adivinanzas, cancionDelDia }) {
  return (
    <div className="grid max-w-5xl mx-auto">
      <div className="grid grid-cols-6 gap-[2px] md:gap-4 lg:gap-6 ">
        {["Generation", "Artist","Album", "Title", "Language", "Released" ].map((col) => (
          <div key={col} className="flex flex-col items-center text-slate-400 rounded-sm pl-5 pr-5 pt-6 pb-2">
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
