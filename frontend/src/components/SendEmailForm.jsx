import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faMapMarkerAlt, faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faYoutube, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./common/Button";
import Text from "./common/Text";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_PROD_URL
    : "http://localhost:4000"; // Updated to match backend port

// Validation utility functions
const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address (e.g., example@domain.com)";
  return "";
};

const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  const cleanedPhone = phone.replace(/(?!^\+)\D/g, "");
  if (cleanedPhone.length <= 1) return "Please enter a valid phone number";
  if (cleanedPhone.substring(1).length <= 3) return "Please enter a complete phone number";
  const phoneRegex = /^(\+)?\d{1,15}$/;
  if (!phoneRegex.test(cleanedPhone)) return "Please enter a valid international phone number (e.g., +12025550123)";
  return "";
};

const validateName = (name) => {
  if (!name) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters long";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters and spaces";
  return "";
};

const validateOTP = (otp) => {
  if (!otp) return "OTP is required";
  if (!/^\d{6}$/.test(otp)) return "OTP must be a 6-digit number";
  return "";
};

const SendEmailForm = ({ onClose, onFormSuccess, textColor = "beige" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formStartTime, setFormStartTime] = useState(Date.now());
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [lastOtpRequest, setLastOtpRequest] = useState({ phone: "", timestamp: 0 });
  const [isResendMode, setIsResendMode] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [remainingCooldown, setRemainingCooldown] = useState(0);
  const [isCooldownActive, setIsCooldownActive] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [verificationToken, setVerificationToken] = useState("");

  useEffect(() => {
    setFormStartTime(Date.now());
    // Fetch CSRF token
    axios
      .get(`${API_URL}/csrf-token`, { withCredentials: true })
      .then((response) => {
        setCsrfToken(response.data.csrfToken);
      })
      .catch((error) => {
        console.error("Error fetching CSRF token:", error);
        toast.error("Failed to initialize form. Please refresh the page.", {
          position: "bottom-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      });
  }, []);

  useEffect(() => {
    let timer;
    if (isCooldownActive && remainingCooldown > 0) {
      timer = setTimeout(() => {
        setRemainingCooldown((prev) => prev - 1);
      }, 1000);
    } else if (remainingCooldown === 0 && isCooldownActive) {
      setIsCooldownActive(false);
    }
    return () => clearTimeout(timer);
  }, [remainingCooldown, isCooldownActive]);

  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.userEmail);
    const phoneError = validatePhone(formData.phone);
    if (isOtpSent && !isPhoneVerified) {
      const otpError = validateOTP(otp);
      if (otpError) newErrors.otp = otpError;
    }

    if (nameError) newErrors.name = nameError;
    if (emailError) newErrors.email = emailError;
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [formData, setFormData] = useState({
    to: "investor.relations@qodeinvest.com",
    name: "",
    userEmail: "",
    phone: "",
    message: "",
    website: "",
    recaptchaToken: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (phone) => {
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    setFormData((prevData) => ({
      ...prevData,
      phone: formattedPhone,
    }));
    setPhoneTouched(true);
    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }));
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    if (errors.otp) {
      setErrors((prev) => ({
        ...prev,
        otp: "",
      }));
    }
  };

  const startCooldown = (seconds) => {
    setRemainingCooldown(seconds);
    setIsCooldownActive(true);
  };

  const sendOtp = async () => {
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }));
      toast.error(phoneError, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    // Reset OTP field and errors
    setOtp("");
    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    // Client-side cooldown check
    const currentTime = Date.now();
    const cooldownPeriod = 60 * 1000; // 60 seconds
    if (
      lastOtpRequest.phone === formData.phone &&
      currentTime - lastOtpRequest.timestamp < cooldownPeriod
    ) {
      const remainingTime = Math.ceil(
        (cooldownPeriod - (currentTime - lastOtpRequest.timestamp)) / 1000
      );
      startCooldown(remainingTime);
      toast.error(`Please wait ${remainingTime} seconds before requesting another OTP`, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${API_URL}/emails/otp/send`,
        { phone: formData.phone },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );

      setIsOtpSent(true);
      setIsResendMode(false);
      setLastOtpRequest({ phone: formData.phone, timestamp: Date.now() });
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      startCooldown(60);
    } catch (error) {
      console.error("Error sending OTP:", error);
      const errorMessage = error.response?.data?.error || "Failed to send OTP";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      if (error.response?.status === 429) {
        const remainingTime = parseInt(error.response.data.error.match(/\d+/)[0]);
        startCooldown(remainingTime);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const verifyOtp = async () => {
    const otpError = validateOTP(otp);
    if (otpError) {
      setErrors((prev) => ({
        ...prev,
        otp: otpError,
      }));
      toast.error(otpError, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    try {
      setIsVerifyingOtp(true);
      const response = await axios.post(
        `${API_URL}/emails/otp/verify`,
        { phone: formData.phone, otp },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );

      setIsPhoneVerified(true);
      setIsOtpSent(false);
      setVerificationToken(response.data.verificationToken);
      setOtpAttempts(0);
      toast.success("Phone number verified successfully", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      const errorMessage = error.response?.data?.error || "Failed to verify OTP";
      setErrors((prev) => ({
        ...prev,
        otp: errorMessage,
      }));
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });

      const newAttempts = otpAttempts + 1;
      setOtpAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsResendMode(true);
      }
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.website) {
      console.warn("Honeypot triggered: Suspicious activity detected");
      toast.error("Submission blocked due to suspicious activity.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if ((Date.now() - formStartTime) < 5000) {
      console.warn("Form submitted too quickly: Potential bot activity");
      toast.error("Please wait a moment before submitting.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!isPhoneVerified) {
      toast.error("Please verify your phone number with OTP", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!validateForm()) {
      Object.values(errors).forEach((error) => {
        if (error) {
          toast.error(error, {
            position: "bottom-right",
            autoClose: 5000,
            theme: "light",
            transition: Bounce,
          });
        }
      });
      return;
    }

    if (isSubmitting || !csrfToken) return;

    if (!window.grecaptcha || !window.grecaptcha.enterprise) {
      console.error("reCAPTCHA not loaded");
      toast.error("reCAPTCHA not loaded. Please check your connection or try again.", {
        position: "bottom-right",
        autoClose: 5000,
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

      const response = await axios.post(
        `${API_URL}/emails/send`,
        {
          userEmail: formData.userEmail,
          message: formData.message,
          fromName: formData.name,
          phone: formData.phone,
          recaptchaToken: token,
          verificationToken,
          website: formData.website,
          formStartTime,
        },
        {
          headers: { "X-CSRF-Token": csrfToken },
          withCredentials: true,
        }
      );

      if (onFormSuccess) {
        onFormSuccess();
      }

      setFormData({
        name: "",
        userEmail: "",
        phone: "",
        message: "",
        website: "",
        recaptchaToken: "",
      });
      setOtp("");
      setPhoneTouched(false);
      setIsPhoneVerified(false);
      setIsOtpSent(false);
      setIsResendMode(false);
      setOtpAttempts(0);
      setVerificationToken("");
      toast.success(response.data.message || "Form submitted successfully!", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Fetch error:", error);
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
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

  const inputStyle = `w-full p-[6px] bg-transparent border-b border-brown focus:outline-none focus:border-${textColor} text-black text-sm focus:text-black`;

  return (
    <div className="flex flex-col items-center py-5 font-body relative">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto sm:px-18">
        <div className="w-full lg:w-2/3 pr-0 lg:pr-4">
          <Text className={`mb-2 text-${textColor} font-semiheading text-subheading md:text-semiheading`}>
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

              <div className="flex flex-col">
                <div className="flex items-center gap-2 relative">
                  <PhoneInput
                    country={"in"}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
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
                    disabled={isPhoneVerified}
                  />
                  {!isPhoneVerified && !isOtpSent && (
                    <Button
                      type="button"
                      onClick={sendOtp}
                      className={`text-black whitespace-nowrap text-sm ${(isSubmitting || isCooldownActive) ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={isSubmitting || isCooldownActive}
                    >
                      {isSubmitting ? "Sending..." : isCooldownActive ? `Wait ${remainingCooldown}s` : "Send OTP"}
                    </Button>
                  )}
                  {isPhoneVerified && (
                    <div className="flex items-center gap-1 absolute right-0 top-1/2 transform -translate-y-1/2">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                      <span className="text-green-500 text-xs">Verified</span>
                    </div>
                  )}
                </div>
                <span className={`block text-${textColor} text-xs mt-1`}>
                  Select your country code (e.g., +91 for India)
                </span>
                {phoneTouched && renderError("phone")}
              </div>

              {isOtpSent && !isPhoneVerified && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      placeholder="Enter 6-digit OTP*"
                      className={`${inputStyle} ${errors.otp ? "border-red-500" : ""}`}
                      autoComplete="off"
                      maxLength="6"
                    />
                    {isResendMode ? (
                      <Button
                        type="button"
                        onClick={sendOtp}
                        className={`text-black whitespace-nowrap text-sm ${(isSubmitting || isCooldownActive) ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isSubmitting || isCooldownActive}
                      >
                        {isSubmitting ? "Sending..." : isCooldownActive ? `Wait ${remainingCooldown}s` : "Resend OTP"}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={verifyOtp}
                        className={`text-black whitespace-nowrap text-sm ${isVerifyingOtp ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isVerifyingOtp}
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                      </Button>
                    )}
                  </div>
                  {renderError("otp")}
                  {isOtpSent && isCooldownActive && (
                    <span className="text-blue-500 text-xs mt-1">
                      Resend available in {remainingCooldown} seconds
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label className={`block text-${textColor} text-body font-body mb-2`}>
                Additional Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Additional Message"
                className="w-full p-[4px] text-body font-body bg-transparent text-black focus:outline-none border-b border-brown h-5"
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                className={`text-black p-18 px-1 ${!isPhoneVerified || isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!isPhoneVerified || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </div>
          </form>
        </div>

        <div className="w-full md:block hidden lg:w-1/3 pl-0 lg:pl-2 mt-8 lg:mt-0">
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
              <a href="https://www.linkedin.com/company/qodeadvisors/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className={`text-${textColor} text-xl`} />
              </a>
              <a href="https://www.youtube.com/@qodeinvest" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faYoutube} className={`text-${textColor} text-xl`} />
              </a>
              <a href="https://x.com/qodeinvest" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faXTwitter} className={`text-${textColor} text-xl`} />
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
    </div>
  );
};

export default SendEmailForm;