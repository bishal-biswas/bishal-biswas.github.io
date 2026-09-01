// Data lives in ./json/*.json so the CMS can edit it.
import { blogCategories as blogCategoriesData } from "./json/blog-categories.json";
import { products as productsData } from "./json/products.json";

export const blogCategories = blogCategoriesData;
export const products = productsData;

/**
 * The sections on /products, in the order they are rendered. A product whose
 * productCategory matches a `name` lands in that section; anything else gets a
 * section of its own at the bottom, so a typo never hides a product.
 *
 * Keep the names in step with the `productCategory` options in
 * public/admin/config.yml - that select is what the CMS offers when adding one.
 */
export const productCategories = [
    {
        name: "Books",
        icon: "fa-solid fa-book",
        blurb: "The ones I keep going back to, not the ones that look good on a shelf.",
    },
    {
        name: "Software",
        icon: "fa-solid fa-code",
        blurb: "Desktop apps, CLI tools and utilities I have built or paid for happily.",
    },
    {
        name: "Websites",
        icon: "fa-solid fa-globe",
        blurb: "Sites and web apps built end to end, plus the services that power them.",
    },
    {
        name: "WordPress Themes",
        icon: "fa-brands fa-wordpress",
        blurb: "Themes I have built or trust on client projects.",
    },
    {
        name: "WordPress Plugins",
        icon: "fa-solid fa-plug",
        blurb: "Plugins worth installing, and the ones I maintain myself.",
    },
];
