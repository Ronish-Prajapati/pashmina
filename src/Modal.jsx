import React from "react";
import html2canvas from "html2canvas"; // Import html2canvas
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import Logo from "../public/pashmina.png"; // Import your logo

const Modal = ({ isModalOpen, formData, closeModal, registrationId }) => {
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
            className="bg-[url('/modal.jpg')] bg-cover bg-center sm:w-[50%] sm:h-[100%] w-[90%] h-[100%] rounded-lg shadow-lg flex flex-col justify-center p-6"
          >
           <p className="absolute  top-[43%] left-[50%]   text-center sm:top-[40%] sm:left-[50%] transform -translate-x-1/2 text-[#841412] text-xl sm:text-2xl font-bold">
    {formData.first_name}{" "}
    {formData.middle_name && ` ${formData.middle_name}`}{" "}
    {formData.last_name}
  </p>

  {/* Registration ID Below "You are Visitor Number:" */}
  <p className="absolute top-[67%] left-[50%] sm:top-[80%] sm:left-[50%] transform -translate-x-1/2 text-gray-800 text-2xl font-semibold">
    {registrationId}
  </p>

            {/* <div className="flex flex-row justify-center gap-4">
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
            </div> */}
            {/* <button
              className="bg-[#841412] text-white px-6 py-2 rounded mt-4 self-center btn"
              onClick={closeModal}
            >
              Close
            </button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
