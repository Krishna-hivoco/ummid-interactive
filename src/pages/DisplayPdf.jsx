import  { useRef, useEffect } from "react";
import CloudPdfViewer from "@cloudpdf/viewer";


const DisplayPdf = () => {
  const viewer = useRef(null);
  useEffect(() => {
    CloudPdfViewer(
      {
        documentId: '80c22ef6-de6f-4bd0-a3d1-08a82b1f7e1b',
        darkMode: true,
      },
      viewer.current
    ).then((instance) => {});
  }, []);
  return (
    <div className="app h-svh w-full">
      <div className="viewer h-full w-full" ref={viewer}></div>
    </div>
  );
};

export default DisplayPdf;
