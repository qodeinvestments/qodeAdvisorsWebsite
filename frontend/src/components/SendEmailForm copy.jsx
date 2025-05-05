import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faCircle } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faYoutube, faXTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./common/Button";
import Text from "./common/Text";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Bind modal to app element for accessibility
Modal.setAppElement("#root");

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL
    : import.meta.env.VITE_BACKEND_DEV_URL;

// Validation utility functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  const cleanedPhone = phone.replace(/(?!^\+)\D/g, "");
  if (cleanedPhone.length <= 1) return "Please enter a valid phone number";
  if (cleanedPhone.length <= 3) return "Please enter a complete phone number with digits after the country code";
  const phoneRegex = /^\+\d{1,15}$/;
  if (!phoneRegex.test(cleanedPhone)) return "Please enter a valid international phone number starting with '+' followed by 1-15 digits (e.g., +12025550123)";
  return "";
};

const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters long";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
  return "";
};

const validateLocation = (location) => {
  if (!location) return "Location is required";
  if (location.length < 2) return "Location must be at least 2 characters long";
  return "";
};

const validateRequiredField = (field, fieldName) => {
  if (!field) return `${fieldName} is required`;
  return "";
};

const SendEmailForm = ({ onClose, onFormSuccess, textColor = "beige" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStartTime] = useState(Date.now());
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    to: "investor.relations@qodeinvest.com",
    name: "",
    userEmail: "",
    phone: "",
    location: "",
    investmentGoal: "",
    investmentExperience: "",
    preferredStrategy: [],
    initialInvestmentSize: "",
    message: "",
    website: "",
    recaptchaToken: "",
  });

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.userEmail);
    const phoneError = validatePhone(formData.phone);
    const locationError = validateLocation(formData.location);
    const investmentGoalError = validateRequiredField(formData.investmentGoal, "Investment goal");
    const investmentExperienceError = validateRequiredField(formData.investmentExperience, "Investment experience");
    const preferredStrategyError = formData.preferredStrategy.length ? "" : "Please select at least one investment strategy";
    const initialInvestmentSizeError = validateRequiredField(formData.initialInvestmentSize, "Initial investment size");

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;
    if (locationError) newErrors.location = locationError;
    if (investmentGoalError) newErrors.investmentGoal = investmentGoalError;
    if (investmentExperienceError) newErrors.investmentExperience = investmentExperienceError;
    if (preferredStrategyError) newErrors.preferredStrategy = preferredStrategyError;
    if (initialInvestmentSizeError) newErrors.initialInvestmentSize = initialInvestmentSizeError;
    if (!phoneVerified) newErrors.phoneVerification = "Please verify your phone number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => {
        const currentStrategies = prevData.preferredStrategy || [];
        if (checked) {
          return {
            ...prevData,
            preferredStrategy: [...currentStrategies, value],
          };
        } else {
          return {
            ...prevData,
            preferredStrategy: currentStrategies.filter((strategy) => strategy !== value),
          };
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (phone) => {
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    if (!phone.trim() || phone.trim().length <= 2) {
      setErrors((prev) => ({
        ...prev,
        phone: "Please enter a valid phone number with digits after the country code",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      phone: formattedPhone,
    }));
    setPhoneTouched(true);
  };

  const handleVerifyPhone = async () => {
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }));
      toast.error(phoneError, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/emails/send-phone-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone }),
      });

      if (response.ok) {
        setIsModalOpen(true);
        toast.success("OTP sent to your phone!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/emails/verify-phone-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: formData.phone, otp }),
      });

      if (response.ok) {
        setPhoneVerified(true);
        setIsModalOpen(false);
        setOtp("");
        toast.success("Phone number verified successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Invalid OTP");
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Object.values(errors).forEach((error) => {
        if (error) {
          toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        }
      });
      return;
    }

    if (isSubmitting) return;

    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
      console.error("reCAPTCHA not loaded");
      toast.error("reCAPTCHA not loaded. Please check your connection or try again.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await window.grecaptcha.enterprise.execute(
        "6LfDSyArAAAAAOCExGxlQORbh6kCxSsTo7QAZcLh",
        { action: "submit" }
      );
      console.log("reCAPTCHA token generated:", token);

      setFormData((prev) => ({
        ...prev,
        recaptchaToken: token,
      }));

      console.log("Sending request to:", `${API_URL}/emails/send`);
      const response = await fetch(`${API_URL}/emails/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: formData.userEmail,
          subject: "Qode Investment Inquiry",
          message: formData.message,
          fromName: formData.name,
          phone: formData.phone,
          location: formData.location,
          investmentGoal: formData.investmentGoal,
          investmentExperience: formData.investmentExperience,
          preferredStrategy: formData.preferredStrategy,
          initialInvestmentSize: formData.initialInvestmentSize,
          recaptchaToken: token,
          website: formData.website,
          formStartTime,
        }),
      });

      console.log("Fetch response status:", response.status);
      if (response.ok) {
        if (onFormSuccess) {
          onFormSuccess();
        }

        setFormData({
          name: "",
          userEmail: "",
          phone: "",
          location: "",
          investmentGoal: "",
          investmentExperience: "",
          preferredStrategy: [],
          initialInvestmentSize: "",
          message: "",
          website: "",
          recaptchaToken: "",
        });
        setPhoneTouched(false);
        setPhoneVerified(false);
        toast.success("Inquiry submitted successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(`An error occurred: ${error.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <span className="text-red-500 text-sm mt-1">{errors[fieldName]}</span>
    ) : null;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOtp("");
  };

  const inputStyle = `w-full p-[6px] bg-transparent border-b border-brown focus:outline-none focus:border-${textColor} text-white text-sm focus:text-white`;

  // Check if submit button should be enabled
  const isSubmitDisabled = isSubmitting || !phoneVerified;

  return (
    <div className="flex flex-col items-center justify-center font-body min-h-screen relative">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto py-8 px-18">
        {/* Form Section (Left) */}
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <Text className={`mb-2 text-${textColor} font-semiheading text-semiheading`}>
            Empower Your Financial Growth
          </Text>

          <form onSubmit={handleSubmit} id="contact-form">
            <input
              type="text"
              name="website"
              style={{ display: "none" }}
              tabIndex="-1"
              autoComplete="off"
              value={formData.website}
              onChange={handleInputChange}
            />

            {/* Basic Contact Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div>
                <input
                  autoComplete="off"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name*"
                  className={`${inputStyle} ${errors.name ? "border-red-500" : ""}`}
                />
                {renderError("name")}
              </div>
              <div>
                <input
                  autoComplete="off"
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="Email Address*"
                  className={`${inputStyle} ${errors.email ? "border-red-500" : ""}`}
                />
                {renderError("email")}
              </div>
              <div className="flex items-center gap-2">
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Contact Number* (e.g., +12025550123)"
                  inputClass={`${inputStyle} ${errors.phone && phoneTouched ? "border-red-500" : ""}`}
                  buttonClass="bg-transparent border-none"
                  dropdownClass="bg-brown text-white"
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoComplete: "off",
                  }}
                  enableSearch={true}
                  preferredCountries={["in", "us", "gb"]}
                  format="+## ### ### ####"
                />
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  className={`px-2 py-1 text-sm bg-${textColor} text-black rounded hover:bg-opacity-80`}
                  disabled={phoneVerified}
                >
                  {phoneVerified ? "Verified" : "Verify"}
                </button>
              </div>
              <span className={`block text-${textColor} text-xs mt-1`}>
                Select your country code (e.g., +91 for India)
              </span>
              {phoneVerified && (
                <span className={`text-${textColor} text-xs mt-1`}>Phone Verified</span>
              )}
              {phoneTouched && renderError("phone")}
              {renderError("phoneVerification")}
              <div>
                <input
                  autoComplete="off"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City*"
                  className={`${inputStyle} ${errors.location ? "border-red-500" : ""}`}
                />
                {renderError("location")}
              </div>
            </div>

            {/* Investment Goal */}
            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                What is your investment goal? <span className="text-red-500">*</span>
              </label>
              <div className={`grid grid-cols-1 text-${textColor} gap-2`}>
                {[
                  "Conservative (Low risk, steady returns)",
                  "Balanced (Moderate risk, moderate returns)",
                  "Aggressive (High risk, higher returns)",
                ].map((goal) => (
                  <label key={goal} className="flex items-center">
                    <input
                      type="radio"
                      name="investmentGoal"
                      value={goal}
                      checked={formData.investmentGoal === goal}
                      onChange={handleInputChange}
                      className={`mr-2 accent-${textColor}`}
                    />
                    {goal}
                  </label>
                ))}
              </div>
              {renderError("investmentGoal")}
            </div>

            {/* Investment Experience */}
            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                Tell us about your investment experience <span className="text-red-500">*</span>
              </label>
              <div className={`grid grid-cols-1 text-${textColor} gap-2`}>
                {[
                  {
                    value: "Experienced",
                    label: "Yes, I have prior experience with Portfolio Management Services (PMS).",
                  },
                  {
                    value: "New",
                    label: "No, I'm new to PMS or similar investment vehicles.",
                  },
                ].map(({ value, label }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="radio"
                      name="investmentExperience"
                      value={value}
                      checked={formData.investmentExperience === value}
                      onChange={handleInputChange}
                      className={`mr-2 accent-${textColor}`}
                    />
                    {label}
                  </label>
                ))}
              </div>
              {renderError("investmentExperience")}
            </div>

            {/* Preferred Investment Strategies */}
            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                Select your preferred investment strategies <span className="text-red-500">*</span>
              </label>
              <div className={`grid grid-cols-1 sm:grid-cols-2 text-${textColor} gap-2`}>
                {[
                  "Qode All Weather",
                  "Qode Growth Fund",
                  "Qode Future Horizons",
                  "Qode Tactical Fund",
                  "Help Me Choose",
                ].map((strategy) => (
                  <label key={strategy} className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferredStrategy"
                      value={strategy}
                      checked={formData.preferredStrategy.includes(strategy)}
                      onChange={handleInputChange}
                      className={`mr-2 accent-${textColor}`}
                    />
                    {strategy}
                  </label>
                ))}
              </div>
              {renderError("preferredStrategy")}
            </div>

            {/* Initial Investment Size */}
            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                Initial Investment Size <span className="text-red-500">*</span>
              </label>
              <div className={`grid grid-cols-1 text-${textColor} gap-2`}>
                {["₹50 Lakhs - ₹2 Crores", "₹2 Crores - ₹10 Crores", "More than ₹10 Crores"].map(
                  (size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="radio"
                        name="initialInvestmentSize"
                        value={size}
                        checked={formData.initialInvestmentSize === size}
                        onChange={handleInputChange}
                        className={`mr-2 accent-${textColor}`}
                      />
                      {size}
                    </label>
                  )
                )}
              </div>
              {renderError("initialInvestmentSize")}
            </div>

            {/* Additional Message */}
            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Additional Message (Optional)"
                className="w-full p-[12px] text-body font-body bg-transparent text-white focus:outline-none border-b border-brown h-32"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className={`text-black p-18 px-1 ${isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitDisabled}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>
          </form>
        </div>

        {/* Contact Details Section (Right) */}
        <div className="w-full lg:w-1/3 pl-0 lg:pl-2 mt-8 lg:mt-0">
          <div className={`text-${textColor}`}>
            <Text className="text-body font-body font-bold mb-1">GENERAL CONTACT</Text>
            <div className="flex items-center gap-2 mb-1">
              <FontAwesomeIcon icon={faPhone} className={`text-${textColor}`} />
              <Text className="text-body font-body">
                <a href="tel:+919820300028" className="hover:underline">
                  +91 98203 00028
                </a>
              </Text>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className={`text-${textColor}`} />
              <Text className="text-body font-body">
                <a href="mailto:investor.relations@qodeinvest.com" className="hover:underline">
                  investor.relations@qodeinvest.com
                </a>
              </Text>
            </div>

            <Text className="text-body font-body font-bold mb-1">HR QUERIES</Text>
            <div className="flex items-center gap-2 mb-2">
              <FontAwesomeIcon icon={faEnvelope} className={`text-${textColor}`} />
              <Text className="text-body font-body">
                <a href="mailto:hr@qodeinvest.com" className="hover:underline">
                  hr@qodeinvest.com
                </a>
              </Text>
            </div>

            <Text className="text-body font-body font-bold mb-1">FOLLOW US</Text>
            <div className="flex gap-4 mb-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className={`text-${textColor} text-xl`} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className={`text-${textColor} text-xl`} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} className={`text-${textColor} text-xl`} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className={`text-${textColor} text-xl`} />
              </a>
            </div>

            <Text className="text-body font-body font-bold mb-1">OFFICES</Text>
            {["Mumbai"].map((city) => (
              <div key={city} className="flex justify-between items-center mb-1">
                <Text className="text-body font-body">{city}</Text>
                <FontAwesomeIcon icon={faCircle} className={`text-${textColor} text-xs cursor-pointer`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal bg-white p-6 rounded-lg max-w-md mx-auto mt-20"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        contentLabel="Phone Verification Modal"
      >
        <h2 className="text-xl font-bold mb-4">Verify Your Phone Number</h2>
        <p className="mb-4">Enter the OTP sent to {formData.phone}</p>
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-beige text-black rounded hover:bg-opacity-80"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SendEmailForm;