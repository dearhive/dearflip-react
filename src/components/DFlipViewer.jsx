import { useRef } from 'react';
import PropTypes from 'prop-types';
import useDFlip from '../hooks/useDFlip';

// Main component
const DFlipViewer = ({
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
