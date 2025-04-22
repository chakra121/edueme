'use client';

import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const steps = [
  { name: "REGISTRATION", delay: 0 },
  { name: "COURSE SELECTION", delay: 1 },
  { name: "PAYMENT", delay: 2 },
  { name: "SUCCESS", delay: 3 }
];

export default function Progress() {
  const [activeSteps, setActiveSteps] = useState<number[]>([]);

  useEffect(() => {
    steps.forEach((_, index) => {
      setTimeout(() => {
        setActiveSteps(prev => [...prev, index]);
      }, 1000 * index);
    });
  }, []);

  return (
    <div className="relative mt-8 mb-12 w-full max-w-3xl mx-auto px-4">
      <div className="relative flex items-center justify-between">
        {/* Progress Lines Container */}
        <div className="absolute top-7 left-0 right-0 h-2">
          <div className="relative h-1.5 w-full bg-gray-200">
            {/* Render exactly three progress lines */}
            {[0, 1, 2].map((lineIndex) => (
              <div
                key={`line-${lineIndex}`}
                className={`${styles.progressLine} absolute h-full bg-[#00ffa0]`}
                style={{
                  width: '33.33%',
                  left: `${lineIndex * 33.33}%`,
                  opacity: activeSteps.length > lineIndex + 1 ? 1 : 0,
                  transition: 'opacity 0.5s ease-out'
                }}
              />
            ))}
          </div>
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.name} className="relative z-10 flex flex-col items-center">
            <div 
              className={`${styles.progressCircle} ${
                activeSteps.includes(index) ? styles.active : ''
              }`}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#00ffa0] bg-[#00ffa0] shadow-lg">
                {activeSteps.includes(index) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className={`${styles.stepLabel} ${
              activeSteps.includes(index) ? styles.active : ''
            } mt-3 text-sm font-bold text-black`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}