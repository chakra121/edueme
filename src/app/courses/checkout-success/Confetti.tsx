// app/courses/components/ConfettiEffect.tsx
"use client";

import { useEffect, useRef } from 'react';

// Define the Confettiful class directly within the component or import if separated
class Confettiful {
    el: HTMLElement;
    containerEl: HTMLElement | null = null;
    confettiFrequency = 3;
    confettiColors: string[] = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    confettiAnimations: string[] = ['slow', 'medium', 'fast'];
    confettiInterval: NodeJS.Timeout | null = null;

    constructor(el: HTMLElement) {
        this.el = el;
        this._setupElements();
        this._renderConfetti();
    }

    _setupElements() {
        const containerEl = document.createElement('div');

        containerEl.classList.add('confetti-container');
        // Apply fixed positioning to cover the viewport
        containerEl.style.position = 'fixed';
        containerEl.style.top = '0';
        containerEl.style.left = '0';
        containerEl.style.width = '100vw';
        containerEl.style.height = '100vh';
        containerEl.style.overflow = 'hidden';
        containerEl.style.zIndex = '9999'; // Ensure it's on top
        containerEl.style.pointerEvents = 'none'; // Allow clicks through

        this.el.appendChild(containerEl);
        this.containerEl = containerEl;
    }

    _renderConfetti() {
        this.confettiInterval = setInterval(() => {
            if (!this.containerEl) return;

            const confettiEl = document.createElement('div');
            const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
            const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]!;
            // Ensure confetti starts within the viewport width
            const confettiLeft = (Math.floor(Math.random() * window.innerWidth)) + 'px';
            const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];

            confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
            confettiEl.style.position = 'absolute'; // Positioned within the fixed container
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;
            confettiEl.style.top = '-10px'; // Start above the viewport
            confettiEl.style.borderRadius = '0%';
            confettiEl.style.zIndex = '9999';

            // Use requestAnimationFrame for smoother removal timing if needed
            const timeoutId = setTimeout(() => {
                if (confettiEl.parentNode) {
                    confettiEl.parentNode.removeChild(confettiEl);
                }
            }, 3000); // Remove after 3 seconds

            // Store timeoutId on the element for potential cleanup
            (confettiEl as HTMLElement & { removeTimeout?: number }).removeTimeout = timeoutId as unknown as number;

            this.containerEl.appendChild(confettiEl);
        }, 50); // Increased interval slightly for potentially better performance
    }

    stop() {
        if (this.confettiInterval) {
            clearInterval(this.confettiInterval);
            this.confettiInterval = null;
        }
        // Optional: Clear any existing confetti elements if needed
        if (this.containerEl) {
             const confettiElements = this.containerEl.querySelectorAll('.confetti');
             confettiElements.forEach(el => {
                const timeoutId = (el as HTMLElement & { removeTimeout?: number }).removeTimeout;
                if (timeoutId !== undefined) clearTimeout(timeoutId);
                el.remove();
             });
        }
    }
}


export default function ConfettiEffect() {
    const confettiInstance = useRef<Confettiful | null>(null);
    // Use body as the element to attach the container to, avoids issues with component structure
    const targetElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        // Ensure this runs only once on the client
        if (typeof window !== 'undefined' && !confettiInstance.current) {
            targetElement.current = document.body; // Attach confetti container to body
            confettiInstance.current = new Confettiful(targetElement.current);
        }

        // Cleanup function to stop confetti when the component unmounts
        return () => {
            if (confettiInstance.current) {
                confettiInstance.current.stop();
                 // Optional: remove the container itself if desired
                if (confettiInstance.current.containerEl?.parentNode) {
                    confettiInstance.current.containerEl.parentNode.removeChild(confettiInstance.current.containerEl);
                }
                confettiInstance.current = null;
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    // This component doesn't render anything itself, it just attaches the effect to the body
    return null;
}