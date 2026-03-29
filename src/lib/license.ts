import { v4 as uuidv4 } from 'uuid';

export function generateLicenseKey(): string {
  const uuid = uuidv4().replace(/-/g, '').toUpperCase();
  // Format: SHIBA-XXXX-XXXX-XXXX-XXXX
  return `SHIBA-${uuid.slice(0, 4)}-${uuid.slice(4, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}`;
}
