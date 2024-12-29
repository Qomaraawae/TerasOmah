import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Banner utama dengan efek hover */}
      <div className="relative bg-gray-800 h-[50vh] md:h-[60vh]">
        <img
          src="/images/banner1.jpg"
          alt="Restaurant hero"
          className="w-full h-full object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center text-white px-4 md:px-12">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Selamat Datang di Cafe Teras Omah
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8 drop-shadow-lg">
              Rasakan Kelezatan Masakan Indonesia
            </p>
          </div>
        </div>
      </div>

      {/* Seksi Aneka Makanan dan Minuman */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Aneka Makanan */}
        <Link to="/menu/makanan" className="relative group">
          <img
            src="/images/banner4.jpg"
            alt="Aneka Makanan"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl text-white font-bold text-center">Aneka Makanan</h2>
          </div>
        </Link>

        {/* Aneka Minuman */}
        <Link to="/menu/minuman" className="relative group">
          <img
            src="/images/banner4b.jpg"
            alt="Aneka Minuman"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-3xl text-white font-bold text-center">Aneka Minuman</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
