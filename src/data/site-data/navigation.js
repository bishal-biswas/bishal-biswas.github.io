// Data lives in ./json/*.json so the CMS can edit it.
import { staticPaths as staticPathsData } from "./json/static-paths.json";
import { navbarMenus as navbarMenusData } from "./json/navbar-menus.json";
import { footerLinks as footerLinksData, footerNote, contactEmail, copyrightText } from "./json/footer-links.json";
import { products } from "./content";

export const staticPaths = staticPathsData;

// /products is only built when there is something to put on it - see
// src/pages/products/[...slug].astro - so the menu entry has to disappear with
// it, otherwise the nav points at a 404.
const isRouteLive = (url) => url !== "/products" || products.length > 0;

export const navbarMenus = navbarMenusData
    .filter((menu) => isRouteLive(menu.menuURL))
    .map((menu) =>
        menu.subMenuList
            ? { ...menu, subMenuList: menu.subMenuList.filter((item) => isRouteLive(item.menuURL)) }
            : menu,
    );

export const footerLinks = footerLinksData;
export const footerText = { footerNote, contactEmail, copyrightText };
