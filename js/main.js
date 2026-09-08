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
    // ---------------------------------------------------------------------------
    // ACADEMIC PROJECTS
    // ---------------------------------------------------------------------------
    {
      title: "Formula Student — CAN Bus Node",
      type: "academic",
      category: "ARECE Autonomous Racing",
      description: "Hardware design for an autonomous vehicle CAN interface: regulated power stage (7-40V to 3.3V), TVS protections, SN65 transceiver, and ESP32. Multi-node testbench validation. //[cite: 1]",
      image: "images/CAN_bus(1).png",
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    {
      title: "Autonomous Rover & LIDAR Navigation",
      type: "academic",
      category: "Mobile Robotics",
      description: "Real-time 2D SLAM mapping and Nav2 autonomous obstacle avoidance with ROS 2 under Linux Ubuntu. Custom controller PCB running ESP-NOW and UART serial communication. //[cite: 1]",
      image: "images/rover-lidar.jpg",
      tags: ["ROS 2", "Nav2", "LIDAR", "Linux", "C++"]
    },
    {
      title: "Computer Vision Sorting Robot",
      type: "academic",
      category: "Robotics & OpenCV",
      description: "Engineered an ESP8266-controlled robot relying on HTTP requests. Implemented a Python computer vision script (OpenCV) for object detection and a Pygame path-planning algorithm. //[cite: 1]",
      image: "images/cv-robot.jpg",
      tags: ["OpenCV", "Python", "ESP8266", "Robotics"]
    },
    {
      title: "FPGA Elevator Controller",
      type: "academic",
      category: "Digital Electronics",
      description: "Programmed a functional elevator control system on a DE10-Lite FPGA using Quartus. Features priority scheduling, 7-segment display logic, and ultrasonic obstacle detection. //[cite: 1]",
      image: "images/fpga-elevator.jpg",
      tags: ["FPGA", "Quartus", "DE10-Lite", "Logic Design"]
    },
    {
      title: "Flappy Bird on PIC18F & NEAT AI",
      type: "academic",
      category: "Embedded Systems & AI",
      description: "Developed Flappy Bird in Assembly for a PIC18F microcontroller using IR/ultrasonic sensors and a GLCD. Trained a Python NEAT AI via UART to play the game autonomously. //[cite: 1]",
      image: "images/pic18f-flappy.jpg",
      tags: ["Assembly", "PIC18F", "NEAT AI", "UART"]
    },
    {
      title: "Voice Recognition Trivia Game",
      type: "academic",
      category: "Audio DSP & Machine Learning",
      description: "Created an interactive trivia game on Arduino Due. Implemented real-time FIR filtering and MFCC extraction to train a minimal neural network for word recognition. //[cite: 1]",
      image: "images/voice-recognition.jpg",
      tags: ["Arduino Due", "DSP", "MFCC", "C/C++"]
    },
    {
      title: "Conway's Game of Life in C",
      type: "academic",
      category: "Advanced C Programming",
      description: "Optimized a Game of Life simulation in C with strict memory constraints (64kB) and a fixed 60Hz refresh rate, utilizing multithreading and bitwise operations on uint64_t arrays. //[cite: 1]",
      image: "images/game-of-life.jpg",
      tags: ["C", "Multithreading", "Memory Optimization"]
    },
    {
      title: "Assembly Line Graph Optimization",
      type: "academic",
      category: "Algorithms & Graph Theory",
      description: "Developed a CLI application in C to optimize car manufacturing assembly lines based on task duration, precedence, and cycle time constraints using graph theory principles. //[cite: 1]",
      image: "images/graph-optimization.jpg",
      tags: ["C", "Algorithms", "Graph Theory"]
    },
    {
      title: "2D Games in C (Allegro)",
      type: "academic",
      category: "Game Development",
      description: "Programmed a maze game and a Star Wars-themed minigame collection in C using the Allegro graphics library. Implemented collisions, interactive maps, and audio settings. //[cite: 1]",
      image: "images/c-games.jpg",
      tags: ["C", "Allegro", "Game Dev"]
    },
    {
      title: "BlaBla-Omnes Carpooling Platform",
      type: "academic",
      category: "Full-Stack Web Development",
      description: "Developed a responsive carpooling website for students using HTML, CSS, JavaScript, and PHP, integrated with a SQL database and Google Maps API. //[cite: 1]",
      image: "images/blabla-omnes.jpg",
      tags: ["PHP", "SQL", "JavaScript", "Web Dev"]
    },
    {
      title: "Theme Park Management App",
      type: "academic",
      category: "Software Engineering",
      description: "Built a Java application using Scene Builder for the UI and a local SQL database via the DAO pattern to manage theme park attractions and customer statistics. //[cite: 1]",
      image: "images/theme-park-app.jpg",
      tags: ["Java", "SQL", "Scene Builder"]
    },
    {
      title: "FertiLyon Smart Compost Bin",
      type: "academic",
      category: "Sustainable Tech",
      description: "Concept and 3D rendering for a connected compost bin aimed at urban environments, featuring an optional mobile app with a reward system for users. //[cite: 1]",
      image: "images/fertilyon.jpg",
      tags: ["Product Design", "Sustainability", "3D Rendering"]
    },

    // ---------------------------------------------------------------------------
    // PERSONAL PROJECTS
    // ---------------------------------------------------------------------------
    {
      title: "Push-Pull Tube Audio Amplifier",
      type: "personal",
      category: "Analog & High Voltage",
      description: "Schematic capture and dual-layer KiCad PCB routing for a high-voltage vacuum tube amplifier (ECC83 preamp, EL34 power stage). Dielectric insulation checks and manual THT soldering. //[cite: 1]",
      image: "images/tube-amp.jpg",
      tags: ["KiCad", "High Voltage", "Analog", "Audio"]
    },
    {
      title: "Bookshelf Speakers & Active Subwoofer",
      type: "personal",
      category: "Electroacoustics & Woodworking",
      description: "Custom bass-reflex acoustic enclosure design, WinISD resonance tuning, passive 3-way crossover calculation, and internal acoustic dampening for linear frequency response. //[cite: 1]",
      image: "images/Bookshelf_speaker.jpg",
      tags: ["WinISD", "Acoustics", "3D CAD", "Analog"]
    },
    {
      title: "Magnetic Tape Player Restoration",
      type: "personal",
      category: "Electronics Repair",
      description: "Restored a vintage 1970s Sony TC-270 reel-to-reel tape recorder. Replaced motor run capacitors, manufactured custom polyurethane drive belts, and re-lubricated mechanisms. //[cite: 1]",
      image: "images/tape-recorder.jpg",
      tags: ["Electronics Repair", "Audio", "Mechanical"]
    },
    {
      title: "Custom 3D Printed Tape Reels",
      type: "personal",
      category: "3D CAD & Printing",
      description: "Reverse-engineered and modeled iconic Sony R-7MB tape reels in Fusion 360. Printed functional replicas using high-infill PETG for durability and PLA for the smooth inner hub. //[cite: 1]",
      image: "images/tape-reels.jpg",
      tags: ["Fusion 360", "3D Printing", "PETG/PLA"]
    },

    // ---------------------------------------------------------------------------
    // FREELANCE PROJECTS (FIVERR)
    // ---------------------------------------------------------------------------
    {
      title: "3D Architectural Replicas",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      description: "High-precision 3D mechanical modeling in Fusion 360 and SolidWorks to create 1:100 scale architectural replicas of houses, ready for FDM 3D printing. //[cite: 1]",
      image: "images/House_fiverr(1).png",
      tags: ["Fusion 360", "SolidWorks", "3D Printing", "FDM"]
    },
    {
      title: "Banana-Shaped Acoustic Speaker",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      description: "Designed a custom banana-shaped speaker enclosure. Modeled internal acoustic volumes in Fusion 360 for uniform wall thickness and simulated acoustic response using WinISD. //[cite: 1]",
      image: "images/banana-speaker.jpg",
      tags: ["Fusion 360", "Acoustics", "WinISD"]
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