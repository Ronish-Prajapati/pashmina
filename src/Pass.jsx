import React, { useState,useRef } from "react";
import { SlArrowLeft } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pop from './Modal.jsx'
import Logo from "../public/pashmina.png";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
const Pass = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    country: "",
    phone: "",
    email: "",
    organization: "",
    designation: "",
    
  });
  

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://registration.test/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
       
      });
      const responseData = await response.json();
      if (response.ok) {
        
        const registrationId = responseData.registration_id;
        
        setRegistrationId(registrationId || 'N/A');
      }
      else{
        if(responseData.errors){
          setErrors(responseData.errors);
        }
        else{
          setResponseMessage(data.message || 'There was an error with your submission.');
          
        }
        setRegistrationId('');
        
      }

      // Reset form and show modal on success
      
      setIsModalOpen(true);
    } catch (err) {
      setErrors(err.message);
    } finally {
      setIsSubmitting(false);
    }
   
  };
  

  

  const closeModal = () => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      address: "",
      country: "",
      phone_number: "",
      email: "",
      organization: "",
      designation: "",
    });
    setIsModalOpen(false);
    navigate("/"); // Navigate to another route if needed
  };

  return (
    <>
    
    <div className="flex w-full justify-center h-full">
     
      <div className=" w-full sm:w-[70%]  h-full bg-[#f5f5f5]">
        <div>
        
          <div className="flex flex-col px-6 py-[60px] bg-slate-400 bg-[url('/title.jpg')] bg-cover bg-center h-full">
            <div className="items-center my-auto"></div>
            
            <h3 className="font-bold text-2xl flex justify-center mx-auto text-[22px] text-white">
             Registration Form
            </h3>
           
          </div>
          <div className="bg-slate-200 px-6 pb-20 pt-6 ">
            <form className="flex  flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1"></div>
              </div>
              <input
                className="rounded-xl w-full py-4 px-4 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              {errors.first_name && <p style={{ color: "red" }}>{errors.first_name[0]}</p>}
              <input
                className="rounded-xl w-full py-4 px-4 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Middle Name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleChange}
              />
              <input
                className="rounded-xl w-full py-4 px-4 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && <p style={{ color: "red" }}>{errors.last_name[0]}</p>}

              {/* Add other input fields similarly */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <p style={{ color: "red" }}>{errors.address[0]}</p>}
              {/* Country */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {errors.country && <p style={{ color: "red" }}>{errors.country[0]}</p>}

              {/* Email */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {responseMessage.email && <p style={{ color: "red" }}>{responseMessage.email[0]}</p>}

              {/* Phone Number */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone_number}
                onChange={handleChange}
              />
              {errors.phone_number && <p style={{ color: "red" }}>{errors.phone_number[0]}</p>}

              {/* Organization */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
              {responseMessage.organization && <p style={{ color: "red" }}>{responseMessage.organization[0]}</p>}

              {/* Designation */}
              <input
                className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                type="text"
                placeholder="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
              {errors.designation && <p style={{ color: "red" }}>{errors.designation[0]}</p>}
               <button className="bg-[#0041C2] text-white px-6 py-2 rounded mt-4 self-center" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
            </form>
          </div>
        </div>
        <div>

        </div>
      </div>

      {/* Modal */}
      <Pop
        isModalOpen={isModalOpen}
        formData={formData}
        closeModal={closeModal}
        registrationId={registrationId}
      />
    
    </div>
    </>
  );
};

export default Pass;
