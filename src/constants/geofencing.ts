export const GEOFENCE_CONFIG = {
  OFFICE_LAT: parseFloat(process.env.REACT_APP_OFFICE_LAT || '28.6139'),
  OFFICE_LNG: parseFloat(process.env.REACT_APP_OFFICE_LNG || '77.2090'),
  RADIUS: parseInt(process.env.REACT_APP_GEOFENCE_RADIUS || '500', 10),
  LOCATION_TIMEOUT: 15000,
  CHECK_INTERVAL: 60000,
  ACCURACY_THRESHOLD: 50,
};

export const LOCATION_PERMISSIONS = {
  FINE: 'fine_location',
  COARSE: 'coarse_location',
  BACKGROUND: 'background_location',
};

export enum GeofenceStatus {
  INSIDE = 'inside',
  OUTSIDE = 'outside',
  UNKNOWN = 'unknown',
}

export enum LocationAccuracy {
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}
