import './App.css'
import DearFlipViewer from './components/DearFlipViewer'

function App() {
  return (
    <>
      <div className="flipbook-container">
        <h2>PDF Flipbook Demo</h2>
        <DearFlipViewer
          pdfURL="/pdf/the-three-musketeers.pdf"
          height="600px"
          options={{
            webgl: true,
            autoEnableOutline: false
          }}
        />
      </div>
    </>
  )
}

export default App
