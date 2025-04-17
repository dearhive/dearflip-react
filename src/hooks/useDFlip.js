import { useEffect, useRef } from 'react';

/**
 * Custom hook for initializing and managing dFlip PDF viewer
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {string} pdfURL - URL of the PDF to display
 * @param {Object} options - Configuration options for dFlip
 * @returns {Object|null} - Reference to the flipbook instance
 */
const useDFlip = (containerRef, pdfURL, options = {}) => {
    const flipbookRef = useRef(null);

    // Load script with existence check
    const loadScript = (src) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            return Promise.resolve();
        }
        
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    // Load style with existence check
    const loadStyle = (href) => {
        if (document.querySelector(`link[href="${href}"]`)) {
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = href;
        document.head.appendChild(link);
    };

    useEffect(() => {
        const initFlipbook = async () => {
            try {
                // First load the styles
                loadStyle('/dflip/css/dflip.min.css');
                
                // Then load the scripts in sequence
                await loadScript('/dflip/js/libs/jquery.min.js');
                if (!window.jQuery) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                await loadScript('/dflip/js/dflip.js');
                await new Promise(resolve => setTimeout(resolve, 100));

                // Initialize dFlip with the container
                if (containerRef.current && window.jQuery) {
                    const defaultOptions = {
                        webgl: true,
                        autoEnableOutline: false,
                        autoEnableThumbnail: false,
                        overwritePDFOutline: false,
                        soundEnable: true,
                        backgroundColor: "rgb(217, 217, 217)",
                        autoPlay: false,
                        autoPlayDuration: 5000,
                        autoPlayStart: false,
                        hard: 'none',
                        maxTextureSize: 1600,
                        pageMode: window.innerWidth <= 768 ? 1 : 2,
                        singlePageMode: window.innerWidth <= 768 ? 1 : 0,
                        responsive: true,
                        transparent: false,
                        direction: 1,
                        duration: 800,
                        zoom: 1,
                        enableSound: true
                    };

                    // Combine default options with user-provided options
                    const mergedOptions = { ...defaultOptions, ...options};

                    // Initialize dFlip
                    flipbookRef.current = window.jQuery(containerRef.current).flipBook(pdfURL, mergedOptions);
                }
            } catch (error) {
                console.error('Error loading dFlip:', error);
            }
        };

        initFlipbook();

        // Cleanup function
        return () => {
            if (flipbookRef.current && flipbookRef.current.dispose) {
                flipbookRef.current.dispose();
            }
        };
    }, [containerRef, pdfURL, options]);

    return flipbookRef.current;
};

export default useDFlip; 