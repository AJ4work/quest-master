// src/app/Header.tsx
import { Badge } from '../components/ui/badge';

export default function Header() {
  return (
    <header className="text-center mb-8">
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-cyan-400 text-transparent bg-clip-text">
        <h1 className="text-4xl font-bold mb-2">Quest Master</h1>
      </div>
      <Badge 
        className="bg-gradient-to-r from-amber-100 to-cyan-100 text-amber-800 border border-amber-200 px-4 py-1"
      >
        Level up your productivity through epic quests
      </Badge>
    </header>
  );
}
