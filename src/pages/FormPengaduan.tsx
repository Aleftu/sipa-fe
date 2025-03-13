import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaFileAlt, FaCamera, FaCheck, FaCopy, FaHome, FaSearch } from 'react-icons/fa';
import Button from '../Components/Ui/Button';
import Navbar from '../Components/Ui/Navbar';
import Footer from '../Components/Ui/Footer';

const FormPengaduan: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    kodePelapor: generateKodePelapor(),
    lokasiKejadian: '',
    kronologi: '',
    bukti: null as File | null,
    buktiPreview: '',
    tanggalLaporan: new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  });
  
  // Generate a random 6-digit code
  function generateKodePelapor() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        bukti: file,
        buktiPreview: URL.createObjectURL(file)
      }));
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(prev => prev + 1);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.kodePelapor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Form progress indicator
  const renderProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= num ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num}
              </div>
              <span className="text-xs mt-2 text-gray-500">
                {num === 1 ? 'Identifikasi' : num === 2 ? 'Detail' : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200 rounded"></div>
          <div 
            className="absolute top-0 left-[10%] h-1 bg-purple-600 rounded transition-all duration-300"
            style={{ width: `${(step - 1) * 40}%` }}
          ></div>
        </div>
      </div>
    );
  };
  
  // Success message after form submission
  const renderSuccessMessage = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pengaduan Berhasil Dibuat</h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Pengaduan Anda telah diterima dan akan segera ditindaklanjuti oleh tim kami.
          Silakan simpan kode pengaduan berikut untuk memantau status kasus Anda.
        </p>
        
        <div className="mb-8">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between max-w-xs mx-auto">
            <span className="text-2xl font-mono font-bold text-purple-700 tracking-wider">
              {formData.kodePelapor}
            </span>
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              aria-label="Copy code"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">Kode berhasil disalin!</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button 
              variant="outline" 
              className="flex items-center"
            >
              <FaHome className="mr-2" /> Kembali ke Beranda
            </Button>
          </Link>
          <Link to="/status-pengaduan">
            <Button 
              variant="primary" 
              className="flex items-center"
            >
              <FaSearch className="mr-2" /> Lihat Status Pengaduan
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  };
  
  // Step 1: Initial Information
  const renderStep1 = () => {
    return (
      <>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Kode Pelapor
          </label>
          <div className="flex">
            <input
              type="text"
              value={formData.kodePelapor}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors cursor-not-allowed"
              disabled
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Kode ini digenerate otomatis dan akan menjadi ID laporan Anda
          </p>
        </div>

        <div className="mb-6">
          <label htmlFor="lokasiKejadian" className="block text-gray-700 text-sm font-medium mb-2">
            Lokasi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              id="lokasiKejadian"
              name="lokasiKejadian"
              type="text"
              placeholder="Masukkan alamat lengkap kejadian"
              value={formData.lokasiKejadian}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </>
    );
  };
  
  // Step 2: Incident Details
  const renderStep2 = () => {
    return (
      <>
        <div className="mb-6">
          <label htmlFor="kronologi" className="block text-gray-700 text-sm font-medium mb-2">
            Kronologi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <FaFileAlt className="text-gray-400" />
            </div>
            <textarea
              id="kronologi"
              name="kronologi"
              rows={6}
              placeholder="Jelaskan kronologi kejadian secara detail"
              value={formData.kronologi}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Berikan informasi sejelas mungkin tentang apa yang terjadi, kapan terjadinya, dan siapa saja yang terlibat
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Bukti (Opsional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {formData.buktiPreview ? (
            <div className="mt-2 relative">
              <img 
                src={formData.buktiPreview} 
                alt="Preview" 
                className="w-full max-h-48 object-cover rounded-lg border border-gray-300" 
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, bukti: null, buktiPreview: '' }))}
                className="absolute top-2 right-2 bg-red-100 text-red-700 rounded-full p-1 hover:bg-red-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <div 
              onClick={triggerFileInput}
              className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors"
            >
              <FaCamera className="mx-auto text-gray-400 text-3xl mb-2" />
              <p className="text-sm text-gray-500">
                Klik untuk mengunggah foto atau bukti visual lainnya
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Format yang didukung: JPG, PNG, JPEG (max 5MB)
              </p>
            </div>
          )}
        </div>
      </>
    );
  };
  
  // Step 3: Review Information
  const renderStep3 = () => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Konfirmasi Pengaduan</h3>
          <p className="text-sm text-gray-500">
            Periksa kembali informasi yang Anda berikan sebelum mengirim laporan
          </p>
        </div>
        
        <div className="px-6 py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">KODE PELAPOR</h4>
            <p className="font-medium text-gray-800">{formData.kodePelapor}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">TANGGAL LAPORAN</h4>
            <p className="font-medium text-gray-800">{formData.tanggalLaporan}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">LOKASI KEJADIAN</h4>
            <p className="font-medium text-gray-800">{formData.lokasiKejadian}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500">KRONOLOGI</h4>
            <p className="text-gray-800 whitespace-pre-line">{formData.kronologi}</p>
          </div>
          
          {formData.buktiPreview && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">BUKTI</h4>
              <div className="mt-2">
                <img 
                  src={formData.buktiPreview} 
                  alt="Bukti" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300" 
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-purple-50 px-6 py-4 border-t border-purple-100">
          <p className="text-sm text-purple-700">
            Dengan mengirimkan pengaduan ini, Anda menyatakan bahwa informasi yang diberikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Form Pengaduan</h1>
              <p className="mt-2 text-purple-100">
                Laporkan tindak kekerasan terhadap ibu dan anak untuk penanganan cepat
              </p>
            </div>
            
            {/* Form */}
            <div className="px-6 py-8 sm:px-10">
              {isSuccess ? (
                renderSuccessMessage()
              ) : (
                <form onSubmit={handleSubmit}>
                  {renderProgress()}
                  
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  
                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        Kembali
                      </Button>
                    ) : (
                      <Link to="/">
                        <Button variant="outline">Batal</Button>
                      </Link>
                    )}
                    
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="relative"
                    >
                      {isSubmitting && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </span>
                      )}
                      <span className={isSubmitting ? 'opacity-0' : ''}>
                        {step < 3 ? 'Lanjutkan' : 'Kirim Pengaduan'}
                      </span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Help Info */}
            {!isSuccess && (
              <div className="px-6 py-6 sm:px-10 bg-blue-50 border-t border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-700">
                      Laporan Anda akan ditangani secara rahasia dan prioritas. Simpan kode pengaduan untuk memantau status penanganan.
                    </p>
                    <p className="mt-2 text-sm text-blue-700">
                      <span className="font-medium">Butuh bantuan segera?</span> Hubungi hotline kami di <span className="font-medium">0800-123-88888</span> (24 jam)
                    </p>
                  </div>
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

export default FormPengaduan;