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
  // PROJECT DATABASE
  // Add new projects directly to this array:
  // ---------------------------------------------------------------------------
  const projects = [
    {
      title: "Formula Student — CAN Bus Node",
      type: "academic",
      category: "ARECE Autonomous Racing",
      description: "Hardware design for an autonomous vehicle CAN interface: regulated power stage (7-40V to 3.3V), TVS protections, SN65 transceiver, and ESP32. Multi-node testbench validation.",
      image: "images/CAN_bus(1).png",
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    {
      title: "Autonomous Rover & LIDAR Navigation",
      type: "academic",
      category: "Mobile Robotics",
      description: "Real-time 2D SLAM mapping and Nav2 autonomous obstacle avoidance with ROS 2 under Linux Ubuntu. Custom controller PCB running ESP-NOW and UART serial communication.",
      image: "images/rover-lidar.jpg",
      tags: ["ROS 2", "Nav2", "LIDAR", "Linux", "C++"]
    },
    {
      title: "Push-Pull Tube Audio Amplifier",
      type: "personal",
      category: "Analog & High Voltage",
      description: "Schematic capture and dual-layer KiCad PCB routing for a high-voltage vacuum tube amplifier (ECC83 preamp, EL34 power stage). Dielectric insulation checks and manual THT soldering.",
      image: "images/tube-amp.jpg",
      tags: ["KiCad", "High Voltage", "Analog", "Audio"]
    },
    {
      title: "Bookshelf Speakers & Active Subwoofer",
      type: "personal",
      category: "Electroacoustics & Woodworking",
      description: "Custom bass-reflex acoustic enclosure design, WinISD resonance tuning, passive 3-way crossover calculation, and internal acoustic dampening for linear frequency response.",
      image: "images/Bookshelf_speaker.jpg",
      tags: ["WinISD", "Acoustics", "3D CAD", "Analog"]
    },
    {
      title: "3D CAD Modeling & Rapid Prototyping",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      description: "High-precision 3D mechanical modeling in Fusion 360 and SolidWorks (custom electronics housings, scale architectural replicas) paired with calibrated FDM 3D printing.",
      image: "images/House_fiverr(1).png",
      tags: ["Fusion 360", "SolidWorks", "3D Printing", "FDM"]
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. RENDER FUNCTION
  // ---------------------------------------------------------------------------
  const container = document.getElementById('projects-container');
  const placeholderSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200' fill='%231e293b'><rect width='100%' height='100%'/><text x='50%' y='50%' fill='%2394a3b8' font-family='sans-serif' font-size='14' text-anchor='middle' dy='.3em'>Image Pending</text></svg>";

  function renderProjects(filter = 'all') {
    container.innerHTML = '';

    const filtered = filter === 'all' 
      ? projects 
      : projects.filter(p => p.type === filter);

    filtered.forEach(project => {
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

      const imgElement = card.querySelector('.card-img');
      imgElement.addEventListener('error', () => {
        imgElement.src = placeholderSvg;
      });

      container.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // 3. FILTER BUTTONS LOGIC
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