'use client';

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  showValue?: boolean;
  color?: string;
}

export function ProgressCircle({ 
  value, 
  max, 
  size = 120, 
  strokeWidth = 8, 
  label, 
  showValue = true,
  color = '#8B5CF6'
}: ProgressCircleProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <span className="text-2xl font-bold text-text-primary">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
      
      {label && (
        <span className="text-sm font-medium text-text-secondary text-center">
          {label}
        </span>
      )}
    </div>
  );
}
