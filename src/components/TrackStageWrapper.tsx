"use client";
import dynamic from "next/dynamic";
import React from "react";

const TrackStage = dynamic(() => import("./TrackStage"), { 
  ssr: false,
  loading: () => <div className="h-[500px] w-full flex items-center justify-center bg-black text-white">Loading 3D Stage...</div>
});

export default function TrackStageWrapper() {
  return <TrackStage />;
}
