// Endpoints for the dynamic bits of an otherwise static site. Everything here
// is read at build time from env vars and ends up in the page source, so none
// of it is secret - keep real secrets in the Apps Script project instead.
//
// Local dev: copy .env.example to .env and fill it in.
// Production: set the same names as repository variables and pass them through
// .github/workflows/deploy.yml.
const env = import.meta.env;

const value = (name) => (env[name] ?? "").trim();

export const integrations = {
    // The /exec URL of the Apps Script web app. Empty means "not wired up yet":
    // every form degrades to a mailto link or a disabled notice instead of
    // failing silently.
    sheetsEndpoint: value("PUBLIC_SHEETS_ENDPOINT"),

    // Optional shared string, must match CONFIG.API_TOKEN in Code.gs.
    apiToken: value("PUBLIC_API_TOKEN"),

    // Optional. When all three are set, the contact form sends the visitor's
    // auto-reply through EmailJS and Apps Script only stores + notifies.
    // Leave blank to have Apps Script send the auto-reply itself.
    emailjs: {
        publicKey: value("PUBLIC_EMAILJS_PUBLIC_KEY"),
        serviceId: value("PUBLIC_EMAILJS_SERVICE_ID"),
        templateId: value("PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID"),
    },

    // Pull approved testimonials straight from the sheet at runtime, so
    // approving one publishes it without a rebuild.
    liveTestimonials: value("PUBLIC_LIVE_TESTIMONIALS") !== "false",
};

export const isBackendConfigured = Boolean(integrations.sheetsEndpoint);

export const isEmailJsConfigured = Boolean(
    integrations.emailjs.publicKey &&
    integrations.emailjs.serviceId &&
    integrations.emailjs.templateId,
);

// The address forms fall back to when the backend is not configured.
export const fallbackEmail = "bishal.biswas.4796@gmail.com";
