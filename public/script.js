const currentLang = document.body.dataset.lang || "en";  
  
async function loadProjects(lang = currentLang) {  
  const grid = document.getElementById("projects-grid");  
  if (!grid) return;  
  
  try {  
    const response = await fetch("/projects.json");  
    const projects = await response.json();  
  
    if (!Array.isArray(projects) || projects.length === 0) {  
      grid.innerHTML =  
        lang === "pl"  
          ? "<p>Brak dostępnych osiągnięć.</p>"  
          : "<p>No achievements available yet.</p>";  
      return;  
    }  
  
    grid.innerHTML = projects  
      .map((project) => {  
        const title =  
          lang === "pl"  
            ? project.title_pl || project.title_en || "Bez tytułu"  
            : project.title_en || project.title_pl || "Untitled item";  
  
        const description =  
          lang === "pl"  
            ? project.description_pl || project.description_en || "Brak opisu."  
            : project.description_en || project.description_pl || "No description provided.";  
  
        const stack =  
          lang === "pl"  
            ? project.stack_pl || project.stack_en || ""  
            : project.stack_en || project.stack_pl || "";  
  
        const url = project.url || "";  
        const github = project.github || "";  
  
        const visitLabel = lang === "pl" ? "Zobacz" : "Visit";  
        const githubLabel = "GitHub";  
  
        return `  
          <article class="project-card">  
            <h3>${title}</h3>  
            <p>${description}</p>  
            ${stack ? `<p class="project-meta">${stack}</p>` : ""}  
            ${  
              url || github  
                ? `  
                <div class="project-links">  
                  ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${visitLabel}</a>` : ""}  
                  ${github ? `<a href="${github}" target="_blank" rel="noopener noreferrer">${githubLabel}</a>` : ""}  
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
    grid.innerHTML =  
      lang === "pl"  
        ? "<p>Nie udało się załadować osiągnięć.</p>"  
        : "<p>Could not load achievements.</p>";  
  }  
}  
  
async function loadRecommendations(lang = currentLang) {  
  const grid = document.getElementById("recommendations-grid");  
  if (!grid) return;  
  
  try {  
    const response = await fetch("/recommendations.json");  
    const recommendations = await response.json();  
  
    if (!Array.isArray(recommendations) || recommendations.length === 0) {  
      grid.innerHTML =  
        lang === "pl"  
          ? "<p>Brak dostępnych rekomendacji.</p>"  
          : "<p>No recommendations available yet.</p>";  
      return;  
    }  
  
    grid.innerHTML = recommendations  
      .map((item) => {  
        const quote =  
          lang === "pl"  
            ? item.quote_pl || item.quote_en || "Brak treści rekomendacji."  
            : item.quote_en || item.quote_pl || "No recommendation provided.";  
  
        const name =  
          lang === "pl"  
            ? item.name_pl || item.name_en || "Imię Nazwisko"  
            : item.name_en || item.name_pl || "Name Surname";  
  
        const role =  
          lang === "pl"  
            ? item.role_pl || item.role_en || ""  
            : item.role_en || item.role_pl || "";  
  
        return `  
          <article class="quote-card">  
            <p class="quote-mark">“</p>  
            <p class="quote-text">${quote}</p>  
            <div class="quote-author">  
              <strong>${name}</strong>  
              ${role ? `<span>${role}</span>` : ""}  
            </div>  
          </article>  
        `;  
      })  
      .join("");  
  } catch (error) {  
    console.error("Could not load recommendations:", error);  
    grid.innerHTML =  
      lang === "pl"  
        ? "<p>Nie udało się załadować rekomendacji.</p>"  
        : "<p>Could not load recommendations.</p>";  
  }  
}  
  
loadProjects(currentLang);  
loadRecommendations(currentLang);
