export const playSound = (soundName: 'correct' | 'incorrect' | 'tick' | 'timeWarning' | 'timeUp', volume: number = 0.2) => {
  const soundMap = {
    correct: 'correctding',
    incorrect: 'wrong',
    tick: 'tick',
    timeWarning: 'timewarning',
    timeUp: 'timeup'
  };
  
  const audio = new Audio(`/sounds/${soundMap[soundName]}.wav`);
  audio.volume = volume;
  audio.play().catch(error => {
    console.log('Audio playback failed:', error);
  });
}; 