import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../Components/Ui/Button';
import { FaSearch, FaExclamationCircle, FaSpinner, FaCheckCircle, FaTimesCircle, FaFileAlt } from 'react-icons/fa';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';

const StatusPengaduan: React.FC = () => {
  const [nomorPengaduan, setNomorPengaduan] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [statusData, setStatusData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nomorPengaduan) {
      setError('Silahkan masukkan nomor pengaduan Anda');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call the actual API
      const response = await fetch(`https://api-sipa-capstone-production.up.railway.app/cek-pengaduan?kode=${nomorPengaduan}`);
      const data = await response.json();
      
      setIsLoading(false);
      setSearchPerformed(true);
      
      if (response.ok && data) {
        // Format the API response to match our UI requirements
        setStatusData({
          nomorPengaduan: data.kode,
          tanggalPengaduan: data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          }) : 'Tidak tersedia',
          statusPengaduan: formatStatus(data.status_pengaduan.status),
          namaPelapor: 'Tidak tersedia', // API doesn't provide this
          kategori: 'Pengaduan Umum', // API doesn't provide this
          deskripsi: data.kronologi,
          lokasi: data.lokasi,
          tingkatKeparahan: 'Sedang', // API doesn't provide this
          bukti: data.bukti,
          penanganan: [
            { 
              tanggal: data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              }) : 'Tidak tersedia', 
              deskripsi: 'Pengaduan diterima dan diverifikasi', 
              status: 'Selesai' 
            },
            { 
              tanggal: 'Saat ini', 
              deskripsi: `Status pengaduan: ${formatStatus(data.status_pengaduan.status)}${data.status_pengaduan.keterangan ? ` - ${data.status_pengaduan.keterangan}` : ''}`, 
              status: data.status_pengaduan.status === 'antre' ? 'Menunggu' : 
                     data.status_pengaduan.status === 'selesai' ? 'Selesai' : 'Dalam Proses'
            }
          ]
        });
      } else {
        setStatusData(null);
        setError('Nomor pengaduan tidak ditemukan. Silahkan periksa kembali nomor yang Anda masukkan.');
      }
    } catch (err) {
      setIsLoading(false);
      setSearchPerformed(true);
      setStatusData(null);
      setError('Terjadi kesalahan saat menghubungi server. Silahkan coba lagi nanti.');
      console.error('Error fetching data:', err);
    }
  };

  // Function to format the status to be more user-friendly
  const formatStatus = (status: string) => {
    switch(status) {
      case 'antre':
        return 'Menunggu';
      case 'ditangani':
        return 'Dalam Proses';
      case 'selesai':
        return 'Selesai';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Selesai':
        return 'text-green-600 bg-green-100';
      case 'Dalam Proses':
        return 'text-blue-600 bg-blue-100';
      case 'Menunggu':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Selesai':
        return <FaCheckCircle className="mr-2" />;
      case 'Dalam Proses':
        return <FaSpinner className="mr-2 animate-spin" />;
      case 'Menunggu':
        return <FaExclamationCircle className="mr-2" />;
      default:
        return <FaTimesCircle className="mr-2" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Cek Status Pengaduan</h1>
              <p className="mt-2 text-purple-100">
                Masukkan nomor pengaduan untuk memeriksa status dan progres penanganan
              </p>
            </div>
            
            {/* Search Form */}
            <div className="px-6 py-6 sm:px-10 border-b border-gray-200">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFileAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nomor pengaduan (contoh: k0Yay2jT9b)"
                    value={nomorPengaduan}
                    onChange={(e) => setNomorPengaduan(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <FaSpinner className="mr-2 animate-spin" />
                  ) : (
                    <FaSearch className="mr-2" />
                  )}
                  {isLoading ? 'Mencari...' : 'Cari Status'}
                </Button>
              </form>
              {error && (
                <div className="mt-3 text-red-600 text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" /> {error}
                </div>
              )}
            </div>
            
            {/* Results */}
            {searchPerformed && statusData && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="px-6 py-6 sm:px-10"
              >
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Status Header */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">Informasi Pengaduan #{statusData.nomorPengaduan}</h2>
                        <p className="text-sm text-gray-500">Dilaporkan pada: {statusData.tanggalPengaduan}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
                        statusData.statusPengaduan === 'Dalam Proses' ? 'bg-blue-100 text-blue-700' :
                        statusData.statusPengaduan === 'Selesai' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {statusData.statusPengaduan === 'Dalam Proses' && <FaSpinner className="mr-2 animate-spin" />}
                        {statusData.statusPengaduan === 'Selesai' && <FaCheckCircle className="mr-2" />}
                        {statusData.statusPengaduan === 'Menunggu' && <FaExclamationCircle className="mr-2" />}
                        {statusData.statusPengaduan}
                      </div>
                    </div>
                  </div>
                  
                  {/* Details */}
                  <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-500 text-sm mb-2">LOKASI KEJADIAN</h3>
                      <p className="font-medium text-gray-900">{statusData.lokasi || 'Tidak tersedia'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 text-sm mb-2">KATEGORI KASUS</h3>
                      <p className="font-medium text-gray-900">{statusData.kategori}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-gray-500 text-sm mb-2">KRONOLOGI KEJADIAN</h3>
                      <p className="text-gray-700">{statusData.deskripsi || 'Tidak tersedia'}</p>
                    </div>
                    {statusData.bukti && (
                      <div className="md:col-span-2">
                        <h3 className="font-medium text-gray-500 text-sm mb-2">BUKTI</h3>
                        <p className="text-gray-700">{statusData.bukti}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Timeline */}
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Progress Penanganan</h3>
                    <div className="space-y-6">
                      {statusData.penanganan.map((item: any, index: number) => (
                        <div key={index} className="relative pl-8">
                          {/* Connector line */}
                          {index < statusData.penanganan.length - 1 && (
                            <div className="absolute top-6 bottom-0 left-3.5 w-0.5 bg-gray-200"></div>
                          )}
                          {/* Indicator */}
                          <div className={`absolute top-1 left-0 w-7 h-7 rounded-full flex items-center justify-center ${
                            getStatusColor(item.status)
                          }`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-gray-900">{item.deskripsi}</p>
                              <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                getStatusColor(item.status)
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{item.tanggal}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Link to="/">
                    <Button variant="outline">Kembali ke Beranda</Button>
                  </Link>
                  <Button 
                    variant="secondary" 
                    onClick={() => window.print()}
                    className="flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
                    </svg>
                    Cetak Laporan
                  </Button>
                </div>
              </motion.div>
            )}
            
            {/* No Results */}
            {searchPerformed && !statusData && !isLoading && error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-6 py-10 sm:px-10 text-center"
              >
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                  <FaExclamationCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Pengaduan Tidak Ditemukan</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Nomor pengaduan yang Anda masukkan tidak terdaftar dalam sistem kami. 
                  Silahkan periksa kembali atau hubungi layanan bantuan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setNomorPengaduan('');
                      setSearchPerformed(false);
                      setError('');
                    }}
                  >
                    Coba Lagi
                  </Button>
                  <Link to="/bantuan">
                    <Button variant="secondary">Hubungi Bantuan</Button>
                  </Link>
                </div>
              </motion.div>
            )}
            
            {/* Help Info */}
            {!searchPerformed && !isLoading && (
              <div className="px-6 py-6 sm:px-10 bg-purple-50">
                <h3 className="font-medium text-purple-800 mb-2">Info Pencarian</h3>
                <p className="text-sm text-purple-700 mb-4">
                  Nomor pengaduan adalah kode unik yang diberikan saat Anda membuat pengaduan.
                  Gunakan nomor ini untuk memeriksa status dan perkembangan penanganan kasus Anda.
                </p>
                <div className="bg-white p-4 rounded-lg border border-purple-200 text-sm">
                  <p className="font-medium text-gray-800 mb-1">Belum memiliki nomor pengaduan?</p>
                  <p className="text-gray-600 mb-3">
                    Jika Anda belum melaporkan kasus, silahkan buat pengaduan terlebih dahulu.
                  </p>
                  <Link to="/pengaduan">
                    <Button variant="primary" size="sm">
                      Buat Pengaduan Baru
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StatusPengaduan;