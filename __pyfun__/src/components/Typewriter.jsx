import React, { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 25, onDone }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(intervalId);
        if (onDone) onDone();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);
  
  return <span>{displayedText}</span>;
}
