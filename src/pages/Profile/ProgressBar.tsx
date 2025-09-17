/* eslint-disable prefer-const */
import { motion } from "framer-motion";

const SEGMENTS = 6;
const FULL_ANGLE = 180;

interface ProgressBarProps {
  value: number;
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  const radius = 100;
  const strokeWidth = 16;
  const center = 125;
  const gapDeg = 15; // Increased gap
  const segmentAngle = (FULL_ANGLE - gapDeg * (SEGMENTS - 1)) / SEGMENTS;

  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number
  ) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const getLabel = (val: number) => {
    if (val >= 90) return "Excellent";
    if (val >= 75) return "Good";
    if (val >= 50) return "Average";
    return "Poor";
  };

  const getPathLength = (startAngle: number, endAngle: number) => {
    const angle = endAngle - startAngle;
    return (Math.PI * radius * angle) / 180;
  };

  const generateArcs = () => {
    const segmentPercent = 100 / SEGMENTS;
    let arcs = [];

    for (let i = 0; i < SEGMENTS; i++) {
      const startAngle = 180 + i * (segmentAngle + gapDeg);
      const endAngle = startAngle + segmentAngle;

      const start = polarToCartesian(center, center, radius, endAngle);
      const end = polarToCartesian(center, center, radius, startAngle);

      const totalPathLength = getPathLength(startAngle, endAngle);

      let fillRatio = 0;

      // Calculate how much of this segment should be filled
      const segmentStartPercent = i * segmentPercent;
      const segmentEndPercent = (i + 1) * segmentPercent;

      if (value >= segmentEndPercent) {
        fillRatio = 1; // Full segment
      } else if (value > segmentStartPercent) {
        fillRatio = (value - segmentStartPercent) / segmentPercent;
      } else {
        fillRatio = 0;
      }

      arcs.push(
        <motion.path
          key={i}
          d={`M ${end.x} ${end.y} A ${radius} ${radius} 0 0 1 ${start.x} ${start.y}`}
          stroke={fillRatio > 0 ? "#22c55e" : "#e5e7eb"}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={totalPathLength}
          strokeDashoffset={(1 - fillRatio) * totalPathLength}
          initial={{ strokeDashoffset: totalPathLength }}
          animate={{ strokeDashoffset: (1 - fillRatio) * totalPathLength }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        />
      );
    }

    return arcs;
  };

  return (
    <div className="flex flex-col items-center w-full relative">
      <svg width="250" height="140" viewBox="0 0 250 140">
        {generateArcs()}
      </svg>

      {/* Labels: 0 and 100 */}
      <div className="w-full  flex justify-between -mt-1 text-gray-600 text-sm font-medium">
        <span>0</span>
        <span>100</span>
      </div>

      {/* Center Label */}
      <div className="-mt-20 text-center">
        <div className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full ">
          {getLabel(value)}
        </div>
        <div className="text-4xl mt- font-bold text-purple-900">{value}</div>
      </div>
    </div>
  );
};

export default ProgressBar;
