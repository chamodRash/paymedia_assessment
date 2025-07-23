// Real-time timestamp component that updates automatically
"use client";

import React, { useState, useEffect } from "react";
import { formatTimestamp } from "../utils/formatTime";

interface RealTimeTimestampProps {
  timestamp: string;
  className?: string;
}

export default function RealTimeTimestamp({
  timestamp,
  className,
}: RealTimeTimestampProps) {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Update every 30 seconds to keep timestamps current
    const interval = setInterval(() => {
      forceUpdate((prev) => prev + 1);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  return <span className={className}>{formatTimestamp(timestamp)}</span>;
}
