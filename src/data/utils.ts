import { blogCategories } from "./site-data/content";
import { staticPaths } from "./site-data/navigation";
import { technologyData } from "./site-data/skills";
import { pageData } from "./site-data/pageData";
function getFormattedDate(parameter_date:any){
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return parameter_date.toLocaleString('en-US', options)
}

function countPresenceInArray(TargetWord:string, ArrayList: string[]){
    let count = 0;
    for (let i = 0; i < ArrayList.length; i++) {
        if(ArrayList[i] == TargetWord) count++;
    }

    return count;
}

var allCategories : categoriesPrototype[]= [];
var uniqueCategoryList:any = [];

function getAllCategories(categAllArticles:any){
    //Making a array of Categories from all blog posts
    allCategories = [];
    for (let i = 0; i < categAllArticles.length; i++) {
        if(uniqueCategoryList.includes(categAllArticles[i]) == false){
            uniqueCategoryList.push(categAllArticles[i]);
        }
    }

    for (let i = 0; i < uniqueCategoryList.length; i++) {
        let categoryText = uniqueCategoryList[i];

        let Count = countPresenceInArray(categoryText, categAllArticles);
        // console.log(i, categoryText, Count);
        var tempCategoryObj:categoriesPrototype = {
            title: categoryText,
            imageFile: getCategoryImage(categoryText),
            articleCount: Count
        }
    
        allCategories.push(tempCategoryObj);
    }

    return allCategories;
}

function getCategoryImage(categoryTitle:string){
    for (let i = 0; i < blogCategories.length; i++) {
        if(blogCategories[i].title == categoryTitle)
            return blogCategories[i].imageFile
    }
}

function findCategoryCount(categoryName:string, AllArticlesCategory : string[]) {
    let Count=0;
    for (let i = 0; i < AllArticlesCategory.length; i++) {
        if(AllArticlesCategory[i] == categoryName)
            Count++;
    }

    return Count;
}


//Article Reading Time
function calculateReadingTime(articleText:string, wordsPerMinute:number = 200) {
    const wordCount = articleText.trim().split(/\s+/).length;
    const readingTimeMinutes = Math.round(wordCount / wordsPerMinute);

    return readingTimeMinutes + " Min(s)";
}

function getTechStackLogo(techName:string) {
    for (let i = 0; i < technologyData.length; i++) {
        if(technologyData[i].technologyTitle.toLocaleLowerCase().includes(techName.toLocaleLowerCase()))
            return technologyData[i].technologyLogoImage
    }
}

interface categoriesPrototype {
    title: string,
    imageFile:string | undefined,
    articleCount :number
}

// Most image fields store a bare filename and get their folder prepended here.
// But Decap's image widget also offers "Replace with URL", so any of them can
// come back as an absolute URL or an already-rooted path - prepending a folder
// to those produces "/uploads/categ/https://...". Pass everything through this.
function resolveAsset(pathName: string, file: string | undefined) {
    if (!file) return "";
    if (/^(https?:)?\/\//.test(file) || file.startsWith("/")) return file;
    return getPaths(pathName) + file;
}

function getPaths(directoryName: string){
    const match = staticPaths.find(item => item.name === directoryName);
    const directory = match ? match.path : "";
    return directory
    // "Asset Images" | "Admin Images" | "Skills" | "Categories" | "Portfolio" | "Article" | "Certificate" | "Other Files"
}

function calculateAge (birthDate:Date, otherDate:Date) {
    birthDate = new Date(birthDate);
    otherDate = new Date(otherDate);

    var years = (otherDate.getFullYear() - birthDate.getFullYear());

    if (otherDate.getMonth() < birthDate.getMonth() || 
        otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
    }

    return years;
}

// Hero copy + background for a page, keyed by the pageTitle in page-data.json.
// Returns blanks rather than throwing if the key is missing, so a renamed entry
// degrades to an empty hero instead of a build failure.
function getPageContent(pageTitle: string) {
    const match = pageData.find((page: any) => page.pageTitle === pageTitle);
    return {
        pageSmallText: match?.pageSmallText ?? "",
        pageHeadingText: match?.pageHeadingText ?? "",
        isSmallBelow: match?.isSmallBelow ?? false,
        // undefined (not "") so layouts fall back to no background image at all
        backgroundImage: match?.backgroundImage || undefined,
        backgroundImageClass: match?.backgroundImageClass || undefined,
    };
}

function filterFuturePosts(posts: any[]) {
    const today = new Date(); // Get the current date
    return posts.filter((post) => {
      const publishDate = new Date(post.data.publishDate); // Convert publishDate to a Date object
      return publishDate <= today; // Include only posts with publishDate in the past or today
    });
  }

export {resolveAsset, getPageContent, getFormattedDate, getAllCategories, calculateReadingTime, getCategoryImage, findCategoryCount, getTechStackLogo, getPaths, calculateAge, filterFuturePosts}
