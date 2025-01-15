In React, you can programmatically scroll a scrollable container using the ref attribute and the DOM's scrollTo or scrollTop methods. Here's how you can achieve scrolling to the top, bottom, or any specific position:

Example Code

import React, { useRef } from "react";

const ScrollableComponent = () => {
  const containerRef = useRef(null);

  const scrollToTop = () => {
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  const scrollToBottom = () => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  const scrollToPosition = (position) => {
    containerRef.current.scrollTo({
      top: position,
      behavior: "smooth", // Optional for smooth scrolling
    });
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid black",
        }}
      >
        <div style={{ height: "800px" }}>
          <p>Scroll through this content!</p>
        </div>
      </div>
      <button onClick={scrollToTop}>Scroll to Top</button>
      <button onClick={scrollToBottom}>Scroll to Bottom</button>
      <button onClick={() => scrollToPosition(400)}>Scroll to Position 400px</button>
    </div>
  );
};

export default ScrollableComponent;

Explanation:

1. useRef:

A ref is used to get a reference to the scrollable container.



2. scrollTo Method:

The scrollTo method is used to scroll the container to a specific position.

You can specify the top position and optionally use behavior: "smooth" for smooth scrolling.



3. Custom Scroll Position:

Pass a specific value to scrollToPosition to scroll to any desired position within the container.




Styling:

Ensure the container has a fixed height and overflow-y: scroll to enable scrolling.

