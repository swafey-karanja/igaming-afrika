// components/ExhibitionModal.jsx
import {
  X,
  CheckCircle,
  Users,
  Star,
  Hammer,
  Building2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const getTierColorClass = (tier) => {
  switch (tier) {
    case "Diamond":
      return "text-cyan-500";
    case "Platinum":
      return "text-purple-500";
    case "Gold":
      return "text-yellow-500";
    case "Silver":
      return "text-gray-400";
    case "Bronze":
      return "text-amber-600";
    default:
      return "text-slate-400";
  }
};

const ExhibitionModal = ({ pkg = {}, isModalOpen, onClose, getTierColor }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Reset zoom and position when image changes
  useEffect(() => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, [currentImageIndex, previewImage]);

  // Handle wheel zoom
  useEffect(() => {
    const handleWheel = (e) => {
      if (previewImage && containerRef.current?.contains(e.target)) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        handleZoom(delta);
      }
    };

    if (previewImage) {
      document.addEventListener("wheel", handleWheel, { passive: false });
      return () => document.removeEventListener("wheel", handleWheel);
    }
  }, [previewImage, zoomLevel]);

  // Early return after all hooks
  if (!pkg) return null;

  const handleImageClick = (images, index) => {
    setPreviewImage({ images });
    setCurrentImageIndex(index);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? previewImage.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === previewImage.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleClosePreview = (e) => {
    e.stopPropagation();
    setPreviewImage(null);
    setCurrentImageIndex(0);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoom = (delta) => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(0.5, Math.min(5, prev + delta));

      // If zooming out past 1x, center the image
      if (newZoom <= 1) {
        setImagePosition({ x: 0, y: 0 });
      }

      return newZoom;
    });
  };

  const handleZoomIn = () => handleZoom(0.25);
  const handleZoomOut = () => handleZoom(-0.25);
  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1 && zoomLevel > 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - imagePosition.x,
        y: touch.clientY - imagePosition.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length === 1 && zoomLevel > 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setImagePosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`fixed inset-0 bg-transparent transition-all duration-300 ease-out flex items-center justify-center px-4 z-50 b ${
        isModalOpen ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out shadow-2xl ${
          isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`bg-gradient-to-r ${getTierColor(
            pkg.tier
          )} text-white px-6 py-5 sm:py-6`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm">
                {pkg.icon}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  {pkg.tier} - {pkg.type}
                </h2>
                <p className="text-white text-opacity-90 text-sm mt-1">
                  Stand Size: {pkg.standSize}m
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">{pkg.price}</span>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="px-6 py-5 mb-10 space-y-6 sm:py-6">
            {/* Description */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700 text-sm">{pkg.description}</p>
            </div>

            {/* Stand Features */}
            {pkg.standBenefits?.length > 0 && (
              <Section icon={<Building2 size={18} />} title="Stand Features">
                {pkg.standBenefits.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <CheckCircle
                        size={16}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Exhibitor Benefits */}
            {pkg.exhibitorBenefits?.length > 0 && (
              <Section
                icon={
                  <Star size={18} className={getTierColorClass(pkg.tier)} />
                }
                title="Package Benefits"
              >
                {pkg.exhibitorBenefits.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <Star size={16} className={getTierColorClass(pkg.tier)} />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Sponsorship Status */}
            {pkg.sponsorshipStatus?.length > 0 && (
              <Section
                icon={
                  <Star size={18} className={getTierColorClass(pkg.tier)} />
                }
                title={`${pkg.tier} Sponsorship Status`}
              >
                {pkg.sponsorshipStatus.map((b, i) => (
                  <ListItem
                    key={i}
                    icon={
                      <Star size={16} className={getTierColorClass(pkg.tier)} />
                    }
                    text={b}
                  />
                ))}
              </Section>
            )}

            {/* Tickets */}
            <Section icon={<Users size={18} />} title="Included Passes">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-slate-700 text-sm">{pkg.tickets}</p>
              </div>
            </Section>

            {/* Notes */}
            {pkg.notes?.length > 0 && (
              <Section icon={<Hammer size={18} />} title="Important Notes">
                {pkg.notes.map((note, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-black"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{note}</span>
                  </div>
                ))}
              </Section>
            )}

            {/* Image Gallery */}
            {pkg.images && pkg.images.length > 0 && (
              <Section
                icon={
                  <img
                    src={pkg.images[0]}
                    alt="preview icon"
                    className="w-5 h-5 rounded-sm object-cover"
                  />
                }
                title="Visual Preview"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.images.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-48 object-cover cursor-pointer rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                      onClick={() => handleImageClick(pkg.images, i)}
                    />
                  ))}
                </div>
              </Section>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
              <NavLink to="/register" className="w-full">
                <button
                  className={`w-full bg-gradient-to-r ${getTierColor(
                    pkg.tier
                  )} text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-md`}
                  onClick={onClose}
                >
                  Contact Us
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox with Zoom */}
      {previewImage && (
        <div
          ref={containerRef}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4 py-6"
          onClick={handleClosePreview}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700 z-20 transition-colors"
            onClick={handleClosePreview}
            aria-label="Close preview"
          >
            <X size={20} />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <button
              className="bg-green-600/90 backdrop-blur-sm text-white rounded-full p-2 shadow hover:bg-green-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              aria-label="Zoom in"
            >
              <ZoomIn size={20} />
            </button>
            <button
              className="bg-green-600/90 backdrop-blur-sm text-white rounded-full p-2 shadow hover:bg-green-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              aria-label="Zoom out"
            >
              <ZoomOut size={20} />
            </button>
            <button
              className="bg-green-600/90 backdrop-blur-sm text-white rounded-full p-2 shadow hover:bg-green-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
              aria-label="Reset zoom"
            >
              <RotateCcw size={20} />
            </button>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-20">
            {Math.round(zoomLevel * 100)}%
          </div>

          {/* Image Navigation */}
          <div className="relative w-full max-w-5xl flex items-center justify-center overflow-hidden">
            {/* Previous Button */}
            {previewImage.images.length > 1 && (
              <button
                className="absolute left-4 bg-green-600/40 backdrop-blur-sm text-white rounded-full p-3 shadow-lg hover:bg-green-600/50 z-10 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Current Image */}
            <div
              className="flex items-center justify-center w-full h-full"
              onClick={(e) => e.stopPropagation()}
              style={{
                cursor:
                  zoomLevel > 1
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "default",
              }}
            >
              <img
                ref={imageRef}
                src={previewImage.images[currentImageIndex]}
                alt={`Preview ${currentImageIndex + 1}`}
                className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-lg transition-transform duration-200 select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${
                    imagePosition.x / zoomLevel
                  }px, ${imagePosition.y / zoomLevel}px)`,
                  transformOrigin: "center center",
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onDragStart={(e) => e.preventDefault()}
              />
            </div>

            {/* Next Button */}
            {previewImage.images.length > 1 && (
              <button
                className="absolute right-4 bg-green-600/40 backdrop-blur-sm text-white rounded-full p-3 shadow-lg hover:bg-green-600/50 z-10 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Image Counter */}
          {previewImage.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm z-20">
              {currentImageIndex + 1} of {previewImage.images.length}
            </div>
          )}

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs z-20 max-w-xs">
            <div className="text-center">
              {zoomLevel > 1 ? "Drag to pan • " : ""}Scroll to zoom • Click
              buttons to control
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Section component
const Section = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <div className="text-slate-600">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

// ListItem component
const ListItem = ({ icon, text }) => (
  <div className="flex items-start gap-2 text-sm text-slate-700">
    <div className="text-slate-400 mt-0.5 flex-shrink-0">{icon}</div>
    <span>{text}</span>
  </div>
);

export default ExhibitionModal;
