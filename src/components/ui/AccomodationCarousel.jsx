import { useState, useEffect, useRef, useCallback } from "react";
import Header from "./Header";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TRANSITION_MS = 400;
const SLIDE_DURATION = 5000;

const slides = [
  {
    title: "Hyatt Regency",
    location: "Westlands, Nairobi, Kenya",
    desc: "Nestled in the heart of Nairobi’s vibrant city centre, immerse yourself in a refreshing urban escape. Enjoy sophisticated lodgings, diverse dining options, and a contemporary array of amenities and services. Serving as your hub to the renowned safari adventures and the city’s foremost attractions, our hotel is just 15-minute drive from Jomo Kenyatta International Airport.",
    img: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/02/29/1014/NBORN-P0030-Entrance-Branding.jpg/NBORN-P0030-Entrance-Branding.16x9.jpg?imwidth=1280",
    cta: "Go to website",
    link: "https://www.hyatt.com/hyatt-regency/en-US/nborn-hyatt-regency-nairobi-westlands",
  },
  {
    title: "Mövenpick Nairobi Hotel & Residences",
    location: "Westlands, Nairobi, Kenya",
    desc: "Experience Nairobi in our stunning hotel that charms with its African design, uplifting atmosphere, open spaces, cool features and panoramic views. Situated in the popular Westlands district, Mövenpick Hotel & Residences Nairobi is the perfect base to explore Kenya’s capital while staying for business or leisure in one of our 276 spacious hotel rooms, suites and residences.",
    img: "https://m.ahstatic.com/is/image/accorhotels/HCM_P_4509012:16by9?wid=1862&hei=1047&dpr=on,2&qlt=85&resMode=sharp2&op_usm=0.5,0.3,2,0&iccEmbed=true&icc=sRGB",
    cta: "Go to website",
    link: "https://movenpick.accor.com/en/africa/kenya/nairobi/hotel-residences-nairobi.html",
  },
  {
    title: "Best Western Premier Westlands, Nairobi",
    location: "Westlands, Nairobi, Kenya",
    desc: "With an unrivalled location in the heart of Nairobi’s vibrant Westlands district, the brand-new, purpose-built Best Western PREMIER Westlands combines enhanced style and creative dining experiences with all the convenience, safety, and comfort required for a restful stay. Whether travelling for business or leisure, our hotel in Westlands, Nairobi, provides thoughtful touches to enhance every visit, including freshly brewed coffee at Craft, our all-day dining restaurant, lobby bar, and coffee shop, a dedicated meetings floor, free Wi-Fi, a fully equipped gym, a 49-inch television, 24-hour room service, and a complimentary 1-litre water bottle in all 99 air-conditioned guest rooms.",
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3385/x_0,y_576,w_4997,h_2809,c_crop,q_80,fl_progressive/w_900,h_506,f_auto,c_fit/best-western-premier-westlands/Facade_fc56f553",
    cta: "Go to website",
    link: "https://www.bwpremierwestlands.com/",
  },
  {
    title: "Park inn by Radisson",
    location: "Westalands, Nairobi, Kenya",
    desc: "Situated in the vibrant seaside town of Sliema, AX The Palace offers contemporary design with sweeping sea views. Perfect for delegates looking for a lively base with rooftop dining, a state-of-the-art wellness centre, and easy ferry access to Valletta.",
    img: "https://media.radissonhotels.net/image/park-inn-by-radisson-nairobi-westlands/exterior/16256-114865-f99338132_4K.jpg?impolicy=GalleryLightboxFullscreen",
    cta: "Go to website",
    link: "https://www.radissonhotels.com/en-us/hotels/park-inn-nairobi-westlands",
  },
  {
    title: "Pan Pacific Serviced suites",
    location: "GTC, Westlands Road, Nairobi, Kenya",
    desc: "In the heart of Nairobi, experience a world of sincere luxury at Pan Pacific Serviced Suites located at the famed Global Trade Centre (GTC) in the city’s affluent Westlands district. Conveniently situated on Waiyaki Way near the entries & exits of the newly built Expressway, you are steps away from all major areas of the city and minutes away from the airport. Pan Pacific Serviced Suites Nairobi marks Pan Pacific Hotel Group first footprint into Africa. The hotel boasts 175 luxuriously furnished suites, each featuring floor-to-ceiling windows, well-appointed furnishings and premium amenities offering a home-away-from-home experience with abundant choices for both the business and leisure long stay guests looking for the finest serviced apartments in Nairobi.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/ec/ea/df/facade.jpg?w=900&h=500&s=1",
    cta: "Go to website",
    link: "https://www.panpacific.com/en/serviced-suites/pp-ss-nairobi.html",
  },
];

