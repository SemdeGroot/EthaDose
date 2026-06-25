export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ethadose.netlify.app"
).replace(/\/$/, "");

export const SITE_NAME = "EthaDose";

export const SITE_TITLE =
  "EthaDose – Ethanol doseringscalculator (methanol & ethyleenglycol)";

export const SITE_DESCRIPTION =
  "EthaDose berekent de oplaaddosis en onderhoudsdosering ethanol als antidotum bij methanol- of ethyleenglycolintoxicatie en zet de dosis om naar infuusvolume.";

// Shown as "Laatst bijgewerkt" on the legal pages.
export const LEGAL_LAST_UPDATED = "juni 2026";
