import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

// Starting date: April 20, 2026 (already passed)
const START_DATE = new Date("2026-04-20T00:00:00");
const CYCLE_DAYS = 3; // Change every 3 days

const useCountdown = () => {
  const [currentDeadline, setCurrentDeadline] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  // Calculate the current deadline based on the cycle
  const calculateCurrentDeadline = () => {
    const now = new Date();

    // If we haven't reached the start date yet, use the start date
    if (now < START_DATE) {
      return START_DATE;
    }

    // Calculate how many 3-day cycles have passed since the start date
    const msPerCycle = CYCLE_DAYS * 24 * 60 * 60 * 1000;
    const timeSinceStart = now.getTime() - START_DATE.getTime();

    // Calculate which cycle we're currently in (0-based)
    const currentCycle = Math.floor(timeSinceStart / msPerCycle);

    // The deadline is the END of the current cycle (start of next cycle)
    // This means the countdown shows time until the next price increase
    const nextDeadline = new Date(
      START_DATE.getTime() + (currentCycle + 1) * msPerCycle,
    );

    return nextDeadline;
  };

  const getTimeLeft = (deadline) => {
    const diff = deadline.getTime() - new Date().getTime();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  useEffect(() => {
    const updateCountdown = () => {
      const deadline = calculateCurrentDeadline();
      setCurrentDeadline(deadline);
      setTimeLeft(getTimeLeft(deadline));
    };

    // Initial update
    updateCountdown();

    // Update every second
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return { timeLeft, currentDeadline };
};

export const CountdownBanner = () => {
  const { timeLeft, currentDeadline } = useCountdown();

  if (!timeLeft || !currentDeadline) return null;

  const pad = (n) => String(n).padStart(2, "0");

  // Format the deadline date for display
  const formatDeadlineDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

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
        Prices increase on {formatDeadlineDate(currentDeadline)}
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
