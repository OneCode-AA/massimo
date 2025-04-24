const menuBtn = document.getElementById("menu");
const nav = document.getElementById("nav");
const header = document.getElementById("header");
const themeBtn = document.getElementById("theme-btn");
const themeSwitch = document.getElementById("status-indicator");
const pageStatus = document.getElementById("pageIndicator");
const actionBtn = document.getElementById('actionBtn');
const actionMenu = document.getElementById('actionMenu');
const actionBtnTop = document.getElementById('actionBtnTop');

const menuContainers = document.querySelectorAll('#menu-container');


function toggleMenuContainers() {
  menuContainers.forEach(container => container.classList.toggle('active'));
}


actionBtn.addEventListener('click', () => {
  const currentName = actionBtn.getAttribute('name');

  if (currentName === 'caret-up-circle-outline') {
    actionBtn.setAttribute('name', 'close-circle-outline');
  } else {
    actionBtn.setAttribute('name', 'caret-up-circle-outline');
  }

  actionBtn.classList.toggle('active');
  
  actionMenu.classList.toggle('active');
});

// actionBtnTop.addEventListener('click', () => {
//   const currentName = actionBtnTop.getAttribute('name');

//   if (currentName === 'caret-down-circle-outline') {
//     actionBtnTop.setAttribute('name', 'close-circle-outline');
//   } else {
//     actionBtnTop.setAttribute('name', 'caret-down-circle-outline');
//   }

//   actionBtnTop.classList.toggle('active');
//   menuContainers.forEach(container => container.classList.toggle('active'));
//   actionMenu.classList.toggle('active-top');
// });


// Toggle menu and animate
menuBtn.addEventListener("click", () => {
  toggleMenuContainers();
  nav.classList.toggle("opened");
  header.classList.toggle("active");
  menuBtn.classList.toggle("active");

  const expanded = menuBtn.classList.contains("active");
  menuBtn.setAttribute("aria-expanded", expanded);
});


// Theme toggle
themeSwitch.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark-theme");

  if (isDark) {
    document.body.classList.replace("dark-theme", "light-theme");
    themeSwitch.classList.replace("night", "day");
    themeBtn.setAttribute("aria-checked", "true");
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.replace("light-theme", "dark-theme");
    themeSwitch.classList.replace("day", "night");
    themeBtn.setAttribute("aria-checked", "false");
    localStorage.setItem("theme", "dark-mode");
  }
});

