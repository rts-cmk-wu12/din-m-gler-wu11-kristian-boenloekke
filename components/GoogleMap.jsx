'use client';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

export default function GoogleMapComponent({lat, lng, height = '60vh'}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const containerStyle = {
    width: '100%',
    height: height,
  }

  if (!apiKey) {
    console.error("Google Maps API key is missing.");
    return <p>Google Maps cannot load: Missing API key.</p>
  }

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={13}
      >
        <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
    </LoadScriptNext>
  )
}