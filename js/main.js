document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // CORRECTIF "DOUBLE TAP" SUR SAFARI iOS
  // ---------------------------------------------------------------------------
  // Sur iOS Safari, quand un élément cliquable a un ancêtre avec une règle
  // :hover (ici .card:hover, qui gère l'effet de survol des cartes projet)
  // et que le clic est en fait géré par un ancêtre différent (ici la
  // délégation d'événement sur #projects-container), le premier tap ne fait
  // que "simuler" le survol et le clic ne part réellement qu'au second tap.
  // C'est ce qui donnait cette impression qu'il fallait taper deux fois, et
  // que ça mettait du temps à réagir (le premier tap semblait ne rien
  // faire). Le correctif standard : un simple listener touchstart, même
  // vide, suffit à faire disparaître ce comportement.
  document.addEventListener('touchstart', () => {}, { passive: true });


  // ---------------------------------------------------------------------------
  // THEME TOGGLE ENGINE
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  // FIX: le CSS stylise ce bouton via la classe .fab-theme (position fixe,
  // cercle, ombre...). On s'assure qu'elle est bien présente même si le HTML
  // ne l'a pas mise sur l'élément #theme-toggle.
  themeToggleBtn?.classList.add('fab-theme');

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
      shortDescription: "Custom CAN bus board for ARECE's Formula Student car, replacing a costly rented sensor rig. Regulated 7-40V→3.3V power stage, ESP32 with onboard CAN controller, and a 3-node testbench validation.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>ARECE (Autonomous Racing ECE) builds a 100%-autonomous car for the Formula Student competition — track runs, slalom, acceleration tests. Previously, the team rented an external chassis and bolted a sensor plate onto it during competition week, which was expensive and left little time for testing. To interconnect components like the steering, battery, and motors, I designed a custom CAN bus board.</p>
        <h3>Hardware Engineering</h3>
        <p>The board is built around an ESP32, which already integrates a CAN controller (TWAI) — so only an external CAN transceiver was needed, chosen for its price, footprint, and ease of integration. The circuit splits into two sections: a power stage regulating a 7-40V input down to 3.3V, and a communication section combining the microcontroller, transceiver, and input filtering.</p>
        <h3>Validation</h3>
        <p>I validated the design on a 3-board testbench, using CAN-Analyzer software to inspect the frames exchanged between all three nodes and confirm reliable communication. The power stage was also stress-tested under simulated micro-cutouts, voltage spikes, and voltage drops.</p>
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
      shortDescription: "Year-long 3-person 'Technical Project': a dual-core ESP32 rover with real-time 2D SLAM (Rviz) and Nav2 autonomous navigation under Ubuntu 22, plus a custom ESP-NOW remote built around a single-layer KiCad PCB.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>During our first majeure year, our 3-person team spent a full year building a remote and the software for autonomous, LIDAR-based navigation of a rover — alongside manual control.</p>
        <h3>Milestone 1 — Breadboard & Remote</h3>
        <p>We prototyped the remote's circuit on a breadboard. In parallel, a dual-core ESP32 fitted with an OKDO LIDAR logged and displayed range data on a custom Pygame GUI on one core, while the second core handled incoming remote commands. Manual control ran over ESP-NOW, with the remote built around an ATmega328P and an ESP-01S talking over UART through two 2N7000 level shifters (5V ↔ 3.3V).</p>
        <h3>Milestone 2 — PCB in KiCad</h3>
        <p>We then designed the remote's schematic and routed it as a single-layer PCB using under 8 vias, sourcing external symbol libraries in KiCad for components missing from the default set.</p>
        <h3>Milestone 3 — ROS 2 Autonomy</h3>
        <p>For the second semester, we set up a dual-boot Ubuntu 22 system to run ROS 2: Rviz for real-time 2D SLAM mapping, and Nav2 for autonomous path planning and obstacle avoidance. I wrote a custom ROS 2 node publishing to the <code>/cmd_vel</code> topic so Nav2 could drive the rover directly toward any point selected on the saved map.</p>
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
      shortDescription: "Year-long 6-person milestone project: an ESP8266 robot that collects colored cubes on a game board using OpenCV vision, a custom Pygame path-planner, and a fully redesigned 3D-printed chassis and plow.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>In our second year, a 6-person team spent the full school year on a milestone-driven project: build a robot, remote-controlled via computer vision, able to navigate a predefined board, collect colored cubes, and avoid obstacles.</p>
        <h3>Path Planning & Vision</h3>
        <p>We were given a kit with a chassis, an ESP8266, and a motor shield, but chose to keep only the chassis and electronics — everything else was redesigned and 3D-printed. On the PC side, a Python script uses OpenCV for object detection and a custom path-planning algorithm, built with Pygame, that prioritizes grabbing the highest-value cubes first and calculates collision-free routes to the drop zone.</p>
        <h3>Hardware & Control</h3>
        <p>The ESP8266 runs as an HTTP server on a laptop's shared connection, executing movement commands sent from the PC. I designed and 3D-printed the robot's chassis fixtures, body, and cover in Fusion 360, plus a snow-plow-style scoop to push cubes into the deposit zone — a part I iterated on after the first version proved too small to hold the cubes reliably.</p>
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
      shortDescription: "A fully working miniature 8-floor elevator programmed on a DE10-Lite FPGA in Quartus: priority call scheduling, ultrasonic door-safety detection, 7-segment displays, and 8 external floor buttons.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>FPGA programming was one of the languages introduced during our engineering cycle at ECE. A FPGA (Field-Programmable Gate Array) is an integrated circuit that can be programmed after manufacturing to implement specific logic functions — our assignment was to build a fully functional, if miniature, elevator on a DE10-Lite board using Quartus (Intel).</p>
        <h3>Features & Logic</h3>
        <p>The elevator handles call priority like a real one: if floor 4 is called and then floor 5, it serves 4 first before heading to 5. A door-closing animation runs on the 7-segment displays, and an ultrasonic sensor blocks the doors from closing if it detects an obstacle between them. A second 7-segment display shows the current floor, and a buzzer beeps on arrival — just like the real thing.</p>
        <h3>External Peripherals</h3>
        <p>Beyond the board's own switches, I added external push buttons for floor selection — these needed their own debounce/timeout logic, since the elevator has to run fully autonomously and give riders time to get in and out. I also wired external LED floor indicators driven by a multiplexer, whose control function I coded directly from the multiplexer's datasheet.</p>
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
      shortDescription: "A 5-student team's take on learning Assembly: Flappy Bird running on a PIC18F (MikroProg board) with ultrasonic/IR bird control, GLCD rendering, EEPROM history — plus a NEAT AI trained to master it.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>To get hands-on with Assembly language, our 5-person team built a hardware version of Flappy Bird on a MikroProg PIC18F development board, with a fixed spec sheet: an ultrasonic sensor and an IR sensor for bird control, a digital encoder for speed/menu navigation, physical buttons for menu input, a 7-segment display for the score, and a GLCD for the game's UI and animations.</p>
        <h3>Hardware Integration</h3>
        <p>The PIC18F's limited compute power meant the game physics had to run on a PC, via a Python script talking to the chip over USB. The board itself handles rendering — GLCD textures for the game, 7-segment digits and button registers for the score and menu navigation — and stores play history directly in its onboard EEPROM so a previous game can be replayed. External libraries handle the raw sensor readings from the ultrasonic and IR modules.</p>
        <h3>NEAT AI Implementation</h3>
        <p>To push the project further, I implemented a NEAT (NeuroEvolution of Augmenting Topologies) algorithm in Python to teach a minimal AI to play. It tries a wide range of parameter combinations, keeps the best-performing "seed," and keeps refining it — once a threshold (generations, attempts, or time) is reached, it prints the best parameters found straight to the console.</p>
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
      shortDescription: "The most ambitious electronics project of our degree: a voice-controlled trivia speaker in a 3D-printed case, with real-time FIR/DFT filtering and MFCC extraction feeding a minimal neural network.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Our final electronics project was arguably the most polished of the whole degree: an interactive speaker that plays a general-knowledge trivia game via voice recognition. It runs on an Arduino Due, a DFPlayer Mini for audio playback, a microphone, two speakers, and an answer button, all housed in a custom 3D-printed enclosure. On power-up, a jingle plays from the DF Player's SD card, a question is read aloud, and the game waits for a button press before recording the spoken answer.</p>
        <h3>Digital Signal Processing</h3>
        <p>Because of memory limits, incoming audio is captured through a circular buffer that frees memory as it's consumed. The signal is then sampled and filtered with a FIR filter, analyzed with a Discrete Fourier Transform (DFT), and converted into Mel-Frequency Cepstral Coefficients (MFCC) — a compact representation of which frequencies are present and how strongly.</p>
        <h3>Machine Learning</h3>
        <p>To teach the game to recognize each word, we recorded 50 samples per word and extracted their MFCC coefficients to train a minimal neural network. During play, the MFCCs from the live recording are compared against the trained model to validate the spoken answer. The final game holds about ten questions, expandable further — the only real limit is the SD card's capacity.</p>
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
      shortDescription: "A 2-person 'Advanced C' assignment: Conway's Game of Life under strict microcontroller-style constraints — 64kB memory cap, fixed 60Hz refresh, multithreading, and multiple boundary modes.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Our Advanced C course built on first- and second-year fundamentals with topics like code optimization, advanced memory management, function pointers, and compiling with gcc under Cygwin. In pairs, we implemented Conway's Game of Life — the 1970 cellular automaton in which each cell's next state depends on how many of its neighbors are alive — under real technical constraints, as if it were meant to run on a microcontroller.</p>
        <h3>Memory Optimization</h3>
        <p>The constraints: 64kB of memory to store the grid, a fixed 60Hz refresh rate, mandatory multithreading, and support for multiple boundary modes (borderless, cells dying past the edge, wrap-around/toroidal). To fit the memory budget, the grid is stored as an array of <code>uint64_t</code>, packing 64 cells into a single integer, with direct pointer manipulation used to read and flip individual cells efficiently.</p>
        <h3>Performance</h3>
        <p>The simulation's physics run on a PC connected to the board over USB, with multithreading used to keep the fixed 60Hz refresh rate regardless of which boundary mode is active.</p>
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
      shortDescription: "A 4-student graph-theory assignment: a C command-line tool that optimizes a car assembly line, offering duration-only, precedence-only, and combined duration+precedence+max-cycle-time modes.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>In the first semester of our second engineering year, we studied graph theory — how a set of tasks or actions can be optimized by representing them as a graph with weighted edges. To put that into practice, our 4-person team built a tool to optimize the manufacturing process of a car on an assembly line.</p>
        <h3>C Implementation</h3>
        <p>The result is a command-line tool in C that loads each task's duration and precedence constraints from text files, then runs one of three optimization modes: by duration alone (ignoring task order), by precedence alone (ignoring duration), or a combined mode that accounts for order, duration, and a maximum total cycle time. On each run, the program greets the user, asks which mode to apply, runs the chosen optimization function, and offers to run another mode straight after.</p>
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
      shortDescription: "Two 4-student C projects to cement fundamentals: a CLI maze board game later upgraded with an Allegro GUI, then a full Star Wars-themed hub of 8 minigames with a 2-player scoring system and interactive map.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Two separate first-year projects, both in groups of four, built to solidify C fundamentals — pointers, malloc/calloc, structures — while learning the Allegro graphics library.</p>
        <h3>Maze Game</h3>
        <p>The first project was a fully playable maze board game, originally built for the command line. We later gave it an Allegro GUI with custom menus and textures — all hand-drawn by a teammate — plus a poster I designed in Illustrator.</p>
        <h3>Star Wars Minigame Hub</h3>
        <p>The brief for the second project was to build at least three minigames from a given list (duck hunt, balloon shooting, Piano Tiles, Snake, Crossy Road) inside a single 2D game made with Allegro. We went further and built a Star Wars-themed hub with eight minigames — those plus Flappy Bird, Geometry Dash, and an original concept we called "Head Jedi." Players move across an interactive map with a minimap and collision detection to reach each minigame's building, choose a username and audio settings, and compete two-player: first to five round wins takes the match.</p>
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
      shortDescription: "A second-year web dev assignment: a responsive carpooling site connecting ECE's campuses, with a PHP/SQL backend handling concurrent bookings and an optional Google Maps integration for routes.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Our second year introduced web programming languages — HTML, JavaScript, CSS, and PHP. To put them into practice, our team was assigned a project to build a carpooling website connecting ECE's different campuses.</p>
        <h3>Tech Stack</h3>
        <p>The site needed to support several users viewing and booking the same rides at once, which meant implementing a SQL database on the backend. It also had to be fully responsive, adapting its interface to any screen size. Beyond the core brief, optional extensions were on the table for those who wanted to go further: UI animations, a Google Maps integration for route visualization, and stronger data encryption — all of which we implemented.</p>
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
      shortDescription: "A third-year Java application for theme park administration — attractions, customers, and stats — wireframed in Figma, built with JavaFX Scene Builder on a local SQL database via the DAO pattern.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Our third year introduced Java programming. To put it to use, our team picked a project from a list of subjects and chose to build a management application for a theme park, covering attractions, customers, and operational statistics.</p>
        <h3>Implementation</h3>
        <p>We started by wireframing the interface in Figma to settle on a direction before building anything, then translated that layout into a working GUI with JavaFX Scene Builder. For data persistence, we set up a SQL database hosted locally and accessed it through the DAO (Data Access Object) design pattern, giving us clean, structured create/read/update/delete operations on attractions and customer records.</p>
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
      shortDescription: "A first-year, 6-student, year-long project tackling Lyon's soil depletion: 'FertiLyon,' a connected compost bin concept with a fill-level tracking app and a reward system for partner store discounts.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>In my first year at ECE Lyon, our 6-person team spent the school year tackling the question: how do we fight the depletion of Lyon's soils? We answered with 'FertiLyon,' a connected, digital compost bin designed for every citizen, in the city or in rural areas.</p>
        <h3>Design</h3>
        <p>To stay modern and sustainable, we designed a connected compost bin paired with an optional app letting users check each bin's fill level. To encourage people to actually compost their organic waste, the app also included a reward system, offering discounts at partner stores for regular use. I produced the 3D renderings and promotional poster. The concept caught the jury's attention for its originality and relevance, though they flagged the considerable budget a city-wide rollout would require.</p>
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
      shortDescription: "An ongoing project since August 2024: a mono push-pull tube amplifier with 3 ECC83 preamp tubes and 2 EL34 power tubes, schematics and PCBs built in KiCad from 1960s hobbyist references.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Tube amps are technically outclassed on raw power by transistor amps, but audiophiles still chase their characteristic sound — and after building speakers and restoring vintage audio gear, actually building one myself felt like the natural next step. I started in August 2024 on a mono design using 5 tubes: three ECC83s in cascade for the preamp stage, and two EL34s for push-pull power amplification.</p>
        <h3>Circuit Design</h3>
        <p>I based the schematic on 1960s hobbyist literature detailing tube amp design and wiring, and laid it out in KiCad across three sheets: power supply, preamp stage, and power amplification stage.</p>
        <h3>PCB & Fabrication</h3>
        <p>The build splits across two PCBs — one handling tube heater and bias power, the other carrying the resistors, capacitors, and connectors that wire the tubes together — both routed as 2-layer boards with wide traces and strong isolation given the high voltages involved. Every component was hand-soldered. The project is currently in its verification phase, ahead of building a protective enclosure.</p>
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
      shortDescription: "A self-taught 2.1 system built over a year (2021-2022) from salvaged drivers: iterated bass-reflex bookshelf enclosures tuned by ear, a 25Hz Visaton subwoofer modeled in SubBox Pro, and matched amplification.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>This project means a lot to me — it pulls together several of my interests at once: audio, woodworking, 3D printing, electronics, and 3D design. It started in June 2021 when I came into a stash of salvaged woofers and tweeters and began researching existing designs online. Given the size of the woofer's low end, I settled on a bookshelf format — compact enough to sit on furniture I already owned.</p>
        <h3>Bookshelf Speakers</h3>
        <p>The woofer's optimal enclosure volume was 10L, built as a bass-reflex box (a tuned port that reinforces bass at a set frequency), while the sealed tweeter needed no cabinet of its own. My first prototype had a single, uncalibrated rear port that left the low end imprecise, and no midrange driver, which left vocals sounding dull next to very present highs. I revised the design with a front port tuned by ear to 500Hz, moved the rear port in phase with the woofer's cone and tuned it to 40Hz — the woofer's own resonant frequency — and added a 75mm midrange driver (250–2000Hz) to bring vocal clarity back. I also lined the cabinet walls with acoustic foam and filled the remaining volume with acoustic wool to tame internal resonance and clean up the bass.</p>
        <h3>Amplification & Active Subwoofer</h3>
        <p>I paired the 6-ohm speakers with a Class-A amplifier for its warm, low-distortion sound and strong damping factor — specifically an Onkyo rated at 250W per channel into 6 ohms — for well-controlled bass at high dynamic headroom. Between December 2021 and February 2022, I extended the system with an active subwoofer built around a 25cm Visaton W250 driver, reaching down to 25Hz. I modeled and tuned a 40x40x45cm bass-reflex enclosure for it in SubBox Pro, powered by an efficient Class-D amplifier.</p>
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
      shortDescription: "A 4-month restoration (Jan-Apr 2024) of a Sony TC-270 (1972-1976) left in an attic for decades: diagnosed a failed AC start capacitor, recast a polyurethane drive belt, and relubricated the full mechanism.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Having always been drawn to audio gear, I decided to pick up a reel-to-reel tape recorder — and to make the find more interesting, one that needed real work: a Sony TC-270 (1972-1976), left in an attic for decades. It's a consumer two-head deck (one for erasing, one for record/playback) with a built-in amp and preamp, letting it drive speakers directly without any external gear — an option sold separately at the time.</p>
        <h3>How Reel-to-Reel Works</h3>
        <p>Before touching anything, I studied the mechanism: tape runs from a supply reel to a take-up reel via a flywheel and capstan system, which stabilizes playback speed and prevents the AC motor's speed variation from distorting the sound. This deck's heads record two tracks at once, i.e. stereo left and right channels simultaneously.</p>
        <h3>Diagnosis & Restoration</h3>
        <p>With no tape loaded, the motor, reel supports, capstans, and flywheel all worked fine. But once a tape went in, the motor struggled hard to drive the reel and stalled while vibrating heavily. That traced back to a failed AC start/run capacitor — needed to phase-shift the AC motor's supply — which I replaced with an equivalent part. From there, I moved to a full mechanical clean-up: the belt was completely slack, so I cast a replacement in polyurethane; the rubber rollers were still in good shape and just needed a wipe with 90° alcohol. I then fully disassembled the mechanism, stripped the old grease, and relubricated every moving part with lithium grease.</p>
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
      shortDescription: "Two months (Jul-Aug 2024) reverse-engineering the nearly-impossible-to-find Sony R-7MB reel in Fusion 360, then 3D printing functional replicas: 100%-infill PETG faces and a smooth PLA hub.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>Right after restoring my tape recorder, I turned to reproducing its reels — inspired by the original 1970s Sony R-7MB, a now-iconic reel that's extremely rare, especially in Europe. I used a reel I already owned as a reference to get exact measurements: diameter, hub bore, and so on. The reel breaks down into three parts — two faces and an inner hub — held together with screws.</p>
        <h3>Modeling & Printing</h3>
        <p>I modeled all three parts in Fusion 360: sketching the outer profile first, checking dimensions and printability as I went, then extruding it while respecting a maximum wall thickness so the tape wouldn't rub against the sides. The central hub needed to be precise enough to seat standard 1/4-inch (6.35mm) tape — mine ended up at 11mm (0.45in). Everything was printed at a 0.1mm layer height for the smoothest possible finish: the faces in PETG at 100% infill for torsion resistance (rewinding, braking, handling), and the hub in PLA, chosen mainly for its smooth, matte finish that's kinder to the tape.</p>
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
      shortDescription: "A Fiverr commission (Aug-Nov 2025): modeling a client's past homes at 1:100 scale in Fusion 360 from photos and floor plans, optimized for FDM printing on the client's own Creality printer.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>One of my more recent Fiverr commissions: recreating every house a client had lived in, to build a kind of miniature village of their past homes. The client supplied detailed photos and floor plans for each house so I could reproduce them at 1:100 scale.</p>
        <h3>Modeling Process</h3>
        <p>I modeled each house in Fusion 360, working directly from the reference photos and plans. So far I've completed five houses, all optimized for FDM printing — keeping wall thicknesses and overhangs within what the client's Creality printer could reliably produce, since they handled the printing themselves.</p>
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
      shortDescription: "An offbeat Fiverr brief since August 2025: a fully 3D-printable banana-shaped speaker enclosure sculpted in Fusion 360 around the client's chosen drivers, with acoustic response validated in WinISD.",
      longDescription: `
        <h3>Project Overview</h3>
        <p>One of the more offbeat requests I've taken on Fiverr: a speaker enclosure shaped like a banana. The client had already picked out the drivers and set a maximum footprint, so the job was purely about making the shape work acoustically and mechanically.</p>
        <h3>Acoustic Design</h3>
        <p>I sculpted the banana form in Fusion 360, hollowing out internal volumes for each driver with a uniform wall thickness to keep the sound clean and distortion-free. I added internal guides for cable routing, then ran a WinISD simulation of the enclosure's frequency response before slicing the model for 3D printing.</p>
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
      type: "freelance",
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

  // ============================================================================
  // 2. RENDER CARDS & FILTERS
  // ============================================================================

  const container = document.getElementById('projects-container');

  const placeholderSvg = `data:image/svg+xml;utf8,
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="%23111111"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        fill="%23ffffff" font-size="24" font-family="Arial">
    Image unavailable
  </text>
