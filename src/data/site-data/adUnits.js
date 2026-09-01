// Ad slots on the article pages. Managed from the CMS under
// Site Data > Ad Units; rendered by src/components/AdUnit.astro.
import { adUnits as adUnitsData } from "./json/ad-units.json";

export const adUnits = adUnitsData;

/**
 * The slots a unit can be assigned to. Each one needs a matching <AdUnit
 * placement="..."> somewhere in the markup, so keep this list in step with the
 * `placement` options in public/admin/config.yml.
 */
export const adPlacements = ["Article Sidebar", "Article Sidebar (Sticky)"];

/** Enabled units with actual code in them, for one slot. */
export const adUnitsFor = (placement) =>
    adUnits.filter(
        (unit) => unit.isEnabled && unit.placement === placement && (unit.adCode || "").trim(),
    );
