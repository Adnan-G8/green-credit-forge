// CO₂ Calculator for Italian Renewable Energy Projects
// Based on official Italian emission factor: 0.397 kg CO₂/kWh (EUFD2025-001 Sec. 6.2)

export interface CO2Calculation {
  annualKWh: number;
  co2SavedPerYear: number; // kg CO₂
  co2SavedLifetime: number; // kg CO₂ over 30 years
  co2SavedPerYearTons: number; // tons CO₂
  co2SavedLifetimeTons: number; // tons CO₂ over 30 years
}

// Italian emission factor for avoided CO₂ emissions
// Source: EUFD2025-001 Standard, Section 6.2 - Media emissioni grid nazionale
const ITALIAN_EMISSION_FACTOR = 0.397; // kg CO₂/kWh
const SOLAR_LIFETIME_YEARS = 30; // Standard solar panel lifetime

/**
 * Calculate CO₂ savings for renewable energy projects in Italy
 * @param annualKWhProduction Annual energy production in kWh
 * @returns CO₂ calculation results
 */
export function calculateCO2Savings(annualKWhProduction: number): CO2Calculation {
  const co2SavedPerYear = annualKWhProduction * ITALIAN_EMISSION_FACTOR;
  const co2SavedLifetime = co2SavedPerYear * SOLAR_LIFETIME_YEARS;
  
  return {
    annualKWh: annualKWhProduction,
    co2SavedPerYear,
    co2SavedLifetime,
    co2SavedPerYearTons: co2SavedPerYear / 1000,
    co2SavedLifetimeTons: co2SavedLifetime / 1000
  };
}

/**
 * Format CO₂ values for display
 * @param kg CO₂ amount in kilograms
 * @returns Formatted string with appropriate unit
 */
export function formatCO2Amount(kg: number): string {
  if (kg >= 1000) {
    return `${(kg / 1000).toFixed(2)} t CO₂`;
  }
  return `${kg.toFixed(0)} kg CO₂`;
}

/**
 * Calculate CO₂ savings from kW capacity (estimated)
 * @param kWCapacity Solar capacity in kW
 * @param sunHoursPerYear Average sun hours per year in Italy (default: 1400)
 * @returns CO₂ calculation results
 */
export function calculateCO2FromCapacity(kWCapacity: number, sunHoursPerYear: number = 1400): CO2Calculation {
  const estimatedAnnualKWh = kWCapacity * sunHoursPerYear;
  return calculateCO2Savings(estimatedAnnualKWh);
}