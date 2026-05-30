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

const roleSkills = {
  "Software Development Intern": ["Java", "Python", "Data Structures", "OOP", "Git", "Problem Solving"],
  "Web Development Intern": ["HTML", "CSS", "JavaScript", "React", "Responsive Design", "REST APIs"],
  "AI / ML Intern": ["Python", "Machine Learning", "Pandas", "NumPy", "Model Evaluation", "Data Preprocessing"],
  "Data Analyst Intern": ["SQL", "Excel", "Power BI", "Python", "Data Cleaning", "Dashboarding"],
  "UI/UX Design Intern": ["Figma", "Wireframing", "User Research", "Prototyping", "Design Systems", "Usability Testing"],
  "Digital Marketing Intern": ["SEO", "Content Writing", "Social Media", "Google Analytics", "Campaign Planning", "Market Research"]
};

const roleKeywords = {
  "Software Development Intern": ["algorithm", "java", "python", "oop", "debugging", "git", "api", "database"],
  "Web Development Intern": ["html", "css", "javascript", "responsive", "react", "api", "frontend", "accessibility"],
  "AI / ML Intern": ["python", "machine learning", "model", "data", "pandas", "numpy", "training", "evaluation"],
  "Data Analyst Intern": ["sql", "excel", "dashboard", "data", "analysis", "visualization", "power bi", "reporting"],
  "UI/UX Design Intern": ["figma", "prototype", "wireframe", "research", "usability", "interface", "design system"],
  "Digital Marketing Intern": ["seo", "content", "campaign", "analytics", "social media", "keywords", "conversion"]
};

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

