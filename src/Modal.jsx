import React from "react";
import html2canvas from "html2canvas"; // Import html2canvas
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import Logo from "../public/pashmina.png"; // Import your logo

const Modal = ({ isModalOpen, formData, closeModal,registrationId }) => {
  const captureAndDownload = () => {
    const modalElement = document.getElementById("modalContent");
    
    html2canvas(modalElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "participation_note.jpg"; // Set the download file name
      link.click();
    });
  };
  const printModal = () => {
    const modalElement = document.getElementById("modalContent");

    // Create a new window to print the modal content
    const printWindow = window.open("", "_blank");

    // Add the modal content to the print window
    printWindow.document.write("<html><head><title>Print</title><style>");
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        margin: 0;
      }
      .modal-content {
        padding: 20px;
        max-width: 100%;
        font-size: 16px;
      }
      .btn {
        display: none; /* Hide buttons in print */
      }
      .modal {
        display: block;
      }
      .location{
      margin-top:2px;
      }
    `);
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(modalElement.innerHTML); // Copy modal content to print window
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    // Wait for the content to load and then print it
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };
  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div
            id="modalContent"
            className="bg-[#cbf0ff] sm:w-[50%] sm:h-[100%] w-[90%] h-[100%] rounded-lg shadow-lg flex flex-col justify-center p-6"
          >
            <h2 className="text-3xl font-bold mb-2 text-[#022c40] text-center">
              PARTICIPATION NOTE
            </h2>
            <div className="flex-grow"> 
              
              <p className="my-2 text-[#841412] text-3xl font-bold">
                {formData.first_name}{" "}
                {formData.middle_name && ` ${formData.middle_name}`}{" "}
                {formData.last_name}
              </p>
              <p className="text-sm font-bold text-[#022c40] mb-2 ">
                Thank you for your participation.Please bring a copy of this confirmation or have it
                accessible on your device during the event for verification
                purposes
              </p>
              <div className="flex sm:flex-row flex-col sm:justify-normal justify-center gap-4 pt-4 w-[40%]">
                <img src={Logo} alt="pashmina" />
                <img src="" />
              </div>
            </div>
            <div className="w-[100%] h-[2px] bg-[#841412]"></div>
            <div className="py-5">
              <span className=" text-[#022c40] text-lg font-bold px-1 py-1 rounded text-center">
                <h1 className="text-xl font-bold">Your OTP: {registrationId} </h1>
              </span>
            </div>
            <div className="w-[100%] h-[2px] bg-[#841412]"></div>
            <div className="flex sm:flex-row flex-col items-center justify-between p-4 rounded-lg shadow-md">
              {/* Date Section */}
              <div className="flex items-center space-x-4 sm:mb-0 mb-2 location">
                <FaRegCalendarAlt className="w-6 h-6 text-blue-700" />
                <div>
                  <div className="flex space-x-2">
                    <span className="bg-blue-700 text-white text-sm font-bold px-1 py-1 rounded">
                      10
                    </span>
                    <span className="bg-blue-700 text-white text-sm font-bold px-1 py-1 rounded">
                      11
                    </span>
                    <span className="bg-blue-700 text-white text-sm font-bold px-1 py-1 rounded">
                      12
                    </span>
                    <span className="text-sm font-bold text-gray-700 pl-2">
                      MAGH 2081
                    </span>
                    <br />
                  </div>
                  <span className="text-sm font-bold text-gray-700 pl-2">
                    (23RD – 25TH JAN 2025)
                  </span>
                </div>
              </div>

              {/* Location Section */}
              <div className="flex items-center space-x-4 sm:mt-0 mt-2 location">
                <ImLocation2 className="w-6 h-6 text-blue-700" />
                <div>
                  <p className="text-sm font-bold text-gray-700 pl-2">
                    BHRIKUTIMANDAP EXHIBITION HALL
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    10:00 AM – 5:00 PM
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-4">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded mt-2 self-center btn"
              onClick={captureAndDownload}
            >
              Download as JPG
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 self-center btn"
              onClick={printModal}
            >
              Print
            </button>
            </div>
            <button
              className="bg-[#841412] text-white px-6 py-2 rounded mt-4 self-center btn"
              onClick={closeModal}
            >
              Close
            </button>
           
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
