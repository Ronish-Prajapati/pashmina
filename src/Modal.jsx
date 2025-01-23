import React from "react";
import html2canvas from "html2canvas"; // Import html2canvas
import { FaRegCalendarAlt } from "react-icons/fa";
import { ImLocation2 } from "react-icons/im";
import Logo from "../public/pashmina.png"; // Import your logo

const Modal = ({ isModalOpen, formData, closeModal, registrationId }) => {
  const captureAndDownload = () => {
    const modalElement = document.getElementById("modalBody");
    const downloadImage = document.querySelector("#modalBody img");

    // Check if the image is found
    if (downloadImage) {
      downloadImage.src = downloadImage.src.replace('print.jpeg', 'modal.jpeg');
    }

    html2canvas(modalElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "participation_note.jpg"; // Set the download file name
      link.click();
    });
  };
  const printModal = () => {
    const modalElement = document.getElementById("modalBody");
    const printImage = document.querySelector("#modalBody img");

    // Check if the image is found
    if (printImage) {
      printImage.src = printImage.src.replace('modal.jpeg', 'print.jpeg');
    }

    // Create a new window to print the modal content
    const printWindow = window.open("", "_blank");

    // Add the modal content to the print window
    printWindow.document.write("<html><head><title></title><style>");
    printWindow.document.write(`
      body {
        font-family: Arial, sans-serif;
        margin: 0 auto;
        display: flex;
        justify-content: center;
      }

      @page {
        size: 3in 5in;
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

      #modalBody {
        position: relative;
        width: 600px;
        aspect-ratio: 3/5;
      }

      #name, #reg_id {
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.75rem;
        font-weight: 600;
        color: #841412;
        width: 100%;
        text-align: center;
      }

      #name {
        top: 43%;

      }
      #reg_id {
        top: 67.5%;
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
            className="sm:p-12 p-8 relative"
          >
            <div id="modalBody">
             <img className="object-contain mx-auto lg:w-8/12 sm:10/12 w-full" src="/modal.jpg" alt="" />
             <p id="name" className="absolute top-[44%] left-[50%] text-center sm:top-[44%] sm:left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-[#841412] text-md sm:text-2xl font-bold">
                {formData.first_name}{" "}
                {formData.middle_name && ` ${formData.middle_name}`}{" "}
                {formData.last_name}
              </p>

              {/* Registration ID Below "You are Visitor Number:" */}
              <p id="reg_id" className="absolute top-[63%] left-[50%] sm:top-[65%] sm:left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-gray-800 text-md sm:text-2xl font-semibold">
                {registrationId}
              </p>
            </div>
            <button
              className="bg-[#841412] absolute lg:top-4 lg:right-32 top-0 right-3 text-white px-2 rounded-full w-8 h-8 mt-4 self-center btn"
              onClick={closeModal}
            >
              &#10005;
            </button>

            <div className="flex flex-row justify-center gap-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded mt-4 self-center btn"
                onClick={captureAndDownload}
              >
                Download as JPG
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mt-4 self-center btn"
                onClick={printModal}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