function toast(message) {
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  $("toastContainer").appendChild(item);
  setTimeout(() => {
    item.style.opacity = "0";
    item.style.transition = "opacity .25s";
    setTimeout(() => item.remove(), 260);
  }, 2500);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function splitList(text) {
  return text
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function contactLine(data) {
  return [data.email, data.phone, data.location, data.linkedin, data.website]
    .filter(Boolean)
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");
}

function renderTags() {
  $("skillTags").innerHTML = state.skills
    .map((skill) => `<span class="tag">${escapeHtml(skill)}<button type="button" data-remove="${escapeHtml(skill)}">x</button></span>`)
    .join("");
}

function renderScore() {
  const data = getData();
  const checks = [
    ["Name & role", Boolean(value("name") && value("role"))],
    ["Contact", Boolean(data.email || data.phone)],
    ["Summary", data.summary.length > 35],
    ["Education", Boolean(data.degree && data.college)],
    ["Project", Boolean(data.projectTitle && data.projectDetails)],
    ["Skills", state.skills.length >= 4],
    ["ATS tools", Boolean(data.jobDescription)]
  ];
  const score = Math.round((checks.filter(([, done]) => done).length / checks.length) * 100);
  $("scoreValue").textContent = `${score}%`;
  $("scoreBar").style.width = `${score}%`;
  $("scoreBar").style.background = score < 45 ? "var(--red)" : score < 75 ? "var(--gold)" : "var(--green)";
  $("scoreItems").innerHTML = checks
    .map(([label, done]) => `<span class="score-item ${done ? "done" : ""}"><i></i>${label}</span>`)
    .join("");
}

function buildSections(data) {
  const skills = state.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
  const softSkills = splitList(data.softSkills).map((skill) => `<span>${escapeHtml(skill)}</span>`).join("");
  const certs = splitList(data.certs).map((cert) => `<span>${escapeHtml(cert)}</span>`).join("");
  const languages = splitList(data.languages).map((language) => `<span>${escapeHtml(language)}</span>`).join("");

  return `
    ${state.visible.summary && data.summary ? `<section class="resume-section"><h3>Professional Summary</h3><p class="summary-box">${escapeHtml(data.summary)}</p></section>` : ""}
    ${state.visible.objective && data.objective ? `<section class="resume-section"><h3>Career Objective</h3><p>${escapeHtml(data.objective)}</p></section>` : ""}
    <section class="resume-section">
      <h3>Education</h3>
      <p><strong>${escapeHtml(data.degree || "Degree / Course")}</strong></p>
      <p>${escapeHtml(data.college || "College / University")}</p>
      <p>${escapeHtml([data.year, data.grade].filter(Boolean).join(" | "))}</p>
    </section>
    ${state.visible.experience && (data.experienceTitle || data.experienceDetails) ? `<section class="resume-section">
      <h3>Internship / Experience</h3>
      <p><strong>${escapeHtml(data.experienceTitle || "Experience")}</strong></p>
      <p>${escapeHtml(data.experienceDetails)}</p>
    </section>` : ""}
    ${state.visible.projects ? `<section class="resume-section">
      <h3>Project Experience</h3>
      <p><strong>${escapeHtml(data.projectTitle || "Project Title")}</strong></p>
      <p><em>${escapeHtml(data.projectTech)}</em></p>
      <p>${escapeHtml(data.projectDetails)}</p>
      ${data.achievements ? `<p>${escapeHtml(data.achievements)}</p>` : ""}
    </section>` : ""}
    <div class="resume-grid">
      ${state.visible.skills ? `<section class="resume-section"><h3>Technical Skills</h3><div class="resume-tags">${skills}</div></section>` : ""}
      ${softSkills ? `<section class="resume-section"><h3>Soft Skills</h3><div class="resume-tags">${softSkills}</div></section>` : ""}
    </div>
    <div class="resume-grid">
      ${state.visible.certs && certs ? `<section class="resume-section"><h3>Certifications</h3><div class="resume-tags">${certs}</div></section>` : ""}
      ${state.visible.languages && languages ? `<section class="resume-section"><h3>Languages</h3><div class="resume-tags">${languages}</div></section>` : ""}
    </div>
  `;
}

function renderPreview() {
  const data = getData();
  const output = $("resumeOutput");
  output.className = `resume-sheet ${state.template}`;
  output.style.setProperty("--accent", state.color);

  if (state.template === "modern") {
    output.innerHTML = `
      <div class="resume-inner" style="--rclr:${state.color}">
        <aside class="resume-side">
          <h1 class="resume-name">${escapeHtml(data.name)}</h1>
          <p class="resume-role">${escapeHtml(data.role)}</p>
          <section class="resume-section"><h3>Contact</h3><p>${[data.email, data.phone, data.location, data.linkedin, data.website].filter(Boolean).map(escapeHtml).join("<br>")}</p></section>
          ${state.visible.skills ? `<section class="resume-section"><h3>Skills</h3><p>${state.skills.map(escapeHtml).join("<br>")}</p></section>` : ""}
        </aside>
        <main class="resume-main">${buildSections(data)}</main>
      </div>`;
    return;
  }

  const header = `
    <div class="${state.template === "executive" ? "resume-top" : ""}">
      <h1 class="resume-name">${escapeHtml(data.name)}</h1>
      <p class="resume-role">${escapeHtml(data.role)}</p>
      <div class="contact-line">${contactLine(data)}</div>
    </div>`;

  output.innerHTML = `
    <div class="resume-inner" style="--rclr:${state.color}">
      ${header}
      ${state.template === "executive" ? "" : '<hr class="resume-rule">'}
      ${buildSections(data)}
    </div>`;
}

function generateSummary() {
  const data = getData();
  const skills = state.skills.slice(0, 5).join(", ");
  const project = data.projectTitle || "hands-on academic and portfolio projects";
  $("summary").value = `Motivated ${data.role.toLowerCase()} candidate with practical experience in ${skills || "core technical skills"}. Built ${project}, demonstrating problem-solving ability, responsive design thinking, and a strong interest in contributing to real internship projects.`;
  updateCounter();
  live();
  toast("AI summary generated");
}

function generateObjective() {
  const data = getData();
  $("objective").value = `Seeking a ${data.role.toLowerCase()} opportunity where I can apply my technical knowledge, learn from industry mentors, and contribute to meaningful projects with discipline, creativity, and teamwork.`;
  live();
  toast("Career objective generated");
}

function improveProject() {
  const tech = value("projectTech") || "relevant technologies";
  const role = value("role").toLowerCase();
  $("projectDetails").value = `Developed a responsive project using ${tech}, focused on clean interface design, structured input handling, and real-time preview updates. Strengthened skills relevant to a ${role} by solving layout, validation, and user experience challenges.`;
  live();
  toast("Project description improved");
}

function suggestSkills() {
  const suggestions = roleSkills[value("role")] || [];
  let added = 0;
  suggestions.forEach((skill) => {
    if (!state.skills.includes(skill)) {
      state.skills.push(skill);
      added += 1;
    }
  });
  renderTags();
  live();
  toast(`${added} internship skills added`);
}

function getResumeText() {
  const data = getData();
  return [
    data.name,
    data.role,
    data.summary,
    data.objective,
    data.degree,
    data.college,
    data.certs,
    data.projectTitle,
    data.projectTech,
    data.projectDetails,
    data.achievements,
    data.experienceTitle,
    data.experienceDetails,
    data.softSkills,
    data.languages,
    state.skills.join(" ")
  ].join(" ").toLowerCase();
}

function analyzeAts() {
  const jobText = value("jobDescription").toLowerCase();
  if (!jobText) {
    toast("Job description paste karo pehle");
    return;
  }

  const role = value("role");
  const suggested = roleKeywords[role] || [];
  const jobWords = jobText
    .replace(/[^a-z0-9+#. ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 4);
  const frequent = [...new Set(jobWords)].slice(0, 24);
  const keywords = [...new Set([...suggested, ...frequent])].slice(0, 18);
  const resumeText = getResumeText();
  const matched = keywords.filter((keyword) => resumeText.includes(keyword.toLowerCase()));
  const missing = keywords.filter((keyword) => !resumeText.includes(keyword.toLowerCase()));
  const score = Math.round((matched.length / Math.max(keywords.length, 1)) * 100);
  const color = score < 45 ? "var(--red)" : score < 75 ? "var(--gold)" : "var(--green)";

  $("atsResult").innerHTML = `
    <strong>ATS Match: ${score}%</strong>
    <div class="ats-meter"><span style="width:${score}%;background:${color}"></span></div>
    <p><b>Matched:</b> ${matched.length ? matched.map(escapeHtml).join(", ") : "No strong matches yet"}</p>
    <p><b>Missing:</b> ${missing.length ? missing.slice(0, 10).map(escapeHtml).join(", ") : "Looks strong"}</p>
    <p>Add missing keywords naturally in summary, skills, or project details.</p>`;
  toast("ATS analysis complete");
}

function generateCoverLetter() {
  const data = getData();
  const company = data.companyName || "your organization";
  const skills = state.skills.slice(0, 5).join(", ");
  $("coverLetter").value = `Dear Hiring Manager,

I am excited to apply for the ${data.role} position at ${company}. As a ${data.degree || "student"} with hands-on exposure to ${skills || "relevant technical skills"}, I am eager to contribute to real projects while learning from experienced professionals.

My project, ${data.projectTitle || "a practical portfolio project"}, helped me strengthen problem solving, implementation discipline, and user-focused thinking. I would be grateful for the opportunity to bring the same curiosity, consistency, and teamwork to ${company}.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute as an intern.

Sincerely,
${data.name}`;
  live();
  toast("Cover letter generated");
}

function fillSampleData() {
  const sample = {
  name: "Sunil Kumar",
  role: "Software Development Intern",
  email: "sunilkumar@example.com",
  phone: "+91 XXXXXXXXXX",
  location: "Hingona, India",
  linkedin: "linkedin.com/in/sunilkumar",
  website: "github.com/example-sudo",
  degree: "B.Tech in ELECTRONICS & COMMUNICATION ENGINEERING",
  college: "Your College Name",
  year: "2027",
  grade: "8.0 CGPA",
  certs: "Python, Web Development, Git & GitHub",
  projectTitle: "Smart Attendance System",
  projectTech: "HTML, CSS, JavaScript, Firebase",
  projectDetails: "Developed a QR-based smart attendance system with admin dashboard and attendance analytics.",
  achievements: "Built multiple portfolio projects and actively learning full stack development.",
  experienceTitle: "Student Developer",
  experienceDetails: "Worked on web applications and AI-based projects.",
  softSkills: "Communication, Teamwork, Problem Solving",
  languages: "English, Hindi"
};
  };
  Object.entries(sample).forEach(([id, sampleValue]) => {
    if ($(id)) $(id).value = sampleValue;
  });
  state.skills = ["Python", "Machine Learning", "Pandas", "NumPy", "JavaScript", "Git", "Problem Solving"];
  renderTags();
  generateSummary();
  generateObjective();
  analyzeAts();
  live();
  toast("Advanced sample profile loaded");
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

function switchTab(tab) {
  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll("[data-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tab);
  });
}

function updateCounter() {
  $("summaryCount").textContent = value("summary").length;
}

function saveLocal() {
  const ids = ["name", "role", "email", "phone", "location", "linkedin", "website", "summary", "objective", "degree", "college", "year", "grade", "certs", "projectTitle", "projectTech", "projectDetails", "achievements", "experienceTitle", "experienceDetails", "softSkills", "languages", "jobDescription", "companyName", "coverLetter"];
  const fields = Object.fromEntries(ids.map((id) => [id, $(id)?.value || ""]));
  localStorage.setItem("resumeai_internship_builder", JSON.stringify({ fields, state }));
}

function getSavePayload() {
  const ids = ["name", "role", "email", "phone", "location", "linkedin", "website", "summary", "objective", "degree", "college", "year", "grade", "certs", "projectTitle", "projectTech", "projectDetails", "achievements", "experienceTitle", "experienceDetails", "softSkills", "languages", "jobDescription", "companyName", "coverLetter"];
  const fields = Object.fromEntries(ids.map((id) => [id, $(id)?.value || ""]));
  return { fields, state };
}

function exportJson() {
  const blob = new Blob([JSON.stringify(getSavePayload(), null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${(value("name") || "resumeai").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-data.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("JSON backup exported");
}

function importJsonFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      Object.entries(data.fields || {}).forEach(([id, fieldValue]) => {
        if ($(id)) $(id).value = fieldValue;
      });
      if (data.state) Object.assign(state, data.state);
      renderTags();
      live();
      toast("JSON imported");
    } catch {
      toast("Invalid JSON file");
    }
  };
  reader.readAsText(file);
}

function resetBuilder() {
  localStorage.removeItem("resumeai_internship_builder");
  location.reload();
}

function loadLocal() {
  try {
    const saved = JSON.parse(localStorage.getItem("resumeai_internship_builder") || "{}");
    Object.entries(saved.fields || {}).forEach(([id, fieldValue]) => {
      if ($(id)) $(id).value = fieldValue;
    });
    if (saved.state) {
      Object.assign(state, saved.state);
      state.visible = {
        summary: true,
        objective: true,
        experience: true,
        projects: true,
        skills: true,
        certs: true,
        languages: true,
        ...(saved.state.visible || {})
      };
    }
  } catch {
    localStorage.removeItem("resumeai_internship_builder");
  }
}

function live() {
  updateCounter();
  renderScore();
  renderPreview();
  saveLocal();
}

function downloadHTML() {
  const documentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(value("name") || "Resume")}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${document.querySelector("style")?.textContent || ""}${Array.from(document.styleSheets).map((sheet) => {
    try {
      return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\\n");
    } catch {
      return "";
    }
  }).join("\\n")}</style>
</head>
<body><main class="resume-sheet ${state.template}" style="max-width:850px;margin:30px auto">${$("resumeOutput").innerHTML}</main></body>
</html>`;
  const blob = new Blob([documentHtml], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${(value("name") || "resume").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-resume.html`;
  link.click();
  URL.revokeObjectURL(link.href);
  toast("Resume downloaded");
}

document.addEventListener("DOMContentLoaded", () => {
  loadLocal();
  renderTags();

  document.querySelectorAll("input, textarea, select").forEach((field) => field.addEventListener("input", live));
  document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => switchTab(button.dataset.tab)));
  document.querySelectorAll(".template-card").forEach((button) => {
    button.addEventListener("click", () => {
      state.template = button.dataset.template;
      document.querySelectorAll(".template-card").forEach((card) => card.classList.remove("selected"));
      button.classList.add("selected");
      live();
    });
  });
  document.querySelectorAll(".swatch").forEach((button) => {
    button.addEventListener("click", () => {
      state.color = button.dataset.color;
      document.querySelectorAll(".swatch").forEach((swatch) => swatch.classList.remove("selected"));
      button.classList.add("selected");
      live();
    });
  });
  document.querySelectorAll("[data-section]").forEach((box) => {
    box.checked = state.visible[box.dataset.section];
    box.addEventListener("change", () => {
      state.visible[box.dataset.section] = box.checked;
      live();
    });
  });

  $("skillTags").addEventListener("click", (event) => {
    const skill = event.target.dataset.remove;
    if (skill) {
      state.skills = state.skills.filter((item) => item !== skill);
      renderTags();
      live();
    }
  });

  $("skillInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill();
    }
  });

  $("addSkillBtn").addEventListener("click", addSkill);
  $("summaryBtn").addEventListener("click", generateSummary);
  $("objectiveBtn").addEventListener("click", generateObjective);
  $("projectBtn").addEventListener("click", improveProject);
  $("skillsBtn").addEventListener("click", suggestSkills);
  $("atsBtn").addEventListener("click", analyzeAts);
  $("coverBtn").addEventListener("click", generateCoverLetter);
  $("sampleBtn").addEventListener("click", fillSampleData);
  $("exportDataBtn").addEventListener("click", exportJson);
  $("importDataBtn").addEventListener("click", () => $("importFile").click());
  $("importFile").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importJsonFile(file);
    event.target.value = "";
  });
  $("resetBtn").addEventListener("click", resetBuilder);
  $("printBtn").addEventListener("click", () => window.print());
  $("previewPrintBtn").addEventListener("click", () => window.print());
  $("downloadBtn").addEventListener("click", downloadHTML);
  $("previewDownloadBtn").addEventListener("click", downloadHTML);

  document.querySelectorAll(".template-card").forEach((card) => card.classList.remove("selected"));
  document.querySelectorAll(".swatch").forEach((swatch) => swatch.classList.remove("selected"));
  document.querySelector(`[data-template="${state.template}"]`)?.classList.add("selected");
  document.querySelector(`[data-color="${state.color}"]`)?.classList.add("selected");
  live();
});
