const menuBtn = document.querySelector('.menuBtn');
const nav = document.getElementById("mobileNav");
const header = document.getElementById("header");
const themeBtn = document.getElementById("themeBtn");
const themeSwitch = document.getElementById("statusIndicator");
const pageStatus = document.getElementById("pageIndicator");
const actionMenu = document.getElementById('actionMenu');
const myTitle = document.getElementById("myTitle");
const sections = document.querySelectorAll("section");
const logo = document.getElementById("logo");



let scrollTimeout = null;

window.addEventListener("scroll", () => {

  document.body.classList.add("scrolling");
  pageStatus.classList.add("actively-scrolling");
  logo.classList.add("inactive");


  if (window.scrollY > 0) {
    header.classList.add("active");

  } else {
    header.classList.remove("active");
    logo.classList.remove("inactive");
    pageStatus.classList.remove("actively-scrolling");

  }

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.body.classList.remove("scrolling");
    pageStatus.classList.remove("actively-scrolling");
    logo.classList.remove("inactive");
  }, 2000);
});

  
  


observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(entry => entry.isIntersecting);
  if (visible.length > 0) {
    const section = visible[0].target;
    const role = section.getAttribute("role") || section.id; 
    pageStatus.textContent = role;             
    pageStatus.classList.add("current-section");
  }
});

  
  
  sections.forEach(section => observer.observe(section));
  
  
  
  const navItems = [
    { text: "Home", href: "#hero" },
    { text: "About", href: "#about" },
    { text: "Experiences", href: "#experiences" },
    { text: "Projects", href: "#projects" },
    { text: "Skills", href: "#skills" },
    { text: "Blog", href: "#blog" },
  ];
  
  const socialLinks = [
    { icon: "logo-codepen", href: "https://codepen.io/thetwomigrations", class: "codepenIcon" },
    { icon: "logo-linkedin", href: "https://www.linkedin.com/in/abooabdillaahmbj/", class: "linkedinIcon" },
    { icon: "logo-youtube", href: "https://www.youtube.com/@TheTwoMigrations", class: "youtubeIcon" },
  ];
  
  function generateNav(id) {
    const container = document.getElementById(id);
    if (!container) return;
  
    navItems.forEach(({ text, href }) => {
      const li = document.createElement("li");
      li.className = id.includes("Nav") ? "nav-li" : "mobile-nav-li";
  
      const a = document.createElement("a");
      a.href = href;
      a.className = li.className + "-a";
      a.textContent = text;
  
      li.appendChild(a);
      container.appendChild(li);
    });
  }
  
  function generateSocial(id) {
    const container = document.getElementById(id);
    if (!container) return;
  
    socialLinks.forEach(({ icon, href }) => {
      const li = document.createElement("li");
      li.className = "social-li";
  
      const a = document.createElement("a");
      a.href = href;
      a.className = "social-li-a";
  
      const ion = document.createElement("ion-icon");
      ion.setAttribute("name", icon);
  
      a.appendChild(ion);
      li.appendChild(a);
      container.appendChild(li);
    });
  }
  
  generateNav("mobileNav-ul");
  generateSocial("navSocial");
  generateSocial("heroSocial");
  generateSocial("footerSocial");
  



themeSwitch.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-theme");

  if (isDark) {
    document.body.classList.replace("dark-theme", "light-theme");
    themeSwitch.classList.replace("night", "day");
    themeBtn.setAttribute("aria-checked", "true");
    localStorage.setItem("theme", "light-theme");
  } else {
    document.body.classList.replace("light-theme", "dark-theme");
    themeSwitch.classList.replace("day", "night");
    themeBtn.setAttribute("aria-checked", "false");
    localStorage.setItem("theme", "dark-theme");
  }
});




const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light-theme") {
  document.body.classList.add("light-theme");
  themeSwitch.classList.add("day");
  themeBtn.setAttribute("aria-checked", "true");
} else {
  document.body.classList.add("dark-theme");
  themeSwitch.classList.add("night");
  themeBtn.setAttribute("aria-checked", "false");
}




menuBtn.addEventListener("click", () => {
  nav.classList.toggle("opened");
  header.classList.toggle("active");
  menuBtn.classList.toggle("active");

  const expanded = menuBtn.classList.contains("active");
  menuBtn.setAttribute("aria-expanded", expanded);
});






const message = document.createElement("span");
message.classList.add("message");
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






const experiences = [
  {
    title: "Coding Instructor Intern",
    company: "New Vision Foundation",
    alias: ["NVF"],
    date: "April 2025 - Present",
    location: "Saint Paul, MN, USA",
    description: `Teaching coding skills to elementary students, mentoring projects, and providing feedback.`,
  },
  {
    title: "Frontend Developer Freelancer",
    company: "Upwork",
    alias: ["Upwork"],
    date: "March 2024 - April 2025",
    location: "Remote",
    description: `Building responsive websites and web applications using React, HTML, CSS, and JavaScript.`,
  }
];

