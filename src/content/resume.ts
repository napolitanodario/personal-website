/**
 * Single source of truth for every piece of text rendered on the site.
 * Components never hardcode content: edit this file to update the portfolio.
 * Keep all values plain ASCII, no typographic dashes, bullets or symbols.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type Link = {
  label: string;
  href: string;
};

/*
 * One project inside a position, told as prose rather than as bullets. The four
 * fields are the four beats of a case study and each one is titled on the page,
 * so a reader can jump straight to the results and skip the rest.
 * Wherever a detail is still missing the text carries three dots as a
 * placeholder, so an unfinished sentence is visible instead of silently wrong.
 */
export type ExperienceProject = {
  name: string;
  /** The client situation and the question the work had to answer. */
  scenario: string;
  /** What was designed and built, and the decisions worth defending. */
  approach: string;
  /** What came out of it. Given the accent colour, being the payoff. */
  results: string;
  /** What the project taught, in plain terms. */
  lesson: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  /**
   * One line per piece of work, saying what was done and what came of it.
   * This is all a reader sees of the position until they ask for more.
   */
  highlights?: string[];
  /**
   * Long form account of the work worth telling in full, one entry per
   * project. Folded away behind a link, so it never competes with the
   * highlights above it.
   */
  projects?: ExperienceProject[];
};

export type Project = {
  title: string;
  venue: string;
  description: string;
  tools: string[];
  /** Optional repository or write-up URL. When set, the title becomes a link. */
  href?: string;
};

export type Education = {
  degree: string;
  institution: string;
  field: string;
  period: string;
  notes: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

/* ------------------------------------------------------------------ */
/* Profile: identity, contact details and the hero introduction        */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Dario Napolitano",
  role: "Computer Science - Software Engineer",
  location: "",
  email: "darionapo2.0@gmail.com",  
  /** Kept for reference only, deliberately not rendered anywhere. */
  phone: "+39 388 259 1181",
  site: "darionapolitano.space",
  intro:
    "Hi! I'm Computer Science and Engineering student at Politecnico of Milan. Alongside my studies, I work as a performance engineer at Moviri and have worked on projects in Computer Vision and Deep Learning. Lately, I've been having fun experimenting with Rust and the world of self-hosting. You're welcome to poke around and learn more about my academic and professional journey.",
}; 

/** Shown in the hero and repeated in the footer. */
export const links: Link[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/napolitanodario" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darionapolitano" },
];

/* ------------------------------------------------------------------ */
/* Work: professional experience, most recent first                    */
/* ------------------------------------------------------------------ */

