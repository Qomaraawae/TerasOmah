const Home = () => {
    return (
      <div className="relative bg-gray-800 h-96">
        <img
          src="/api/placeholder/1200/400"
          alt="Restaurant hero"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Selamat Datang di Cafe Teras Omah
            </h1>
            <p className="text-xl text-white">
              Rasakan Kelezatan Masakan Indonesia
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;