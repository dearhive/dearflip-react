import './App.css'
import DFlipViewer from './components/DFlipViewer'

function App() {
  return (
    <>
      <div className="flipbook-container">
        <h2>PDF Flipbook Demo</h2>
        <DFlipViewer
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
