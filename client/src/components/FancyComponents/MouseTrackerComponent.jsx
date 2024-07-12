import React, { useState } from 'react';

function MouseTrackerComponent() {
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div className="relative">
            <div
                className={`w-5 h-5 bg-stone-200 rounded-full absolute mouse-tracker ${isVisible ? 'make-visible' : 'invisible'}`}
            ></div>
        </div>
    );
}

export default MouseTrackerComponent;
