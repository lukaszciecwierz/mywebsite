async function loadProjects() {  
  const grid = document.getElementById("projects-grid");  
  
  if (!grid) return;  
  
  try {  
    const response = await fetch("/projects.json");  
    const projects = await response.json();  
  
    if (!Array.isArray(projects) || projects.length === 0) {  
      grid.innerHTML = "<p>No achievements available yet.</p>";  
      return;  
    }  
  
    grid.innerHTML = projects  
      .map((project) => {  
        const title = project.title || "Untitled item";  
        const description = project.description || "No description provided.";  
        const stack = project.stack || "";  
        const url = project.url || "";  
        const github = project.github || "";  
  
        return `  
          <article class="project-card">  
            <h3>${title}</h3>  
            <p>${description}</p>  
            ${stack ? `<p class="project-meta">${stack}</p>` : ""}  
            ${  
              url || github  
                ? `  
              <div class="project-links">  
                ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">Visit</a>` : ""}  
                ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}  
              </div>  
            `  
                : ""  
            }  
          </article>  
        `;  
      })  
      .join("");  
  } catch (error) {  
    console.error("Could not load achievements:", error);  
    grid.innerHTML = "<p>Could not load achievements.</p>";  
  }  
}  
  
loadProjects();  
