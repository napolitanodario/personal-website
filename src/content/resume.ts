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
          "An insurance company wanted to follow its policy issuance funnel step by step. The goal was to measure the flow as real users experience it, not as a synthetic script.",
        approach:
          "I built a Python toolkit that pulls Dynatrace real user monitoring sessions through USQL. The client walks each day with adaptive time windows so the export is not truncated or sampled. Actions land in a two-tier Parquet cache, with staging chunks during the fetch and a consolidated file after a complete day. A faithful port of the client funnel logic rebuilds each issuance attempt from the action stream. A separate ETL stage sends the processed events to Splunk over HEC. I designed the Splunk schemas to keep license cost under control.",
        results:
          "The ingested data powered dashboards for IT operations and business analytics. The views track completion and abandonment rates, plus server, network, and frontend timing for each step. The pipeline runs on a schedule. The cache also helps handle duplicated events. The pipeline can also segment attempts by policy type, which ranks the variants that are slowest or fail most often.",
        lesson:
          "Most of the value came from the analysis done before writing any code. I had to choose which metrics answer the client need. I also had to prove that an extraction arrived complete. You must design data integrity into the pipeline, because a partial load looks exactly like a quiet week on the dashboard. The new results also had to stay consistent with the previous findings of the client, so the data stayed actionable.",
      },
      {
        name: "Endurance testing through the browser",
        scenario:
          "A client in the data center infrastructure industry needed to test a new application before production launch.",
        approach:
          "I designed a Selenium script that drives the frontend for long continuous runs. One flow walks every product in a category and opens each card and section down to the documents underneath. Those documents come from a local sync agent in offline mode. Instead of scripting each path alone, I mapped the frontend into reusable components. A non-recursive depth-first search and automatic exception recovery let the same script loop for days without hand fixes. The longest run lasted 41 hours.",
        results:
          "After about 35 hours, the sync agent began throwing \"Too many open files\" errors on every opened document. The content then looked unavailable to the user. The defect went back to the development team with the runtime needed to reproduce it. After the test, I rebuilt the volumes from the collected data. The run reached about 4,200 document views and 8,740 card openings, close to 210 per hour.",
        lesson:
          "Some defects are purely a function of time. Nothing in the first hours of that run looked wrong. The failure only appeared at hour 35, which is the whole argument for endurance testing. It also taught me to keep a second way of collecting metrics. The planned monitoring turned out to be unavailable, so the logs had to carry the evidence instead.",
      },
      {
        name: "Benchmarking antivirus overhead on enterprise storage",
        scenario:
          "A banking client needed to know whether an enterprise antivirus on a production shared NAS would hurt storage performance.",
        approach:
          "I designed a distributed load script that spawns up to 96 concurrent threads to emulate user operations on the share. We ran every scenario twice: once with the antivirus enabled, and once disabled as a baseline. Early runs forced a change in method. The antivirus agent caches previously scanned files, so every copied file had to be unique. Otherwise the test would measure cache hits instead of real scan cost.",
        results:
          "With scanning enabled, storage latency, IOPS, and throughput roughly doubled, because every write also triggered an antivirus read. End-to-end throughput saturated at 11 operations per second, against 35 in the baseline. Isolating the operations showed that delete was the bottleneck. Its queue time, the wait before an operation even starts, grew by several orders of magnitude. The client used these metrics to size the NAS and decide where antivirus was viable.",
        lesson:
          "Understanding system behavior matters as much as the load you apply. If the scanner cache had gone unnoticed, the campaign would have measured the wrong thing. Deeper statistical analysis and queueing models such as Little's Law after the run turned raw numbers into a clear explanation.",
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
    href: "https://github.com/napolitanodario/SafeNet-Arduino-hackaton",
    description: [
      "SafeNet is a home safety system built for the Arduino UNO Q hackathon at POLIMI NECSTLab. The board splits work across two processors. A Linux side runs Python for audio, machine learning, cloud sync, and a REST API. A microcontroller side owns the sensors, LEDs, buzzer, and an RFID reader. The two sides talk through a Bridge RPC channel over a Unix socket.",
      "The system detects entry and exit from the order of a reed switch and a PIR motion sensor. An RFID badge arms and disarms the alarm. When the system is armed, keyword spotting listens for the Italian word \"aiuto\" on a USB microphone. A match can raise a local alarm and send a Telegram alert.",
      "Two models watch daily habits. An Isolation Forest scores unusual entry and exit times from hour, weekday, and time since the last event. A separate absence model learns how long a person usually stays away in each time bucket. It warns if a return is late. Both models retrain on a sliding window of logged events.",
      "A Firebase Realtime Database keeps status, events, and remote commands in sync. A web dashboard and a Telegram bot can arm the system, toggle detectors, and dismiss an overdue absence. The device pushes state out and pulls commands in, so it does not need inbound network access.",
    ].join("\n\n"),
    tools: ["Arduino UNO Q", "scikit-learn", "Firebase", "Flask"],
  },
  {
    title: "Deep Learning Competitions",
    venue: "POLIMI",
    href: "https://github.com/napolitanodario/ANNDL-competition-2024",
    description: [
      "This work covers two vision competitions from the Politecnico di Milano ANNDL course.",
      "The first task classifies 13,759 blood cell images of size 96x96 into eight classes. Cleaning removed about 1,800 near-duplicate images with perceptual hashing. Transfer learning lifted accuracy from 42% to 62%. An ensemble of two models then reached 70% on the hidden test set. A smaller MobileNetV2 often beat much larger networks on this dataset. Simple flips and geometric noise helped, while heavier augmentation often hurt.",
      "The second task segments Martian terrain into five surface classes on grayscale 64x128 images. The training set has 2,615 labeled frames and a large unlabeled test set. Class imbalance was severe, so the rarest class was duplicated before training. Focal loss with gamma 2 worked better than other balanced losses. Keeping the background class out of the loss avoided a drop of more than 10% mIoU.",
      "U-Net and U-Net++ with a MobileNetV2 encoder beat DeepLabV3+, SegFormer, PSPNet, and FPN in our runs. A four-model ensemble raised mIoU from 66.0% to 68.4%. The team placed 19th out of 197.",
    ].join("\n\n"),
    tools: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "scikit-learn"],
  },
  {
    title: "Visual Impairment Assistant",
    venue: "Thesis project, UNIMORE ARSControl",
    href: "https://github.com/napolitanodario/visual-impaiment-assistant",
    description: [
      "This bachelor thesis prototype helps visually impaired people move through indoor and outdoor spaces. It runs on a Raspberry Pi 4 with an Intel RealSense D415 camera. The camera gives synchronized RGB frames and active stereo depth maps.",
      "Three Python processes share work through bounded queues. A stream reader pulls coherent depth and color frames. An obstacle module thresholds depth between 0.4 m and 1.5 m, cleans the mask with morphological closing, and tracks nearby blobs by centroid. An object module runs a light detector on RGB frames. It matches boxes to depth obstacles by center distance. Matched alerts can name the object, its coarse frame position, and its distance.",
      "On the Raspberry Pi 4, obstacle detection reached about 7 frames per second. That was roughly 18 times faster than object detection on the same board. The gap was acceptable because spoken alerts only need to fire every few tens of seconds. The thesis target detector was EfficientDet-Lite0 in TensorFlow Lite. The public reference code uses YOLOv8 Nano for desktop demos.",
    ].join("\n\n"),
    tools: ["OpenCV", "TensorFlow", "Intel RealSense", "multiprocessing"],
  },
  {
    title: "Natural Language Processing Competition",
    venue: "POLIMI",
    href: "https://github.com/napolitanodario/NLP-project-submission",
    description: [
      "This multimodal project works on NIH Chest X-ray 14 data. The main table has 112,120 rows with BiomedCLIP image and text embeddings of size 512, view position, and 15 pathology labels. Class counts are highly skewed. No Finding alone covers more than half of the rows.",
      "The pipeline starts with text indexing and retrieval through BM25, TF-IDF, and Word2Vec. Image embeddings go into a ChromaDB collection with cosine search for text, image, and raw-vector queries. Classification experiments range from multilayer perceptrons on frozen embeddings to a DenseNet121 fine-tuned on a balanced image subset. Embedding models reach strong mAUROC. Exact multilabel F1 stays low when rare diseases dominate the error.",
      "Captioning and vision-language work compare several models. A CLIP-prefix GPT-2 mapper produces short pathology captions from image embeddings. LoRA fine-tuning of MedGemma 4B raised label F1 on a 100-sample check to about 0.47. Qwen 2.5-VL 3B and 7B were also fine-tuned on image and pathology pairs, with weaker label recovery on the same check. The project is strongest as an end-to-end study of retrieval, imbalance, and medical captioning.",
    ].join("\n\n"),
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
    href: "https://github.com/napolitanodario/DIMA-PantryDish-documentation",
    description: [
      "PantryDish is a Flutter app for iOS and Android that suggests recipes from the food a user already has. The goal is to cut food waste through a virtual pantry, expiry alerts, and personalized recipe discovery.",
      "Users can add ingredients by hand, from fridge or pantry photos, or from receipt text. Gemini reads those photos and receipts and pre-fills product names, quantities, and storage areas. Spoonacular supplies recipe search, details, and recommendations. Matching respects the current pantry and preferences such as diet, allergies, cuisine, and difficulty.",
      "The interface uses a swipe feed for recipe discovery, with saved recipes, pantry management, and a profile screen. Firebase Authentication handles accounts. Firestore stores profiles, pantry items, and saved recipes. Cloud Messaging and local notifications cover expiry reminders. Remote Config supports maintenance and forced upgrade flags.",
      "The team kept the source private for the course, but the public design docs describe an MVC layout with Riverpod for state. Tests include 96 unit tests, 146 widget tests, and 22 integration tests. Those suites cover auth, pantry CRUD, swipe flows, vision paths, and profile settings.",
    ].join("\n\n"),
    tools: ["Flutter", "Gemini API", "Firebase", "Spoonacular"],
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
