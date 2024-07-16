"use client";

import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

interface ViewerWrapperProps {
  fileUrl: string;
}

const PdfView: React.FC<ViewerWrapperProps> = ({ fileUrl }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pageNavigationPluginInstance = pageNavigationPlugin();

  const { GoToNextPage, GoToPreviousPage, CurrentPageLabel, NumberOfPages } =
    pageNavigationPluginInstance;

  return (
    <div>
      <div
        style={{
          height: "250px",
        }}>
        <Viewer
          theme={"dark"}
          initialPage={1}
          fileUrl={fileUrl}
          plugins={[defaultLayoutPluginInstance, pageNavigationPluginInstance]}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}>
        <GoToPreviousPage>
          {(props) => (
            <button style={{ margin: "0 5px" }} {...props}>
              Previous
            </button>
          )}
        </GoToPreviousPage>
        <CurrentPageLabel>
          {(props) => (
            <span style={{ margin: "0 5px" }}>
              {props.currentPage + 1} / {props.numberOfPages}
            </span>
          )}
        </CurrentPageLabel>
        <GoToNextPage>
          {(props) => (
            <button style={{ margin: "0 5px" }} {...props}>
              Next
            </button>
          )}
        </GoToNextPage>
      </div>
    </div>
  );
};

export default PdfView;
