// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Global Vars
let aboutContainerVisible = false;
let contactContainerVisible = false;
let recentWorksContainerVisible = false;

function snapClosest() {
    // get list of all doc elements 
    const sections = document.querySelectorAll('.snap');
    let closestSection = null;
    let closestDistance = Infinity;
    
    //iterate through list for closest element
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // Calculate the distance of the section to the center of the viewport
        const distanceToCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);

        if (distanceToCenter < closestDistance) {
            closestSection = section;
            closestDistance = distanceToCenter;
        }
    });

    //snap to closest element 
    if (closestSection) {
        const sectionOffset = closestSection.offsetTop;
        const sectionHeight = closestSection.offsetHeight;
        const centerOffset = sectionOffset + sectionHeight / 2 - window.innerHeight / 2;

        window.scrollTo({
            top: centerOffset,
            behavior: 'smooth'
        });
        
        //closestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0
        || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
        el.contains(efp(rect.left,  rect.top))
        ||  el.contains(efp(rect.right, rect.top))
        ||  el.contains(efp(rect.right, rect.bottom))
        ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

document.addEventListener("DOMContentLoaded", () => {
    // Use Intersection Observer to determine if objects are within the viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                return;
            }
            entry.target.classList.remove('in-view');
        });
    });

    // Get all the elements with the .animate class applied
    const allAnimatedElements = document.querySelectorAll('.animate');

    // Add the observer to each of those elements
    allAnimatedElements.forEach((element) => observer.observe(element));

});

window.addEventListener('scrollend', () => {
    //scroll viewport to closest element when user done scrolling
    snapClosest();
})

window.onload = () => {
    console.log("JavaScript loaded");

    //reset viewport to start
    window.scrollTo(0, 0);
    
    //reset vars
    aboutContainerVisible = false;
    contactContainerVisible = false;
}
