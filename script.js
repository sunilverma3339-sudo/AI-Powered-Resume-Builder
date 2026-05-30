const state = {
  template: "classic",
  color: "#1b3d5f",
  skills: ["HTML", "CSS", "JavaScript", "Python", "SQL", "Git"],
  visible: {
    summary: true,
    objective: true,
    experience: true,
    projects: true,
    skills: true,
    certs: true,
    languages: true
  }
};

const $ = (id) => document.getElementById(id);
const value = (id) => ($(id)?.value || "").trim();

const defaults = {
  name: "Sunil Kumar",
  role: "Software Development Intern",
  email: "sunilverma3339@gmail.com",
  phone: "+91 XXXXXXXXXX",
  location: "Hingona, India",
  linkedin: "linkedin.com/in/sunilkumar",
  website: "github.com/sunilverma3339-sudo",
  summary: "Motivated software development intern with practical knowledge of HTML, CSS, JavaScript, Python, SQL, and Git. Interested in building responsive web applications and solving real-world problems through clean and user-friendly software.",
  objective: "Seeking a software development internship where I can apply my technical skills, learn from experienced mentors, and contribute to meaningful projects with dedication and teamwork.",
  degree: "B.Tech in Computer Science",
  college: "Your College Name",
  year: "2027",
  grade: "8.0 CGPA",
  certs: "Python, Web Development, Git & GitHub",
  projectTitle: "Smart Attendance System",
  projectTech: "HTML, CSS, JavaScript, Firebase",
  projectDetails: "Developed a QR-based smart attendance system with student login, attendance marking, admin dashboard, and attendance record management.",
  achievements: "Built multiple portfolio projects and actively learning full stack development.",
  experienceTitle: "Student Developer",
  experienceDetails: "Worked on web-based projects and practiced building responsive user interfaces.",
  softSkills: "Communication, Teamwork, Problem Solving, Time Management",
  languages: "English, Hindi"
};

const roleSkills = {
  "Software Development Intern": ["Java", "Python", "Data Structures", "OOP", "Git", "Problem Solving"],
  "Web Development Intern": ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "REST APIs"],
  "AI / ML Intern": ["Python", "Machine Learning", "Pandas", "NumPy", "Model Evaluation", "Data Preprocessing"],
  "Data Analyst Intern": ["SQL", "Excel", "Power BI", "Python", "Data Cleaning", "Dashboarding"],
  "UI/UX Design Intern": ["Figma", "Wireframing", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
  "Digital Marketing Intern": ["SEO", "Content Writing", "Social Media", "Google Analytics", "Campaign Planning", "Market Research"]
};

