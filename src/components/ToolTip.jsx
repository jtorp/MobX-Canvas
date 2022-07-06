import React, { useState } from "react";

const Tooltip = ({children, text}) => {
  let timeoutId;
  const [active, setActive] = useState(false);

  const showTooltip = () => {
    timeoutId = setTimeout(() => {
      setActive(true);
    }, 300);
  };

  const hideTooltip = () => {
    clearInterval(timeoutId);
    setActive(false);
  };

  return (
    <div className="tooltip-wrapper"   onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {active && (
        <div className="tooltip-box bottom">
       {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
