/* 
    HedgeDocs Custom JavaScript
*/
let animatedBackgroundIsEnabled = false

/* --------- ON PAGE LOAD ----------- */

MutationObserver = window.MutationObserver || window.WebKitMutationObserver
var observer = new MutationObserver(function (mutations, observer) {
    if (mutations.find((elem) => elem.attributeName == 'data-md-scrollfix') != undefined) {
        // Mutation was caused by a page change (SPA or Reload)
        
        // Add Sonic Frontiers styled background animation
        if (animatedBackgroundIsEnabled) {
            enableAnimatedBackground()
        }
        replacePermalinkIcon()
        addFadeAnim()
        makeImagesClickable()
        //addCssClasses()

        if (document.querySelectorAll('.md-nav__link.md-nav__link--index.md-nav__link--active').length >= 1) {
            // page change was caused by a tab change
        }
    }
})
observer.observe(document, {
    subtree: true,
    attributes: true,
})


/* --------- FUNCTIONS ----------- */

function makeImagesClickable() {
    const background = document.querySelector('.imagePreview-background')
    background.addEventListener('click', hideImagePreview)

    const images = document.querySelector('.md-main').querySelectorAll('img')

    for(let i = 0; i < images.length; i++) {
        const image = images[i]
        if (image.classList.contains('not-clickable') || image.parentElement.classList.contains('md-logo')) continue
        image.setAttribute('style', 'cursor: pointer')
        image.addEventListener('click', imageClicked)
    }
}

function hideImagePreview(event) {
    const imageDiv = document.querySelector('.imagePreview-image')
    imageDiv.classList.add('scaledown')
    imageDiv.classList.remove('scaleup')

    const background = document.querySelector('.imagePreview')
    background.style.opacity = '0%'
    setTimeout(() => {
        background.style.display = 'none'
    }, 250)
}

function imageClicked(event) {
    const image = event.target
    const background = document.querySelector('.imagePreview')
    background.style.display = 'inherit'
    background.style.opacity = '100%'

    const imageDiv = document.querySelector('.imagePreview-image')
    imageDiv.style.display = 'block'
    //imageDiv.style.animation = 'scaleup 0.25s'
    imageDiv.classList.add('scaleup')
    imageDiv.classList.remove('scaledown')
    const imageElem = document.querySelector('.imagePreview-image-element')
    imageElem.src = image.src
    imageElem.alt = image.alt
    const imageCaption = document.querySelector('.imagePreview-image-caption')
    imageCaption.href = image.src
}

function enableAnimatedBackground() {
    animatedBackgroundIsEnabled = true
    const options = {
        fpsLimit: 60,
        particles: {
            number: {
                value: 150
            },
            color: {
                value: "#000"
            },
            links: {
                enable: true,
                distance: 250,
                speed: 6,
                color: "#000"
            },
            move: {
                enable: true,
                speed: 1
            }
        }
    }
      
    tsParticles.load("tsparticles", options);
    
    const particlesDiv = document.getElementById('tsparticles')
    particlesDiv.childNodes[0].classList.add('tsparticles')
}

function addCssClasses() {
    // Add active class
    const links = document.querySelectorAll('.md-tabs__link--active')

    for (let i = 0, length = links.length; i < length; i++) {
        const link = links[i]
        link.parentElement.classList.add('md-tabs__item--active')
        if (link.parentElement.tagName.toUpperCase() == 'H1') {
            // Remove permalink from the first link of the page
            link.parentElement.removeChild(link)
        }
    }
}

function replacePermalinkIcon() {
    const links = document.querySelectorAll('.headerlink')

    for (let i = 0, length = links.length; i < length; i++) {
        const link = links[i]
        if (link.parentElement.tagName.toUpperCase() == 'H1') {
            // Remove permalink from the first link of the page
            link.parentElement.removeChild(link)
        } else {
            link.innerHTML =
                '<span class="twemoji"> \
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"> \
                        <path fill-rule="evenodd" d=" \
                            M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 \
                            1.25zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0z">     \
                        </path> \
                    </svg> \
                </span>'
        }
    }
}

function addFadeAnim() {
    const links = document.querySelectorAll('.md-nav')

    for (let i = 0, length = links.length; i < length; i++) {
        const link = links[i]
        if (!link.classList.contains('slide-fadein')) {
            link.classList.add('slide-fadein')
        }
    }
}

function replaceNavLinks() {
    const links = document.querySelectorAll('.md-nav__link')
    for (let i = 0, length = links.length; i < length; i++) {
        const text = links[i].childNodes[0].textContent.trim()

        /*
        if (text == 'Sonic Generations') {
            const img = document.createElement('img')
            img.setAttribute('src', '/assets/games/SonicGenerations.png')
            img.setAttribute('width', '30px')
            img.setAttribute('style', 'margin-right: -1rem')
            links[i].insertBefore(img, links[i].firstChild)
        }
        else if (text == 'Sonic Lost World') {
            const img = document.createElement('img')
            img.setAttribute('src', '/assets/games/SonicLostWorld.png')
            img.setAttribute('width', '30px')
            img.setAttribute('style', 'margin-right: -1rem')
            links[i].insertBefore(img, links[i].firstChild)
        }
        else if (text == 'Sonic Frontiers') {
            const img = document.createElement('img')
            img.setAttribute('src', '/assets/games/SonicFrontiers.png')
            img.setAttribute('width', '30px')
            img.setAttribute('style', 'margin-right: -1rem')
            links[i].insertBefore(img, links[i].firstChild)
        }
        */
    }
}
