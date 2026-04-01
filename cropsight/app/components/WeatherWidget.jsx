'use client';

import { useState, useEffect } from 'react';
import { 
  CloudSun, CloudRain, Sun, Wind, MapPin, Eye, 
  Thermometer, MapPinOff, Navigation, RefreshCw,
  Droplets, SunMedium, Compass, Sunrise, Sunset,
  Calendar, ChevronRight, Activity, Zap
} from 'lucide-react';

export default function WeatherWidget({ onWeatherUpdate }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [placeName, setPlaceName] = useState('Current Location');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [locationPermitted, setLocationPermitted] = useState(false);
  const [tryingLocation, setTryingLocation] = useState(false);

  const fetchWeatherData = async (lat, lon) => {
    try {
      setLoading(true);
      
      // 1. Fetch Location Name
      try {
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
          { headers: { 'Accept-Language': 'en', 'User-Agent': 'CropsightApp/1.0' } }
        );
        const geoData = await geoResponse.json();
        const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.suburb || geoData.address.state_district || geoData.address.county;
        if (city) setPlaceName(city);
      } catch (geoErr) {
        console.error('Geocoding error:', geoErr);
      }

      // 2. Fetch Weather Data
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,uv_index,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
      );
      const data = await response.json();
      
      if (data.current) {
        const newWeather = {
          temp: Math.round(data.current.temperature_2m),
          feelsLike: Math.round(data.current.apparent_temperature),
          humidity: data.current.relative_humidity_2m,
          wind: data.current.wind_speed_10m,
          precip: data.current.precipitation,
          uv: data.current.uv_index,
          pressure: data.current.surface_pressure,
          condition: getWeatherCondition(data.current.weather_code),
          sunrise: data.daily.sunrise[0].split('T')[1],
          sunset: data.daily.sunset[0].split('T')[1],
          code: data.current.weather_code
        };
        setWeather(newWeather);
        if (onWeatherUpdate) onWeatherUpdate(newWeather, city || placeName);

        const nextDays = data.daily.time.slice(1, 4).map((time, idx) => ({
          date: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
          max: Math.round(data.daily.temperature_2m_max[idx+1]),
          min: Math.round(data.daily.temperature_2m_min[idx+1]),
          condition: getWeatherCondition(data.daily.weather_code[idx+1]),
          code: data.daily.weather_code[idx+1]
        }));
        setForecast(nextDays);
        setError(null);
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Service connection error.');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherCondition = (code) => {
    if (code === 0) return 'Clear Sky';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Foggy';
    if (code <= 67) return 'Rainy';
    if (code <= 77) return 'Snowy';
    if (code <= 82) return 'Rainy';
    if (code <= 99) return 'Storm';
    return 'Cloudy';
  };

  const getWeatherIcon = (code, size = 20) => {
    if (code === 0) return <Sun size={size} className="text-amber-500" />;
    if (code <= 3) return <CloudSun size={size} className="text-blue-500" />;
    if (code <= 67) return <CloudRain size={size} className="text-blue-600" />;
    return <CloudSun size={size} className="text-blue-400" />;
  };

  const handleLocationRequest = () => {
    setTryingLocation(true);
    setError(null);
    if (!navigator.geolocation) {
      setError('Not supported.');
      setTryingLocation(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationPermitted(true);
        setTryingLocation(false);
        fetchWeatherData(pos.coords.latitude, pos.coords.longitude);
      },
      (err) => {
        setError('Location permission required.');
        setTryingLocation(false);
      }
    );
  };

  useEffect(() => {
    navigator.permissions?.query({ name: 'geolocation' }).then((status) => {
      if (status.state === 'granted') handleLocationRequest();
    });
  }, []);

  if (loading || tryingLocation) {
    return (
      <div className="bg-white rounded-[2rem] p-12 flex flex-col items-center justify-center min-h-[350px] border border-blue-50 shadow-xl animate-pulse">
        <div className="w-10 h-10 border-2 border-primary/10 border-t-primary rounded-full animate-spin mb-4" />
        <p className="text-primary/40 text-[10px] font-bold tracking-[0.2em] uppercase">Connecting Satellite Hub</p>
      </div>
    );
  }

  if (!locationPermitted && !weather) {
    return (
      <div className="bg-white rounded-[2rem] border border-blue-50 p-12 flex flex-col items-center justify-center text-center min-h-[350px] shadow-xl">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner shadow-blue-100/50">
           <Navigation className="w-10 h-10 text-primary animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Weather Intelligence</h2>
        <p className="text-gray-500 mb-10 max-w-sm text-sm font-medium leading-relaxed">
          Enable location to track regional humidity and rainfall patterns for your field.
        </p>
        <button 
          onClick={handleLocationRequest}
          className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-sm hover:translate-y-[-2px] transition-all shadow-xl shadow-primary/20 active:scale-95 flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          Authorize Precision Sync
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 text-gray-900 relative overflow-hidden flex flex-col gap-8 border border-blue-100 font-sans">
      
      {/* Decorative Gradients for Home Page Vibe */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -ml-32 -mb-32" />

      {/* Header - Blue & Green Theme */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm shadow-blue-100">
             {getWeatherIcon(weather?.code || 0, 24)}
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-900">{placeName}</h2>
            <div className="flex items-center gap-2 text-emerald-600 font-bold tracking-widest uppercase text-[9px] mt-0.5">
               <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
               Live Environmental Sync
            </div>
          </div>
        </div>
        <button 
          onClick={handleLocationRequest}
          className="p-3 hover:bg-gray-50 rounded-xl transition-all border border-transparent hover:border-gray-100 text-gray-400 hover:text-primary shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Main Temperature Display - Cleaner Spacing */}
        <div className="lg:col-span-5 border-r border-gray-100 pr-10">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-8xl font-black tracking-tighter leading-none mb-1 text-gray-900">
                 {weather?.temp}<span className="text-primary/30 ml-1">°C</span>
              </div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{weather?.condition}</div>
            </div>
          </div>
        </div>

        {/* Pro Metrics Grid - Primary Blue/Green Colors */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          {[
            { label: 'Wind Speed', value: `${weather?.wind}km`, icon: <Wind className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50' },
            { label: 'Feels Like', value: `${weather?.feelsLike}°`, icon: <Thermometer className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
            { label: 'UV Index', value: weather?.uv, icon: <SunMedium className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50/50' }
          ].map((m, i) => (
            <div key={i} className="flex flex-col gap-3">
               <div className={`p-3 w-fit ${m.bg} rounded-xl border border-white shadow-sm`}>
                  {m.icon}
               </div>
               <div>
                 <div className="text-xl font-black tracking-tight text-gray-900">{m.value}</div>
                 <div className="text-[9px] font-black uppercase tracking-widest text-gray-400 opacity-80">{m.label}</div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Section - High Contrast White/Blue */}
      <div className="grid md:grid-cols-3 gap-6 border-t border-gray-100 pt-8 relative z-10">
        {forecast.map((day, idx) => (
          <div key={idx} className="bg-white p-5 rounded-3xl flex items-center justify-between border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all group">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                   {getWeatherIcon(day.code, 18)}
                </div>
                <div>
                   <div className="text-[10px] font-black tracking-wide uppercase text-gray-400">{day.date}</div>
                   <div className="text-sm font-black text-gray-900">{day.condition}</div>
                </div>
             </div>
             <div className="text-right">
                <div className="text-lg font-black tracking-tight text-gray-900">{day.max}°</div>
                <div className="text-[10px] font-bold text-gray-300">{day.min}°</div>
             </div>
          </div>
        ))}
      </div>

      {/* Dynamic Insights - Professional Green Highlight */}
      <div className="relative z-10 bg-gradient-to-r from-emerald-50 to-blue-50 p-5 rounded-3xl border border-emerald-100 flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
               <Zap className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 leading-snug max-w-md">
               <span className="text-emerald-600 uppercase font-black mr-2">Advisory:</span> 
               Optimal conditions detected for crop monitoring. High humidity levels will benefit evening soil hydration.
            </span>
         </div>
         <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-dark transition-all flex items-center gap-1 group whitespace-nowrap">
            Deep Analysis <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
}
