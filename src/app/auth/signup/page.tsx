//first name, last name
//  grade, school name
// phone number, email 
//gender parent email
//  password, confirm password
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import "./signup.css"; // Import the new CSS

// (Keep the FormData interface and FormErrors type as they are)
interface FormData {
  firstName: string;
  lastName: string;
  gender: string;
  grade: string;
  schoolName: string;
  phoneNumber: string;
  email: string;
  parentEmail: string;
  password: string;
  confirmPassword: string;
  userRole: string;
}

type FormErrors = Record<string, string>;


// Define the structure for each form field
interface FormField {
  id: keyof Omit<FormData, "userRole" | "confirmPassword"> | "confirmPassword"; // Adjusted keys
  label: string;
  type: "text" | "tel" | "email" | "password" | "select";
  placeholder?: string;
  options?: string[]; // For select type
  validationRules?: (value: string, allData: FormData) => string; // Optional specific validation
}

// --- Form Fields Configuration ---
const formFields: FormField[] = [
  { id: "firstName", label: "First Name", type: "text", placeholder: "e.g., John" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "e.g., Doe" },
  { id: "gender", label: "Gender", type: "select", options: ["Male", "Female"] },
  { id: "grade", label: "Grade", type: "select", options: ["2 to 3", "4 to 5", "6 to 7", "8 to 9", "10 to 12"] },
  { id: "schoolName", label: "School Name", type: "text", placeholder: "e.g., Springfield High" },
  { id: "phoneNumber", label: "Phone Number (10 digits)", type: "tel", placeholder: "e.g., 1234567890" },
  { id: "email", label: "Your Email", type: "email", placeholder: "you@example.com" },
  { id: "parentEmail", label: "Parent's Email", type: "email", placeholder: "parent@example.com" },
  { id: "password", label: "Password (min. 8 chars)", type: "password", placeholder: "••••••••" },
  { id: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "••••••••" },
];
// --- End Form Fields Configuration ---


