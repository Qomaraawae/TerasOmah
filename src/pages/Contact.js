const Contact = () => {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Kritik dan Saran Teras Omah Cafe</h1>
        <p className="text-center mb-6">
          Jika Anda Memiliki Keluhan, Jangan Ragu Untuk Menghubungi Kami!
        </p>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 p-2 rounded-md"
              placeholder="Masukkan email Anda"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
              Pesan
            </label>
            <textarea
              id="message"
              className="w-full border border-gray-300 p-2 rounded-md"
              rows="4"
              placeholder="Tulis pesan Anda"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Kirim
          </button>
        </form>
      </div>
    );
  };
  
  export default Contact;
  