// Load saved theme
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light-mode") {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
  themeSwitch.classList.add("day");
  themeSwitch.classList.remove("night");
  themeBtn.setAttribute("aria-checked", "true");
} else {
  document.body.classList.add("dark-theme");
  document.body.classList.remove("light-theme");
  themeSwitch.classList.add("night");
  themeSwitch.classList.remove("day");
  themeBtn.setAttribute("aria-checked", "false");
}




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
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => a.boundingClientRect.y - b.boundingClientRect.y);

  if (visible.length > 0) {
    const currentSection = visible[0].target.getAttribute('role');
    if (pageStatus.innerHTML !== currentSection) {
      pageStatus.innerHTML = currentSection;
    }
  }
}, {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
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



const navItems = [
  { text: "Home", href: "#hero" },
  { text: "Experiences", href: "#experiences" },
  { text: "Work", href: "#work" },
  { text: "Skills", href: "#skills" },
  { text: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: "logo-codepen", href: "#" },
  { icon: "logo-linkedin", href: "#" },
  { icon: "logo-youtube", href: "#" },
];


function generateNav(id) {
  const container = document.getElementById(id);
  if (!container) return;

  navItems.forEach(({ text, href }) => {
    const li = document.createElement("li");
    li.className = id.includes("Nav") ? "nav-li" : "header-nav-li";

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

generateNav("mainNav");
generateNav("mobileNav");

generateSocial("heroSocial");
generateSocial("footerSocial");


const experiences = [
  {
    title: "Coding Instructor Intern",
    company: "New Vision Foundation",
    alias: ["NVF"],
    date: "April 2025 - Present",
    location: "Saint Paul, MN, USA",
    description: `As a Coding Instructor Intern, I am responsible for teaching coding skills to elementary students. I help students learn programming languages. I also assist students with their projects and provide feedback on their work. My role involves mentoring students, answering their questions, and guiding them through the learning process.`,
  },
  {
    title: "Frontend Developer Freelancer",
    company: "Upwork",
    alias: ["Upwork"],
    date: "March 2024 - April 2025",
    location: "Remote",
    description: `As a Frontend Developer Freelancer, I have worked on various projects, including building responsive websites and web applications. I have experience with HTML, CSS, JavaScript, and frameworks like React. I collaborate with clients to understand their requirements and deliver high-quality solutions that meet their needs.`,
  }
];

function renderExperienceByCompany(companyKey) {
  const jobContainer = document.getElementById("job");
  jobContainer.innerHTML = ""; // Clear current content

  const experience = experiences.find(exp =>
    exp.alias.includes(companyKey) || exp.company === companyKey
  );

  if (!experience) return;

  const expHTML = `
    <section class="experience-role">
      <article>
        <p class="experiences-title">${experience.title}</p>
        <p class="experiences-company">@ ${(experience.alias && experience.alias.length > 0) ? experience.alias.join(" / ") : experience.company}</p>
      </article>
      <article>
        <p class="experiences-date">${experience.date}</p>
        <p class="experiences-location">${experience.location}</p>
      </article>
    </section>
    <p class="experiences-description">${experience.description}</p>
  `;

  jobContainer.innerHTML = expHTML;
}

document.querySelectorAll(".job-li").forEach((li) => {
  li.addEventListener("click", () => {
    const company = li.dataset.company;
    renderExperienceByCompany(company);
    
    document.querySelectorAll(".job-li").forEach((el) => el.classList.remove("active"));
    li.classList.add("active");
  });
});

// Initial load
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
  // {
  //   title: "Coming Soon",
  //   image: "",
  //   description: "",
  //   tech: ["HTML", "CSS", "JavaScript", "React"],
  //   liveLink: "#",
  //   codeLink: "#",
  // },
  // {
  //   title: "Coming Soon",
  //   image: "",
  //   description: "",
  //   tech: ["HTML", "CSS", "JavaScript", "React"],
  //   liveLink: "#",
  //   codeLink: "#",
  // }
];


function renderProjects() {
  const workSection = document.querySelector(".projects-container");

  projects.forEach(project => {
    const section = document.createElement("section");
    section.className = "project-card";

    section.innerHTML = `
      <h4 class="project-title">${project.title}</h4>
      <img src="${project.image}" alt="" class="work-image" />
      <p class="project-description">${project.description}</p>
      <section class="project-tech">
      <h4>Technologies Used</h4>
      <br>
        ${project.tech.map(tech => `<span class="project-tech-item">${tech}</span>`).join("")}
      </section>
      <section class="repo-live">
        <a href="${project.liveLink}" class="project-link">
          <span class="project-link-text">View Live</span>
          <ion-icon name="arrow-forward-outline" class="project-link-icon"></ion-icon>
        </a>
        <a href="${project.codeLink}" class="project-github">
          <span class="project-github-text">View Code</span>
          <ion-icon name="logo-github" class="project-github-icon"></ion-icon>
        </a>
      </section>
    `;

    workSection.appendChild(section);
  });
}


renderProjects();

const skills = [
  {
    title: "Frontend",
    sets: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
    ]
  },
  {
    title: "Backend",
    sets: [
      { name: "JavaScript(Node.js)" },
      { name: "Python" },
      { name: "Go(Lang)" },
      { name: "Java" },
    ]
  },
  {
    title: "Frameworks & Libraries",
    sets: [
      { name: "React.js/Next.js" },
      { name: "JQuery" },
      { name: "BootStrap" },
      { name: "TailwindCSS" },
      { name: "SASS/LESS" },
    ]
  },
  {
    title: "Tools",
    sets: [
      { name: "Git" },
      { name: "Github" },
    ]
  }
];

// Create tabs dynamically
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

// Show selected skill set
function renderSkillSet(skillTitle) {
  const container = document.getElementById("skill-set");
  container.innerHTML = ""; // clear before rendering

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

// Setup tab click event
function setupSkillListeners() {
  document.querySelectorAll(".skill-li").forEach(li => {
    li.addEventListener("click", () => {
      const skillTitle = li.dataset.skill;
      renderSkillSet(skillTitle);

      // toggle active class
      document.querySelectorAll(".skill-li").forEach(el => el.classList.remove("active"));
      li.classList.add("active");
    });
  });
}

// Initial load
renderSkillTabs();
renderSkillSet("Frontend");
setupSkillListeners();
