const menuBtn = document.getElementById("menu");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const themeBtn = document.getElementById("theme-btn");
const themeSwitch = document.getElementById("status-indicator");
const pageStatus = document.getElementById("pageIndicator");




const message = document.createElement("span");
message.classList.add("message");

const myTitle = document.getElementById("myTitle");
myTitle.appendChild(message);

const titles = [
  "Frontend Developer",
  "Web Developer",
  "Web Designer",
  "Coding Instructor",
  "Creative Coder",
  "Content Creator",
];
const speed = 100;
const titleDelay = 3000; 

function titleTextPresentation(message, title, speed, callback) {
  message.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    if (i < title.length) {
      message.innerHTML += title.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      setTimeout(callback, titleDelay);
    }
  }, speed);
}

function loopSession(index = 0) {
  titleTextPresentation(message, titles[index], speed, () => {
    const nextIndex = (index + 1) % titles.length;
    loopSession(nextIndex);
  });
}


loopSession();




const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      pageStatus.innerHTML = entry.target.role;
    }
  });
}
, {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
});
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  observer.observe(section);
});
const sectionsList = document.querySelectorAll("section");
sectionsList.forEach((section) => {
  section.addEventListener("click", () => {
    sectionsList.forEach((sec) => {
      sec.classList.remove("active");
    });
    section.classList.add("active");
  });
});




window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolling");
  } else {
    header.classList.remove("scrolling");
  }
});

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("opened");
  menuBtn.classList.toggle("active");
  header.classList.toggle("active");
});


themeSwitch.addEventListener("click", () => {
    if(document.body.classList.contains("dark-theme")) {
        document.body.classList.add("light-theme")
        document.body.classList.remove("dark-theme")
        themeSwitch.classList.add("day")
        themeSwitch.classList.remove("night")
        localStorage.setItem("theme", "light-mode");
    } else {
        document.body.classList.add("dark-theme")
        document.body.classList.remove("light-theme")
        themeSwitch.classList.add("night")
        themeSwitch.classList.remove("day")
        localStorage.setItem("theme", "dark-mode");
    }
})


if (localStorage.getItem("theme") === "light-mode") {
    themeSwitch.classList.add("day")
    themeSwitch.classList.remove("night")
    document.body.classList.add("light-theme")
    document.body.classList.remove("dark-theme")
  } else {
    themeSwitch.classList.add("night")
    themeSwitch.classList.remove("day")
    document.body.classList.add("dark-theme")
    document.body.classList.remove("light-theme")
  }
