import { useEffect, useState } from 'react';

export default function ConfettiOverlay({ trigger }: { trigger: boolean }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (trigger) {
            setShow(true);
            const timeout = setTimeout(() => setShow(false), 1500);
            return () => clearTimeout(timeout);
        }
    }, [trigger]);

    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999] overflow-hidden">
            {[...Array(25)].map((_, i) => (
                <span
                    key={i}
                    className="absolute text-2xl animate-fall"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${1 + Math.random() * 2}s`,
                    }}
                >
                    🎉
                </span>
            ))}
        </div>
    );
}
