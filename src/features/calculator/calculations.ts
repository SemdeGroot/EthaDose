export type DrinkerStatus = "nonDrinker" | "chronicDrinker";

export type CalculatorInput = {
  weightKg?: number | null;
  currentEthanolMgPerL?: number | null;
  drinkerStatus: DrinkerStatus;
  dialysis: boolean;
};

export type DoseResult = {
  mg: number;
  ml: number;
};

export type MaintenanceDoseResult = DoseResult & {
  mgPerHour: number;
  mlPerHour: number;
};

export type CalculatorResult = {
  loadingDose: DoseResult;
  maintenanceDose: MaintenanceDoseResult;
  dialysisMaintenanceDose: MaintenanceDoseResult;
  selectedMaintenanceDose: MaintenanceDoseResult;
  profile: DrinkerProfile;
  constants: typeof CALCULATOR_CONSTANTS;
};

export type DrinkerProfile = {
  status: DrinkerStatus;
  label: string;
  vmaxMgKgHour: number;
};

export class CalculatorInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalculatorInputError";
  }
}

export const CALCULATOR_CONSTANTS = {
  targetEthanolMgPerL: 1000,
  kmMgPerL: 138,
  volumeOfDistributionLPerKg: 0.6,
  dialysisClearanceMgKgHour: 150,
  ethanolStockMg: 38000,
  infusionVolumeMl: 300,
} as const;

export const DRINKER_PROFILES: Record<DrinkerStatus, DrinkerProfile> = {
  nonDrinker: {
    status: "nonDrinker",
    label: "Niet-drinker",
    vmaxMgKgHour: 75,
  },
  chronicDrinker: {
    status: "chronicDrinker",
    label: "Chronische drinker",
    vmaxMgKgHour: 175,
  },
};

export function isDrinkerStatus(value: unknown): value is DrinkerStatus {
  return value === "nonDrinker" || value === "chronicDrinker";
}

export function parseDrinkerStatus(value: unknown): DrinkerStatus {
  if (!isDrinkerStatus(value)) {
    throw new CalculatorInputError("Onbekende drinkerstatus.");
  }

  return value;
}

export function calculateLoadingDoseMg(weightKg: number, currentEthanolMgPerL: number): number {
  const concentrationGapMgPerL = Math.max(
    0,
    CALCULATOR_CONSTANTS.targetEthanolMgPerL - currentEthanolMgPerL,
  );

  return CALCULATOR_CONSTANTS.volumeOfDistributionLPerKg * weightKg * concentrationGapMgPerL;
}

export function calculateMaintenanceDoseMgPerHour(weightKg: number, vmaxMgKgHour: number): number {
  return (
    (1000 * vmaxMgKgHour * weightKg) /
    (CALCULATOR_CONSTANTS.kmMgPerL + CALCULATOR_CONSTANTS.targetEthanolMgPerL)
  );
}

export function convertMgToInfusionMl(doseMg: number): number {
  return (doseMg / CALCULATOR_CONSTANTS.ethanolStockMg) * CALCULATOR_CONSTANTS.infusionVolumeMl;
}

export function calculateEthanolDosing(input: CalculatorInput): CalculatorResult {
  validateCalculatorInput(input);

  const profile = DRINKER_PROFILES[input.drinkerStatus];
  const weightKg = input.weightKg;
  const currentEthanolMgPerL = input.currentEthanolMgPerL;

  if (typeof weightKg !== "number" || typeof currentEthanolMgPerL !== "number") {
    throw new CalculatorInputError("Gewicht en ethanolconcentratie zijn verplicht.");
  }

  const loadingMg = calculateLoadingDoseMg(weightKg, currentEthanolMgPerL);
  const maintenanceMgPerHour = calculateMaintenanceDoseMgPerHour(weightKg, profile.vmaxMgKgHour);
  const dialysisMaintenanceMgPerHour = calculateMaintenanceDoseMgPerHour(
    weightKg,
    profile.vmaxMgKgHour + CALCULATOR_CONSTANTS.dialysisClearanceMgKgHour,
  );

  const maintenanceDose = toMaintenanceDose(maintenanceMgPerHour);
  const dialysisMaintenanceDose = toMaintenanceDose(dialysisMaintenanceMgPerHour);

  return {
    loadingDose: {
      mg: loadingMg,
      ml: convertMgToInfusionMl(loadingMg),
    },
    maintenanceDose,
    dialysisMaintenanceDose,
    selectedMaintenanceDose: input.dialysis ? dialysisMaintenanceDose : maintenanceDose,
    profile,
    constants: CALCULATOR_CONSTANTS,
  };
}

function validateCalculatorInput(input: CalculatorInput) {
  if (!isDrinkerStatus(input.drinkerStatus)) {
    throw new CalculatorInputError("Onbekende drinkerstatus.");
  }

  if (typeof input.weightKg !== "number") {
    throw new CalculatorInputError("Gewicht is verplicht.");
  }

  if (input.weightKg <= 0) {
    throw new CalculatorInputError("Gewicht moet groter zijn dan 0 kg.");
  }

  if (typeof input.currentEthanolMgPerL !== "number") {
    throw new CalculatorInputError("Ethanolconcentratie is verplicht.");
  }

  if (input.currentEthanolMgPerL < 0) {
    throw new CalculatorInputError("Ethanolconcentratie kan niet negatief zijn.");
  }
}

function toMaintenanceDose(mgPerHour: number): MaintenanceDoseResult {
  return {
    mg: mgPerHour,
    ml: convertMgToInfusionMl(mgPerHour),
    mgPerHour,
    mlPerHour: convertMgToInfusionMl(mgPerHour),
  };
}
