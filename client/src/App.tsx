import { useState } from "react";
import "./assets/variables.css";
import EncodeSection from "./components/EncodeSection";
import DecodeSection from "./components/DecodeSection";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [currentSection, setCurrentSection] = useState<"encode" | "decode">(
    "encode",
  );
  return (
    <section className="bg-(--white) shadow-[0px_0px_10px_-6px_black] w-full max-w-200 h-max mx-auto py-7 my-5 rounded-md">
      <header className="mb-3">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-teal-900 p-2.5 inline-flex items-center justify-center rounded-md">
            <img className="w-10" src="/pixelcipher.png" alt="logo" />
          </div>
          <h1 className="text-center mb-2 text-(--black-light) font-medium sm: text-[20px] md:text-[30px] lg:text-[40px]">
            Pixel Cipher
          </h1>
        </div>
        <p className="text-base  md:text-[20px] lg:text-[26px] text-center text-(--black-light) font-medium">
          Hide and reveal message in your images
        </p>
      </header>

      <div className="w-full px-5 flex gap-5 ">
        <button
          onClick={() => setCurrentSection("encode")}
          className={`text-base text-teal-500 text-center bg-teal-50 hover:bg-teal-100  rounded-xl border-2 border-teal-500 flex-1 ${currentSection === "encode" ? "bg-teal-100 " : ""} py-3 text-(--black-light) font-medium`}
        >
          Encode
        </button>
        <button
          onClick={() => setCurrentSection("decode")}
          className={`text-base text-teal-500 text-center bg-teal-50 hover:bg-teal-100  rounded-xl border-2 border-teal-500 flex-1 ${currentSection === "decode" ? "bg-teal-100" : ""} py-3 text-(--black-light) font-medium`}
        >
          Decode
        </button>
      </div>
      {currentSection === "encode" && <EncodeSection />}
      {currentSection === "decode" && <DecodeSection />}
      <ToastContainer
        position="top-center"
        pauseOnHover
        newestOnTop
        theme="colored"
      />
    </section>
  );
};

export default App;
