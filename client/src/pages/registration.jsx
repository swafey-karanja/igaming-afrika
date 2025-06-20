import { useEffect, useRef } from "react";
import Header from "../components/Header";
import Breadcrumb from "../components/utils/Breadcrumb";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import EventApplicationForm from "../components/RegistrationForm";

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
          <EventApplicationForm />
        </div>
      </div>
    </div>
  );
}
