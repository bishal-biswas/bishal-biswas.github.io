// Decap's simple (comma-separated) list widget refuses spaces and commas -
// decaporg/decap-cms#4646 - so lists that need spaces use its `field:` mode,
// which writes [{ value: "Some Text" }] instead of ["Some Text"].
// Accept either shape and always hand back a plain string[].
export function normalizeList(items) {
    if (!Array.isArray(items)) return [];
    return items.map((item) =>
        typeof item === "string" ? item : Object.values(item)[0],
    );
}
