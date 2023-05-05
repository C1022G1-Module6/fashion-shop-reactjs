import React from 'react';

const Prompt = ({ when = true, message = 'Are you sure you want to leave?' }) => {
  if (when) {
    window.onbeforeunload = () => message;
  } else {
    window.onbeforeunload = null;
  }

  return null;
};

export default Prompt;