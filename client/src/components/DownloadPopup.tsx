import { motion } from "framer-motion";
import type { ReactNode } from "react";
import type { ParsedUrlObj } from "../utils";

// Icons
const DownloadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const WindowsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const AppleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
    <path d="M10 2c1 .5 2 2 2 3h-1.5c-.5-1-1.5-2.5-2.5-3Z" />
  </svg>
);

const AndroidIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Body and Head */}
    <path d="M5 10V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V10" />
    <path d="M17 9A5 5 0 0 0 7 9" />
    {/* Antennae */}
    <path d="m6 3 1.5 2" />
    <path d="m18 3-1.5 2" />
    {/* Arms */}
    <path d="M2 11v5" />
    <path d="M22 11v5" />
  </svg>
);

const LinuxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const DownloadItem = ({
  link,
  fileName,
}: {
  link: string;
  fileName: string;
}) => {
  return (
    <a
      className="group flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50/50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 rounded-xl transition-all duration-200 shadow-sm"
      href={link}
    >
      <span className="truncate mr-4">{fileName}</span>
      <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
        <DownloadIcon />
      </span>
    </a>
  );
};

const PlatformSection = ({
  children,
  title,
  icon,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}) => {
  return (
    <div className="py-4 border-b border-gray-100 last:border-0 last:pb-2">
      <div className="flex items-center gap-2 mb-3 px-1">
        {icon && <span className="text-gray-500">{icon}</span>}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

const DownloadPopup = ({
  closePopup,
  parsedUrls,
}: {
  closePopup: () => void;
  parsedUrls: ParsedUrlObj[];
}) => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Download App</h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose your preferred platform
            </p>
          </div>
          <button
            onClick={closePopup}
            className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 py-2 overflow-y-auto">
          <PlatformSection title="Android" icon={<AndroidIcon />}>
            <DownloadItem
              link="https://github.com/Maxessien/PixelCipherTauri/releases/download/v0.1.0/Pixel.Cipher.apk"
              fileName="PixelCipher.apk"
            />
          </PlatformSection>
          <PlatformSection title="Windows" icon={<WindowsIcon />}>
            {parsedUrls
              .filter(({ platform }) => platform === "Windows")
              .map(({ customName, url }) => (
                <DownloadItem fileName={customName} link={url} />
              ))}
          </PlatformSection>

          <PlatformSection title="macOS" icon={<AppleIcon />}>
            {parsedUrls
              .filter(({ platform }) => platform === "macOS")
              .map(({ customName, url }) => (
                <DownloadItem fileName={customName} link={url} />
              ))}
          </PlatformSection>

          <PlatformSection title="Linux" icon={<LinuxIcon />}>
            {parsedUrls
              .filter(({ platform }) => platform === "Linux")
              .map(({ customName, url }) => (
                <DownloadItem fileName={customName} link={url} />
              ))}
          </PlatformSection>
        </div>
      </motion.div>
    </div>
  );
};

export default DownloadPopup;