export default function HotelCarousel() {
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState("idle"); // "idle" | "exiting" | "entering"
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);
  const transitionTimerRef = useRef(null);
  const pendingSlideRef = useRef(null);

  const triggerTransition = useCallback(
    (nextSlide, dir) => {
      if (phase !== "idle") return;

      pendingSlideRef.current = nextSlide;
      setDirection(dir);
      setPhase("exiting");

      transitionTimerRef.current = setTimeout(() => {
        setDisplayed(nextSlide);
        setCurrent(nextSlide);
        setPhase("entering");

        transitionTimerRef.current = setTimeout(() => {
          setPhase("idle");
          pendingSlideRef.current = null;
        }, TRANSITION_MS);
      }, TRANSITION_MS);
    },
    [phase],
  );

  const goToPrev = useCallback(() => {
    const nextSlide = (current - 1 + slides.length) % slides.length;
    triggerTransition(nextSlide, -1);
  }, [current, triggerTransition]);

  const goToNext = useCallback(() => {
    const nextSlide = (current + 1) % slides.length;
    triggerTransition(nextSlide, 1);
  }, [current, triggerTransition]);

  const goToSlide = useCallback(
    (index) => {
      if (index === current) return;
      const dir = index > current ? 1 : -1;
      triggerTransition(index, dir);
    },
    [current, triggerTransition],
  );

  // Auto-advance timer
  useEffect(() => {
    if (!isHovered && phase === "idle") {
      timerRef.current = setInterval(() => {
        goToNext();
      }, SLIDE_DURATION);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, phase, goToNext]);

  // Cleanup transition timers
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    if (phase !== "idle") return;
    goToPrev();
  };

  const handleNext = () => {
    if (phase !== "idle") return;
    goToNext();
  };

  const handleDot = (i) => {
    if (phase !== "idle") return;
    goToSlide(i);
  };

  const slide = slides[displayed];

  // Calculate transition styles
  const getSlideStyle = () => {
    if (phase === "exiting") {
      const exitX = direction === 1 ? "-24px" : "24px";
      return {
        opacity: 0,
        transform: `translateX(${exitX})`,
        transition: `opacity ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out`,
      };
    }

    if (phase === "entering") {
      const enterX = direction === 1 ? "24px" : "-24px";
      return {
        opacity: 0,
        transform: `translateX(${enterX})`,
        transition: `opacity ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out`,
      };
    }

    return {
      opacity: 1,
      transform: "translateX(0px)",
      transition: `opacity ${TRANSITION_MS}ms ease-in-out, transform ${TRANSITION_MS}ms ease-in-out`,
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      <Header title="Accommodations" />
      {/* Header */}
      <div className="flex items-center justify-end mb-12">
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Previous slide"
            disabled={phase !== "idle"}
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={handleNext}
            className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-green-600 hover:text-white transition-colors disabled:opacity-50"
            aria-label="Next slide"
            disabled={phase !== "idle"}
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Slide */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="flex flex-col sm:flex-row gap-8 items-start"
          style={getSlideStyle()}
        >
          {/* Image */}
          <div className="w-full sm:w-6/12 flex-shrink-0">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full aspect-[5/3] object-cover rounded-xl"
            />
          </div>

          {/* Content */}
          <div className="flex-1 pt-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2.5">
              {slide.title}
            </h3>

            <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 mb-4">
              <LocationOnIcon className="text-red-600" />
              <span>{slide.location}</span>
            </div>

            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              {slide.desc}
            </p>

            <a
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 border-3 border-green-600 rounded-lg text-sm font-semibold text-gray-800 hover:bg-green-600 hover:text-white transition-colors"
            >
              {slide.cta}
              <ArrowForwardIcon className="h-4 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-gray-800" : "w-1.5 bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            disabled={phase !== "idle"}
          />
        ))}
      </div>
    </div>
  );
}
