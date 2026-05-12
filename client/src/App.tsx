import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "./assets/variables.css";
import DecodeSection from "./components/DecodeSection";
import DownloadPopup from "./components/DownloadPopup";
import EncodeSection from "./components/EncodeSection";
import { useQuery } from "@tanstack/react-query";
import { GITHUB_RELEASES_API_URL, parseDownloadUrls, type GithubReleaseResponse } from "./utils";

// Icons
const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

const App = () => {
  const [currentSection, setCurrentSection] = useState<"encode" | "decode">(
    "encode",
  );
  const [showPopup, setShowPopup] = useState(false);

  const {data, isFetched, isFetching} = useQuery({
    queryKey: ["get_release"],
    queryFn: async ()=>{
      const res = await fetch(GITHUB_RELEASES_API_URL)
      const json: GithubReleaseResponse = await res.json()
      const urls = json.assets.map((item)=> item["browser_download_url"])
      return parseDownloadUrls(urls)
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity
  })
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-teal-200">
      {showPopup && data && data.length > 0 && isFetched && <DownloadPopup parsedUrls={data} closePopup={() => setShowPopup(false)} />}
      
      <div className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-gray-100">
        <header className="px-6 py-8 sm:px-10 border-b border-gray-100 bg-white relative">
          {/* Background decorative blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-4">
              <div className="bg-teal-600 p-3 flex items-center justify-center rounded-2xl shadow-sm text-white">
                <img className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm" src="/pixelcipher.png" alt="Pixel Cipher logo" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Pixel Cipher
                </h1>
                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">
                  Hide and reveal messages in your images
                </p>
              </div>
            </div>
            
            <button
              disabled={isFetching || !data || !(data.length > 0)}
              onClick={() => setShowPopup(true)}
              className="group hidden sm:flex items-center disabled:opacity-60 gap-2 text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 font-semibold px-5 py-2.5 rounded-full shadow-sm active:scale-95"
            >
              <DownloadIcon />
              <span>Install App</span>
            </button>
            <button
              onClick={() => setShowPopup(true)}
              className="sm:hidden flex items-center justify-center text-white bg-gray-900 hover:bg-gray-800 transition-all p-3 rounded-full shadow-sm active:scale-95"
              aria-label="Install App"
            >
              <DownloadIcon />
            </button>
          </div>
        </header>

        <div className="p-6 sm:px-10 py-8 bg-gray-50/30">
          <div className="flex max-w-md mx-auto mb-10 bg-gray-100/80 p-1.5 rounded-2xl shadow-inner border border-gray-200/50">
            <button
              onClick={() => setCurrentSection("encode")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                currentSection === "encode"
                  ? "bg-white text-teal-700 shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setCurrentSection("decode")}
              className={`flex-1 py-3 px-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                currentSection === "decode"
                  ? "bg-white text-teal-700 shadow-sm border border-gray-200/50"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              Decode
            </button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
            {currentSection === "encode" && <EncodeSection />}
            {currentSection === "decode" && <DecodeSection />}
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        pauseOnHover
        newestOnTop
        theme="colored"
        toastClassName="rounded-xl font-medium shadow-lg"
      />
    </main>
  );
};

export default App;
