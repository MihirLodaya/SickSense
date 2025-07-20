import React, { useState } from "react";
import { AiOutlineEye, AiOutlineDownload } from "react-icons/ai";

const History = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: "2024-12-26",
      fileUrl: "/reports/report1.pdf",
      feedback: null,
    },
    {
      id: 2,
      date: "2024-12-25",
      fileUrl: "/reports/report2.pdf",
      feedback: null,
    },
  ]);
  const [previewReportId, setPreviewReportId] = useState(null);

  const handlePreview = (id) => {
    setPreviewReportId(previewReportId === id ? null : id); // Toggle preview visibility
  };

  const handleDownload = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFeedback = (id, feedback) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === id ? { ...report, feedback } : report
      )
    );
  };

  return (
    <div className="flex-grow ml-64 p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-[#00b894] mb-6">
        History of Reports
      </h2>

      {/* Table of Reports */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full border border-gray-300">
          <thead className="bg-[#eaf9f4]">
            <tr>
              <th className="p-4 border-b border-gray-300 text-left">Date</th>
              <th className="p-4 border-b border-gray-300 text-center">Preview</th>
              <th className="p-4 border-b border-gray-300 text-center">Download</th>
              <th className="p-4 border-b border-gray-300 text-center">Accurate?</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <React.Fragment key={report.id}>
                <tr className="hover:bg-[#f5fdfa]">
                  <td className="p-4 border-b border-gray-300">{report.date}</td>
                  <td className="p-4 border-b border-gray-300 text-center">
                    <button
                      onClick={() => handlePreview(report.id)}
                      className="text-[#00b894] hover:text-[#059f7d] focus:outline-none"
                    >
                      <AiOutlineEye size={20} />
                    </button>
                  </td>
                  <td className="p-4 border-b border-gray-300 text-center">
                    <button
                      onClick={() => handleDownload(report.fileUrl)}
                      className="text-[#00b894] hover:text-[#059f7d] focus:outline-none"
                    >
                      <AiOutlineDownload size={20} />
                    </button>
                  </td>
                  <td className="p-4 border-b text-center">
                    <div className="flex items-center justify-center gap-4">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name={`feedback-${report.id}`}
                          value="yes"
                          checked={report.feedback === "yes"}
                          onChange={() => handleFeedback(report.id, "yes")}
                          className="appearance-none w-4 h-4 border border-[#00b894] rounded-full checked:bg-[#00b894] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b894]"
                        />
                        <span className="text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name={`feedback-${report.id}`}
                          value="no"
                          checked={report.feedback === "no"}
                          onChange={() => handleFeedback(report.id, "no")}
                          className="appearance-none w-4 h-4 border border-[#00b894] rounded-full checked:bg-[#00b894] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00b894]"
                        />
                        <span className="text-gray-700">No</span>
                      </label>
                    </div>
                  </td>
                </tr>

                {/* PDF Preview Row */}
                {previewReportId === report.id && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 border-b border-gray-300 bg-[#f9f9f9]"
                    >
                      <iframe
                        src={report.fileUrl}
                        title={`PDF Preview - Report ${report.id}`}
                        className="w-full h-96 border border-gray-300 rounded-lg"
                      ></iframe>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;