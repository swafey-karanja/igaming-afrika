import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 xl:container xl:mx-auto ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group w-full px-8 py-4 flex items-center justify-between transition-colors cursor-pointer
          ${isOpen ? "bg-[#14a45c]" : "hover:bg-[#14a45c]"}
        `}
      >
        <h2
          className={`text-xl font-bold transition-colors
            ${isOpen ? "text-white" : "text-black group-hover:text-white"}
          `}
        >
          {title}
        </h2>

        <ChevronDown
          className={`w-5 h-5 transition-all duration-300
            ${isOpen ? "text-white" : "text-black group-hover:text-white"}
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[10000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
