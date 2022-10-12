import React, { useState } from "react";
import UploadAlert from "../UploadAlert/UploadAlert";
import UploadInput from "../UploadInput/UploadInput";
import Viewer from "../Viewer/Viewer";

const PdfLoaderViewer = () => {
  const [pdfFile, setPdfFile] = useState();
  const [alertMessage, setAlertMessage] = useState({});
  const [pageCount, setPageCount] = useState(null);

  function pdfSelectHandler(event) {
    const fileReader = new FileReader();
    if (event.target.files[0]) {
      if (
        event.target.files[0] &&
        event.target.files[0].type === "application/pdf"
      ) {
        fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = (loadEndEvent) => {
          setAlertMessage({
            message:
              event.target.value.replace("C:\\fakepath\\", "") + " loaded!",
            type: UploadAlert.Type.success,
          });
          setPdfFile(loadEndEvent.target.result);
        };
      } else {
        setAlertMessage({
          message: "Please select valid pdf file",
          type: UploadAlert.Type.error,
        });
      }
    }
  }
  function onLoadSuccess({ numPages }) {
    setPageCount(numPages);
  }
  return (
    <>
      <UploadAlert message={alertMessage} />
      <UploadInput onChangehandler={pdfSelectHandler} />
      <Viewer
        pdfFile={pdfFile}
        onLoadSuccess={onLoadSuccess}
        pageCount={pageCount}
      />
    </>
  );
};

export default PdfLoaderViewer;
