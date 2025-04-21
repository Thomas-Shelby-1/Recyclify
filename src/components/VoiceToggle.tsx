import { useState } from 'react';

export default function VoiceToggle({ message }: { message: string }) {
    const [isSpeaking, setIsSpeaking] = useState(false);

    const speak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(message);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
        }
    };

    return (
        <button
            onClick={speak}
            className={`mt-4 px-4 py-2 rounded ${isSpeaking ? 'bg-red-600' : 'bg-green-600'} text-white`}
        >
            {isSpeaking ? 'Stop Voice' : 'Speak Tip'}
        </button>
    );
}