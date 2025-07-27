// ALPHAG8 ID KEY Generator
// Generates secure, unique identifiers for the ALPHAG8 digital identity system

export function generateAlphaG8Id(): string {
  // Generate timestamp component (current time in base36)
  const timestamp = Date.now().toString(36).toUpperCase();
  
  // Generate random component (8 characters)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  // Generate checksum component (simple validation)
  const combined = timestamp + randomPart;
  let checksum = 0;
  for (let i = 0; i < combined.length; i++) {
    checksum += combined.charCodeAt(i);
  }
  const checksumHex = (checksum % 256).toString(16).toUpperCase().padStart(2, '0');
  
  // Format: FAGRI-{timestamp}-{random}-{checksum}
  return `FAGRI-${timestamp}-${randomPart}-${checksumHex}`;
}

export function validateAlphaG8Id(id: string): boolean {
  // Basic format validation
  const pattern = /^FAGRI-[A-Z0-9]+-[A-Z0-9]{8}-[A-F0-9]{2}$/;
  if (!pattern.test(id)) {
    return false;
  }
  
  // Extract components
  const parts = id.split('-');
  if (parts.length !== 4) {
    return false;
  }
  
  const [prefix, timestamp, randomPart, checksum] = parts;
  
  // Validate checksum
  const combined = timestamp + randomPart;
  let calculatedChecksum = 0;
  for (let i = 0; i < combined.length; i++) {
    calculatedChecksum += combined.charCodeAt(i);
  }
  const expectedChecksum = (calculatedChecksum % 256).toString(16).toUpperCase().padStart(2, '0');
  
  return checksum === expectedChecksum;
}

// Example generated ID: FAGRI-1BKQE5C3-K9X2P4M7-A3