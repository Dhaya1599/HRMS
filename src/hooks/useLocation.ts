import { useState, useCallback } from 'react';
import type { LocationCoordinates } from '../types';
import { getGeofenceStatus as getGeofenceStatusUtil } from '../utils/geolocation';
import { GEOFENCE_CONFIG } from '../constants/geofencing';

/** Mock office location (geolocation native module removed to avoid crashes). */
const MOCK_LOCATION: LocationCoordinates = {
  latitude: GEOFENCE_CONFIG.OFFICE_LAT,
  longitude: GEOFENCE_CONFIG.OFFICE_LNG,
  accuracy: 20,
  timestamp: Date.now(),
};

interface UseLocationReturn {
  location: LocationCoordinates | null;
  loading: boolean;
  error: string | null;
  hasPermission: boolean;
  isMockLocation: boolean;
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<LocationCoordinates | null>;
  getGeofenceStatus: () => string;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationCoordinates | null>(MOCK_LOCATION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasPermission = true;
  const isMockLocation = true;

  const requestPermission = useCallback(async (): Promise<boolean> => true, []);

  const getCurrentLocation = useCallback(async (): Promise<LocationCoordinates | null> => {
    setLoading(true);
    setError(null);
    setLocation(MOCK_LOCATION);
    setLoading(false);
    return MOCK_LOCATION;
  }, []);

  const getGeofenceStatus = useCallback((): string => {
    if (!location) return 'unknown';
    return String(getGeofenceStatusUtil(location));
  }, [location]);

  return {
    location,
    loading,
    error,
    hasPermission,
    isMockLocation,
    requestPermission,
    getCurrentLocation,
    getGeofenceStatus,
  };
};
