import { useState } from 'react';
import { db, collection, addDoc } from './../firebase';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Menambahkan data ke Firestore
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: new Date(),
      });

      console.log('Dokumen ditambahkan dengan ID:', docRef.id);

      alert('Pesan berhasil dikirim!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error menambahkan dokumen: ', error);
      alert('Terjadi kesalahan saat mengirim pesan');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Kritik dan Saran Teras Omah Cafe</h1>
      <p className="text-center mb-6">Jika Anda Memiliki Keluhan, Jangan Ragu Untuk Menghubungi Kami!</p>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Masukkan nama Anda"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Masukkan email Anda"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="message">Pesan</label>
          <textarea
            id="message"
            name="message"
            className="w-full border border-gray-300 p-2 rounded-md"
            rows="4"
            placeholder="Tulis pesan Anda"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default Contact;