function escapeHtml(text) {
  return String(text || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitList(text) {
  return String(text || "")
    .split(/,|\n/)
    .map(item => item.trim())
    .filter(Boolean);
}

function setDefaultData() {
  Object.entries(defaults).forEach(([id, val]) => {
    if ($(id) && !value(id)) $(id).value = val;
  });
}

function getData() {
  return {
    name: value("name") || "Your Name",
    role: value("role") || "Internship Candidate",
    email: value("email"),
    phone: value("phone"),
    location: value("location"),
    linkedin: value("linkedin"),
    website: value("website"),
    summary: value("summary"),
    objective: value("objective"),
    degree: value("degree"),
    college: value("college"),
    year: value("year"),
    grade: value("grade"),
    certs: value("certs"),
    projectTitle: value("projectTitle"),
    projectTech: value("projectTech"),
    projectDetails: value("projectDetails"),
    achievements: value("achievements"),
    experienceTitle: value("experienceTitle"),
    experienceDetails: value("experienceDetails"),
    softSkills: value("softSkills"),
    languages: value("languages"),
    jobDescription: value("jobDescription"),
    companyName: value("companyName"),
    coverLetter: value("coverLetter")
  };
}

function contactLine(data) {
  return [data.email, data.phone, data.location, data.linkedin, data.website]
    .filter(Boolean)
    .map(item => `<span>${escapeHtml(item)}</span>`)
    .join("");
}

function renderTags() {
  if (!$("skillTags")) return;
  $("skillTags").innerHTML = state.skills
    .map(skill => `<span class="tag">${escapeHtml(skill)} <button type="button" data-remove="${escapeHtml(skill)}">x</button></span>`)
    .join("");
}

function buildSections(data) {
  const skills = state.skills.map(skill => `<span>${escapeHtml(skill)}</span>`).join("");
  const softSkills = splitList(data.softSkills).map(skill => `<span>${escapeHtml(skill)}</span>`).join("");
  const certs = splitList(data.certs).map(cert => `<span>${escapeHtml(cert)}</span>`).join("");
  const languages = splitList(data.languages).map(lang => `<span>${escapeHtml(lang)}</span>`).join("");

  return `
    ${state.visible.summary && data.summary ? `<section class="resume-section"><h3>Professional Summary</h3><p class="summary-box">${escapeHtml(data.summary)}</p></section>` : ""}
    ${state.visible.objective && data.objective ? `<section class="resume-section"><h3>Career Objective</h3><p>${escapeHtml(data.objective)}</p></section>` : ""}

    <section class="resume-section">
      <h3>Education</h3>
      <p><strong>${escapeHtml(data.degree || "Degree / Course")}</strong></p>
      <p>${escapeHtml(data.college || "College / University")}</p>
      <p>${escapeHtml([data.year, data.grade].filter(Boolean).join(" | "))}</p>
    </section>

    ${state.visible.experience ? `<section class="resume-section">
      <h3>Internship / Experience</h3>
      <p><strong>${escapeHtml(data.experienceTitle)}</strong></p>
      <p>${escapeHtml(data.experienceDetails)}</p>
    </section>` : ""}

    ${state.visible.projects ? `<section class="resume-section">
      <h3>Project Experience</h3>
      <p><strong>${escapeHtml(data.projectTitle)}</strong></p>
      <p><em>${escapeHtml(data.projectTech)}</em></p>
      <p>${escapeHtml(data.projectDetails)}</p>
      <p>${escapeHtml(data.achievements)}</p>
    </section>` : ""}

    <div class="resume-grid">
      ${state.visible.skills ? `<section class="resume-section"><h3>Technical Skills</h3><div class="resume-tags">${skills}</div></section>` : ""}
      <section class="resume-section"><h3>Soft Skills</h3><div class="resume-tags">${softSkills}</div></section>
    </div>

    <div class="resume-grid">
      ${state.visible.certs ? `<section class="resume-section"><h3>Certifications</h3><div class="resume-tags">${certs}</div></section>` : ""}
      ${state.visible.languages ? `<section class="resume-section"><h3>Languages</h3><div class="resume-tags">${languages}</div></section>` : ""}
    </div>
  `;
}

function renderPreview() {
  const output = $("resumeOutput");
  if (!output) return;

  const data = getData();
  output.className = `resume-sheet ${state.template}`;
  output.style.setProperty("--accent", state.color);

  const header = `
    <div class="${state.template === "executive" ? "resume-top" : ""}">
      <h1 class="resume-name">${escapeHtml(data.name)}</h1>
      <p class="resume-role">${escapeHtml(data.role)}</p>
      <div class="contact-line">${contactLine(data)}</div>
    </div>
  `;

  output.innerHTML = `
    <div class="resume-inner" style="--rclr:${state.color}">
      ${header}
      <hr class="resume-rule">
      ${buildSections(data)}
    </div>
  `;
}

function renderScore() {
  const data = getData();
  const checks = [
    Boolean(data.name),
    Boolean(data.email || data.phone),
    data.summary.length > 30,
    Boolean(data.degree && data.college),
    Boolean(data.projectTitle && data.projectDetails),
    state.skills.length >= 4
  ];

  const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  if ($("scoreValue")) $("scoreValue").textContent = `${score}%`;
  if ($("scoreBar")) $("scoreBar").style.width = `${score}%`;
}

function updateCounter() {
  if ($("summaryCount")) $("summaryCount").textContent = value("summary").length;
}

function live() {
  updateCounter();
  renderScore();
  renderPreview();
  saveLocal();
}

function saveLocal() {
  const ids = Object.keys(defaults).concat(["jobDescription", "companyName", "coverLetter"]);
  const fields = {};
  ids.forEach(id => {
    if ($(id)) fields[id] = $(id).value;
  });
  localStorage.setItem("resumeai_internship_builder", JSON.stringify({ fields, state }));
}

function loadLocal() {
  const saved = JSON.parse(localStorage.getItem("resumeai_internship_builder") || "{}");
  if (saved.fields) {
    Object.entries(saved.fields).forEach(([id, val]) => {
      if ($(id)) $(id).value = val;
    });
  }
  if (saved.state) {
    Object.assign(state, saved.state);
  }
}

function addSkill() {
  const skill = value("skillInput");
  if (skill && !state.skills.includes(skill)) {
    state.skills.push(skill);
    $("skillInput").value = "";
    renderTags();
    live();
  }
}

function generateSummary() {
  const data = getData();
  $("summary").value = `Motivated ${data.role.toLowerCase()} candidate with practical knowledge of ${state.skills.slice(0, 5).join(", ")}. Built projects like ${data.projectTitle}, demonstrating problem-solving ability, responsive design skills, and interest in real-world software development.`;
  live();
}

function generateObjective() {
  const data = getData();
  $("objective").value = `Seeking a ${data.role.toLowerCase()} opportunity where I can apply my technical knowledge, learn from industry mentors, and contribute to meaningful projects with discipline and teamwork.`;
  live();
}

function improveProject() {
  $("projectDetails").value = `Developed a responsive and user-friendly project using ${value("projectTech") || "modern web technologies"}. Implemented structured input handling, clean UI design, and real-time updates to improve user experience.`;
  live();
}

function suggestSkills() {
  const suggestions = roleSkills[value("role")] || [];
  suggestions.forEach(skill => {
    if (!state.skills.includes(skill)) state.skills.push(skill);
  });
  renderTags();
  live();
}

function fillSampleData() {
  localStorage.removeItem("resumeai_internship_builder");
  Object.entries(defaults).forEach(([id, val]) => {
    if ($(id)) $(id).value = val;
  });
  state.skills = ["HTML", "CSS", "JavaScript", "Python", "SQL", "Git"];
  renderTags();
  live();
}

function switchTab(tab) {
  document.querySelectorAll("[data-tab]").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });

  document.querySelectorAll("[data-panel]").forEach(panel => {
    panel.classList.toggle("active", panel.dataset.panel === tab);
  });
}

