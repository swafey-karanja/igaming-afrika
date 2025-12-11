import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { NavLink, Navigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    const statusParam = urlParams.get("status");

    // Check if it's a free ticket (no session_id but status=complete)
    if (!sessionId && statusParam === "complete") {
      // Handle free ticket success
      setStatus("complete");

      // Try to get email from URL params or localStorage
      const emailParam = urlParams.get("email");
      if (emailParam) {
        setCustomerEmail(emailParam);
      } else {
        // Try to get from localStorage if you stored it during checkout
        const storedEmail = localStorage.getItem("freeTicketEmail");
        if (storedEmail) {
          setCustomerEmail(storedEmail);
          // Clean up after use
          localStorage.removeItem("freeTicketEmail");
        }
      }

      setLoading(false);
      return;
    }

    // If there's a session ID, fetch from API
    if (sessionId) {
      fetch(`http://localhost:4242/session-status?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setCustomerEmail(data.customer_email);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session status:", error);
          setLoading(false);
          // Fallback to URL param status if API fails
          if (statusParam) {
            setStatus(statusParam);
          }
        });
    } else {
      // No session ID and no status=complete - redirect to checkout
      setLoading(false);
    }
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center text-center p-10 min-h-[40vh] bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading payment status...</p>
      </section>
    );
  }

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="flex flex-col items-center justify-center text-center p-10 min-h-[40vh] bg-white"
      >
        <DotLottieReact
          src="https://lottie.host/9beb5a59-3220-4ca2-be18-950a82854636/OYgg8jKwPX.lottie"
          loop
          autoplay
          className="h-auto w-[60%] max-w-md"
        />

        <div className="max-w-2xl mx-auto mt-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Registration Successful!
          </h2>

          <p className="font-semibold text-gray-700 mb-2">
            Your registration for iGaming AFRIKA Summit 2026 has been confirmed!
          </p>

          {customerEmail && (
            <p className="text-gray-600 mb-6">
              A confirmation email will be sent to{" "}
              <a
                className="text-blue-600 hover:underline font-medium"
                href={`mailto:${customerEmail}`}
              >
                {customerEmail}
              </a>
              .
            </p>
          )}

          <p className="text-gray-600">
            If you have any questions, please email{" "}
            <a
              className="text-blue-600 hover:underline font-medium"
              href="mailto:support@igamingafrika.com"
            >
              support@igamingafrika.com
            </a>
            .
          </p>

          {/* Additional info for free tickets */}
          {!location.search.includes("session_id") && (
            <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-green-700 text-sm">
                <strong>Note:</strong> Since you registered for a free ticket,
                no payment was required. Your registration has been recorded
                successfully.
              </p>
            </div>
          )}

          <div className="flex mt-10 flex-row items-center justify-center gap-2 bg-transparent hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-sm lg:text-lg text-[#14a45c] font-bold w-full sm:max-w-sm p-3 rounded-4xl cursor-pointer">
            <IoMdArrowBack className="w-6 h-auto font-bold" />
            <NavLink to="/" className="text-center">
              Go back to Home page
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  // If no session ID and no status=complete, redirect to home
  if (!status && !loading) {
    return <Navigate to="/" />;
  }

  return null;
};

export default Return;
