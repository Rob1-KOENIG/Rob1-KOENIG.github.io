document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // THEME TOGGLE ENGINE
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Récupérer le choix sauvegardé, ou détecter la préférence de l'OS
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return systemPrefersDark.matches ? 'dark' : 'light';
  };

  // Appliquer le thème sur le DOM et mettre à jour l'icône du bouton
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      if (themeIcon) themeIcon.textContent = '🌙'; // Proposer la lune pour revenir au sombre
    } else {
      document.body.classList.remove('light-theme');
      if (themeIcon) themeIcon.textContent = '☀️'; // Proposer le soleil pour passer au clair
    }
  };

  // Initialisation au chargement de la page
  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);

  // Bascule manuelle lors du clic sur le bouton
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', currentTheme);
      applyTheme(currentTheme);
    });
  }

  // Écouter les changements de thème en direct de l'OS (ex: mode nuit automatique à 20h)
  systemPrefersDark.addEventListener('change', (e) => {
    // Ne bascule automatiquement que si l'utilisateur n'a pas forcé un choix manuel
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
  
  // ---------------------------------------------------------------------------
  // PROJECT DATABASE
  // Add new projects directly to this array:
  // ---------------------------------------------------------------------------
  const projects = [
    {
      title: "Formula Student — CAN Bus Node",
      category: "ARECE Autonomous Racing",
      description: "Hardware design for an autonomous vehicle CAN interface: regulated power stage (7-40V to 3.3V), TVS diode surge protections, SN65 transceiver, and ESP32 microcontroller. Validated on a multi-node testbench using a CAN analyzer.",
      image: "images/can-bus.jpg",
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    {
      title: "Autonomous Rover & LIDAR Navigation",
      category: "Mobile Robotics",
      description: "Real-time 2D environment mapping (SLAM/Rviz) and obstacle avoidance navigation using ROS 2 and the Nav2 stack on Linux Ubuntu. Engineered a custom PCB remote controller running ESP-NOW and UART serial communication.",
      image: "images/rover-lidar.jpg",
      tags: ["ROS 2", "Nav2", "LIDAR", "Linux", "C++"]
    },
    {
      title: "Push-Pull Tube Audio Amplifier",
      category: "Analog & High Voltage",
      description: "Schematic design and dual-layer PCB layout under KiCad for a vacuum tube audio amplifier (ECC83 preamp, EL34 power stages). Managed high-voltage creepage, trace isolation, manual THT soldering, and bench instrumentation checks.",
      image: "images/tube-amp.jpg",
      tags: ["KiCad", "High Voltage", "Analog", "Audio"]
    },
    {
      title: "3D CAD Design & Rapid Prototyping",
      category: "Freelance Engineering",
      description: "High-precision 3D mechanical modeling in Fusion 360 and SolidWorks (custom hardware enclosures, scale architectural replicas) combined with tuned FDM additive manufacturing (Raise3D, Bambu Lab).",
      image: "images/fiverr-cad.jpg",
      tags: ["Fusion 360", "SolidWorks", "3D Printing", "FDM"]
    }
  ];

  // ---------------------------------------------------------------------------
  // RENDER CARDS
  // ---------------------------------------------------------------------------
  const container = document.getElementById('projects-container');
  const placeholderSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' fill='%231e293b'><rect width='100%' height='100%'/><text x='50%' y='50%' fill='%2394a3b8' font-family='sans-serif' font-size='14' text-anchor='middle' dy='.3em'>Image Pending</text></svg>";

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