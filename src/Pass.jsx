import React, { useState, useRef } from "react";
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
            const response = await fetch("https://expo.nepalpashmina.org.np/api/registrations", {
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
            } else {
                if (responseData.errors) {
                    setErrors(responseData.errors);
                } else {
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
            phone: "",
            email: "",
            organization: "",
            designation: "",
        });
        setIsModalOpen(false);
        navigate("/"); // Navigate to another route if needed
    };

    return ( <
        >

        <div className="flex justify-center items-center w-full h-screen">
      <div className="rounded-md w-full sm:w-[70%]">
        <div>
          <div className="flex flex-col px-6 py-[60px] bg-slate-400 bg-[url('/title.jpg')] bg-cover bg-center h-36">
            <div className="items-center my-auto"></div>
            <h3 className="font-bold text-2xl flex justify-center mx-auto text-[22px] text-white">
             Registration Form
            </h3>
          </div>

          <div className="bg-slate-200 px-16 pb-20 pt-10">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-wrap gap-4">
                <div className="flex-1"></div>
              </div>
              <div className="grid lg:grid-cols-3 lg:gap-8 sm:grid-cols-2 grid-cols-1 gap-6 mb-4">
                <div>
                  <label>First Name *</label>
                  <input
                    className="rounded-md w-full py-4 px-4 bg-white shadow-slate-300 shadow-md text-black mt-2"
                    type="text"
                    placeholder=""
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.first_name && <p style={{ color: "red" }}>{errors.first_name[0]}</p>}
                </div>
                <div>
                  <label>Middle Name</label>
                  <input
                    className="rounded-md w-full py-4 px-4 bg-white shadow-slate-300 shadow-md text-black mt-2"
                    type="text"
                    placeholder=""
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label>Last Name *</label>
                  <input
                    className="rounded-md w-full py-4 px-4 bg-white shadow-slate-300 shadow-md text-black mt-2"
                    type="text"
                    placeholder=""
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                  {errors.last_name && <p style={{ color: "red" }}>{errors.last_name[0]}</p>}
                </div>
              </div>
              <div className="grid lg:gap-8 sm:grid-cols-2 grid-cols-1 gap-6 mb-4">
                <div>
                  <label>Address *</label>
                  {/* Add other input fields similarly */}
                  <input
                    className="rounded-md w-full py-4 px-4 mt-2 bg-white shadow-slate-300 shadow-md text-black"
                    type="text"
                    placeholder=""
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {errors.address && <p style={{ color: "red" }}>{errors.address[0]}</p>}
                </div>
                <div>
                  <label>Country *</label>
                  {/* Country */}
                  <input
                    className="rounded-md w-full py-4 px-4 mt-2 bg-white shadow-slate-300 shadow-md text-black"
                    type="text"
                    placeholder=""
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  />
                  {errors.country && <p style={{ color: "red" }}>{errors.country[0]}</p>}
                </div>
              </div>
              <div className="grid lg:gap-8 sm:grid-cols-2 grid-cols-1 gap-6 mb-4">
                <div>
                  <label>Email *</label>
                  {/* Email */}
                  <input
                    className="rounded-md w-full py-4 px-4 mt-2 bg-white shadow-slate-300 shadow-md text-black"
                    type="email"
                    placeholder=""
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {responseMessage.email && <p style={{ color: "red" }}>{responseMessage.email[0]}</p>}
                </div>
                <div>
                  <label>Phone Number *</label>
                  {/* Phone Number */}
                  <input
                    className="rounded-md w-full py-4 px-4 mt-2 bg-white shadow-slate-300 shadow-md text-black"
                    type="text"
                    placeholder=""
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <p style={{ color: "red" }}>{errors.phone[0]}</p>}
                </div>
              </div>

              <div className="grid lg:gap-8 sm:grid-cols-2 grid-cols-1 gap-6 mb-4">
                <div>
                  <label>Organization</label>
                  {/* Organization */}
                  <input
                    className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                    type="text"
                    placeholder=""
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                  {responseMessage.organization && <p style={{ color: "red" }}>{responseMessage.organization[0]}</p>}
                </div>
                <div>
                  <label>Designation</label>
                  {/* Designation */}
                  <input
                    className="rounded-xl w-full py-4 px-4 mt-2 bg-white shadow-slate-400 shadow-sm text-black"
                    type="text"
                    placeholder=""
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                  />
                  {errors.designation && <p style={{ color: "red" }}>{errors.designation[0]}</p>}
                </div>
              </div>

               <button className="bg-[#0041C2] text-white px-10 py-3 font-bold rounded mt-4 self-center" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Pop
        isModalOpen={isModalOpen}
        formData={formData}
        closeModal={closeModal}
        registrationId={registrationId}
      />

    </div> <
        />
    );
};

export default Pass;
