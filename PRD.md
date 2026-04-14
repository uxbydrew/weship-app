# Product Requirements Doc — weship weather widget
*Draft 1 · April 14, 2026*

## What is it
A weather widget that shows the current temperature, time, and location for Birmingham, Alabama — presented as a full-bleed landscape illustration that changes based on current weather conditions.

## Who is it for
Anyone who wants weather at a glance, presented beautifully — not as a utility dashboard, but as something worth looking at.

## What it does
- Fetches live weather data from Open-Meteo (free, no API key required)
- Displays current temperature in °F, current time, and "Birmingham, Alabama"
- Shows a landscape illustration that reflects the current weather — clear sky, cloudy, rainy, snowy, fog, etc.
- Handles loading state (while data fetches) and error state (if the fetch fails)

## What it does not do
- No hourly or multi-day forecast
- No toggling between cities
- No unit switching (F only)
- No weather condition text label — the image carries that meaning

## The illustrations
Curated landscape images (one per weather category) that match the dark, atmospheric style of the Figma design — moody, editorial, film-grain. Sourced from Unsplash.