</svg>
`;

  // -----------------------------------------------------------------------------
  // Création de toutes les cartes
  // -----------------------------------------------------------------------------

  projects.forEach((project) => {
    const card = document.createElement('article');

    card.className = 'card';
    card.setAttribute('data-type', project.type);

    const tagsHtml = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join('');

    card.innerHTML = `
      <div
        class="card-img-wrapper"
        data-id="${project.id}"
      >
        <img
          class="card-img"
          src="${project.image}"
          alt="${project.title}"
          loading="lazy"
        >
      </div>

      <div class="card-content">
        <span class="card-category">
          ${project.category}
        </span>

        <h3 class="card-title">
          ${project.title}
        </h3>

        <p class="card-description">
          ${project.shortDescription}
        </p>

        <div class="card-tags">
          ${tagsHtml}
        </div>
      </div>
    `;

    // Image de remplacement en cas d'erreur
    const imgElement = card.querySelector('.card-img');

    imgElement.addEventListener('error', () => {
      imgElement.src = placeholderSvg;
    });

    container.appendChild(card);
  });

  // -----------------------------------------------------------------------------
  // Filtrage des projets
  // -----------------------------------------------------------------------------

  function renderProjects(filter = 'all') {
    const allCards = container.querySelectorAll('.card');

    allCards.forEach((card) => {
      const cardType = card.getAttribute('data-type');

      if (filter === 'all' || cardType === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // -----------------------------------------------------------------------------
  // Boutons de filtre
  // -----------------------------------------------------------------------------

  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
      });

      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      renderProjects(filter);

      // Relance l'animation après filtrage
      // FIX: ce setTimeout unique suffit — il y avait un second listener
      // identique plus bas dans le fichier qui déclenchait initScrollReveal()
      // deux fois à chaque clic. Il a été supprimé.
      setTimeout(initScrollReveal, 50);
    });
  });

  // Affichage initial
  renderProjects('all');


  // ============================================================================
  // 3. MODAL LOGIC
  // ============================================================================

  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');

  const mCategory = document.getElementById('modal-category');
  const mTitle = document.getElementById('modal-title');
  const mTags = document.getElementById('modal-tags');
  const mGallery = document.getElementById('modal-gallery');
  const mText = document.getElementById('modal-text');

  // FIX PRINCIPAL — incohérence avec le CSS :
  // Le style.css cible ces éléments par CLASSE (.modal-overlay, .modal-close,
  // .modal-category, .modal-title, .modal-gallery, .modal-text ...) alors que
  // le JS ne les récupère que par ID. Si le HTML ne portait pas déjà ces
  // classes en plus des id, la modale n'était ni positionnée/centrée
  // (.modal-overlay.active), ni les titres (.modal-close, .modal-category,
  // .modal-title, .modal-gallery), ni surtout le texte des détails
  // techniques (.modal-text h3 / p / ul, qui donnent la couleur et les
  // marges) qui restait invisible ou mal formaté sur fond sombre.
  // On force ces classes ici pour garantir que le CSS s'applique quoi qu'il
  // arrive côté HTML.
  modal?.classList.add('modal-overlay');
  modalClose?.classList.add('modal-close');
  mCategory?.classList.add('modal-category');
  mTitle?.classList.add('modal-title');
  mGallery?.classList.add('modal-gallery');
  mText?.classList.add('modal-text');

  let currentGallery = [];
  let currentImageIndex = 0;
  let descResizeObserver = null;

  // ---------------------------------------------------------------------------
  // Verrouillage du scroll de fond, compatible iOS
  // ---------------------------------------------------------------------------
  // "overflow: hidden" sur le body ne suffit pas sur iOS Safari : la page
  // continue de "rebondir" et de défiler derrière la modale, ce qui donnait
  // cette impression de navigation peu fluide sur mobile. La technique
  // fiable consiste à figer le body en position fixe à sa position de
  // scroll actuelle, puis à la restaurer à la fermeture.
  let savedScrollY = 0;

  const lockBodyScroll = () => {
    savedScrollY = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = `-${savedScrollY}px`;
  };

  const unlockBodyScroll = () => {
    document.body.classList.remove('modal-open');
    document.body.style.top = '';
    window.scrollTo(0, savedScrollY);
  };


  // -----------------------------------------------------------------------------
  // Ouverture de la modal
  // -----------------------------------------------------------------------------

  container.addEventListener('click', (event) => {
    const wrapper = event.target.closest('.card-img-wrapper');

    if (!wrapper) {
      return;
    }

    const projectId = wrapper.getAttribute('data-id');

    const project = projects.find(
      (project) => String(project.id) === String(projectId)
    );

    if (!project) {
      return;
    }

    // ---------------------------------------------------------------------------
    // Informations principales
    // ---------------------------------------------------------------------------

    mCategory.textContent = project.category;
    mTitle.textContent = project.title;

    mTags.innerHTML = project.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join('');


    // ---------------------------------------------------------------------------
    // Texte : description courte + description détaillée
    // (deux panneaux empilés, basculés avec un effet de balayage vers le haut)
    // ---------------------------------------------------------------------------

    mText.innerHTML = `
      <div class="desc-swap" id="desc-swap">
        <div class="desc-panel desc-panel-short" id="desc-panel-short">
          <p class="modal-short-desc">
            ${project.shortDescription}
          </p>

          <button
            type="button"
            class="modal-expand-btn"
            id="modal-expand-btn"
          >
            <span>Voir les détails techniques</span>
            <span class="chevron" aria-hidden="true">↑</span>
          </button>
        </div>

        <div class="desc-panel desc-panel-detailed" id="desc-panel-detailed">
          <button
            type="button"
            class="modal-collapse-btn"
            id="modal-collapse-btn"
          >
            <span>← Retour à l'aperçu</span>
          </button>

          <div class="modal-detailed-content">
            ${project.longDescription}
          </div>
        </div>
      </div>
    `;


    // ---------------------------------------------------------------------------
    // Logique du balayage courte <-> détaillée
    // ---------------------------------------------------------------------------

    const descSwap = document.getElementById('desc-swap');
    const panelShort = document.getElementById('desc-panel-short');
    const panelDetailed = document.getElementById('desc-panel-detailed');
    const expandBtn = document.getElementById('modal-expand-btn');
    const collapseBtn = document.getElementById('modal-collapse-btn');

    // Le conteneur .desc-swap anime sa propre hauteur pour accompagner le
    // panneau actif (les deux panneaux sont en position absolute — nécessaire
    // pour l'effet de balayage — donc le conteneur ne connaît pas
    // naturellement sa hauteur : on la calcule nous-mêmes à partir du
    // panneau qui doit être visible).
    //
    // On utilise un ResizeObserver plutôt qu'une mesure ponctuelle : il se
    // redéclenche automatiquement à CHAQUE changement de taille du panneau
    // actif, quelle qu'en soit la cause (police custom qui finit de charger,
    // redimensionnement de la fenêtre, texte plus long sur un autre projet,
    // etc.). C'est ce qui garantit que le bas du contenu ne soit plus jamais
    // rogné, sans avoir à gérer chaque cas à la main.
    let activeDescPanel = panelShort;

    // On coupe l'observateur du projet précédemment ouvert : sinon, à
    // chaque nouveau projet, on en accumulerait un nouveau pour rien.
    descResizeObserver?.disconnect();

    descResizeObserver = new ResizeObserver(() => {
      descSwap.style.height = `${activeDescPanel.scrollHeight}px`;
    });

    descResizeObserver.observe(panelShort);
    descResizeObserver.observe(panelDetailed);

    expandBtn.addEventListener('click', () => {
      descSwap.classList.add('is-detailed');
      activeDescPanel = panelDetailed;
      descSwap.style.height = `${panelDetailed.scrollHeight}px`;
    });

    collapseBtn.addEventListener('click', () => {
      descSwap.classList.remove('is-detailed');
      activeDescPanel = panelShort;
      descSwap.style.height = `${panelShort.scrollHeight}px`;
    });


    // ---------------------------------------------------------------------------
    // Préparation de la galerie
    // ---------------------------------------------------------------------------

    currentGallery = project.gallery?.length
      ? project.gallery
      : [project.image];

    currentImageIndex = 0;

    let galleryHtml = '';


    // ---------------------------------------------------------------------------
    // Galerie avec plusieurs images
    // ---------------------------------------------------------------------------

    if (currentGallery.length > 1) {
      galleryHtml = `
        <div class="gallery-main">
          <button
            type="button"
            class="gallery-arrow gallery-prev"
            id="gallery-prev"
            aria-label="Previous image"
          >
            ❮
          </button>

          <img
            id="gallery-main-img"
            src="${currentGallery[0]}"
            alt="${project.title}"
          >

          <button
            type="button"
            class="gallery-arrow gallery-next"
            id="gallery-next"
            aria-label="Next image"
          >
            ❯
          </button>
        </div>

        <span class="gallery-counter" id="gallery-counter">1 / ${currentGallery.length}</span>

        <div class="gallery-thumbnails">
          ${currentGallery
            .map(
              (src, index) => `
                <button
                  type="button"
                  class="thumb ${index === 0 ? 'active' : ''}"
                  data-index="${index}"
                >
                  <img
                    src="${src}"
                    alt="${project.title} - image ${index + 1}"
                  >
                </button>
              `
            )
            .join('')}
        </div>
      `;
    }

    // ---------------------------------------------------------------------------
    // Galerie avec une seule image
    // ---------------------------------------------------------------------------

    else {
      galleryHtml = `
        <div class="gallery-single">
          <img
            id="gallery-main-img"
            src="${currentGallery[0]}"
            alt="${project.title}"
          >
        </div>
      `;
    }


    // Injection de la galerie
    mGallery.innerHTML = galleryHtml;


    // ---------------------------------------------------------------------------
    // Gestion de la galerie
    // ---------------------------------------------------------------------------

    if (currentGallery.length > 1) {
      const mainImg = document.getElementById('gallery-main-img');
      const prevBtn = document.getElementById('gallery-prev');
      const nextBtn = document.getElementById('gallery-next');
      const thumbs = mGallery.querySelectorAll('.thumb');
      const counter = document.getElementById('gallery-counter');

      const updateGalleryView = (index) => {
        currentImageIndex = index;

        // Petit fondu enchaîné pour que le changement d'image soit visuellement
        // doux plutôt qu'un remplacement instantané (surtout perceptible sur
        // mobile où l'on navigue vite entre les photos).
        mainImg.style.opacity = '0';
        window.setTimeout(() => {
          mainImg.src = currentGallery[currentImageIndex];
          mainImg.style.opacity = '1';
        }, 120);

        if (counter) {
          counter.textContent = `${currentImageIndex + 1} / ${currentGallery.length}`;
        }

        thumbs.forEach((thumb, thumbIndex) => {
          thumb.classList.toggle(
            'active',
            thumbIndex === currentImageIndex
          );
        });
      };


      // Image précédente
      prevBtn.addEventListener('click', () => {
        const newIndex =
          (currentImageIndex - 1 + currentGallery.length) %
          currentGallery.length;

        updateGalleryView(newIndex);
      });


      // Image suivante
      nextBtn.addEventListener('click', () => {
        const newIndex =
          (currentImageIndex + 1) %
          currentGallery.length;

        updateGalleryView(newIndex);
      });


      // ---------------------------------------------------------------------
      // Navigation au doigt (swipe) sur mobile
      // ---------------------------------------------------------------------
      // Les flèches restent utilisables, mais sur mobile on s'attend
      // naturellement à pouvoir glisser le doigt pour changer de photo :
      // c'est ce geste qui manquait et qui rendait la navigation moins
      // naturelle sur téléphone.
      const galleryMain = document.querySelector('.gallery-main');
      let touchStartX = 0;
      let touchStartY = 0;

      galleryMain.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
      }, { passive: true });

      galleryMain.addEventListener('touchend', (event) => {
        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        // On ignore les gestes trop courts ou trop verticaux (l'utilisateur
        // essaie probablement de faire défiler la modale, pas la galerie).
        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
          return;
        }

        if (deltaX < 0) {
          nextBtn.click();
        } else {
          prevBtn.click();
        }
      }, { passive: true });


      // Clic sur une miniature
      thumbs.forEach((thumb) => {
        thumb.addEventListener('click', () => {
          const index = Number(
            thumb.getAttribute('data-index')
          );

          updateGalleryView(index);
        });
      });
    }


    // ---------------------------------------------------------------------------
    // Affichage de la modal
    // ---------------------------------------------------------------------------

    modal.classList.add('active');
    lockBodyScroll();
  });


  // ============================================================================
  // FERMETURE DE LA MODAL
  // ============================================================================

  const closeModal = () => {
    modal.classList.remove('active');
    unlockBodyScroll();
  };

  modalClose.addEventListener('click', closeModal);


  // Fermeture en cliquant sur le fond
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });


  // Fermeture avec la touche Escape + navigation clavier
  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('active')) {
      return;
    }

    // Escape
    if (event.key === 'Escape') {
      closeModal();
    }

    // Galerie
    if (currentGallery.length > 1) {
      if (event.key === 'ArrowLeft') {
        document.getElementById('gallery-prev')?.click();
      }

      if (event.key === 'ArrowRight') {
        document.getElementById('gallery-next')?.click();
      }
    }
  });


  // ============================================================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ============================================================================

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) {
          return;
        }

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);

        observerInstance.unobserve(entry.target);
      });
    },
    observerOptions
  );


  // -----------------------------------------------------------------------------
  // Initialisation du Scroll Reveal
  // -----------------------------------------------------------------------------

  function initScrollReveal() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => {
      // Évite de réinitialiser une carte déjà affichée
      if (card.classList.contains('visible')) {
        return;
      }

      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition =
        'opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

      observer.observe(card);
    });
  }


  // -----------------------------------------------------------------------------
  // Style de la classe .visible
  // -----------------------------------------------------------------------------

  const style = document.createElement('style');

  style.textContent = `
    .card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(style);


  // Initialisation
  // FIX: le bloc dupliqué (deuxième forEach sur filterButtons +
  // deuxième appel à initScrollReveal()) a été retiré — le premier appel
  // ci-dessous, combiné au setTimeout déjà présent dans le listener de
  // filtre plus haut, suffit amplement.
  initScrollReveal();
});