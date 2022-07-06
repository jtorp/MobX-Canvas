import Canvas from "./components/Canvas";
import ToolsBar from "./components/ToolsBar";
import ToolSettingsBar from "./components/ToolSettingsBar";
import "./css/app.css"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path=':id' element={
            <>
              <ToolsBar />
              <ToolSettingsBar/>
              <Canvas/>
            </>
          } />
          <Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`} />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
