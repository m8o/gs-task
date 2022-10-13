import "./App.css";
import PdfLoaderViewer from "./components/PdfLoaderViewer/PdfLoaderViewer";

function App() {
  return (
    <div className="App">
      <div className="gs_task_version">v{process.env.REACT_APP_VERSION}</div>
      <PdfLoaderViewer />
    </div>
  );
}

export default App;
