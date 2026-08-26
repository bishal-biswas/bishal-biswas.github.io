// Data lives in ./json/*.json so the CMS can edit it.
import { staticPaths as staticPathsData } from "./json/static-paths.json";
import { navbarMenus as navbarMenusData } from "./json/navbar-menus.json";
import { footerLinks as footerLinksData, footerNote, contactEmail, copyrightText } from "./json/footer-links.json";

export const staticPaths = staticPathsData;
export const navbarMenus = navbarMenusData;
export const footerLinks = footerLinksData;
export const footerText = { footerNote, contactEmail, copyrightText };
