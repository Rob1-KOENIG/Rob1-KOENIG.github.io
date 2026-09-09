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
  // 1. DATA (Projets)
  // ---------------------------------------------------------------------------
  const projects = [
    {
      id: "formula-student",
      title: "Formula Student — CAN Bus Node",
      type: "academic",
      category: "ARECE Autonomous Racing",
      shortDescription: "Hardware design for an autonomous vehicle CAN interface: regulated power stage (7-40V to 3.3V), TVS protections, SN65 transceiver, and ESP32. Multi-node testbench validation.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>As part of the ARECE association, the objective was to develop an autonomous vehicle for the Formula Student competition. We designed a CAN bus system to interconnect vehicle components like steering and motors, replacing expensive rented equipment.</p>
        <h3>Hardware Engineering</h3>
        <p>I designed a custom PCB using KiCad. The board features an ESP32 microcontroller paired with an SN65HVD231 CAN transceiver. I also designed a regulated power supply capable of dropping 7-40V down to 3.3V, protected by TVS diodes.</p>
        <h3>Validation</h3>
        <p>The system was validated on a testbench with three interconnected nodes, analyzing the CAN frames with a CAN-Analyzer software to ensure reliable communication despite simulated voltage drops.</p>
      `,
      image: "images/ARECE/1.jpg",
      gallery: [
        "images/ARECE/1.jpg",
        "images/ARECE/2.jpg",
        "images/ARECE/3.jpg",
        "images/ARECE/4.jpg"
      ],
      tags: ["KiCad", "ESP32", "CAN Bus", "Testbench"]
    },
    {
      id: "rover-lidar",
      title: "Autonomous Rover & LIDAR Navigation",
      type: "academic",
      category: "Mobile Robotics",
      shortDescription: "Real-time 2D SLAM mapping and Nav2 autonomous obstacle avoidance with ROS 2 under Linux Ubuntu. Custom controller PCB running ESP-NOW and UART serial communication.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A year-long technical project to build an autonomous rover equipped with a LIDAR sensor, capable of 2D mapping and autonomous navigation, alongside manual control.</p>
        <h3>Software & Navigation (ROS 2)</h3>
        <p>Operating on a dual-boot Ubuntu 22 system, we utilized ROS 2 for the software stack. I configured Rviz for real-time 2D SLAM mapping and implemented the Nav2 stack for autonomous path planning and obstacle avoidance using LIDAR data.</p>
        <h3>Custom Hardware Controller</h3>
        <p>I designed a remote control PCB using KiCad (single-layer, under 8 vias). The remote uses an ATmega328P and an ESP-01S, communicating via UART with level shifters (2N7000). It sends commands to the rover via the ESP-NOW protocol.</p>
      `,
      image: "images/Technical_project/1.jpg",
      gallery: [
        "images/Technical_project/1.jpg",
        "images/Technical_project/2.JPG",
        "images/Technical_project/3.JPG",
        "images/Technical_project/10.jpg",
        "images/Technical_project/11.jpg"
      ],
      tags: ["ROS 2", "Nav2", "LIDAR", "Linux", "C++"]
    },
    {
      id: "cv-robot",
      title: "Computer Vision Sorting Robot",
      type: "academic",
      category: "Robotics & OpenCV",
      shortDescription: "Engineered an ESP8266-controlled robot relying on HTTP requests. Implemented a Python computer vision script (OpenCV) for object detection and a Pygame path-planning algorithm.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a remote-controlled robot capable of navigating a predefined map to collect colored cubes while avoiding obstacles, utilizing computer vision.</p>
        <h3>Path Planning & Vision</h3>
        <p>A Python script running on a PC handles computer vision via OpenCV to detect ArUco markers and colored cubes. A custom path-planning algorithm, built with Pygame, calculates optimal routes and collision avoidance.</p>
        <h3>Hardware & Control</h3>
        <p>The robot is controlled by an ESP8266 acting as an HTTP web server, receiving movement commands from the PC. I also designed and 3D-printed (FDM) the robot's custom chassis, cover, and a functional plow mechanism using Fusion 360.</p>
      `,
      image: "images/OPENCV_Rover/1.jpg",
      gallery: [
        "images/OPENCV_Rover/1.jpg",
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
      shortDescription: "Programmed a functional elevator control system on a DE10-Lite FPGA using Quartus. Features priority scheduling, 7-segment display logic, and ultrasonic obstacle detection.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Designed and programmed a miniature, fully functional 8-floor elevator system using a DE10-Lite FPGA board and the Intel Quartus software.</p>
        <h3>Features & Logic</h3>
        <p>The system implements a priority-based scheduling algorithm for floor calls. It features a door-closing animation on 7-segment displays and utilizes an ultrasonic sensor to detect obstacles and prevent the doors from closing unsafely.</p>
        <h3>External Peripherals</h3>
        <p>I integrated external push buttons for floor selection and coded a custom multiplexer function based on datasheet specifications to control external LED floor indicators.</p>
      `,
      image: "images/FPGA_Lift(1).png",
      gallery: [
        "images/FPGA_Lift(1).png"
      ],
      tags: ["FPGA", "Quartus", "DE10-Lite", "Logic Design"]
    },
    {
      id: "pic18f-flappy",
      title: "Flappy Bird on PIC18F & NEAT AI",
      type: "academic",
      category: "Embedded Systems & AI",
      shortDescription: "Developed Flappy Bird in Assembly for a PIC18F microcontroller using IR/ultrasonic sensors and a GLCD. Trained a Python NEAT AI via UART to play the game autonomously.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a hardware-based version of Flappy Bird to learn Assembly language programming on a MikroProg PIC18F development board.</p>
        <h3>Hardware Integration</h3>
        <p>The game interfaces with an ultrasonic sensor, an IR sensor, and a digital encoder for controls. Game physics are computed on a PC via a Python script communicating with the PIC18F over USB (UART). The UI and animations are rendered on a GLCD, with high scores saved to EEPROM.</p>
        <h3>NEAT AI Implementation</h3>
        <p>I implemented a NEAT (NeuroEvolution of Augmenting Topologies) AI algorithm in Python. The AI autonomously learns to play the game by evaluating multiple parameter combinations, retaining the most successful "seeds" to achieve the highest possible score.</p>
      `,
      image: "images/FlapicBird/1.png",
      gallery: [
        "images/FlapicBird/1.png",
        "images/FlapicBird/3.png",
        "images/FlapicBird/4.png"
      ],
      tags: ["Assembly", "PIC18F", "NEAT AI", "UART"]
    },
    {
      id: "voice-trivia",
      title: "Voice Recognition Trivia Game",
      type: "academic",
      category: "Audio DSP & Machine Learning",
      shortDescription: "Created an interactive trivia game on Arduino Due. Implemented real-time FIR filtering and MFCC extraction to train a minimal neural network for word recognition.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a voice-controlled trivia game housed in a custom 3D-printed enclosure, utilizing an Arduino Due, a DFPlayer Mini for audio playback, and a microphone.</p>
        <h3>Digital Signal Processing</h3>
        <p>The system performs real-time audio sampling at 32kHz using a circular buffer due to memory constraints. The signal is processed with a FIR filter, downsampled, and analyzed using a Discrete Fourier Transform (DFT).</p>
        <h3>Machine Learning</h3>
        <p>I extracted Mel-Frequency Cepstral Coefficients (MFCC) from 50 recordings per word to train a minimal neural network. During gameplay, real-time MFCCs are compared against the trained model to validate the player's spoken answers.</p>
      `,
      image: "images/Neural_speech/1.jpg",
      gallery: [
        "images/Neural_speech/1.jpg",
        "images/Neural_speech/2.jpg",
        "images/Neural_speech/3.jpg",
        "images/Neural_speech/4.jpg"
      ],
      tags: ["Arduino Due", "DSP", "MFCC", "C/C++"]
    },
    {
      id: "game-of-life",
      title: "Conway's Game of Life in C",
      type: "academic",
      category: "Advanced C Programming",
      shortDescription: "Optimized a Game of Life simulation in C with strict memory constraints (64kB) and a fixed 60Hz refresh rate, utilizing multithreading and bitwise operations on uint64_t arrays.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed Conway's Game of Life in C, designed to run under strict microcontroller constraints: a maximum of 64kB memory footprint and a fixed 60Hz refresh rate.</p>
        <h3>Memory Optimization</h3>
        <p>To meet the memory limits, the grid is stored using an array of \`uint64_t\`, allowing 64 cells to be packed into a single integer. Pointer logic was heavily utilized for direct, fast memory manipulation.</p>
        <h3>Performance</h3>
        <p>The physics calculations are performed on a PC connected via USB, utilizing multithreading and configurable boundary conditions (e.g., toroidal, mirror) to maintain the required performance metrics.</p>
      `,
      image: "images/Game_of_life/1.png",
      gallery: [
        "images/Game_of_life/1.png",
        "images/Game_of_life/2.png",
        "images/Game_of_life/3.png"
      ],
      tags: ["C", "Multithreading", "Memory Optimization"]
    },
    {
      id: "graph-optimization",
      title: "Assembly Line Graph Optimization",
      type: "academic",
      category: "Algorithms & Graph Theory",
      shortDescription: "Developed a CLI application in C to optimize car manufacturing assembly lines based on task duration, precedence, and cycle time constraints using graph theory principles.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Applied graph theory to optimize a theoretical car manufacturing assembly line. The goal was to process tasks efficiently by representing them as a graph with weighted edges.</p>
        <h3>C Implementation</h3>
        <p>I developed a command-line interface (CLI) tool in C. The program parses task constraints (duration, precedence, exclusion) from text files and offers users multiple optimization modes, such as cycle-time limited routing or precedence-only sorting.</p>
      `,
      image: "images/assembly_line.png",
      gallery: [
        "images/assembly_line.png"
      ],
      tags: ["C", "Algorithms", "Graph Theory"]
    },
    {
      id: "c-games-allegro",
      title: "2D Games in C (Allegro)",
      type: "academic",
      category: "Game Development",
      shortDescription: "Programmed a maze game and a Star Wars-themed minigame collection in C using the Allegro graphics library. Implemented collisions, interactive maps, and audio settings.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed multiple 2D games from scratch using the C language and the Allegro graphics library to solidify programming fundamentals (pointers, dynamic allocation, structures).</p>
        <h3>Features</h3>
        <p>The first project was a terminal-based maze game, later upgraded with an Allegro GUI featuring custom menus and textures. The second project was a Star Wars-themed hub offering multiple minigames (e.g., Snake, Piano Tiles, Flappy Bird). I implemented collision detection, dynamic scaling, and interactive map navigation.</p>
      `,
      image: "images/Allegro/1.png",
      gallery: [
        "images/Allegro/1.png",
        "images/Allegro/2.png",
        "images/Allegro/3.png",
        "images/Allegro/4.png",
        "images/Allegro/5.png"
      ],
      tags: ["C", "Allegro", "Game Dev"]
    },
    {
      id: "blabla-omnes",
      title: "BlaBla-Omnes Carpooling Platform",
      type: "academic",
      category: "Full-Stack Web Development",
      shortDescription: "Developed a responsive carpooling website for students using HTML, CSS, JavaScript, and PHP, integrated with a SQL database and Google Maps API.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Created a web-based carpooling platform connecting different ECE campuses. The project covered front-end and back-end web development fundamentals.</p>
        <h3>Tech Stack</h3>
        <p>The interface was built responsively using HTML, CSS, and JavaScript, integrating the Google Maps API for route visualization. The backend relies on PHP and a SQL database to manage users and concurrent trip reservations. Advanced features included data encryption and UI animations.</p>
      `,
      image: "images/Carpool/1.png",
      gallery: [
        "images/Carpool/1.png",
        "images/Carpool/2.png",
        "images/Carpool/3.png",
        "images/Carpool/4.png"
      ],
      tags: ["PHP", "SQL", "JavaScript", "Web Dev"]
    },
    {
      id: "theme-park",
      title: "Theme Park Management App",
      type: "academic",
      category: "Software Engineering",
      shortDescription: "Built a Java application using Scene Builder for the UI and a local SQL database via the DAO pattern to manage theme park attractions and customer statistics.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Developed a Java-based desktop application designed for theme park administration, managing attractions, customer data, and operational statistics.</p>
        <h3>Implementation</h3>
        <p>After wireframing in Figma, the GUI was constructed using JavaFX Scene Builder. Data persistence was handled via a local SQL database, utilizing the Data Access Object (DAO) design pattern for robust CRUD operations.</p>
      `,
      image: "images/theme_park/1.png",
      gallery: [
        "images/theme_park/1.png",
        "images/theme_park/2.png",
        "images/theme_park/3.png"
      ],
      tags: ["Java", "SQL", "Scene Builder"]
    },
    {
      id: "fertilyon",
      title: "FertiLyon Smart Compost Bin",
      type: "academic",
      category: "Sustainable Tech",
      shortDescription: "Concept and 3D rendering for a connected compost bin aimed at urban environments, featuring an optional mobile app with a reward system for users.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>An early academic project aimed at addressing soil depletion in Lyon. We conceptualized 'FertiLyon', a digital, connected compost bin designed for both urban and rural citizens.</p>
        <h3>Design</h3>
        <p>I produced the 3D renderings and promotional materials. The concept included a mobile application to monitor bin fill levels and gamify the experience by offering store discounts as rewards for composting.</p>
      `,
      image: "images/FertiLyon/1.png",
      gallery: [
        "images/FertiLyon/1.png",
        "images/FertiLyon/2.png",
        "images/FertiLyon/3.png",
        "images/FertiLyon/4.png"
      ],
      tags: ["Product Design", "Sustainability", "3D Rendering"]
    },
    {
      id: "tube-amp",
      title: "Push-Pull Tube Audio Amplifier",
      type: "personal",
      category: "Analog & High Voltage",
      shortDescription: "Schematic capture and dual-layer KiCad PCB routing for a high-voltage vacuum tube amplifier (ECC83 preamp, EL34 power stage). Dielectric insulation checks and manual THT soldering.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A passionate endeavor to design and build a custom mono vacuum tube amplifier, seeking the characteristic warm audio profile of vintage gear.</p>
        <h3>Circuit Design</h3>
        <p>Utilizing 1960s schematics as a reference, I designed the circuit using three ECC83 tubes in cascade for the preamp stage, and two EL34 tubes for push-pull power amplification.</p>
        <h3>PCB & Fabrication</h3>
        <p>The design is split across two dual-layer PCBs (power/bias management and signal routing) created in KiCad. Due to high voltages, I implemented wide traces and strict dielectric isolation rules. All components were manually soldered and verified.</p>
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
      shortDescription: "Custom bass-reflex acoustic enclosure design, WinISD resonance tuning, passive 3-way crossover calculation, and internal acoustic dampening for linear frequency response.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Designed and built a complete custom 2.1 audio system from scratch, combining woodworking, 3D printing, and electroacoustics.</p>
        <h3>Bookshelf Speakers</h3>
        <p>Engineered 10-liter bass-reflex enclosures. I tuned the front port to 500Hz and the rear port to 40Hz (matching the woofer's resonant frequency) to optimize bass response. I added a 75mm midrange driver and utilized acoustic foam dampening to clarify vocals and reduce cabinet resonance.</p>
        <h3>Active Subwoofer</h3>
        <p>Modeled a 40x40x45cm bass-reflex subwoofer enclosure in SubBox Pro for a 25cm Visaton driver capable of 25Hz. It is powered by a high-efficiency Class D amplifier.</p>
      `,
      image: "images/speakers/1.jpg",
      gallery: [
        "images/speakers/1.jpg",
        "images/speakers/2.jpg",
        "images/speakers/3.jpg",
        "images/speakers/4.jpg",
        "images/speakers/5.jpg"
      ],
      tags: ["WinISD", "Acoustics", "3D CAD", "Analog", "Woodworking"]
    },
    {
      id: "tape-recorder",
      title: "Magnetic Tape Player Restoration",
      type: "personal",
      category: "Electronics Repair",
      shortDescription: "Restored a vintage 1970s Sony TC-270 reel-to-reel tape recorder. Replaced motor run capacitors, manufactured custom polyurethane drive belts, and re-lubricated mechanisms.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Acquired and fully restored a 1972-1976 Sony TC-270 reel-to-reel magnetic tape recorder that had been stored in an attic for decades.</p>
        <h3>Restoration Process</h3>
        <p>Diagnosed a motor stalling issue caused by a faulty AC start/run capacitor, which I replaced. I manufactured a new polyurethane drive belt to replace the degraded original, cleaned the rubber rollers with alcohol, and re-lubricated the entire mechanical assembly with lithium grease.</p>
      `,
      image: "images/tape-recorder/1.png",
      gallery: [
        "images/tape-recorder/1.png",
        "images/tape-recorder/2.jpg",
        "images/tape-recorder/3.jpg",
        "images/tape-recorder/4.jpg",
        "images/tape-recorder/5.png"
      ],
      tags: ["Electronics Repair", "Audio", "Mechanical"]
    },
    {
      id: "tape-reels",
      title: "Custom 3D Printed Tape Reels",
      type: "personal",
      category: "3D CAD & Printing",
      shortDescription: "Reverse-engineered and modeled iconic Sony R-7MB tape reels in Fusion 360. Printed functional replicas using high-infill PETG for durability and PLA for the smooth inner hub.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Due to the rarity of original 1970s Sony R-7MB magnetic tape reels in Europe, I decided to reverse-engineer and 3D print my own functional replicas.</p>
        <h3>Modeling & Printing</h3>
        <p>Using an existing reel for reference, I modeled the three-part assembly (two faces and a 1/4-inch hub) in Fusion 360. The outer faces were printed in PETG at 100% infill for mechanical resistance to torsion and braking forces, while the inner hub was printed in PLA to provide a perfectly smooth surface for the magnetic tape.</p>
      `,
      image: "images/Reel_to_reel/1.png",
      gallery: [
        "images/Reel_to_reel/1.png",
        "images/Reel_to_reel/2.png",
        "images/Reel_to_reel/3.png",
        "images/Reel_to_reel/4.png"
      ],
      tags: ["Fusion 360", "3D Printing", "PETG/PLA"]
    },
    {
      id: "fiverr-houses",
      title: "3D Architectural Replicas",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      shortDescription: "High-precision 3D mechanical modeling in Fusion 360 and SolidWorks to create 1:100 scale architectural replicas of houses, ready for FDM 3D printing.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A freelance commission to create a miniature 'village' of a client's past homes.</p>
        <h3>Modeling Process</h3>
        <p>Working from reference photos and 2D floor plans, I modeled five detailed houses at a 1:100 scale using Fusion 360. The models were specifically optimized for FDM 3D printing, ensuring wall thicknesses and overhangs were printable on the client's Creality machine.</p>
      `,
      image: "images/Fiverr_houses/1.png",
      gallery: [
        "images/Fiverr_houses/1.png",
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
      shortDescription: "Designed a custom banana-shaped speaker enclosure. Modeled internal acoustic volumes in Fusion 360 for uniform wall thickness and simulated acoustic response using WinISD.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>An unconventional freelance request to design a functional, 3D-printable speaker enclosure shaped like a banana, accommodating the client's pre-selected drivers.</p>
        <h3>Acoustic Design</h3>
        <p>I sculpted the complex organic shape in Fusion 360, carefully hollowing out internal volumes to ensure uniform wall thickness for distortion-free audio. I integrated internal cable routing guides and validated the enclosure's frequency response through WinISD simulations prior to slicing the model for 3D printing.</p>
      `,
      image: "images/Banana_fiverr/3.png",
      gallery: [
        "images/Banana_fiverr/3.png",
        "images/Banana_fiverr/1.png",
        "images/Banana_fiverr/2.png",
        "images/Banana_fiverr/4.png"
      ],
      tags: ["Fusion 360", "Acoustics", "WinISD"]
    },
    {
      id: "portal-turret-speaker",
      title: 'Custom "Portal Turret" Wall Speaker',
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      shortDescription: "Designed multiple unique 1-way and 2-way wall-mountable speaker concepts for a client, culminating in the selection of a 'Portal Turret' inspired design.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A two-week freelance design sprint for a Fiverr client who requested out-of-the-box, highly unique concepts for wall-mountable 1-way and 2-way speaker enclosures.</p>
        <h3>Design Iterations</h3>
        <p>The goal was to break away from traditional boxy speakers. I modeled several radical aesthetic concepts in Fusion 360, ensuring that each 3D-printable geometry still respected the internal acoustic volumes and mounting constraints required for the selected audio drivers.</p>
        <h3>Final Selection</h3>
        <p>Among the various proposals, the client decided to move forward with a design heavily inspired by the iconic 'Portal Turret'. The final model seamlessly integrates the acoustic components while maintaining the required wall-mounting functionality and delivering a striking visual appeal.</p>
      `,
      image: "images/Fiverr_speaker_designs/1.png",
      gallery: [
        "images/Fiverr_speaker_designs/1.png",
        "images/Fiverr_speaker_designs/2.png",
        "images/Fiverr_speaker_designs/3.png",
        "images/Fiverr_speaker_designs/4.png",
        "images/Fiverr_speaker_designs/5.png"
      ],
      tags: ["Fusion 360", "Product Design", "Acoustics", "3D Printing"]
    },
    {
      id: "turntable-horn-cabinet",
      title: "Custom Turntable & Horn Speaker Cabinet",
      type: "freelance",
      category: "Freelance Engineering (Fiverr)",
      shortDescription: "Designed an all-in-one audio cabinet featuring a vintage-style horn tweeter, mid/bass drivers, a built-in 3-channel amplifier, and a flush-mounted modern turntable.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>A freelance commission to design a premium, all-in-one acoustic piece of furniture that seamlessly blends vintage gramophone aesthetics with modern high-fidelity audio engineering.</p>
        <h3>Acoustic & Mechanical Design</h3>
        <p>The cabinet enclosure was precisely modeled to house dedicated mid-range and bass drivers in optimized acoustic volumes. For the high frequencies, I integrated a tweeter mounted inside a classic, vintage-style horn, serving as both a visual centerpiece and an acoustic waveguide.</p>
        <h3>Hardware Integration</h3>
        <p>The top plate was custom-engineered to flush-mount a modern turntable, creating a sleek, integrated look. Additionally, the internal structure was designed to accommodate and properly ventilate a built-in 3-channel amplifier, resulting in a complete, standalone plug-and-play audio system.</p>
      `,
      image: "images/Fiverr_turntable/1.png",
      gallery: [
        "images/Fiverr_turntable/1.png",
        "images/Fiverr_turntable/2.png",
        "images/Fiverr_turntable/3.png",
        "images/Fiverr_turntable/4.png"
      ],
      tags: ["Fusion 360", "Acoustics", "Product Design", "Audio"]
    },
    {
      id: "water-rocket-fc",
      title: "Water Rocket Flight Controller",
      type: "personal",
      category: "Aerospace & Embedded Systems",
      shortDescription: "Custom 40mm circular PCB designed in KiCad to control a water rocket's parachute deployment at apogee, featuring an ESP32-C3, LiPo charging, and a BMP280 altimeter.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>I designed an ultra-compact, lightweight embedded flight controller for a custom water rocket to save space and minimize payload weight. The system actively monitors altitude and detects the rocket's apogee to automatically trigger a servo motor, unlocking the nose cone and deploying the parachute.</p>
        <h3>Hardware Engineering</h3>
        <p>The circuit was designed and routed in KiCad on a highly constrained 40mm circular PCB. It integrates an ESP32-C3-WROOM-02 microcontroller, a BMP280 barometric pressure sensor (I2C) for altitude tracking, and an onboard 1S LiPo power management system featuring USB-C charging (MCP73831) and a 3.3V LDO regulator (AP2112K). The board also provides a direct VBAT-powered 3-pin servo output, an RGB debug LED, and UART pads for programming.</p>
        <h3>PCB Routing Constraints</h3>
        <p>To ensure high reliability, specific layout constraints were strictly enforced. The BMP280 altimeter was placed at the very edge of the board, far from any heat-generating components to maintain reading accuracy. Additionally, the ESP32 antenna was positioned with a strict copper keep-out zone across all layers to ensure optimal RF performance.</p>
      `,
      image: "images/Fiverr_rocket/1.png",
      gallery: [
        "images/Fiverr_rocket/1.png",
        "images/Fiverr_rocket/2.png"
      ],
      tags: ["KiCad", "ESP32-C3", "Aerospace", "PCB Design"]
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. RENDER CARDS & FILTERS
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

  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });
  
  renderProjects('all'); // Premier rendu initial

  // ---------------------------------------------------------------------------
  // 3. MODAL LOGIC (Détail du projet & Galerie interactive)
  // ---------------------------------------------------------------------------
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  
  const mCategory = document.getElementById('modal-category');
  const mTitle = document.getElementById('modal-title');
  const mTags = document.getElementById('modal-tags');
  const mGallery = document.getElementById('modal-gallery');
  const mText = document.getElementById('modal-text');

  let currentGallery = [];
  let currentImageIndex = 0;

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

        // Préparation de la galerie
        currentGallery = project.gallery || [project.image];
        currentImageIndex = 0;
        
        let galleryHtml = '';

        if (currentGallery.length > 1) {
          galleryHtml = `
            <div class="gallery-main">
              <button class="gallery-nav prev" id="gallery-prev">❮</button>
              <img src="${currentGallery[0]}" id="gallery-main-img" alt="${project.title}">
              <button class="gallery-nav next" id="gallery-next">❯</button>
            </div>
            <div class="gallery-thumbnails" id="gallery-thumbnails">
              ${currentGallery.map((src, idx) => `
                <img src="${src}" class="thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}" alt="Miniature ${idx + 1}">
              `).join('')}
            </div>
          `;
        } else {
          galleryHtml = `
            <div class="gallery-main">
              <img src="${currentGallery[0]}" id="gallery-main-img" alt="${project.title}">
            </div>
          `;
        }

        mGallery.innerHTML = galleryHtml;

        // Événements de navigation de la galerie
        if (currentGallery.length > 1) {
          const mainImg = document.getElementById('gallery-main-img');
          const prevBtn = document.getElementById('gallery-prev');
          const nextBtn = document.getElementById('gallery-next');
          const thumbs = mGallery.querySelectorAll('.thumb');

          const updateGalleryView = (index) => {
            currentImageIndex = index;
            mainImg.src = currentGallery[currentImageIndex];
            thumbs.forEach((t, i) => {
              if (i === currentImageIndex) t.classList.add('active');
              else t.classList.remove('active');
            });
          };

          prevBtn.addEventListener('click', () => {
            let newIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
            updateGalleryView(newIndex);
          });

          nextBtn.addEventListener('click', () => {
            let newIndex = (currentImageIndex + 1) % currentGallery.length;
            updateGalleryView(newIndex);
          });

          thumbs.forEach(thumb => {
            thumb.addEventListener('click', (ev) => {
              updateGalleryView(parseInt(ev.target.getAttribute('data-index')));
            });
          });
        }

        // Afficher la modale
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
  
  modal.addEventListener('click', (e) => {
    // Si on clique sur le fond flouté, ça ferme la modale
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    
    // Navigation clavier pour la galerie
    if (modal.classList.contains('active') && currentGallery.length > 1) {
      if (e.key === 'ArrowLeft') document.getElementById('gallery-prev').click();
      if (e.key === 'ArrowRight') document.getElementById('gallery-next').click();
    }
  });
});