function renderExperienceByCompany(companyKey) {
  const jobContainer = document.getElementById("job");
  jobContainer.innerHTML = "";

  const experience = experiences.find(exp =>
    exp.alias.includes(companyKey) || exp.company === companyKey
  );
  if (!experience) return;

  jobContainer.innerHTML = `
    <section class="experience-role">
      <article>
        <p class="experiences-title">${experience.title}</p>
        <p class="experiences-company">@ ${experience.alias.join(" / ")}</p>
      </article>
      <article>
        <p class="experiences-date">${experience.date}</p>
        <p class="experiences-location">${experience.location}</p>
      </article>
    </section>
    <p class="experiences-description">${experience.description}</p>
  `;
}


document.getElementById("job-ul").addEventListener("click", (e) => {
  const li = e.target.closest(".job-li");
  if (!li) return;

  const company = li.dataset.company;
  renderExperienceByCompany(company);

  document.querySelectorAll(".job-li").forEach(el => el.classList.remove("active"));
  li.classList.add("active");
});

renderExperienceByCompany("NVF");



const projects = [
  {
    title: "Plan Ahead App",
    image: "assets/img/planaheadappimg.png",
    description: "",
    tech: ["React.js/Next.js"],
    liveLink: "https://plan-ahead-app.vercel.app/",
    codeLink: "https://github.com/OneCode-AA/plan-ahead-app",
  },
  {
    title: "M.A.J. General Maintenance Landing Page",
    image: "assets/img/maj-img.png",
    description: "",
    tech: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://maj-green.vercel.app/",
    codeLink: "https://github.com/OneCode-AA/maj",
  },
  {
    title: "Todo App",
    image: "assets/img/todoapp.png",
    description: "",
    tech: ["React.js/Next.js"],
    liveLink: "https://todo-app-2k25.vercel.app/",
    codeLink: "https://github.com/OneCode-AA/todo-app-2k25"
  },
];

function renderProjects() {
  const workSection = document.querySelector(".projects-container");

  projects.forEach(project => {
    const section = document.createElement("section");
    section.className = "project-card";

    section.innerHTML = `
      <article class="card-intro">
        <h4 class="project-title">${project.title}</h4>
        <img src="${project.image}" alt="" class="work-image" />
      </article>
      <article class="card-details">
        <section class="project-tech">
          <h4>Technologies Used</h4>
          <br>
          ${project.tech.map(tech => `<span class="project-tech-item">${tech}</span>`).join("")}
        </section>
        <section class="repo-live">
          <a href="${project.liveLink}" class="project-link">
            <span>View Live</span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </a>
          <a href="${project.codeLink}" class="project-github">
            <span>View Code</span>
            <ion-icon name="logo-github"></ion-icon>
          </a>
        </section>
      </article>
    `;

    workSection.appendChild(section);
  });
}


renderProjects();




const skills = [
  {
    title: "Frontend",
    sets: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }]
  },
  {
    title: "Backend",
    sets: [{ name: "Node.js" }, { name: "Python" }, { name: "Go" }, { name: "Java" }]
  },
  {
    title: "Frameworks & Libraries",
    sets: [{ name: "React.js/Next.js" }, { name: "Express.js"}, { name: "jQuery" }, { name: "Bootstrap" }, { name: "TailwindCSS" }, { name: "SASS/LESS" }]
  },
  {
    title: "Tools",
    sets: [{ name: "Git" }, { name: "GitHub" }]
  }
];

function renderSkillTabs() {
  const ul = document.getElementById("skill-ul");
  skills.forEach((skill, index) => {
    const li = document.createElement("li");
    li.className = `skill-li ${index === 0 ? "active" : ""}`;
    li.dataset.skill = skill.title;
    li.innerText = skill.title;
    ul.appendChild(li);
  });
}


function renderSkillSet(skillTitle) {
  const container = document.getElementById("skill-set");
  container.innerHTML = "";

  const skill = skills.find(s => s.title === skillTitle);
  if (!skill) return;

  const skillListItems = skill.sets
    .map(set => `<li class="skills-li">${set.name}</li>`)
    .join("");

  const section = document.createElement("section");
  section.className = "skill-card";
  section.innerHTML = `
    <h4 class="skill-title">${skill.title}</h4>
    <ul class="skills-ul">
      ${skillListItems}
    </ul>
  `;

  container.appendChild(section);
}


document.getElementById("skill-ul").addEventListener("click", (e) => {
  const li = e.target.closest(".skill-li");
  if (!li) return;

  renderSkillSet(li.dataset.skill);

  document.querySelectorAll(".skill-li").forEach(el => el.classList.remove("active"));
  li.classList.add("active");
});

renderSkillTabs();
renderSkillSet("Frontend");
