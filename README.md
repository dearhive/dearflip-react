# DearFlip React Integration

This project demonstrates how to integrate the [DearFlip PDF Flipbook](https://dearflip.com/) library with React. DearFlip is a powerful HTML5 flipbook library that creates beautiful, interactive 3D flipbooks to display PDFs and images.

## Overview

The implementation provides a React component wrapper around the DearFlip library, making it easy to embed an interactive PDF viewer in your React applications. The solution handles:

- Dynamic script and style loading
- React component lifecycle integration
- Multiple render safety in React's Strict Mode
- Proper cleanup on unmount

## Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Structure

The project is organized as follows:

- `src/hooks/useDearFlip.js`: Custom React hook that handles DearFlip initialization
- `src/components/DearFlipViewer.jsx`: React component wrapper for the DearFlip viewer
- `public/dearflip/`: Contains the DearFlip library files
- `public/pdf/`: Contains sample PDF files for demonstration

## Usage

### Basic Usage

```jsx
import DearFlipViewer from './components/DearFlipViewer';

function App() {
  return (
    <div className="flipbook-container">
      <h2>PDF Flipbook Demo</h2>
      <DearFlipViewer 
        pdfURL="/pdf/your-document.pdf"
        options={{
          // DearFlip options here
        }}
      />
    </div>
  );
}
```

### Props

The `DearFlipViewer` component accepts the following props:

- `pdfURL` (String): Path to the PDF file (default: '/pdf/the-three-musketeers.pdf')
- `options` (Object): Configuration options for DearFlip

### Available Options

The `options` object can include any of the DearFlip configuration options. Here are the most common ones:

```jsx
{
  webgl: true,                 // Enable WebGL rendering for better performance
  autoEnableOutline: false,    // Automatically enable document outline
  autoEnableThumbnail: false,  // Automatically enable thumbnails
  overwritePDFOutline: false,  // Overwrite the PDF outline
  soundEnable: true,           // Enable page flip sound
  backgroundColor: "rgb(217, 217, 217)",
  autoPlay: false,             // Auto-play the flipbook
  autoPlayDuration: 5000,      // Duration between auto-plays
  autoPlayStart: false,        // Start auto-play on load
  hard: 'none',                // Hard page effect
  maxTextureSize: 1600,        // Maximum texture size for rendering
  pageMode: 2,                 // Page mode (1 for single page, 2 for double page)
  singlePageMode: 0,           // Single page mode
  responsive: true,            // Make the flipbook responsive
  transparent: false,          // Enable transparent background
  direction: 1,                // Reading direction (1 for LTR, 2 for RTL)
  duration: 800,               // Page turn duration in ms
  zoom: 1,                     // Initial zoom level
  enableSound: true            // Enable sound effects
}
```

## Implementation Details

### Custom Hook: useDearFlip

The `useDearFlip` hook is responsible for:

1. Loading DearFlip resources (CSS and JavaScript) only once
2. Initializing the flipbook with the provided options
3. Handling cleanup when the component unmounts

```jsx
// src/hooks/useDearFlip.js
import { useEffect, useRef } from 'react';

const useDearFlip = (containerRef, pdfURL, options = {}) => {
  const flipbookRef = useRef(null);
  
  // Implementation details...
  
  return flipbookRef.current;
};

export default useDearFlip;
```

### Component: DearFlipViewer

The `DearFlipViewer` component is a thin wrapper around the custom hook:

```jsx
// src/components/DearFlipViewer.jsx
import { useRef } from 'react';
import PropTypes from 'prop-types';
import useDearFlip from '../hooks/useDearFlip';

const DearFlipViewer = ({
  pdfURL = '/pdf/the-three-musketeers.pdf',
  options = {}
}) => {
  const containerRef = useRef(null);
  
  // Use the custom hook
  useDearFlip(containerRef, pdfURL, options);

  return <div ref={containerRef}></div>;
};

// PropTypes definition...

export default DearFlipViewer;
```

## Multiple Render Protection

The implementation includes safeguards to prevent issues with React's Strict Mode, which renders components twice in development:

1. Script loading checks to prevent duplicate loading
2. Style loading checks to prevent duplicate styles
3. Initialization guard to ensure the flipbook is only initialized once per instance

## Browser Compatibility

DearFlip works in all modern browsers (Chrome, Firefox, Safari, Edge) and provides graceful fallbacks for environments without WebGL support.

## License

This integration is provided as an educational example. The DearFlip library itself requires a license for commercial use. Visit [dearflip.com](https://dearflip.com/) for more information about licensing.

## Additional Resources

- [DearFlip Official Documentation](https://dearflip.com/docs)
- [DearFlip JavaScript API Reference](https://js.dearflip.com/docs)

## Troubleshooting

If you encounter issues:

1. Make sure the DearFlip library files are correctly placed in the public/dearflip directory
2. Check browser console for any loading errors
3. Verify that the PDF file path is correct and accessible

## Contributing

Feel free to submit issues or pull requests to improve this integration example.
