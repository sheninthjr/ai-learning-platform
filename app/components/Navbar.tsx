import { Searchbar } from "./Searchbar";

interface NavbarProps {
  onSearch: (term: string) => void;
}

export function Navbar({ onSearch }: NavbarProps) {
  return (
    <div className="flex items-center justify-between bg-black p-3 fixed z-10 w-full">
      <div className="font-bold text-3xl text-slate-200 italic">
        Jr Hub
      </div>
      <Searchbar onSearch={onSearch} />
    </div>
  );
}

