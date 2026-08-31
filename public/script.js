const currentLang = document.documentElement.lang === "pl" ? "pl" : "en";

const messages = {
  en: {
    noProjects: "No achievements are available.",
    projectsError: "Achievements could not be loaded.",
    noRecommendations: "Recommendations are available on LinkedIn or on request.",
    recommendationsError: "Recommendations could not be loaded.",
    untitled: "Untitled achievement",
    noDescription: "No description provided.",
    anonymous: "Anonymous",
    visit: "View details"
  },
  pl: {
    noProjects: "Brak dostępnych osiągnięć.",
    projectsError: "Nie udało się załadować osiągnięć.",
    noRecommendations: "Rekomendacje są dostępne na LinkedIn lub na życzenie.",
    recommendationsError: "Nie udało się załadować rekomendacji.",
    untitled: "Osiągnięcie bez tytułu",
    noDescription: "Brak opisu.",
    anonymous: "Autor anonimowy",
    visit: "Zobacz szczegóły"
  }
};

async function fetchLocaleData(resource) {
  const response = await fetch(`/data/${currentLang}/${resource}.json`, {
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`${resource}: HTTP ${response.status}`);
  }

  return response.json();
}

function createMessage(text) {
  const element = document.createElement("p");
  element.className = "content-message";
  element.textContent = text;
  return element;
}

function createExternalLink(url, label) {
  const link = document.createElement("a");
  link.href = url;
  link.textContent = label;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
}

async function loadProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  try {
    const projects = await fetchLocaleData("projects");
    grid.replaceChildren();

    if (!Array.isArray(projects) || projects.length === 0) {
      grid.append(createMessage(messages[currentLang].noProjects));
      return;
    }

    const fragment = document.createDocumentFragment();

    projects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "project-card";
      if (project.id) article.id = `project-${project.id}`;

      const heading = document.createElement("h3");
      heading.textContent = project.title || messages[currentLang].untitled;

      const description = document.createElement("p");
      description.textContent =
        project.description || messages[currentLang].noDescription;

      article.append(heading, description);

      if (project.stack) {
        const meta = document.createElement("p");
        meta.className = "project-meta";
        meta.textContent = project.stack;
        article.append(meta);
      }

      const links = document.createElement("div");
      links.className = "project-links";

      if (project.url) {
        links.append(
          createExternalLink(project.url, messages[currentLang].visit)
        );
      }

      if (project.github) {
        links.append(createExternalLink(project.github, "GitHub"));
      }

      if (links.childElementCount > 0) article.append(links);
      fragment.append(article);
    });

    grid.append(fragment);
  } catch (error) {
    console.error("Could not load achievements:", error);
    grid.replaceChildren(
      createMessage(messages[currentLang].projectsError)
    );
  } finally {
    grid.removeAttribute("aria-busy");
  }
}

async function loadRecommendations() {
  const grid = document.getElementById("recommendations-grid");
  if (!grid) return;

  try {
    const recommendations = await fetchLocaleData("recommendations");
    grid.replaceChildren();

    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      grid.append(
        createMessage(messages[currentLang].noRecommendations)
      );
      return;
    }

    const fragment = document.createDocumentFragment();

    recommendations.forEach((item) => {
      const article = document.createElement("article");
      article.className = "quote-card";

      const blockquote = document.createElement("blockquote");

      const quoteMark = document.createElement("span");
      quoteMark.className = "quote-mark";
      quoteMark.textContent = "“";
      quoteMark.setAttribute("aria-hidden", "true");

      const quote = document.createElement("p");
      quote.className = "quote-text";
      quote.textContent = item.quote || "";

      const author = document.createElement("footer");
      author.className = "quote-author";

      const name = document.createElement("strong");
      name.textContent = item.name || messages[currentLang].anonymous;
      author.append(name);

      if (item.role) {
        const role = document.createElement("span");
        role.textContent = item.role;
        author.append(role);
      }

      blockquote.append(quoteMark, quote, author);
      article.append(blockquote);
      fragment.append(article);
    });

    grid.append(fragment);
  } catch (error) {
    console.error("Could not load recommendations:", error);
    grid.replaceChildren(
      createMessage(messages[currentLang].recommendationsError)
    );
  } finally {
    grid.removeAttribute("aria-busy");
  }
}

loadProjects();
loadRecommendations();
