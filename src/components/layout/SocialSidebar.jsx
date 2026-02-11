import { FaInstagram, FaLinkedin, FaSpotify, FaTelegram } from "react-icons/fa";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaYoutube,
} from "react-icons/fa6";

const SocialSidebar = () => {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col">
      <a
        href="https://www.facebook.com/share/1Ay79xHcfi/"
        className="bg-blue-600 p-3 lg:p-5"
        target="_blank"
      >
        <FaFacebookF className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://x.com/iGASummit?t=N8kO_9qtwaBu3YeUUaBQNA&s=09"
        className="bg-black p-3 lg:p-5"
        target="_blank"
      >
        <FaXTwitter className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://www.instagram.com/igasummit?igsh=MXF6YXdpYXRxdzBoaQ=="
        className="bg-[#FD1D1D] p-3 lg:p-5"
        target="_blank"
      >
        <FaInstagram className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://www.linkedin.com/company/igasummit/"
        className="bg-blue-500 p-3 lg:p-5"
        target="_blank"
      >
        <FaLinkedin className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://www.youtube.com/@iGASummit"
        className="bg-red-500 p-3 lg:p-5"
        target="_blank"
      >
        <FaYoutube className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://open.spotify.com/show/11m2XkXyP3MmjHRgXEVgwx?si=8cb7aaae5d2a47bc"
        className="bg-green-600 p-3 lg:p-5"
        target="_blank"
      >
        <FaSpotify className="text-white text-sm lg:text-2xl" />
      </a>

      <a
        href="https://open.spotify.com/show/11m2XkXyP3MmjHRgXEVgwx?si=8cb7aaae5d2a47bc"
        className="bg-blue-700/80 p-3 lg:p-5"
        target="_blank"
      >
        <FaTelegram className="text-white text-sm lg:text-2xl" />
      </a>
    </div>
  );
};

export default SocialSidebar;
