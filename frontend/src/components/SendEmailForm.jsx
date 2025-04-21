import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faTimes, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "./common/Button";
import Text from "./common/Text";

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
  const phoneRegex = /^\d{10}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) return "Please enter a valid 10-digit phone number";
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

const SendEmailForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
  });

  const validateStep = (step) => {
    const newErrors = {};

    switch(step) {
      case 1:
        // Personal Information validation
        const nameError = validateName(formData.name);
        const emailError = validateEmail(formData.userEmail);
        const phoneError = validatePhone(formData.phone);
        const locationError = validateLocation(formData.location);

        if (nameError) newErrors.name = nameError;
        if (emailError) newErrors.email = emailError;
        if (phoneError) newErrors.phone = phoneError;
        if (locationError) newErrors.location = locationError;
        break;

      case 2:
        // Investment Goal validation
        if (!formData.investmentGoal) {
          newErrors.investmentGoal = "Please select an investment goal";
        }
        break;

      case 3:
        // Investment Experience validation
        if (!formData.investmentExperience) {
          newErrors.investmentExperience = "Please select your investment experience";
        }
        break;

      case 4:
        // Strategy validation
        if (!formData.preferredStrategy.length) {
          newErrors.preferredStrategy = "Please select at least one investment strategy";
        }
        break;

      case 5:
        // Final step validation
        if (!formData.initialInvestmentSize) {
          newErrors.initialInvestmentSize = "Please select your initial investment size";
        }
        break;
    }

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
            preferredStrategy: [...currentStrategies, value]
          };
        } else {
          return {
            ...prevData,
            preferredStrategy: currentStrategies.filter(strategy => strategy !== value)
          };
        }
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ""
        }));
      }
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      // Display all errors for current step
      Object.values(errors).forEach(error => {
        if (error) {
          toast.error(error);
        }
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate final step before submission
    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const token = await new Promise((resolve, reject) => {
        if (window.grecaptcha && window.grecaptcha.enterprise) {
          window.grecaptcha.enterprise.ready(() => {
            window.grecaptcha.enterprise.execute('6Lf7VcwqAAAAAJIm0sR-zrMGipoXSoZ0TKjjovLP', { action: 'SUBMIT_FORM' })
              .then(resolve)
              .catch(reject);
          });
        } else {
          reject(new Error("reCAPTCHA is not loaded"));
        }
      });
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
          phone: formData.phone,         // Added phone number
          location: formData.location,   // Added location
          investmentGoal: formData.investmentGoal,
          investmentExperience: formData.investmentExperience,
          preferredStrategy: formData.preferredStrategy,
          initialInvestmentSize: formData.initialInvestmentSize,
          recaptchaToken: token,
        }),
      });
    
      if (response.ok) {
        toast.success("Your message has been sent. We'll get back to you soon!");
        setFormData({
          name: "",
          userEmail: "",
          phone: "",
          location: "",
          investmentGoal: "",
          investmentExperience: "",
          preferredStrategy: [],
          initialInvestmentSize: "",
          message: ""
        });
        setCurrentStep(1);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }
    } catch (error) {
      toast.error(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (fieldName) => {
    return errors[fieldName] ? (
      <span className="text-red-500 text-sm mt-1">{errors[fieldName]}</span>
    ) : null;
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div>
            <Text className="mb-4 text-lightBeige text-body font-body">
              Let's start with your contact information
            </Text>
            <div className="mb-4">
              <input
                autoComplete="off"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className={`w-full p-[12px] text-body font-body bg-transparent focus:outline-none focus:bg-lightBeige text-white focus:text-black border ${
                  errors.name ? 'border-red-500' : 'border-brown'
                }`}
              />
              {renderError('name')}
            </div>
            <div className="mb-4">
              <input
                autoComplete="off"
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Your Email"
                className={`w-full p-[12px] text-body font-body bg-transparent focus:outline-none focus:bg-lightBeige text-white focus:text-black border ${
                  errors.email ? 'border-red-500' : 'border-brown'
                }`}
              />
              {renderError('email')}
            </div>
            <div className="mb-4">
              <input
                autoComplete="off"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone"
                maxLength={10}
                className={`w-full p-[12px] text-body font-body bg-transparent focus:outline-none focus:bg-lightBeige text-white focus:text-black border ${
                  errors.phone ? 'border-red-500' : 'border-brown'
                }`}
              />
              {renderError('phone')}
            </div>
            <div className="mb-4">
              <input
                autoComplete="off"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Your Location"
                className={`w-full p-[12px] text-body font-body bg-transparent focus:outline-none focus:bg-lightBeige text-white focus:text-black border ${
                  errors.location ? 'border-red-500' : 'border-brown'
                }`}
              />
              {renderError('location')}
            </div>
          </div>
        );
      
      case 2:
        return (
          <div>
            <Text className="mb-4 text-lightBeige text-body font-body">
              What is your investment goal?
            </Text>
            <div className="grid grid-cols-1 text-beige sm:grid-cols-1 gap-2">
              {["Conservative (Low risk, steady returns)", "Balanced (Moderate risk, moderate returns)", "Aggressive (High risk, higher returns)"].map((goal) => (
                <label key={goal} className="block">
                  <input
                    type="radio"
                    name="investmentGoal"
                    value={goal}
                    checked={formData.investmentGoal === goal}
                    onChange={handleInputChange}
                    required
                    className="mr-2 accent-beige"
                  />
                  {goal}
                </label>
              ))}
            </div>
           
          </div>
        );
      
      case 3:
        return (
          <div>
            <Text className="mb-4 text-lightBeige text-body font-body">
              Tell us about your investment experience
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-1 text-beige gap-2">
              {[
                { value: "Experienced", label: "Yes, I have prior experience with Portfolio Management Services (PMS)." },
                { value: "New", label: "No, I'm new to PMS or similar investment vehicles." }
              ].map(({ value, label }) => (
                <label key={value} className="block">
                  <input
                    type="radio"
                    name="investmentExperience"
                    value={value}
                    checked={formData.investmentExperience === value}
                    onChange={handleInputChange}
                    className="mr-2 accent-beige"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <Text className="mb-4 text-lightBeige text-body font-body">
              Select your preferred investment strategies
            </Text>
            <div className="grid grid-cols-1 text-beige sm:grid-cols-2 gap-2">
              {[
                "Qode All Weather", 
                "Qode Growth Fund", 
                "Qode Future Horizons", 
                "Qode Tactical Fund",
                "Help Me Choose"
              ].map((strategy) => (
                <label key={strategy} className="block">
                  <input
                    type="checkbox"
                    name="preferredStrategy"
                    value={strategy}
                    checked={formData.preferredStrategy.includes(strategy)}
                    onChange={handleInputChange}
                    className="mr-2 accent-beige"
                  />
                  {strategy}
                </label>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <Text className="mb-4 text-lightBeige text-body font-body">
              Final details and investment size
            </Text>
            <div className="mb-4">
              <Text className="mb-2 text-lightBeige text-body font-body">
                Initial Investment Size:
              </Text>
              <div className="grid grid-cols-1 sm:grid-cols-1 text-beige gap-2">
                {[
                  "₹50 Lakhs - ₹2 Crores",
                  "₹2 Crores - ₹10 Crores", 
                  "More than ₹10 Crores"
                ].map((size) => (
                  <label key={size} className="block">
                    <input
                      type="radio"
                      name="initialInvestmentSize"
                      value={size}
                      checked={formData.initialInvestmentSize === size}
                      onChange={handleInputChange}
                      className="mr-2 accent-beige"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Additional Message (Optional)"
                className="w-full p-18 text-body font-body bg-transparent text-white focus:text-black focus:bg-lightBeige border border-brown h-32"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-md flex flex-col sm:p-5 lg:p-4 p-3 items-center justify-center z-50 font-body">
      <Text className="mb-18 text-beige font-semiheading text-semiheading">
        Contact Us
      </Text>
      
      <div className="w-full max-w-xl">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center transition-all duration-500 mb-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`h-18 w-18 rounded-full mx-1 ${
                currentStep === step ? 'bg-lightBeige h-[1.5rem] w-[1.5rem]' : 'bg-beige'
              }`}
            />
          ))}
        </div>
        
        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <Button 
                type="button" 
                onClick={prevStep} 
                className=" text-black p-18 px-1 flex items-center"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="mr-18" />
                Previous
              </Button>
            )}
            
            {currentStep < 5 ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="ml-auto  text-black p-18 px-1 flex items-center"
              >
                Next
                <FontAwesomeIcon icon={faChevronRight} className="ml-18" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="ml-auto  text-black p-18 px-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailForm;