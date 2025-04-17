import { useRef } from 'react';
import PropTypes from 'prop-types';
import useDFlip from '../hooks/useDearFlip';

// Main component
const DearFlipViewer = ({
    pdfURL = '/pdf/the-three-musketeers.pdf',
    options = {}
}) => {
    const containerRef = useRef(null);
    // Use the custom hook
    useDFlip(containerRef, pdfURL, options);

    return (
        <div
            ref={containerRef}
            className="dflip-container"
            data-pdf-url={pdfURL}
        />
    );
};

DFlipViewer.propTypes = {
    pdfURL: PropTypes.string,
    options: PropTypes.object
};

export default DFlipViewer;
