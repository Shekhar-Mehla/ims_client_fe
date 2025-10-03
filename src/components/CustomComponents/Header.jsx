import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div
      className="flex items-center justify-between px-8 py-4 shadow-md text-gray-800 rounded-b-lg"
      style={{
        background:
          "linear-gradient(90deg, var(--blue-600), var(--blue-500), var(--blue-700))",
      }}
    >
      {/* Logo + Search */}
      <div className="flex items-center gap-6">
        <h2 className="text-3xl font-bold tracking-tight drop-shadow-sm">
          IMS
        </h2>
        <div className="w-96">
          <SearchBar />
        </div>
      </div>

      {/* Navbar links / icons */}
      <div className="flex items-center gap-6">
        <Navbar />
      </div>
    </div>
  );
};

export default Header;
