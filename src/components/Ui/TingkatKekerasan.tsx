import React from "react";

const TingkatKekerasan : React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Laporan Tingkat Kekerasan Korban</h2>
            
            <form className="grid gap-4">
                <div>
                    <label className="block text-gray-600">Kode</label>
                    <input type="text" className="w-44 p-2 border rounded focus:ring-2 focus:ring-purple-500 block" />
                </div>
                {/* <div>
                    <label className="block text-gray-600">Status</label>
                    <input type="text" className=" flex w-36 p-2 border rounded focus:ring-2 focus:ring-purple-500" />
                </div> */}

                <div>
                    <label className="block text-gray-600">Pelaku Kekerasan</label>
                    <input type="number" className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500" />
                </div>

                <div>
                    <label className="block text-gray-600">Jenis Kekerasan</label>
                    <select className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500">
                        <option>Fisik</option>
                        <option>Psikis</option>
                        <option>Seksual</option>
                        <option>Penelantaran</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-600">Kronologi</label>
                    <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500" rows={3}></textarea>
                </div>

                <div className="col-span-2 text-right">
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        Kirim Laporan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TingkatKekerasan;
