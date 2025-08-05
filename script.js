window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'en-IN'; // You can later change to 'bn-BD' or 'bn-IN' for Bangla
recognition.interimResults = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'v') {
    recognition.start();
    console.log('🎙️ Voice recognition started...');
  }
});

recognition.onresult = (event) => {
  const speech = event.results[0][0].transcript;
  console.log('🗣️ You said:', speech);

  // Display or process the speech command here
  document.getElementById("output").innerText = `You said: "${speech}"`;
};

recognition.onerror = (e) => {
  console.error('Voice error:', e.error);
};
