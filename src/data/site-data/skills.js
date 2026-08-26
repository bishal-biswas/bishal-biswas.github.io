// Data lives in ./json/*.json so the CMS can edit it.
import { normalizeList } from "./normalizeList";
import { skillsStats as skillsStatsData } from "./json/skills-stats.json";
import offeredServicesData from "./json/offered-services.json";
import { employmentData as employmentJson } from "./json/employment.json";
import { educationData as educationJson } from "./json/education.json";
import { certificateData as certificateJson } from "./json/certificates.json";
import { technologyData as technologyJson } from "./json/technologies.json";

export const skillsStats = skillsStatsData;
export const offeredServices = {
    ...offeredServicesData,
    servicesData: offeredServicesData.servicesData.map((service) => ({
        ...service,
        servicesPoints: normalizeList(service.servicesPoints),
    })),
};
export const employmentData = employmentJson;
export const educationData = educationJson;
export const certificateData = certificateJson;
export const technologyData = technologyJson;
