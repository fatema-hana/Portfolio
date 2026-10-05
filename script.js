/* Edit this array to change the project cards and detail panels. */
const PROJECTS = [
  { cat: "FULL-STACK · BUSINESS SYSTEMS", title: "Business Management Platform",
    desc: "A modular platform for operational workflows, role-based access, dashboards and reporting across departments.",
    context: "Separate business processes needed to live in one system, with each role seeing only what it should.",
    work: "Connecting multiple business processes into one platform, designing role-based access, and building dashboards and reports on shared data.",
    tech: ["React", "Node.js", "REST APIs", "MongoDB", "Role-based access", "Workflow management"] },
  { cat: "ERP · FULL-STACK", title: "ERP & Operations Platform",
    desc: "A multi-module application covering HR, attendance, projects, sales, inventory, accounting and operations.",
    context: "The hard part of an ERP is how modules affect each other, such as a sale changing stock and accounts.",
    work: "Modelling relationships between modules, permission rules per role, complex business logic and cross-module reporting.",
    tech: ["React", "Node.js", "MongoDB / MySQL", "Sequelize", "Role-based permissions", "Reporting"] },
  { cat: "OPERATIONS · BACKEND · DATABASE", title: "Subscription & Operations System",
    desc: "A subscription-driven system for customers, recurring plans, pricing logic, scheduling, delivery, payments and reports.",
    context: "Pricing, schedules and deliveries all depend on each other, so a change in one must update the rest.",
    work: "Designing reliable business rules, automated calculations, and reports that stay in sync when data changes, including PDF and Excel exports.",
    tech: ["React", "Node.js", "MongoDB", "Business rules", "Automated calculations", "PDF/Excel exports"] },
  { cat: "HEALTHCARE · FULL-STACK", title: "Healthcare Management Platform",
    desc: "A platform for enquiries, patient registration, consultations, doctor workflows, therapist appointments, availability and inventory.",
    context: "Different staff roles share one flow, and bookings depend on who is available and when.",
    work: "Role-based workflows, appointment scheduling, availability logic and API integration. No patient data is shown here.",
    tech: ["React", "Node.js", "MongoDB", "Role-based workflows", "Appointment scheduling", "API integration"] },
  { cat: "MERN · PLATFORM DEVELOPMENT", title: "Talent & Recruitment Platform",
    desc: "A role-based platform connecting different user types through structured profiles, workflows, dashboards and admin management.",
    context: "Each type of user needs its own journey while administrators keep oversight of the whole platform.",
    work: "Authentication, role-based access, profile structures and admin dashboards on the MERN stack.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Authentication", "Admin dashboards"] },
  { cat: "AWS · DEPLOYMENT · DEVOPS", title: "Cloud & Production Engineering",
    desc: "Running cloud-hosted applications on Linux servers: deployments, database backups, resource limits and production troubleshooting.",
    context: "Software has to keep working after it leaves the local machine, on servers with real limits.",
    work: "Deploying applications, managing servers, backing up databases and debugging issues in production.",
    tech: ["AWS EC2", "Linux", "AWS CLI", "Database backups", "Server management", "Production debugging"] }
];

const $ = (s) => document.querySelector(s);
const esc = (t) => t.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

/* Project cards */
$("#projGrid").innerHTML = PROJECTS.map((p, i) => `
  <button class="card reveal" data-i="${i}" aria-haspopup="dialog">
    <span class="cat">${esc(p.cat)}</span>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <span class="tags">${p.tech.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join("")}</span>
    <span class="arrow" aria-hidden="true">View details →</span>
  </button>`).join("");

/* Modal */
const modal = $("#modal");
$("#projGrid").addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  const p = PROJECTS[card.dataset.i];
  $("#mBody").innerHTML = `
    <span class="cat">${esc(p.cat)}</span>
    <h3 id="mTitle">${esc(p.title)}</h3>
    <h4>Overview</h4><p>${esc(p.desc)}</p>
    <h4>Problem / context</h4><p>${esc(p.context)}</p>
    <h4>What I worked on</h4><p>${esc(p.work)}</p>
    <h4>Technical focus</h4><ul>${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    <p style="margin-top:20px;font-size:14px">Details are generalized to respect client confidentiality.</p>`;
  modal.showModal();
});
$("#mClose").onclick = () => modal.close();
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* Mobile menu */
const burger = $("#burger"), menu = $("#menu");
const setMenu = (open) => {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
burger.onclick = () => setMenu(!menu.classList.contains("open"));
menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

/* Nav border on scroll */
const nav = $("#nav");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

/* Scroll reveal */
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("on"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("on"));
}