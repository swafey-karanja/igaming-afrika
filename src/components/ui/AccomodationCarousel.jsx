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
    location: "Muthithi Rd,Westlands Nairobi, Kenya",
    desc: "Nestled in the heart of Nairobi’s vibrant city centre, immerse yourself in a refreshing urban escape. Enjoy sophisticated lodgings, diverse dining options, and a contemporary array of amenities and services. Serving as your hub to the renowned safari adventures and the city’s foremost attractions, our hotel is just 15-minute drive from Jomo Kenyatta International Airport.",
    img: "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2024/02/29/1014/NBORN-P0030-Entrance-Branding.jpg/NBORN-P0030-Entrance-Branding.16x9.jpg?imwidth=1280",
    cta: "Go to website",
    link: "https://www.hyatt.com/hyatt-regency/en-US/nborn-hyatt-regency-nairobi-westlands",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.842423526399!2d36.80566137578001!3d-1.2672779356073145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f174a6eb9baeb%3A0x3821f2ff76ad9b7c!2sHyatt%20Regency%20Nairobi%20Westlands!5e0!3m2!1sen!2suk!4v1776845281893!5m2!1sen!2suk",
    walkDistance: "14 min walk",
    driveDistance: "4 Minute Drive,",
  },
  {
    title: "Mövenpick Nairobi Hotel & Residences",
    location: "Westlands, Nairobi, Kenya",
    desc: "Experience Nairobi in our stunning hotel that charms with its African design, uplifting atmosphere, open spaces, cool features and panoramic views. Situated in the popular Westlands district, Mövenpick Hotel & Residences Nairobi is the perfect base to explore Kenya’s capital while staying for business or leisure in one of our 276 spacious hotel rooms, suites and residences.",
    img: "https://m.ahstatic.com/is/image/accorhotels/HCM_P_4509012:16by9?wid=1862&hei=1047&dpr=on,2&qlt=85&resMode=sharp2&op_usm=0.5,0.3,2,0&iccEmbed=true&icc=sRGB",
    cta: "Go to website",
    link: "https://movenpick.accor.com/en/africa/kenya/nairobi/hotel-residences-nairobi.html",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3988.851712259126!2d36.8023552!3d-1.2612322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1714bd130e79%3A0x22ad5b25e1a76ce2!2sM%C3%B6venpick%20Nairobi%20Hotel%20%26%20Residences!5e0!3m2!1sen!2ske!4v1776846759133!5m2!1sen!2ske",
    walkDistance: "5 min walk",
    driveDistance: "4 Minute Drive",
  },
  {
    title: "Best Western Premier Westlands, Nairobi",
    location: "Westlands, Nairobi, Kenya",
    desc: "With an unrivalled location in the heart of Nairobi’s vibrant Westlands district, the brand-new, purpose-built Best Western PREMIER Westlands combines enhanced style and creative dining experiences with all the convenience, safety, and comfort required for a restful stay. Whether travelling for business or leisure, our hotel in Westlands, Nairobi, provides thoughtful touches to enhance every visit, including freshly brewed coffee at Craft, our all-day dining restaurant, lobby bar, and coffee shop, a dedicated meetings floor, free Wi-Fi, a fully equipped gym, a 49-inch television, 24-hour room service, and a complimentary 1-litre water bottle in all 99 air-conditioned guest rooms.",
    img: "https://assets.simplotel.com/simplotel/image/upload/w_5000,h_3385/x_0,y_576,w_4997,h_2809,c_crop,q_80,fl_progressive/w_900,h_506,f_auto,c_fit/best-western-premier-westlands/Facade_fc56f553",
    cta: "Go to website",
    link: "https://www.bwpremierwestlands.com/",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.853501613394!2d36.798217575780086!3d-1.2600642355996992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f171bff7ecc09%3A0x61e05612e0b0771c!2sBest%20Western%20Premier%20Westlands!5e0!3m2!1sen!2ske!4v1776846879721!5m2!1sen!2ske",
    walkDistance: "5 min walk",
    driveDistance: "3 Minute Drive",
  },
  {
    title: "JW Marriott Hotel Nairobi",
    location: "Westalands, Nairobi, Kenya",
    desc: "Situated in the vibrant seaside town of Sliema, AX The Palace offers contemporary design with sweeping sea views. Perfect for delegates looking for a lively base with rooftop dining, a state-of-the-art wellness centre, and easy ferry access to Valletta.",
    img: "https://cache.marriott.com/is/image/marriotts7prod/jw-nbojw-exterior-41131-32588:Feature-Hor?wid=1920&fit=constrain",
    cta: "Go to website",
    link: "https://www.marriott.com/en-us/hotels/nbojw-jw-marriott-hotel-nairobi/overview/",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.837793639475!2d36.80662427578029!3d-1.270280635610518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17261b726c03%3A0xc02e089f37c41730!2sJW%20Marriott%20Hotel%20Nairobi!5e0!3m2!1sen!2ske!4v1776847601561!5m2!1sen!2ske",
    walkDistance: "7 min walk",
    driveDistance: "18 Minute Drive",
  },
  {
    title: "Pan Pacific Serviced suites",
    location: "GTC, Westlands Road, Nairobi, Kenya",
    desc: "In the heart of Nairobi, experience a world of sincere luxury at Pan Pacific Serviced Suites located at the famed Global Trade Centre (GTC) in the city’s affluent Westlands district. Conveniently situated on Waiyaki Way near the entries & exits of the newly built Expressway, you are steps away from all major areas of the city and minutes away from the airport. Pan Pacific Serviced Suites Nairobi marks Pan Pacific Hotel Group first footprint into Africa. The hotel boasts 175 luxuriously furnished suites, each featuring floor-to-ceiling windows, well-appointed furnishings and premium amenities offering a home-away-from-home experience with abundant choices for both the business and leisure long stay guests looking for the finest serviced apartments in Nairobi.",
    img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/ec/ea/df/facade.jpg?w=900&h=500&s=1",
    cta: "Go to website",
    link: "https://www.panpacific.com/en/serviced-suites/pp-ss-nairobi.html",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8383775464094!2d36.806301575780196!3d-1.2699023356101113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1762740bb6a7%3A0x2d9c1e6cf8ebcd03!2sPan%20Pacific%20Serviced%20Suites%20Nairobi!5e0!3m2!1sen!2ske!4v1776847031203!5m2!1sen!2ske",
    walkDistance: "8 min walk",
    driveDistance: "19 Minute Drive",
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
              <LocationOnIcon className="text-red-600" sx={{ fontSize: 30 }} />
              <div className="flex flex-col">
                <span>{slide.location}</span>
                <span>
                  {slide.walkDistance} / {slide.driveDistance} to the venue
                </span>
              </div>
            </div>

            <div className="mb-5">
              {slide.mapEmbed ? (
                <div className="w-full h-[250px] rounded-lg overflow-hidden">
                  <iframe
                    src={slide.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Venue Location Map"
                  />
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-gray-500">
                  {slide.desc}
                </p>
              )}
            </div>

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
