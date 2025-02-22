"use client"

import { useState } from "react"
import { Cloud, Sun, CloudRain } from "lucide-react"

interface WeatherData {
  temperature: number
  condition: "sunny" | "cloudy" | "rainy"
  humidity: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 25,
    condition: "sunny",
    humidity: 65,
  })

  const WeatherIcon = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
  }[weather.condition]

  return (
    <div className="flex flex-col items-center space-y-4">
      <WeatherIcon className="h-12 w-12 text-accent" />
      <div className="text-center">
        <p className="text-3xl font-bold text-primary">{weather.temperature}°C</p>
        <p className="text-sm text-secondary capitalize">{weather.condition}</p>
      </div>
      <div className="text-sm text-text">Humidity: {weather.humidity}%</div>
    </div>
  )
}

