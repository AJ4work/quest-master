import React from 'react';

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
}

export const ProgressRing = ({
    progress,
    size = 120,
    strokeWidth = 8,
    color = 'var(--primary)'
}: ProgressRingProps) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg className="progress-ring" width={size} height={size}>
            <circle
                className="progress-ring-circle-bg"
                stroke="var(--progress-bg)"
                strokeWidth={strokeWidth}
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
            />
            <circle
                className="progress-ring-circle"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{
                    strokeDasharray: `${circumference} ${circumference}`,
                    strokeDashoffset: offset,
                }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="1.5rem"
                fill="currentColor"
            >
                {Math.round(progress)}%
            </text>
        </svg>
    );
};