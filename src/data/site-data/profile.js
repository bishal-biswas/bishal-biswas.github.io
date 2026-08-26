// Data lives in ./json/*.json so the CMS can edit it. These re-exports keep the
// existing import paths working — nothing that consumes this file changed.
import { normalizeList } from "./normalizeList";
import personaInfoData from "./json/persona-info.json";
import aboutMeSectionData from "./json/about-me-section.json";
import { globalStats as globalStatsData } from "./json/global-stats.json";

export const personaInfo = {
    ...personaInfoData,
    typeWriterText: normalizeList(personaInfoData.typeWriterText),
    // Stored as YYYY-MM-DD; parsed as local midnight so calculateAge matches.
    DOB: new Date(`${personaInfoData.DOB}T00:00:00`),
};
export const aboutMeSection = aboutMeSectionData;
export const globalStats = globalStatsData;
