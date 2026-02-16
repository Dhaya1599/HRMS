import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { LocationCoordinates } from '@types/index';
import { getGeofenceStatus as getGeofenceStatusUtil } from '@utils/geolocation';
import { GEOFENCE_CONFIG } from '@constants/geofencing';

/** Mock office location when device location fails or times out (mock UI, no backend). */
const MOCK_LOCATION: LocationCoordinates = {
  latitude: GEOFENCE_CONFIG.OFFICE_LAT,
  longitude: GEOFENCE_CONFIG.OFFICE_LNG,
  accuracy: 20,
  timestamp: Date.now(),
};

const LOCATION_TIMEOUT_MS = 8000;

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
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isMockLocation, setIsMockLocation] = useState(false);
  const requestInFlight = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'ios') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs location access for check-in/out.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      const ok = granted === PermissionsAndroid.RESULTS.GRANTED;
      setHasPermission(ok);
      return ok;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to request permission';
      setError(message);
      return false;
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(setHasPermission);
    } else {
      setHasPermission(true);
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<LocationCoordinates | null> => {
    if (requestInFlight.current) return location ?? MOCK_LOCATION;
    requestInFlight.current = true;
    setLoading(true);
    setError(null);
    setIsMockLocation(false);

    const applyMockFallback = () => {
      if (!mounted.current) return MOCK_LOCATION;
      setLocation(MOCK_LOCATION);
      setIsMockLocation(true);
      setLoading(false);
      setError(null);
      requestInFlight.current = false;
      return MOCK_LOCATION;
    };

    try {
      if (Platform.OS === 'android' && !hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          setError('Location permission denied');
          setLoading(false);
          requestInFlight.current = false;
          return applyMockFallback();
        }
      }

      return new Promise((resolve) => {
        const timeoutId = setTimeout(() => {
          requestInFlight.current = false;
          if (mounted.current) setLoading(false);
          resolve(null);
        }, LOCATION_TIMEOUT_MS);

        Geolocation.getCurrentPosition(
          (position) => {
            clearTimeout(timeoutId);
            requestInFlight.current = false;
            if (!mounted.current) { resolve(null); return; }
            const coords: LocationCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy ?? undefined,
              timestamp: position.timestamp,
            };
            setLocation(coords);
            setLoading(false);
            setError(null);
            resolve(coords);
          },
          () => {
            clearTimeout(timeoutId);
            requestInFlight.current = false;
            if (mounted.current) setLoading(false);
            resolve(null);
          },
          { enableHighAccuracy: false, timeout: LOCATION_TIMEOUT_MS, maximumAge: 60000 }
        );
      }).then((coords) => {
        if (coords) return coords;
        return applyMockFallback();
      });
    } catch (err: unknown) {
      requestInFlight.current = false;
      setLoading(false);
      return applyMockFallback();
    }
  }, [hasPermission, requestPermission, location]);

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
