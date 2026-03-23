import React from "react";

const SpeakersClosed = () => {
  return (
    <div className="bg-green-50 border-b-5 border-green-600">
      <div className="min-h-[50vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
        </div>

        <div className="text-center animate-fade-in relative z-10">
          <div className="inline-block">
            {/* Small badge */}
            <div className="mb-4 animate-slide-down">
              <span className="inline-block px-4 py-1 bg-green-600 border border-green-600/30 rounded-full text-sm text-white font-bold dark:text-green-300">
                2026 Speaker Applications
              </span>
            </div>

            {/* Main text */}
            <h2 className="text-5xl md:text-7xl font-bold text-green-700 mb-6 animate-slide-up">
              Applications
              <br />
              <span className="text-green-700">Closed</span>
            </h2>

            {/* Decorative lines */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-green-600 animate-expand-left w-20"></div>
              <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse-slow"></div>
              <div className="h-px bg-green-600 animate-expand-right w-20"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-green-700 font-semibold animate-fade-in-delayed">
              Thank you for your participation
            </p>
            <p className="text-lg font-semibold text-green-700 animate-fade-in-delayed">
              See you in 2027
            </p>
          </div>
        </div>
      </div>
      {/* <NominationForm /> */}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes expand-left {
          from {
            width: 0;
            margin-left: auto;
          }
          to {
            width: 5rem;
            margin-left: 0;
          }
        }

        @keyframes expand-right {
          from {
            width: 0;
            margin-right: auto;
          }
          to {
            width: 5rem;
            margin-right: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 1s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.3s both;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out 0.1s both;
        }

        .animate-expand-left {
          animation: expand-left 0.8s ease-out 0.8s both;
        }

        .animate-expand-right {
          animation: expand-right 0.8s ease-out 0.8s both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out 0.8s infinite;
        }

        .circle-1,
        .circle-2,
        .circle-3 {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(22, 163, 74, 0.15) 0%,
            transparent 70%
          );
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: -100px;
          right: -100px;
          animation: float 20s ease-in-out infinite;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          bottom: -50px;
          left: -50px;
          animation: float 15s ease-in-out infinite reverse;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float 25s ease-in-out infinite;
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
};

export default SpeakersClosed;