const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    grade: "",
    schoolName: "",
    phoneNumber: "",
    email: "",
    parentEmail: "",
    password: "",
    confirmPassword: "",
    userRole: "student", // Default role
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0); // Track active field index
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // For server errors

  const inputRefs = useRef<(HTMLInputElement | HTMLSelectElement | null)[]>([]);

  // --- Validation Logic ---
  const validateField = useCallback((fieldName: keyof FormData, value: string): string => {
      switch (fieldName) {
        case "firstName": return !value ? "First name is required" : "";
        case "lastName": return !value ? "Last name is required" : "";
        case "gender": return !value ? "Gender is required" : "";
        case "grade": return !value ? "Grade is required" : "";
        case "schoolName": return !value ? "School name is required" : "";
        case "phoneNumber":
          if (!value) return "Phone number is required";
          if (!/^\d{10}$/.test(value)) return "Invalid phone number (10 digits required)";
          return "";
        case "email":
        case "parentEmail":
          const emailRegex = /\S+@\S+\.\S+/;
          if (!value) return `${fieldName === "email" ? "Your" : "Parent's"} email is required`;
          if (!emailRegex.test(value)) return `Invalid ${fieldName === "email" ? "your" : "parent's"} email format`;
          return "";
        case "password":
          if (!value) return "Password is required";
          if (value.length < 8) return "Password must be at least 8 characters";
          return "";
        case "confirmPassword":
          if (!value) return "Please confirm your password";
          if (value !== formData.password) return "Passwords do not match";
          return "";
        default: return "";
      }
    }, [formData.password]); // Re-create if password changes for confirmPassword validation

  const validateAllFields = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    formFields.forEach(field => {
         const error = field ? validateField(field.id, formData[field.id]) : "";
        if (error) {
            newErrors[field.id] = error;
            isValid = false;
        }
    });
    setErrors(newErrors);
    return isValid;
  };

  // --- Handlers ---
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    // Clear server error message on any input change
    if (errorMessage) {
        setErrorMessage("");
    }
  };

  const handleNext = useCallback(() => {
    const currentField = formFields[currentFieldIndex];
    const error = currentField ? validateField(currentField.id, formData[currentField.id]) : "";

    if (!error) {
      if (currentField) {
        setErrors(prev => ({ ...prev, [currentField.id]: "" })); // Clear specific error
      }
      if (currentFieldIndex < formFields.length - 1) {
        setCurrentFieldIndex(prev => prev + 1);
      } else {
        // If on the last field, pressing "Next" could potentially trigger submit
        // Or we rely solely on the dedicated submit button. Let's keep it separate.
        console.log("Reached end, ready to submit");
      }
    } else {
      if (currentField) {
        setErrors(prev => ({ ...prev, [currentField.id]: error }));
      }
      // Optionally focus the input again if validation fails
      inputRefs.current[currentFieldIndex]?.focus();
    }
  }, [currentFieldIndex, formData, validateField]);

  const handleBack = () => {
    setErrorMessage(""); // Clear server error when going back
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(prev => prev - 1);
    }
  };

  const handleDotClick = (index: number) => {
    // Allow jumping back, but only forward if intermediate steps are valid
    if (index < currentFieldIndex) {
        setErrorMessage("");
        setCurrentFieldIndex(index);
    } else if (index > currentFieldIndex) {
        // Validate all steps up to the target index
        let canProceed = true;
        const intermediateErrors: FormErrors = {};
        for (let i = currentFieldIndex; i < index; i++) {
           const field = formFields[i];
           const error = field ? validateField(field.id, formData[field.id]) : "";
           if (error) {
               if (field) {
                   intermediateErrors[field.id] = error;
               }
               canProceed = false;
               break; // Stop validation on first error
           }
        }
        setErrors(prev => ({...prev, ...intermediateErrors}));
        if (canProceed) {
            setErrorMessage("");
            setCurrentFieldIndex(index);
        } else {
           // Focus the first field with an error among the intermediate ones
           const firstErrorField = formFields.findIndex((f, i) => i >= currentFieldIndex && i < index && intermediateErrors[f.id]);
           if (firstErrorField !== -1) {
               inputRefs.current[firstErrorField]?.focus();
           }
        }
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous server errors

    if (validateAllFields()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/auth/registerStudent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, userRole: "student" }), // Ensure role is sent
        });

        interface RegisterStudentResponse { message?: string; }
        const result = (await response.json()) as RegisterStudentResponse;

        if (response.ok) {
          console.log("Registration successful:", result);
          setSubmitted(true);
        } else {
          setErrorMessage(result.message ?? "Registration failed. Please try again.");
          // Try to focus the first field again if general error
          inputRefs.current[0]?.focus();
        }
      } catch (error) {
        console.error("Network error:", error);
        setErrorMessage("Network error. Please try again.");
        // Try to focus the first field again if network error
        inputRefs.current[0]?.focus();
      } finally {
        setIsSubmitting(false);
      }
    } else {
        // If validation fails on submit, find the first field with an error and focus it
        const firstErrorIndex = formFields.findIndex(field => errors[field.id]);
        if (firstErrorIndex !== -1) {
            setCurrentFieldIndex(firstErrorIndex);
            inputRefs.current[firstErrorIndex]?.focus();
        }
        console.log("Validation failed on submit", errors);
    }
  };

  // Handle Enter key press to navigate
   const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
       if (e.key === 'Enter') {
           e.preventDefault(); // Prevent form submission on Enter
           if (currentFieldIndex < formFields.length - 1) {
               handleNext();
           } else {
               // If on the last field, Enter triggers submit
               void handleSubmit(new Event('submit') as unknown as FormEvent<HTMLFormElement>); // Trigger submit programmatically
           }
       }
   };

  // Focus the input when the currentFieldIndex changes
  useEffect(() => {
    inputRefs.current[currentFieldIndex]?.focus();
  }, [currentFieldIndex]);

  // --- Render Logic ---
  const renderField = (field: FormField, index: number) => {
    const isActive = index === currentFieldIndex;
    const isPrev = index < currentFieldIndex;
    
    const fieldError = errors[field.id];

    const wrapperClass = `field-wrapper ${
      isActive ? "active" : isPrev ? "inactive-prev" : "inactive-next"
    }`;

    const commonProps = {
      id: field.id,
      name: field.id,
      value: formData[field.id],
      onChange: handleChange,
      onKeyDown: handleKeyDown, // Add keydown listener
      ref: (el: HTMLInputElement | HTMLSelectElement | null) => { inputRefs.current[index] = el; },
      required: true, // Basic HTML5 validation (optional)
      'aria-invalid': !!fieldError,
      'aria-describedby': fieldError ? `${field.id}-error` : undefined,
    };

    return (
      <div key={field.id} className={wrapperClass}>
        <label htmlFor={field.id} className="label-text">
          {field.label}
        </label>
        {field.type === "select" ? (
          <select {...commonProps} defaultValue="">
            <option value="" disabled>
              Select {field.label}... {/* More informative default */}
            </option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            placeholder={field.placeholder ?? ""}
            {...commonProps}
          />
        )}
        {fieldError && <span id={`${field.id}-error`} className="error-message">{fieldError}</span>}
         {/* Optional Tip */}
         {isActive && <p className="tip">Press Enter to continue</p>}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="signup-container">
        <div className="success-message" style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Changed to transparent
          backdropFilter: 'blur(10px)', // Added blur effect
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          animation: 'fadeInScale 0.5s ease-out'
        }}>
          <div className="success-icon" style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            backgroundColor: '#FFB800',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s infinite'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20 6L9 17L4 12" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 style={{
            color: '#FFB800',
            fontSize: '24px',
            marginBottom: '1rem',
            animation: 'slideUp 0.5s ease-out 0.2s both'
          }}>Registration Successful!</h2>
          <p style={{
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '1.5rem',
            animation: 'slideUp 0.5s ease-out 0.4s both'
          }}>
            Your account has been created. Please check your email (and your parent&apos;s email) for further instructions.
          </p>
          <a 
            href="/auth/login" 
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#FFB800',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '25px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              animation: 'slideUp 0.5s ease-out 0.6s both'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFA500'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFB800'}
          >
            Login Now
          </a>
          <style jsx>{`
            @keyframes fadeInScale {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      {/* Navigation Dots */}
      <div className="nav-dots-container">
        {formFields.map((field, index) => (
          <div
            key={`dot-${field.id}`}
            className={`nav-dot ${index === currentFieldIndex ? "active" : ""} ${index < currentFieldIndex && !errors[field.id] ? "completed" : "" }`}
            onClick={() => handleDotClick(index)}
            title={field.label} // Tooltip for accessibility
           />
        ))}
      </div>

      <form className="signup-form" onSubmit={handleSubmit} noValidate>
        {/* Render all fields */}
        {formFields.map(renderField)}

        {/* Server Error Message */}
        {errorMessage && (
            <div className="server-error-message">
                {/* Optional: Add an error icon SVG */}
                {errorMessage}
            </div>
        )}

        {/* Action Buttons */}
        <div className={`form-actions ${currentFieldIndex >= 0 ? "visible" : ""}`}>
          <button
            type="button"
            onClick={handleBack}
            className="back-button"
            disabled={currentFieldIndex === 0 || isSubmitting}
          >
            Back
          </button>

          {currentFieldIndex < formFields.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="next-button" // You might want specific styles
              disabled={isSubmitting} // Disable next if submitting (edge case)
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="submit-button" // You might want specific styles
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;