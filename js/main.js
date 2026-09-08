document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // THEME TOGGLE ENGINE
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return systemPrefersDark.matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️';
    }
  };

  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    });
  }

  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
// ---------------------------------------------------------------------------
  // 1. DATA (Ajout des galeries et descriptions longues)
  // ---------------------------------------------------------------------------
  const projects = [
    {
      id: "can-bus",
      title: "Formula Student — CAN Bus Node",
      type: "academic",
      category: "ARECE Autonomous Racing",
      shortDescription: "Hardware design for an autonomous vehicle CAN interface: regulated power stage, TVS protections, SN65 transceiver...",
      // Texte détaillé (HTML supporté)
      longDescription: `
        <h3>Project Overview</h3>
        <p>As part of the ARECE association, the goal was to build a 100% autonomous vehicle for the Formula Student competition. We had to design a robust CAN bus system to interconnect all vehicle elements (steering, batteries, motors).</p>
        <h3>Hardware Engineering</h3>
        <p>I designed a custom PCB using KiCad. The architecture is based on an ESP32 connected to an SN65HVD231 CAN transceiver. The board includes a regulated power supply converting 7-40V to 3.3V, and TVS diodes for surge protection.</p>
        <ul>
          <li><strong>Layer count:</strong> 2 Layers (Single-sided routing constraint)</li>
          <li><strong>Validation:</strong> Tested with a CAN-Analyzer to ensure frame integrity.</li>
        </ul>
      `,
      image: "images/can-bus/cover.png",
      // Liste de TOUTES les photos du projet (dans le dossier dédié)
      gallery: [
        "images/can-bus/cover.png",
        "images/can-bus/schematic.png",
        "images/can-bus/pcb-3d.png",
        "images/can-bus/testbench.jpg"
      ],
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    // Ajoute tes autres projets ici sur le même modèle...
  ];

  // ---------------------------------------------------------------------------
  // 2. RENDER CARDS
  // ---------------------------------------------------------------------------
  const container = document.getElementById('projects-container');
  const placeholderSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' fill='%231e293b'><rect width='100%' height='100%'/><text x='50%' y='50%' fill='%2394a3b8' font-family='sans-serif' font-size='14' text-anchor='middle' dy='.3em'>Image Pending</text></svg>";

  function renderProjects(filter = 'all') {
    container.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.type === filter);

    filtered.forEach(project => {
      const card = document.createElement('article');
      card.className = 'card';

      const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="card-img-wrapper" data-id="${project.id}">
          <img src="${project.image}" alt="${project.title}" class="card-img" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-header">
            <span class="card-tagline">${project.category}</span>
            <h3 class="card-title">${project.title}</h3>
          </div>
          <p class="card-desc">${project.shortDescription}</p>
          <div class="tags">${tagsHtml}</div>
        </div>
      `;

      const imgElement = card.querySelector('.card-img');
      imgElement.addEventListener('error', () => { imgElement.src = placeholderSvg; });
      container.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. FILTER LOGIC
  // ---------------------------------------------------------------------------
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
  renderProjects('all');

  // ---------------------------------------------------------------------------
  // 4. MODAL LOGIC (Détail du projet)
  // ---------------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  
  // Éléments de la modale
  const mCategory = document.getElementById('modal-category');
  const mTitle = document.getElementById('modal-title');
  const mTags = document.getElementById('modal-tags');
  const mGallery = document.getElementById('modal-gallery');
  const mText = document.getElementById('modal-text');

  // Ouvrir la modale
  container.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.card-img-wrapper');
    if (wrapper) {
      const projectId = wrapper.getAttribute('data-id');
      const project = projects.find(p => p.id === projectId);
      
      if (project) {
        // Remplissage du texte
        mCategory.textContent = project.category;
        mTitle.textContent = project.title;
        mTags.innerHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
        mText.innerHTML = project.longDescription;

        // Remplissage de la galerie
        mGallery.innerHTML = project.gallery.map(imgSrc => 
          `<img src="${imgSrc}" loading="lazy" alt="${project.title}">`
        ).join('');

        // Afficher la modale et bloquer le scroll du fond
        modal.classList.add('active');
        document.body.classList.add('modal-open');
      }
    }
  });

  // Fermer la modale
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  modalClose.addEventListener('click', closeModal);
  
  // Fermer si clic en dehors du conteneur de la modale
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // Fermer avec la touche Échap
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ---------------------------------------------------------------------------
  // RENDER CARDS
  // ---------------------------------------------------------------------------
  
  projects.forEach(project => {
    const card = document.createElement('article');
    card.className = 'card';

    const tagsHtml = project.tags.map(t => `<span class="tag">${t}</span>`).join('');

    card.innerHTML = `
      <div class="card-img-wrapper" data-full="${project.image}">
        <img src="${project.image}" alt="${project.title}" class="card-img" loading="lazy">
      </div>
      <div class="card-body">
        <div class="card-header">
          <span class="card-tagline">${project.category}</span>
          <h3 class="card-title">${project.title}</h3>
        </div>
        <p class="card-desc">${project.description}</p>
        <div class="tags">${tagsHtml}</div>
      </div>
    `;

    // Handle missing/broken images seamlessly
    const imgElement = card.querySelector('.card-img');
    imgElement.addEventListener('error', () => {
      imgElement.src = placeholderSvg;
    });

    container.appendChild(card);
  });

  // ---------------------------------------------------------------------------
  // LIGHTBOX LOGIC
  // ---------------------------------------------------------------------------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  container.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.card-img-wrapper');
    if (wrapper) {
      const fullImgSrc = wrapper.getAttribute('data-full');
      lightboxImg.src = fullImgSrc;
      lightbox.classList.add('active');
    }
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
});