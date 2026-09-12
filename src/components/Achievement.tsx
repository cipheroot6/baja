"use client";
import { Trophy } from "lucide-react";

const achievements = {
  2024: [
    { title: "Overall Rank", result: "AIR 27" },
    { title: "Design Event", result: "AIR 23" },
    { title: "Green Efficient", result: "AIR 11" },
    { title: "Maneuverability", result: "AIR 10" },
    { title: "All-Terrain Performance", result: "AIR 11" },
  ],
  2025: [
    { title: "Overall Rank", result: "AIR 27" },
    { title: "Womens Endurance", result: "AIR 3" },
    { title: "IPG Virtual Dynamics", result: "AIR 15" },
  ],
};

export default function AchievementsSection() {
  return (
    <section id="achievements" className="bg-gray-50 text-gray-900 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-16 tracking-wide">
          Our Achievements
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(achievements).map(([year, items]) => (
            <div
              key={year}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-6 space-x-3">
                <Trophy className="w-8 h-8 text-red-600" />
                <h3 className="text-2xl font-bold text-red-600">
                  Achievements {year}
                </h3>
              </div>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-200 pb-2"
                  >
                    <span className="text-gray-700">{item.title}</span>
                    <span className="font-semibold text-gray-900">{item.result}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
