import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const DEADLINE = new Date("2026-04-20T23:59:59");

const useCountdown = () => {
  const getTimeLeft = () => {
    const diff = DEADLINE - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
};

export const CountdownBanner = () => {
  const timeLeft = useCountdown();
  if (!timeLeft) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const labelColor = "text-green-600";
  const unitBg = "bg-gray-100";
  const valueColor = "text-green-700";
  const separatorColor = "text-gray-400";
  return (
    <div className="px-4 py-3 flex flex-col items-center gap-3.5">
      <div
        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${labelColor}`}
      >
        <Clock className="w-3 h-3" />
        Prices increase on 20th april
      </div>
      <div className="flex items-center gap-1.5 pt-1.5">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hrs" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className={`flex flex-col items-center rounded-md px-2 py-1 min-w-[36px] ${unitBg}`}
            >
              <span
                className={`text-3xl font-extrabold tabular-nums leading-none ${valueColor}`}
              >
                {pad(value)}
              </span>
              <span
                className={`text-[10px] font-bold uppercase mt-0.5 ${labelColor}`}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className={`text-sm font-bold -mt-2 ${separatorColor}`}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
