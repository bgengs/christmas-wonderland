import { Routes, Route, Navigate } from "react-router";
import { PlayerProvider } from "@/store/player";
import TopNav from "@/components/TopNav";
import MiniPlayer from "@/components/MiniPlayer";
import Home from "@/pages/Home";
import Wonderland from "@/pages/Wonderland";
import Album from "@/pages/Album";
import Song from "@/pages/Song";
import Journey from "@/pages/Journey";
import MemoryTree from "@/pages/MemoryTree";
import Notes from "@/pages/Notes";
import About from "@/pages/About";

export default function App() {
  return (
    <PlayerProvider>
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wonderland" element={<Wonderland />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/memory-tree" element={<MemoryTree />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MiniPlayer />
    </PlayerProvider>
  );
}
