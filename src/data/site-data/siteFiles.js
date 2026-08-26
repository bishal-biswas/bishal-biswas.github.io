// Site branding assets. These store FULL public paths (not bare filenames like
// most of site-data) because they are used directly as an img src and never go
// through getPaths().
import siteFilesData from "./json/site-files.json";

export const siteFiles = siteFilesData;
