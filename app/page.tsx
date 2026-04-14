"use client";

import { useEffect, useState } from "react";

const BIRMINGHAM_LAT = 33.5186;
const BIRMINGHAM_LON = -86.8104;

// WMO weather interpretation codes → category
function getWeatherCategory(code: number): string {
  if (code === 0) return "clear";
  if (code <= 2) return "partly-cloudy";
  if (code === 3) return "cloudy";
  if (code <= 49) return "fog";
  if (code <= 67) return "rain";
  if (code <= 77) return "snow";
  if (code <= 82) return "rain";
  if (code <= 99) return "thunderstorm";
  return "clear";
}

// One curated Unsplash image per weather category
const WEATHER_IMAGES: Record<string, { url: string; alt: string }> = {
  "clear": {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    alt: "Clear mountain landscape",
  },
  "partly-cloudy": {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    alt: "Partly cloudy mountain landscape",
  },
  "cloudy": {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    alt: "Overcast moody landscape",
  },
  "fog": {
    url: "https://images.unsplash.com/photo-1487621167305-5d248087c724?w=800&q=80",
    alt: "Foggy forest landscape",
  },
  "rain": {
    url: "https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=800&q=80",
    alt: "Rainy dark landscape",
  },
  "snow": {
    url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80",
    alt: "Snowy winter landscape",
  },
  "thunderstorm": {
    url: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=800&q=80",
    alt: "Dramatic stormy landscape",
  },
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatDay(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export default function Home() {
  const [temp, setTemp] = useState<number | null>(null);
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Tick the clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${BIRMINGHAM_LAT}&longitude=${BIRMINGHAM_LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FChicago`
        );
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();
        setTemp(Math.round(data.current.temperature_2m));
        setWeatherCode(data.current.weather_code);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  const category = getWeatherCategory(weatherCode);
  const image = WEATHER_IMAGES[category];

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex items-center justify-center p-8">
      <div className="flex flex-col gap-2">
        {/* Card */}
        <div className="relative w-[320px] h-[320px] rounded-2xl overflow-hidden shadow-xl">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
            style={{ backgroundImage: `url(${image.url})` }}
            role="img"
            aria-label={image.alt}
          />

          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Loading state */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/70 text-sm">Could not load weather</p>
            </div>
          )}

          {/* Content */}
          {!loading && !error && (
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              {/* Top row */}
              <div className="flex justify-between items-start">
                <div className="text-white leading-tight">
                  <div className="text-base font-semibold">{formatDay(time)}</div>
                  <div className="text-base font-semibold">{formatTime(time)}</div>
                </div>
                <div className="text-white text-6xl font-bold leading-none tracking-tight">
                  {temp}°
                </div>
              </div>

              {/* Bottom left */}
              <div className="text-white leading-tight">
                <div className="text-lg font-bold">Birmingham</div>
                <div className="text-lg font-bold">Alabama</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
