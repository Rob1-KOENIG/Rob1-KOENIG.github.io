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
    // ---------------------------------------------------------------------------
    // ACADEMIC PROJECTS
    // ---------------------------------------------------------------------------
    {
      id: "formula-student",
      title: "Formula Student — CAN Bus Node",
      type: "academic",
      category: "ARECE Autonomous Racing",
      shortDescription: "Hardware design for an autonomous vehicle CAN interface: regulated power stage (7-40V to 3.3V), TVS protections, SN65 transceiver, and ESP32. Multi-node testbench validation. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>As part of the ARECE association, the objective was to develop an autonomous vehicle for the Formula Student competition. We designed a CAN bus system to interconnect vehicle components like steering and motors, replacing expensive rented equipment. //[cite: 1]</p>
        <h3>Hardware Engineering</h3>
        <p>I designed a custom PCB using KiCad. The board features an ESP32 microcontroller paired with an SN65HVD231 CAN transceiver. I also designed a regulated power supply capable of dropping 7-40V down to 3.3V, protected by TVS diodes. //[cite: 1]</p>
        <h3>Validation</h3>
        <p>The system was validated on a testbench with three interconnected nodes, analyzing the CAN frames with a CAN-Analyzer software to ensure reliable communication despite simulated voltage drops. //[cite: 1]</p>
      `,
      image: "images/CAN_bus(1).png",
      gallery: [
        "images/CAN_bus(1).png",
        "images/placeholder-1.jpg" // Add your extra gallery images here
      ],
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    {
      id: "rover-lidar",
      title: "Autonomous Rover & LIDAR Navigation",
      type: "academic",
      category: "Mobile Robotics",
      shortDescription: "Real-time 2D SLAM mapping and Nav2 autonomous obstacle avoidance with ROS 2 under Linux Ubuntu. Custom controller PCB running ESP-NOW and UART serial communication. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A year-long technical project to build an autonomous rover equipped with a LIDAR sensor, capable of 2D mapping and autonomous navigation, alongside manual control. //[cite: 1]</p>
        <h3>Software & Navigation (ROS 2)</h3>
        <p>Operating on a dual-boot Ubuntu 22 system, we utilized ROS 2 for the software stack. I configured Rviz for real-time 2D SLAM mapping and implemented the Nav2 stack for autonomous path planning and obstacle avoidance using LIDAR data. //[cite: 1]</p>
        <h3>Custom Hardware Controller</h3>
        <p>I designed a remote control PCB using KiCad (single-layer, under 8 vias). The remote uses an ATmega328P and an ESP-01S, communicating via UART with level shifters (2N7000). It sends commands to the rover via the ESP-NOW protocol. //[cite: 1]</p>
      `,
      image: "images/Technical_project/1.HEIC",
      gallery: [
        "images/Technical_project/2.JPG",
        "images/Technical_project/3.JPG",
        "images/Technical_project/4.HEIC",
        "images/Technical_project/5.HEIC",
        "images/Technical_project/6.JPG",
        "images/Technical_project/7.PNG",
        "images/Technical_project/8.HEIC",
        "images/Technical_project/9.HEIC",
        "images/Technical_project/10.HEIC",
        "images/Technical_project/11.HEIC"
      ],
      tags: ["ROS 2", "Nav2", "LIDAR", "Linux", "C++"]
    },
    {
      id: "cv-robot",
      title: "Computer Vision Sorting Robot",
      type: "academic",
      category: "Robotics & OpenCV",
      shortDescription: "Engineered an ESP8266-controlled robot relying on HTTP requests. Implemented a Python computer vision script (OpenCV) for object detection and a Pygame path-planning algorithm. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a remote-controlled robot capable of navigating a predefined map to collect colored cubes while avoiding obstacles, utilizing computer vision. //[cite: 1]</p>
        <h3>Path Planning & Vision</h3>
        <p>A Python script running on a PC handles computer vision via OpenCV to detect ArUco markers and colored cubes. A custom path-planning algorithm, built with Pygame, calculates optimal routes and collision avoidance. //[cite: 1]</p>
        <h3>Hardware & Control</h3>
        <p>The robot is controlled by an ESP8266 acting as an HTTP web server, receiving movement commands from the PC. I also designed and 3D-printed (FDM) the robot's custom chassis, cover, and a functional plow mechanism using Fusion 360. //[cite: 1]</p>
      `,
      image: "images/OPENCV_Rover/1.jpg",
      gallery: [
        "images/OPENCV_Rover/2.jpg",
        "images/OPENCV_Rover/3.jpg",
        "images/OPENCV_Rover/4.jpg"
      ],
      tags: ["OpenCV", "Python", "ESP8266", "Robotics"]
    },
    {
      id: "fpga-elevator",
      title: "FPGA Elevator Controller",
      type: "academic",
      category: "Digital Electronics",
      shortDescription: "Programmed a functional elevator control system on a DE10-Lite FPGA using Quartus. Features priority scheduling, 7-segment display logic, and ultrasonic obstacle detection. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Designed and programmed a miniature, fully functional 8-floor elevator system using a DE10-Lite FPGA board and the Intel Quartus software. //[cite: 1]</p>
        <h3>Features & Logic</h3>
        <p>The system implements a priority-based scheduling algorithm for floor calls. It features a door-closing animation on 7-segment displays and utilizes an ultrasonic sensor to detect obstacles and prevent the doors from closing unsafely. //[cite: 1]</p>
        <h3>External Peripherals</h3>
        <p>I integrated external push buttons for floor selection and coded a custom multiplexer function based on datasheet specifications to control external LED floor indicators. //[cite: 1]</p>
      `,
      image: "images/fpga-elevator.jpg",
      gallery: [
        "images/fpga-elevator.jpg",
        "images/placeholder-4.jpg"
      ],
      tags: ["FPGA", "Quartus", "DE10-Lite", "Logic Design"]
    },
    {
      id: "pic18f-flappy",
      title: "Flappy Bird on PIC18F & NEAT AI",
      type: "academic",
      category: "Embedded Systems & AI",
      shortDescription: "Developed Flappy Bird in Assembly for a PIC18F microcontroller using IR/ultrasonic sensors and a GLCD. Trained a Python NEAT AI via UART to play the game autonomously. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a hardware-based version of Flappy Bird to learn Assembly language programming on a MikroProg PIC18F development board. //[cite: 1]</p>
        <h3>Hardware Integration</h3>
        <p>The game interfaces with an ultrasonic sensor, an IR sensor, and a digital encoder for controls. Game physics are computed on a PC via a Python script communicating with the PIC18F over USB (UART). The UI and animations are rendered on a GLCD, with high scores saved to EEPROM. //[cite: 1]</p>
        <h3>NEAT AI Implementation</h3>
        <p>I implemented a NEAT (NeuroEvolution of Augmenting Topologies) AI algorithm in Python. The AI autonomously learns to play the game by evaluating multiple parameter combinations, retaining the most successful "seeds" to achieve the highest possible score. //[cite: 1]</p>
      `,
      image: "images/pic18f-flappy.jpg",
      gallery: [
        "images/pic18f-flappy.jpg",
        "images/placeholder-5.jpg"
      ],
      tags: ["Assembly", "PIC18F", "NEAT AI", "UART"]
    },
    {
      id: "voice-trivia",
      title: "Voice Recognition Trivia Game",
      type: "academic",
      category: "Audio DSP & Machine Learning",
      shortDescription: "Created an interactive trivia game on Arduino Due. Implemented real-time FIR filtering and MFCC extraction to train a minimal neural network for word recognition. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a voice-controlled trivia game housed in a custom 3D-printed enclosure, utilizing an Arduino Due, a DFPlayer Mini for audio playback, and a microphone. //[cite: 1]</p>
        <h3>Digital Signal Processing</h3>
        <p>The system performs real-time audio sampling at 32kHz using a circular buffer due to memory constraints. The signal is processed with a FIR filter, downsampled, and analyzed using a Discrete Fourier Transform (DFT). //[cite: 1]</p>
        <h3>Machine Learning</h3>
        <p>I extracted Mel-Frequency Cepstral Coefficients (MFCC) from 50 recordings per word to train a minimal neural network. During gameplay, real-time MFCCs are compared against the trained model to validate the player's spoken answers. //[cite: 1]</p>
      `,
      image: "images/Neural_speech/1.HEIC",
      gallery: [
        "images/Neural_speech/2.HEIC",
        "images/Neural_speech/3.HEIC",
        "images/Neural_speech/4.HEIC"
      ],
      tags: ["Arduino Due", "DSP", "MFCC", "C/C++"]
    },
    {
      id: "game-of-life",
      title: "Conway's Game of Life in C",
      type: "academic",
      category: "Advanced C Programming",
      shortDescription: "Optimized a Game of Life simulation in C with strict memory constraints (64kB) and a fixed 60Hz refresh rate, utilizing multithreading and bitwise operations on uint64_t arrays. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed Conway's Game of Life in C, designed to run under strict microcontroller constraints: a maximum of 64kB memory footprint and a fixed 60Hz refresh rate. //[cite: 1]</p>
        <h3>Memory Optimization</h3>
        <p>To meet the memory limits, the grid is stored using an array of \`uint64_t\`, allowing 64 cells to be packed into a single integer. Pointer logic was heavily utilized for direct, fast memory manipulation. //[cite: 1]</p>
        <h3>Performance</h3>
        <p>The physics calculations are performed on a PC connected via USB, utilizing multithreading and configurable boundary conditions (e.g., toroidal, mirror) to maintain the required performance metrics. //[cite: 1]</p>
      `,
      image: "images/game-of-life.jpg",
      gallery: [
        "images/game-of-life.jpg",
        "images/placeholder-7.jpg"
      ],
      tags: ["C", "Multithreading", "Memory Optimization"]
    },
    {
      id: "graph-optimization",
      title: "Assembly Line Graph Optimization",
      type: "academic",
      category: "Algorithms & Graph Theory",
      shortDescription: "Developed a CLI application in C to optimize car manufacturing assembly lines based on task duration, precedence, and cycle time constraints using graph theory principles. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Applied graph theory to optimize a theoretical car manufacturing assembly line. The goal was to process tasks efficiently by representing them as a graph with weighted edges. //[cite: 1]</p>
        <h3>C Implementation</h3>
        <p>I developed a command-line interface (CLI) tool in C. The program parses task constraints (duration, precedence, exclusion) from text files and offers users multiple optimization modes, such as cycle-time limited routing or precedence-only sorting. //[cite: 1]</p>
      `,
      image: "images/graph-optimization.jpg",
      gallery: [
        "images/graph-optimization.jpg",
        "images/placeholder-8.jpg"
      ],
      tags: ["C", "Algorithms", "Graph Theory"]
    },
    {
      id: "c-games-allegro",
      title: "2D Games in C (Allegro)",
      type: "academic",
      category: "Game Development",
      shortDescription: "Programmed a maze game and a Star Wars-themed minigame collection in C using the Allegro graphics library. Implemented collisions, interactive maps, and audio settings. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed multiple 2D games from scratch using the C language and the Allegro graphics library to solidify programming fundamentals (pointers, dynamic allocation, structures). //[cite: 1]</p>
        <h3>Features</h3>
        <p>The first project was a terminal-based maze game, later upgraded with an Allegro GUI featuring custom menus and textures. The second project was a Star Wars-themed hub offering multiple minigames (e.g., Snake, Piano Tiles, Flappy Bird). I implemented collision detection, dynamic scaling, and interactive map navigation. //[cite: 1]</p>
      `,
      image: "images/c-games.jpg",
      gallery: [
        "images/c-games.jpg",
        "images/placeholder-9.jpg"
      ],
      tags: ["C", "Allegro", "Game Dev"]
    },
    {
      id: "blabla-omnes",
      title: "BlaBla-Omnes Carpooling Platform",
      type: "academic",
      category: "Full-Stack Web Development",
      shortDescription: "Developed a responsive carpooling website for students using HTML, CSS, JavaScript, and PHP, integrated with a SQL database and Google Maps API. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Created a web-based carpooling platform connecting different ECE campuses. The project covered front-end and back-end web development fundamentals. //[cite: 1]</p>
        <h3>Tech Stack</h3>
        <p>The interface was built responsively using HTML, CSS, and JavaScript, integrating the Google Maps API for route visualization. The backend relies on PHP and a SQL database to manage users and concurrent trip reservations. Advanced features included data encryption and UI animations. //[cite: 1]</p>
      `,
      image: "images/blabla-omnes.jpg",
      gallery: [
        "images/blabla-omnes.jpg",
        "images/placeholder-10.jpg"
      ],
      tags: ["PHP", "SQL", "JavaScript", "Web Dev"]
    },
    {
      id: "theme-park",
      title: "Theme Park Management App",
      type: "academic",
      category: "Software Engineering",
      shortDescription: "Built a Java application using Scene Builder for the UI and a local SQL database via the DAO pattern to manage theme park attractions and customer statistics. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a Java-based desktop application designed for theme park administration, managing attractions, customer data, and operational statistics. //[cite: 1]</p>
        <h3>Implementation</h3>
        <p>After wireframing in Figma, the GUI was constructed using JavaFX Scene Builder. Data persistence was handled via a local SQL database, utilizing the Data Access Object (DAO) design pattern for robust CRUD operations. //[cite: 1]</p>
      `,
      image: "images/theme-park-app.jpg",
      gallery: [
        "images/theme-park-app.jpg",
        "images/placeholder-11.jpg"
      ],
      tags: ["Java", "SQL", "Scene Builder"]
    },
    {
      id: "fertilyon",
      title: "FertiLyon Smart Compost Bin",
      type: "academic",
      category: "Sustainable Tech",
      shortDescription: "Concept and 3D rendering for a connected compost bin aimed at urban environments, featuring an optional mobile app with a reward system for users. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>An early academic project aimed at addressing soil depletion in Lyon. We conceptualized 'FertiLyon', a digital, connected compost bin designed for both urban and rural citizens. //[cite: 1]</p>
        <h3>Design</h3>
        <p>I produced the 3D renderings and promotional materials. The concept included a mobile application to monitor bin fill levels and gamify the experience by offering store discounts as rewards for composting. //[cite: 1]</p>
      `,
      image: "images/FertiLyon/1.png",
      gallery: [
        "images/FertiLyon/2.png",
        "images/FertiLyon/3.png",
        "images/FertiLyon/4.png"
      ],
      tags: ["Product Design", "Sustainability", "3D Rendering"]
    },

    // ---------------------------------------------------------------------------
    // PERSONAL PROJECTS
    // ---------------------------------------------------------------------------
    {
      id: "tube-amp",
      title: "Push-Pull Tube Audio Amplifier",
      type: "personal",
      category: "Analog & High Voltage",
      shortDescription: "Schematic capture and dual-layer KiCad PCB routing for a high-voltage vacuum tube amplifier (ECC83 preamp, EL34 power stage). Dielectric insulation checks and manual THT soldering. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A passionate endeavor to design and build a custom mono vacuum tube amplifier, seeking the characteristic warm audio profile of vintage gear. //[cite: 1]</p>
        <h3>Circuit Design</h3>
        <p>Utilizing 1960s schematics as a reference, I designed the circuit using three ECC83 tubes in cascade for the preamp stage, and two EL34 tubes for push-pull power amplification. //[cite: 1]</p>
        <h3>PCB & Fabrication</h3>
        <p>The design is split across two dual-layer PCBs (power/bias management and signal routing) created in KiCad. Due to high voltages, I implemented wide traces and strict dielectric isolation rules. All components were manually soldered and verified. //[cite: 1]</p>
      `,
      image: "images/tube-amp.jpg",
      gallery: [
        "images/tube-amp.jpg",
        "images/placeholder-13.jpg"
      ],
      tags: ["KiCad", "High Voltage", "Analog", "Audio"]
    },
    {
      id: "bookshelf-speakers",
      title: "Bookshelf Speakers & Active Subwoofer",
      type: "personal",
      category: "Electroacoustics & Woodworking",
      shortDescription: "Custom bass-reflex acoustic enclosure design, WinISD resonance tuning, passive 3-way crossover calculation, and internal acoustic dampening for linear frequency response. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Designed and built a complete custom 2.1 audio system from scratch, combining woodworking, 3D printing, and electroacoustics. //[cite: 1]</p>
        <h3>Bookshelf Speakers</h3>
        <p>Engineered 10-liter bass-reflex enclosures. I tuned the front port to 500Hz and the rear port to 40Hz (matching the woofer's resonant frequency) to optimize bass response. I added a 75mm midrange driver and utilized acoustic foam dampening to clarify vocals and reduce cabinet resonance. //[cite: 1]</p>
        <h3>Active Subwoofer</h3>
        <p>Modeled a 40x40x45cm bass-reflex subwoofer enclosure in SubBox Pro for a 25cm Visaton driver capable of 25Hz. It is powered by a high-efficiency Class D amplifier. //[cite: 1]</p>
      `,
      image: "images/speakers/1.jpg",
      gallery: [
        "images/speakers/2.jpg",
        "images/speakers/3.jpg",
        "images/speakers/4.jpg",
        "images/speakers/5.jpg"
      ],
      tags: ["WinISD", "Acoustics", "3D CAD", "Analog"]
    },
    {
      id: "tape-recorder",
      title: "Magnetic Tape Player Restoration",
      type: "personal",
      category: "Electronics Repair",
      shortDescription: "Restored a vintage 1970s Sony TC-270 reel-to-reel tape recorder. Replaced motor run capacitors, manufactured custom polyurethane drive belts, and re-lubricated mechanisms. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Acquired and fully restored a 1972-1976 Sony TC-270 reel-to-reel magnetic tape recorder that had been stored in an attic for decades. //[cite: 1]</p>
        <h3>Restoration Process</h3>
        <p>Diagnosed a motor stalling issue caused by a faulty AC start/run capacitor, which I replaced. I manufactured a new polyurethane drive belt to replace the degraded original, cleaned the rubber rollers with alcohol, and re-lubricated the entire mechanical assembly with lithium grease. //[cite: 1]</p>
      `,
      image: "images/tape-recorder.jpg",
      gallery: [
        "images/tape-recorder.jpg",
        "images/placeholder-15.jpg"
      ],
      tags: ["Electronics Repair", "Audio", "Mechanical"]
    },
    {
      id: "tape-reels",
      title: "Custom 3D Printed Tape Reels",
      type: "personal",
      category: "3D CAD & Printing",
      shortDescription: "Reverse-engineered and modeled iconic Sony R-7MB tape reels in Fusion 360. Printed functional replicas using high-infill PETG for durability and PLA for the smooth inner hub. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Due to the rarity of original 1970s Sony R-7MB magnetic tape reels in Europe, I decided to reverse-engineer and 3D print my own functional replicas. //[cite: 1]</p>
        <h3>Modeling & Printing</h3>
        <p>Using an existing reel for reference, I modeled the three-part assembly (two faces and a 1/4-inch hub) in Fusion 360. The outer faces were printed in PETG at 100% infill for mechanical resistance to torsion and braking forces, while the inner hub was printed in PLA to provide a perfectly smooth surface for the magnetic tape. //[cite: 1]</p>
      `,
      image: "images/Reel_to_reel/1.png",
      gallery: [
        "images/Reel_to_reel/2.png",
        "images/Reel_to_reel/3.png",
        "images/Reel_to_reel/4.png"
      ],
      tags: ["Fusion 360", "3D Printing", "PETG/PLA"]
    },

    // ---------------------------------------------------------------------------
    // FREELANCE PROJECTS (FIVERR)
    // ---------------------------------------------------------------------------
    {
      id: "fiverr-houses",
      title: "3D Architectural Replicas",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      shortDescription: "High-precision 3D mechanical modeling in Fusion 360 and SolidWorks to create 1:100 scale architectural replicas of houses, ready for FDM 3D printing. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A freelance commission to create a miniature 'village' of a client's past homes. //[cite: 1]</p>
        <h3>Modeling Process</h3>
        <p>Working from reference photos and 2D floor plans, I modeled five detailed houses at a 1:100 scale using Fusion 360. The models were specifically optimized for FDM 3D printing, ensuring wall thicknesses and overhangs were printable on the client's Creality machine. //[cite: 1]</p>
      `,
      image: "images/Fiverr_houses/1.png",
      gallery: [
        "images/Fiverr_houses/2.png",
        "images/Fiverr_houses/3.png",
        "images/Fiverr_houses/4.png",
        "images/Fiverr_houses/5.png"
      ],
      tags: ["Fusion 360", "SolidWorks", "3D Printing", "FDM"]
    },
    {
      id: "banana-speaker",
      title: "Banana-Shaped Acoustic Speaker",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      shortDescription: "Designed a custom banana-shaped speaker enclosure. Modeled internal acoustic volumes in Fusion 360 for uniform wall thickness and simulated acoustic response using WinISD. //[cite: 1]",
      longDescription: `
        <h3>Project Overview</h3>
        <p>An unconventional freelance request to design a functional, 3D-printable speaker enclosure shaped like a banana, accommodating the client's pre-selected drivers. //[cite: 1]</p>
        <h3>Acoustic Design</h3>
        <p>I sculpted the complex organic shape in Fusion 360, carefully hollowing out internal volumes to ensure uniform wall thickness for distortion-free audio. I integrated internal cable routing guides and validated the enclosure's frequency response through WinISD simulations prior to slicing the model for 3D printing. //[cite: 1]</p>
      `,
      image: "images/Banana_fiverr/3.png",
      gallery: [
        "images/Banana_fiverr/1.png",
        "images/Banana_fiverr/2.png",
        "images/Banana_fiverr/4.png"
      ],
      tags: ["Fusion 360", "Acoustics", "WinISD"]
    }
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