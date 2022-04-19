import sublinks from './data.js';

const toggleBtn = document.querySelector('.toggle-btn');
const closeBtn = document.querySelector('.close-btn');
const sideBarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.querySelector('.sidebar-links');
const linkBtns = [...document.querySelectorAll('.link-btn')];
const subMenu = document.querySelector('.submenu')
const hero = document.querySelector('.hero')
const nav = document.querySelector('.nav')

// Ocultar/mostrar sidebar
toggleBtn.addEventListener('click',()=>{
    sideBarWrapper.classList.add('show');
})

closeBtn.addEventListener('click',()=>{
    sideBarWrapper.classList.remove('show');
})

// SideBar
sidebar.innerHTML = sublinks.map((item)=>{
    const {links,page} = item;
    
    return `<article>
    <h4>${page}</h4>
    <div class="sidebar-sublinks">
    ${links.map((link)=>{
        return `
        <a href="${link.url}">
        <i class="${link.icon}"></i>${link.label}
        </a>`
    }).join('')}
    </div>
    </article>`
}).join('')


linkBtns.forEach((item)=>{
    item.addEventListener('mouseover',(e)=>{
        const text = e.currentTarget.textContent;
        const tempBtn = e.currentTarget.getBoundingClientRect();
        const center = (tempBtn.left + tempBtn.right) / 2;
        const bottom = tempBtn.bottom - 3;

        const tempPage = sublinks.find(({page})=> page === text)
            if(tempPage){

                const {page,links} = tempPage
                
                subMenu.classList.add('show');
                subMenu.style.left = `${center}px`
                subMenu.style.top = `${bottom}px`

                subMenu.innerHTML = `
                <section>
                <h4>${page}</h4>
                <div class="submenu-center col-2">${links.map((link)=>{
                    return `
                    <a href="${link.url}">
                    <i class="${link.icon}"></i>${link.label}
                    </a>
                    `
                }).join('')}</div>
                </section>
                `

            }


    })
});


hero.addEventListener('mouseover', function(e){
    subMenu.classList.remove('show')
})

nav.addEventListener('mouseover', function(e){
    if(!e.target.classList.contains('link-btn')){
        subMenu.classList.remove('show')
    }
})