export const experience: Experience[] = [
  {
    company: "Moviri Consulting",
    role: "Performance Engineering",
    location: "Milan, Italy",
    period: "Dec 2024 - Present",
    highlights: [
      "Designed a scalable ETL pipeline streaming Dynatrace real user monitoring data into Splunk, replacing manual reporting with automated funnel analytics.",
      "Developed Selenium endurance tests collecting user experience data from complex applications, exposing a defect that only surfaces after hours of continuous use.",
      "Designed distributed load testing scripts to benchmark a corporate antivirus solution on banking storage, quantifying its cost before rollout.",
      "Instrumented and configured full infrastructure observability with Dynatrace, consolidating hosts, services and user experience into a single view.",
    ],
    projects: [
      {
        name: "Turning real user monitoring into funnel analytics",
        scenario:
          "In the context of a process optimization project, an insurance company wanted to follow its policy issuance funnel step by step as the people using it actually experience it.",
        approach:
          "Starting from the raw user experience data collected from Dynatrace API, I built a Python toolkit that pulls user sessions, caches them on disk using compressed binaries, and reconstructs each attempt through the funnel from the recorded user actions. The reconstruction is a faithful port of the logic the client already used. A separate ETL stage ingests the processed data to Splunk over HEC. I designed the Splunk event schemas to keep license costs under control.",
        results:
          "The ingested data powered dashboards for both IT operations and business analytics, tracking metrics such as completion/abandonment rates and technical performance breakdowns (server, network, and frontend response times) and other statistics for each step. The pipeline runs on schedule and is designed to handle duplicated events thanks to the caching mechanism. Attempts can also be segmented by the kind of policy being issued, which ranks the variants that are slowest or fail most often.",
        lesson:
          "Most of the value came from the analysis done before writing any code: choosing which metrics address the client's necessity and finding a way to prove that an extraction arrived complete. Data integrity must be designed in, because a partial load looks exactly like a quiet week on the dashboard. Also, it was crucial to ensure that the analysis results were consistent with the client's previous findings, making the data fully actionable.",
      },
      {
        name: "Endurance testing through the browser",
        scenario:
          "A client operating in the data center infrastructure industry required testing a new application before launching it in production.",
        approach:
          "I designed a Selenium script that drives the frontend continuously, for example: walking every product in a category and opening each card and section down to the documents underneath, where the content is served by a local sync agent in offline mode. Instead of scripting each flow separately, I generalized the frontend structure of the platform into reusable components, implementing a non-recursive depth-first search algorithm and automatic exception recovery, which allowed the same script to loop for days without maintenance. The longest run lasted 41 hours.",
        results:
          "After roughly 35 hours, the sync agent began throwing \"Too many open files\" errors on every opened document, causing the content to appear unavailable to the user. The defect went back to the development team together with the runtime needed to reproduce it. After the test, I reconstructed the volumes from the data collected to confirm the load: around 4,200 document views and 8,740 card openings, close to 210 per hour.",
        lesson:
          "Some defects are purely a function of time. Nothing in the first hours of that run looked wrong, and the failure only appeared at hour 35, which is the whole argument for endurance testing. It also taught me to keep a second way of collecting metrics, since the initially planned monitoring turned out to be unavailable, and the logs had to carry the evidence instead.",
      },
      {
        name: "Benchmarking antivirus overhead on enterprise storage",
        scenario:
          "A banking client needed to know if deploying an enterprise antivirus solution on their production shared NAS would cause performance issues.",
        approach:
          "To test this, I designed a distributed load script that spawns up to 96 concurrent threads to emulate user operations on the share. We tested every scenario twice: once with the antivirus enabled, and again with it disabled, as a baseline. Early runs prompted a shift in strategy: because the antivirus agent caches previously scanned files, every copied file had to be unique to ensure we were measuring actual scan times rather than cache performance.",
        results:
          "With scanning enabled, storage latency, IOPS, and throughput roughly doubled, as every write triggered an antivirus read operation. End-to-end throughput saturated at 11 operations per second, compared to 35 in the baseline. Isolating the operations revealed that the bottleneck was the \"delete\" action: its queue time (the wait before an operation even starts) grew by several orders of magnitude. The client used these metrics to properly size the NAS and determine where activating the antivirus was truly viable.",
        lesson:
          "Understanding system behavior is just as critical as the load applied. Had the scanner cache gone unnoticed, the entire campaign would have measured the wrong metrics. Ultimately, applying deeper statistical analysis and queuing models (like Little's Law) post-execution is what turned raw numbers into a clear explanation.",
      },
    ],
  },
  {
    company: "searchingpatents.com",
    role: "Full Stack Developer",
    location: "Bologna, Italy",
    period: "Oct 2022 - Sept 2025",
    highlights: [
      "Built a custom Flask app for retrieval of patents data from the European Patent Office.",
      "Implemented automated report generation according to selectable preferences, decreasing report time by 90%.",
      "Released multiple application versions, continuously improving workflow efficiency.",
    ],
  },
  {
    company: "Weflex Italia",
    role: "Technical Office",
    location: "Modena, Italy",
    period: "Aug 2019 - Dec 2024",
    highlights: [
      "Developed warehouse logistics layouts for more than 20 customers in the ceramic tile industry.",
      "Used real-time tracking systems and ERP software to improve merchandise management and movement.",
      "Took part in international projects in the US.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Projects: academic and personal work                                */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    title: "Arduino Hackathon",
    venue: "POLIMI NECSTLab",
    description:
      "An Arduino-based home safety system combining voice keyword spotting with a local real-time anomaly detection model (Isolation Forest) to detect habit disruptions, with remote control and automated alert delivery via web dashboards.",
    tools: ["Arduino UNO Q", "scikit-learn", "Firebase"],
  },
  {
    title: "Deep Learning Competitions",
    venue: "POLIMI",
    description:
      "Two vision challenges: blood cell image classification and Martian terrain semantic segmentation. Transfer learning and fine tuning on CNNs and U-Nets for up to +20% accuracy and a top 10 leaderboard placement, plus ensembling, data augmentation, class rebalancing and loss tuning to handle rare classes.",
    tools: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "scikit-learn"],
  },
  {
    title: "Visual Impairment Assistant",
    venue: "Thesis project, UNIMORE ARSControl",
    description:
      "A computer vision prototype helping visually impaired people navigate urban and domestic environments, running real-time stereo depth estimation and object detection on a Raspberry Pi 4.",
    tools: ["OpenCV", "TensorFlow", "Intel RealSense", "multiprocessing"],
  },
  {
    title: "Natural Language Processing Competition",
    venue: "POLIMI",
    description:
      "An end-to-end multimodal pipeline on a large medical imaging dataset covering data analysis, text-based image retrieval and classification. Fine-tuned CNNs and multimodal language models (MedGemma, Qwen 2.5-VL) for captioning, and built a semantic search engine on image embeddings.",
    tools: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Hugging Face Transformers",
      "CLIP",
      "scikit-learn",
    ],
  },
  {
    title: "Pantry and Recipes App",
    venue: "POLIMI",
    description:
      "A Flutter mobile application for pantry tracking and smart recipe discovery, backed by Firebase and integrating Gemini AI and Spoonacular APIs, with extensive unit and integration testing.",
    tools: ["Flutter", "Gemini API", "Firebase"],
  },
];

