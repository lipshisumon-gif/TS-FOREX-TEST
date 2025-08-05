const OPENAI_API_KEY = "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"; // <-- Valid full key

const output = document.getElementById("output");

async function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-IN'; // You can use 'bn-BD' for Bangla, 'hi-IN' for Hindi
  speechSynthesis.speak(utter);
}

async function sendToGPT(message) {
  output.innerText = "🧠 Thinking...";
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are TS Angel, a helpful assistant who understands Bangla, Hindi, and English. Always reply like a smart, sweet AI girlfriend who understands everything a trader says and responds like a friend."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;
    output.innerText = reply;
    speak(reply);
  } catch (err) {
    output.innerText = "❌ Error connecting to GPT!";
    speak("Sorry, something went wrong.");
    console.error(err);
  }
}

function startListening() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-IN'; // For Bangla focus: 'bn-BD' or Hindi: 'hi-IN'
  recognition.interimResults = false;

  recognition.onstart = () => {
    output.innerText = "🎧 Listening...";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    output.innerText = `You said: "${transcript}"`;
    sendToGPT(transcript);
  };

  recognition.onerror = (event) => {
    output.innerText = "❌ Voice recognition failed!";
    speak("Couldn't hear you, try again.");
  };

  recognition.start();
}
