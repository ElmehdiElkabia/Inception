import React, { useEffect, useState } from 'react';

const LightweightBackground = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Check current theme
        const checkDarkMode = () => {
            const darkMode = document.documentElement.classList.contains('dark');
            setIsDarkMode(darkMode);
        };

        checkDarkMode();

        // Watch for theme changes
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Throttled mouse movement tracking for subtle interactive effect
        let ticking = false;
        const handleMouseMove = (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setMousePosition({
                        x: (e.clientX / window.innerWidth) * 100,
                        y: (e.clientY / window.innerHeight) * 100,
                    });
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Only add mouse tracking on non-touch devices
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }

        return () => {
            observer.disconnect();
            if (!('ontouchstart' in window)) {
                window.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    const gradientStyle = {
        background: isDarkMode 
            ? `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 25%, transparent 50%)`
            : `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.02) 25%, transparent 50%)`,
        transition: 'background 0.3s ease-out',
    };

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* Subtle animated gradient background */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={gradientStyle}
            />
            
            {/* Minimal floating dots */}
            <div className="absolute inset-0 w-full h-full">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute w-1 h-1 rounded-full ${
                            isDarkMode ? 'bg-white/20' : 'bg-black/10'
                        }`}
                        style={{
                            left: `${20 + (i * 15)}%`,
                            top: `${30 + (i * 10)}%`,
                            animation: `float-${i % 3} ${8 + i}s infinite ease-in-out`,
                        }}
                    />
                ))}
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes float-0 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    33% { transform: translateY(-10px) translateX(5px); }
                    66% { transform: translateY(5px) translateX(-3px); }
                }
                @keyframes float-1 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-15px) translateX(-8px); }
                }
                @keyframes float-2 {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(8px) translateX(4px); }
                    75% { transform: translateY(-12px) translateX(-6px); }
                }
            `}</style>
        </div>
    );
};

export default LightweightBackground;
