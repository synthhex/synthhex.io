import React, { useEffect, useState } from "react";
import './CometContainer.sass';

const COMET_COUNT = 40;
const FLAT_DURATION = 1.5;
const MODIFIER_DURATION = 3;

interface Comet {
    color: string;
    angle: number;
    duration: number;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

export default function CometContainer() {
    const animationRef = React.useRef<number | null>(null);
    useEffect(() => {
        animationRef.current = requestAnimationFrame(cometLoop);
        return () => void (!animationRef.current || cancelAnimationFrame(animationRef.current));
    }, []);

    const cometRef = React.useRef<Comet[]>([]);

    const cometLoop = async () => {
        for (let i = 0; i < Math.min(COMET_COUNT - cometRef.current.length, COMET_COUNT / 10); ++i) {
            console.log('added', i);
            const comet = draftComet();
            cometRef.current.push(comet);
        }
        await new Promise(resolve => setTimeout(resolve, (FLAT_DURATION + MODIFIER_DURATION / 2) * 1000 / (COMET_COUNT / 4)));
        console.log('comets', cometRef.current);
        animationRef.current = requestAnimationFrame(cometLoop);
    }

    return (
        <div className='comet-container'>
            {
                cometRef.current.map((comet, index) => <div key={index} className='comet' style={{
                    '--color': comet.color,
                    '--angle': `${comet.angle}deg`,
                    '--duration': `${comet.duration}s`,
                    '--start-x': `${comet.startX}px`,
                    '--start-y': `${comet.startY}px`,
                    '--end-x': `${comet.endX}px`,
                    '--end-y': `${comet.endY}px`
                } as React.CSSProperties } />) // to get it to stop crying about css properties
            }

        </div>
    );
}

function draftComet(): Comet {
    const angle = 45;
    const startX = (window.innerWidth * 0.15) + Math.random() * (window.innerWidth * 0.7);
    const startY = Math.random() * -40 - 10;
    const distance = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    const duration = Math.random() * MODIFIER_DURATION + FLAT_DURATION;
    const endX = startX + distance * Math.cos(angle / 180 * Math.PI);
    const endY = startY + distance * Math.sin(angle / 180 * Math.PI);

    return { angle, startX, startY, endX, endY, duration, color: `hsl(${Math.random() * 360}, 100%, 50%)` };
}