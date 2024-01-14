// Dictaphone component

import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './speech.css';
import startSound from './assets/start.mpg';
import endSound from './assets/end.mpeg';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const Dictaphone = ({ onTranscriptChange }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

  const clickHandler = () => {
    const staudio = new Audio(startSound);
    const endaudio = new Audio(endSound);

    

    if (listening) {
      SpeechRecognition.stopListening();
      endaudio.play();
    } else {
      resetTranscript();
      staudio.play();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // Move the useEffect outside of the conditional block
  React.useEffect(() => {
    onTranscriptChange(transcript);
  }, [transcript, onTranscriptChange]);

  return (
    <div>
      <button className = {`next-button ${listening ? 'clicked' : ''}`} onClick={clickHandler}><KeyboardVoiceIcon/></button>
    </div>
  );
};

export default Dictaphone;
