/*Project Categroies Tabs Sections starts*/
function MakePortfolioCategory() {
    var projCate = document.querySelector(".project-Category");
    var portfolioWorks = document.querySelectorAll(".masonry-layout > div");
    var ProjCategs = new Array();
    portfolioWorks.forEach(Work => {
        categ = Work.getAttribute("data-attr").replace("All ", "");
        if (!ProjCategs.includes(categ))
            ProjCategs.push(categ);
    });
    ProjCategs.sort();
    // console.log(ProjCategs);

    ProjCategs.forEach(element => {
        var eleme = `<h2 class="text-teal-white dark:text-font-white capitalize cursor-pointer px-3 py-1 bg-body-bg hover:bg-gradient-to-r from-lite-green to-[#257d18] text-base rounded-full">${element}</h2>`;
        projCate.insertAdjacentHTML("beforeend", eleme);
    });
    projCate.insertAdjacentHTML("afterbegin", `<h2 class="text-teal-white dark:text-font-white capitalize cursor-pointer px-3 py-1 bg-body-bg bg-gradient-to-r from-lite-green to-[#257d18] text-base rounded-full">All</h2>`);

    var projCate_Tabs = document.querySelectorAll(".project-Category h2");
    function ActiveTabRemove() {
        projCate_Tabs.forEach(tabsSelector => {
            tabsSelector.classList.remove("bg-gradient-to-r");
            // tabsSelector.classList.remove("from-[--icon-color1]");
            // tabsSelector.classList.remove("to-[--icon-color2]");
        });
    }
    projCate_Tabs.forEach(tabsSelector => {
        tabsSelector.addEventListener("click", () => {
            ActiveTabRemove();
            tabsSelector.classList.add("bg-gradient-to-r");
            // tabsSelector.classList.add("from-[--icon-color1]");
            // tabsSelector.classList.add("to-[--icon-color2]");

            document.querySelectorAll(".Resume-Tabs").forEach(Tab => {
                Tab.classList.add("hidden");
            });

            document.querySelectorAll(".Resume-Tabs").forEach(Tab => {
                if (Tab.classList.contains(tabsSelector.innerHTML.trim())) {
                    Tab.classList.remove("hidden");
                }
            });
        })
    });
}

function TOCGenerator() {
    document.addEventListener("DOMContentLoaded", function () {
        var article = document.querySelector("article .article-content .post-body");
        var toc = document.querySelector(".toc-container .TOC");
        var headings = article.querySelectorAll("h2, h3");

        var ul = toc.querySelector("ul");
        var currentLevel = 2;
        var currentUl = ul;

        headings.forEach(function (heading) {
            // heading.setAttribute("id", heading.textContent.replaceAll(" ", "-"));
            var level = parseInt(heading.tagName.charAt(1));

            while (level < currentLevel) {
                currentUl = currentUl.parentElement.parentElement;
                currentLevel--;
            }

            while (level > currentLevel) {
                var newUl = document.createElement("ul");
                newUl.classList.add("px-2");
                currentUl.lastElementChild.appendChild(newUl);
                currentUl = newUl;
                currentLevel++;
            }

            var li = document.createElement("li");
            var link = document.createElement("a");
            link.classList.add("mb-[3px]","inline-block", "hover:text-dark-green")
            link.textContent = heading.textContent;
            link.href = "#" + heading.id;
            li.appendChild(link);
            currentUl.appendChild(li);
        });

        toc.appendChild(ul);


        //Fixing the Scroll position of Headings getting overlapped by NavBar
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
              e.preventDefault();
      
              const target = document.querySelector(this.getAttribute('href'));
              const navbarHeight = document.querySelector('header').offsetHeight;
              window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
              });
            });
          });
    });
}


const mouseGradientElement = document.getElementById("gradient-follow");

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  // Update the gradient position
  mouseGradientElement.style.left = `${mouseX}px`;
  mouseGradientElement.style.top = `${mouseY}px`;
});
let mouseX = 0, mouseY = 0, gradientX = 0, gradientY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function animateGradient() {
    // Smooth the position (lerp-like effect)
    gradientX += (mouseX - gradientX) * 0.1;
    gradientY += (mouseY - gradientY) * 0.1;
        
    mouseGradientElement.style.left = `${gradientX}px`;
    mouseGradientElement.style.top = `${gradientY}px`;
        
    requestAnimationFrame(animateGradient);
}

animateGradient();

//#region Shortcuts and Tabindex

document.addEventListener('keydown', (event) => {
    // Toggle theme on `Ctrl + T`
    if (event.altKey && event.key === 't') {
        event.preventDefault();
        themeToggleCheckbox.click();
    }
    
    // Open search input
    if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        searchBtn.click();
    }

    // Close search input with Escape
    if (event.key === 'Escape') {
        closeModal();
    }
});

document.addEventListener("DOMContentLoaded", ()=>{
    console.log(`Shortcuts that works-
    Alt + t = Theme Toggle
    Ctrl + k = Search
    Esc = Close Modal
    Run function - showDevInfo();`);
})
//-------------------------------//
const tabindexElements = document.querySelectorAll('[tabindex]:not([tabindex="-1"])');
tabindexElements.forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter'){
            e.preventDefault();
            element.click();
        }
    });
});
//#endregion

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
  
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
      threshold: 0.15, // Trigger when 10% of the element is visible
    });
  
    elements.forEach(element => observer.observe(element));
});

function showDevInfo(){
console.log(
`BBBBBB  IIIIII   SSSS  H    H   AAAA   Ll           BBBBBB  IIIIII   SSSS   W     W   AAAA    SSSS
B    B    I     S      H    H  A    A  Ll           B    B     I     S      W     W  A    A  S    
B  BB     I      SSS   HHHHHH  AAAAAA  Ll           B  BB      I     SSSS   W     W  AAAAAA   SSS 
B  BB     I         S  H    H  A    A  Ll           B  BB      I         S  W  W  W  A    A      S
B    B    I         S  H    H  A    A  Ll           B    B     I         S  W W W w  A    A      S
BBBBBB  IIIIII  SSSS   H    H  A    A  LLLLLL       BBBBBB   IIIIII  SSSS   WW   WW  A    A  SSSS
`)
console.log("Hire me for your  Upwork- https://www.upwork.com/freelancers/~0115a5e68520f6bde9")
}