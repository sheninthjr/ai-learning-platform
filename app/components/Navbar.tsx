
import { Searchbar } from "./Searchbar";

export function Navbar() {
  return (
    <div className="flex justify-between items-center bg-black p-3 fixed z-10 w-full">
      <div className="font-bold text-3xl text-slate-200 italic">
        Jr LearningHub
      </div>
      <div className="ml-auto">
        <Searchbar />
      </div>
    </div>
  );
}

