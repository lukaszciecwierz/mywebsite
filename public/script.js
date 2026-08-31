
const toggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".nav-menu");
if(toggle&&menu){toggle.addEventListener("click",()=>{const open=menu.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));}

if (window.location.hostname === "lukaszciecwierz.pl") {
    const target =
        "https://www.lukaszciecwierz.pl" +
        window.location.pathname +
        window.location.search +
        window.location.hash;

    window.location.replace(target);
}

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav-menu a[href^='#']")];
if("IntersectionObserver" in window){
 const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+e.target.id));}}),{rootMargin:"-25% 0px -65% 0px"});
 sections.forEach(s=>navObserver.observe(s));
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");revealObserver.unobserve(e.target);}}),{threshold:.08});
 document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));
}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));}
