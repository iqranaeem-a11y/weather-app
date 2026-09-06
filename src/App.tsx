import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Compare from "./pages/Compare";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-indigo-950/70 backdrop-blur-lg py-3 px-6 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <span className="text-2xl">🌤️</span>
          <span>SkyCast</span>
        </div>

        <div className="flex gap-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-6 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-indigo-700 shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            🏠 Home
          </NavLink>
          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `px-6 py-2 rounded-full text-sm font-semibold transition ${
                isActive
                  ? "bg-white text-indigo-700 shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            ⚖️ Compare
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;