function downloadHTML() {
  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${escapeHtml(value("name") || "Resume")}</title>
<style>
body{font-family:Arial,sans-serif;background:#f4f4f4;padding:30px}
.resume-sheet{background:#fff;max-width:850px;margin:auto;padding:35px}
.resume-name{font-size:34px;margin:0;color:#1b3d5f}
.resume-role{font-weight:bold}
.contact-line span{margin-right:12px}
.resume-section{margin-top:18px}
.resume-section h3{color:#1b3d5f;border-bottom:1px solid #ddd;padding-bottom:5px}
.resume-tags span{display:inline-block;background:#eef2f6;margin:4px;padding:6px 10px;border-radius:20px}
</style>
</head>
<body>
<main class="resume-sheet">${$("resumeOutput").innerHTML}</main>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sunil-kumar-resume.html";
  link.click();
}

function resetBuilder() {
  localStorage.removeItem("resumeai_internship_builder");
  fillSampleData();
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    loadLocal();
    setDefaultData();
    renderTags();

    document.querySelectorAll("input, textarea, select").forEach(field => {
      field.addEventListener("input", live);
    });

    document.querySelectorAll("[data-tab]").forEach(button => {
      button.addEventListener("click", () => switchTab(button.dataset.tab));
    });

    document.querySelectorAll("[data-section]").forEach(box => {
      box.checked = state.visible[box.dataset.section];
      box.addEventListener("change", () => {
        state.visible[box.dataset.section] = box.checked;
        live();
      });
    });

    if ($("skillTags")) {
      $("skillTags").addEventListener("click", e => {
        const skill = e.target.dataset.remove;
        if (skill) {
          state.skills = state.skills.filter(item => item !== skill);
          renderTags();
          live();
        }
      });
    }

    if ($("skillInput")) {
      $("skillInput").addEventListener("keydown", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          addSkill();
        }
      });
    }

    $("addSkillBtn")?.addEventListener("click", addSkill);
    $("summaryBtn")?.addEventListener("click", generateSummary);
    $("objectiveBtn")?.addEventListener("click", generateObjective);
    $("projectBtn")?.addEventListener("click", improveProject);
    $("skillsBtn")?.addEventListener("click", suggestSkills);
    $("sampleBtn")?.addEventListener("click", fillSampleData);
    $("resetBtn")?.addEventListener("click", resetBuilder);

    $("printBtn")?.addEventListener("click", () => window.print());
    $("previewPrintBtn")?.addEventListener("click", () => window.print());

    $("downloadBtn")?.addEventListener("click", downloadHTML);
    $("previewDownloadBtn")?.addEventListener("click", downloadHTML);

    document.querySelectorAll(".template-card").forEach(button => {
      button.addEventListener("click", () => {
        state.template = button.dataset.template;
        document.querySelectorAll(".template-card").forEach(card => card.classList.remove("selected"));
        button.classList.add("selected");
        live();
      });
    });

    document.querySelectorAll(".swatch").forEach(button => {
      button.addEventListener("click", () => {
        state.color = button.dataset.color;
        document.querySelectorAll(".swatch").forEach(swatch => swatch.classList.remove("selected"));
        button.classList.add("selected");
        live();
      });
    });

    live();
  } catch (error) {
    console.error("ResumeAI Error:", error);
    alert("JavaScript error: " + error.message);
  }
});
