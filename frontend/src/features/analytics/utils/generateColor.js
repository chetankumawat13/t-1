export const generateColor = () => {
    const colors = [
      "#ff4d5a",
      "#ff7aa2",
      "#ffc857",
      "#4cc9f0",
      "#a29bfe",
      "#55efc4",
      "#fd79a8",
      "#fab1a0",
      "#00cec9",
      "#ffeaa7",
    ];
  
    return colors[Math.floor(Math.random() * colors.length)];
  };