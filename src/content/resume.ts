export type Link = {
  label: string;
  href: string;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
};

export type Project = {
  title: string;
  venue: string;
  description: string;
  tools: string[];
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

export const profile = {
  name: "Dario Napolitano",
  role: "Computer Science · Software Engineer",
  location: "Milan, Italy",
  email: "darionapo2.0@gmail.com",
  phone: "+39 388 259 1181",
  site: "darionapolitano.space",
  intro:
    "I build and measure systems: performance engineering by day, machine learning and self-hosted side projects by night. Currently finishing an MSc in Computer Science and Engineering at Politecnico di Milano while working as a performance engineer in Milan.",
};

export const links: Link[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/darionapolitano" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/darionapolitano" },
];

export const experience: Experience[] = [
  {
    company: "Moviri Consulting",
    role: "Performance Engineering",
    location: "Milan, Italy",
    period: "Dec 2024 — Present",
    highlights: [
      "Designed a scalable ETL pipeline streaming Dynatrace RUM data into Splunk, automating data analysis and reporting.",
      "Designed custom load testing scripts to benchmark the performance impact of a corporate antivirus solution in the banking industry.",
      "Instrumented and configured full infrastructure observability with Dynatrace.",
      "Developed Selenium endurance load tests to benchmark and collect user experience data from complex applications.",
    ],
  },
  {
    company: "searchingpatents.com",
    role: "Full Stack Developer",
    location: "Bologna, Italy",
    period: "Oct 2022 — Sept 2025",
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
    period: "Aug 2019 — Dec 2024",
    highlights: [
      "Developed warehouse logistics layouts for more than 20 customers in the ceramic tile industry.",
      "Used real-time tracking systems and ERP software to improve merchandise management and movement.",
      "Took part in international projects in the US.",
    ],
  },
];

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
      "Two vision challenges — blood cell image classification and Martian terrain semantic segmentation. Transfer learning and fine tuning on CNNs and U-Nets for up to +20% accuracy and a top 10 leaderboard placement, plus ensembling, data augmentation, class rebalancing and loss tuning to handle rare classes.",
    tools: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "scikit-learn"],
  },
  {
    title: "Visual Impairment Assistant",
    venue: "Thesis project · UNIMORE ARSControl",
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
    title: "Pantry & Recipes App",
    venue: "POLIMI",
    description:
      "A Flutter mobile application for pantry tracking and smart recipe discovery, backed by Firebase and integrating Gemini AI and Spoonacular APIs, with extensive unit and integration testing.",
    tools: ["Flutter", "Gemini API", "Firebase"],
  },
];

export const education: Education[] = [
  {
    degree: "MSc",
    institution: "Politecnico di Milano",
    field: "Computer Science and Engineering",
    period: "Sept 2024 — Present",
    notes: [
      "Deep Learning, Software Engineering, Compilers, NLP, Recommender Systems, Dynamic Programming, Control Systems.",
    ],
  },
  {
    degree: "BSc",
    institution: "University of Modena and Reggio Emilia",
    field: "Computer Engineering",
    period: "Sept 2021 — Oct 2024",
    notes: [
      "Linear Algebra, Physics, Computer Architecture, OOP, Telecommunications, IoT, Computer Vision.",
      "Erasmus+ mobility at Loyola University, Seville, Spain.",
    ],
  },
];

export const selfHosting: string[] = [
  "Personal finance manager",
  "Progressive overload training tracker",
  "Personal website",
  "Cloud photos sync",
];

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
    items: ["English — C1, IELTS 8/9", "Spanish — B2", "Italian — native"],
  },
];
