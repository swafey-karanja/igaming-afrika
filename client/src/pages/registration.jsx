import { useEffect, useRef } from "react";
import Header from "../components/Header";
import GravityForm from "../components/GravityForm";

export default function Registration() {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="w-full bg-gray-100">
      <Header />
      <div className="py-6 w-full bg-gray-100 max-w-7xl mx-auto">
        <div ref={formRef}>
          {/* <EventApplicationForm /> */}
          <GravityForm />
        </div>
      </div>
    </div>
  );
}