/* ------------------------------------------------------------------ */
/* Education: degrees, most recent first                               */
/* ------------------------------------------------------------------ */

export const education: Education[] = [
  {
    degree: "MSc",
    institution: "Politecnico di Milano",
    field: "Computer Science and Engineering",
    period: "Sept 2024 - Present",
    notes: [
      "Deep Learning, Software Engineering, Compilers, NLP, Recommender Systems, Dynamic Programming, Control Systems.",
    ],
  },
  {
    degree: "BSc",
    institution: "University of Modena and Reggio Emilia",
    field: "Computer Engineering",
    period: "Sept 2021 - Oct 2024",
    notes: [
      "Linear Algebra, Physics, Computer Architecture, OOP, Telecommunications, IoT, Computer Vision.",
      "Erasmus+ mobility at Loyola University, Seville, Spain.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Self-hosting: services running on the home Raspberry Pi             */
/* ------------------------------------------------------------------ */

export const selfHosting: string[] = [
  "Personal finance manager",
  "Progressive overload training tracker",
  "Personal website",
  "Cloud photos sync",
];

/* ------------------------------------------------------------------ */
/* Skills: rendered as label plus comma separated list                 */
/* ------------------------------------------------------------------ */

export const skills: SkillGroup[] = [
  {
    label: "Programming",
    items: [
      "Python",
      "JavaScript",
      "C/C++",
      "Java",
      "Bash",
      "SQL",
      "MATLAB",
      "Rust",
    ],
  },
  {
    label: "Frameworks",
    items: [
      "NumPy",
      "pandas",
      "scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Angular",
      "Flask",
      "Flutter",
      "Django",
      "Grafana",
      "K6",
    ],
  },
  {
    label: "Technologies",
    items: [
      "NeoLoad",
      "ERP",
      "OpenTelemetry",
      "Splunk",
      "Kubernetes",
      "Docker",
      "Dynatrace",
      "AWS",
      "AutoCAD",
      "Terraform",
    ],
  },
  {
    label: "Certifications",
    items: ["Dynatrace Associate"],
  },
  {
    label: "Languages",
    items: ["English: C1, IELTS 8/9", "Spanish: B2", "Italian: native"],
  },
];
