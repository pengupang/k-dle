import { MinusIcon } from '@heroicons/react/24/outline';

export default function Grid() {
  return (
    <div className="grid">
      <div className="flex justify-center space-x-4 mb-4">
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Album</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Title</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
        
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Duration</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Released Year</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Language</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
        <div className="flex flex-col items-center space-x-2 text-slate-400 rounded-sm p-2">
          <span>Producer</span>
          <MinusIcon className="h-5 w-5 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
