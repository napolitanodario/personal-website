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
  /** When set, the browser downloads the file instead of navigating. */
  download?: string | boolean;
};

/** Rich intro segments for the home page: plain text or inline links. */
export type IntroPart =
  | { type: "text"; text: string }
  | { type: "link"; text: string; href: string; external?: boolean };

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
  /** One string, or several paragraphs shown with a blank line between them. */
  description: string | string[];
  tools: string[];
  /** Optional repository or write-up URL. When set, the title becomes a link. */
  href?: string;
  /** Optional preview figures shown under the title, before the description. */
  images?: {
    src: string;
    alt: string;
  }[];
};

export type Education = {
  degree: string;
  institution: string;
  /** Optional; omitted for entries such as exchange stays. */
  field?: string;
  period?: string;
  notes: string[];
};

export type SkillItem = string | { label: string; href: string };

export type SkillGroup = {
  label: string;
  items: SkillItem[];
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
  site: "napolitanodar.io",
  intro:
    "Hi! I'm a Computer Science and Engineering student at Politecnico di Milano. Alongside my studies I've worked as a performance engineer, and on projects in computer vision and deep learning. Lately I've been having fun with Rust and self-hosting. You're welcome to poke around and learn more about my academic and professional journey.",
};

/** Home intro with inline links; keep in sync with profile.intro for metadata. */
export const introParts: IntroPart[] = [
  {
    type: "text",
    text: "Hi! I'm a Computer Science and Engineering student at ",
  },
  {
    type: "link",
    text: "Politecnico di Milano",
    href: "https://www.polimi.it/en/",
    external: true,
  },
  {
    type: "text",
    text: ". Alongside my studies I've worked as a ",
  },
  {
    type: "link",
    text: "performance engineer",
    href: "/resume#work",
  },
  {
    type: "text",
    text: ", and on ",
  },
  {
    type: "link",
    text: "projects",
    href: "/resume#projects",
  },
  {
    type: "text",
    text: " in computer vision and deep learning. Lately I've been having fun with Rust and self-hosting. You're welcome to poke around and learn more about my academic and professional journey.",
  },
];

/** Shown in the hero and repeated in the footer. */
export const links: Link[] = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: "https://github.com/napolitanodario" },
  { label: "LinkedIn", href: "https://linkedin.com/in/napolitanodario" },
  {
    label: "PDF resume",
    href: "/Dario_Napolitano_Resume.pdf",
    download: "Dario_Napolitano_Resume.pdf",
  },
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
  {
    company: "Kodland Italy",
    role: "Programming Teacher",
    location: "Italy, Remote",
    period: "Sept 2022 - Oct 2023",
    highlights: [
      "Conducted weekly online Python lectures for classes of 7 to 13 students.",
      "Contributed to the organized structure of a multinational company.",
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
    description: [
      "SafeNet is a home safety system built for the Arduino UNO Q hackathon at POLIMI NECSTLab. The board splits work across two processors. The Linux MPU runs Python for audio processing, machine learning, cloud synchronization, and a REST API. The STM32 MCU drives the reed switch, PIR sensor, LEDs, buzzer, and RFID reader over GPIO and SPI. The two sides communicate through the Arduino Bridge, a MessagePack-RPC channel over a Unix socket.",
      "Entry and exit events are inferred from the temporal order of reed and PIR activations. An RFID badge arms and disarms the system. When armed, on-device keyword spotting listens for the Italian word \"aiuto\" on a USB microphone and can trigger a local alarm plus a Telegram notification.",
      "Anomaly detection uses two complementary models. An Isolation Forest flags unusual entry and exit times from features such as hour of day, weekday, and elapsed time since the previous event. A separate absence model estimates expected return windows per time bucket from historical exit-entry pairs and raises an alert when a return is overdue. Both models retrain periodically on a sliding window of logged events.",
      "Firebase Realtime Database synchronizes device status, events, and remote commands. A web dashboard and a Telegram bot can arm the system, enable or disable detectors, and dismiss an overdue absence. The device publishes state and polls commands, so it does not require inbound network access.",
    ],
    tools: ["Arduino UNO Q", "scikit-learn", "Firebase", "Flask"],
    href: "https://github.com/napolitanodario/SafeNet-Arduino-hackaton",
    images: [
      {
        src: "/arduino_hackaton.jpg",
        alt: "Arduino UNO Q hackathon desk with breadboard, RFID reader and wiring for SafeNet.",
      },
    ],
  },
  {
    title: "Deep Learning Competitions",
    venue: "POLIMI",
    description: [
      "Two computer vision competitions from the Politecnico di Milano ANNDL course: blood cell classification and Martian terrain semantic segmentation.",
      "The classification task assigns 13,759 RGB images of size 96x96 to eight blood cell classes. Perceptual hashing removed about 1,800 near-duplicate training samples. Transfer learning improved accuracy from 42% to 62%. An ensemble of two models then reached 70% on the hidden test set. On this dataset, MobileNetV2 often outperformed much larger architectures such as ConvNeXtBase. Simple geometric and photometric augmentations helped, while aggressive policies such as MixUp and RandAugment often reduced accuracy.",
      "The segmentation task labels grayscale 64x128 Mars images into five terrain classes. The training set contains 2,615 annotated frames against 10,022 unlabeled test images, with strong class imbalance. Duplicating the rarest class before training improved U-Net performance by about 9%. Focal loss with gamma 2 produced more balanced results than Dice or Jaccard losses. Excluding the background class from the loss avoided an mIoU drop larger than 10%.",
      "U-Net and U-Net++ with a MobileNetV2 encoder outperformed DeepLabV3+, SegFormer, PSPNet, and FPN in our experiments. A four-model ensemble raised mIoU from 66.0% to 68.4%, for a final ranking of 19th out of 197 teams.",
    ],
    tools: ["TensorFlow", "PyTorch", "Keras", "OpenCV", "scikit-learn"],
    href: "https://github.com/napolitanodario/ANNDL-competition-2024",
    images: [
      {
        src: "/segformer.jpg",
        alt: "SegFormer encoder-decoder architecture diagram used in the deep learning competitions.",
      },
    ],
  },
  {
    title: "Visual Impairment Assistant",
    venue: "Thesis project, UNIMORE ARSControl",
    description: [
      "Bachelor thesis prototype for assistive navigation of visually impaired users in indoor and outdoor environments. The wearable setup runs on a Raspberry Pi 4 with an Intel RealSense D415, which provides synchronized RGB frames and active stereo depth maps.",
      "The runtime is a three-process pipeline connected by bounded multiprocessing queues. A stream reader captures coherent depth and color frames from the camera. Obstacle detection thresholds depth between 0.4 m and 1.5 m, applies morphological closing, extracts contours, and tracks nearby obstacles by centroid. Object detection runs a lightweight detector on RGB frames and associates bounding boxes with depth obstacles by center proximity. Fused alerts report object class, coarse image-plane position, and distance.",
      "On the Raspberry Pi 4, obstacle detection reached about 7 frames per second, roughly 18 times faster than object detection on the same board. That trade-off was acceptable because text-to-speech alerts only need to fire every few tens of seconds. The thesis target model was EfficientDet-Lite0 in TensorFlow Lite. The public reference implementation uses YOLOv8 Nano for desktop demos.",
    ],
    tools: ["OpenCV", "TensorFlow", "Intel RealSense", "multiprocessing"],
    href: "https://github.com/napolitanodario/visual-impaiment-assistant",
    images: [
      {
        src: "/processing_schema.png",
        alt: "Processing schema of the visual impairment assistant: RealSense depth and RGB queues, obstacle and object detection pipelines, matching, and speech output.",
      },
    ],
  },
  {
    title: "Natural Language Processing Competition",
    venue: "POLIMI",
    description: [
      "End-to-end multimodal study on the NIH Chest X-ray 14 dataset. The main table contains 112,120 samples with 512-dimensional BiomedCLIP image and text embeddings, view position, and 15 pathology labels. The label distribution is strongly imbalanced: No Finding alone accounts for more than half of the rows.",
      "Classical retrieval covers BM25, TF-IDF, and Word2Vec over radiology-style prompts. Image embeddings are indexed in ChromaDB with cosine similarity for text, image, and raw-vector queries. Classification ranges from multilayer perceptrons on frozen embeddings to DenseNet121 fine-tuned on a class-balanced image subset. Embedding-based models reach high mAUROC, but exact multilabel F1 remains low when rare pathologies dominate the error.",
      "For captioning, a CLIP-prefix GPT-2 mapper generates short pathology descriptions from image embeddings. LoRA fine-tuning of MedGemma 4B improved label F1 to about 0.47 on a 100-sample evaluation. Qwen 2.5-VL 3B and 7B were fine-tuned on the same image-pathology pairs with lower F1 on that check. Overall, the project is most useful as a comparative study of retrieval, class imbalance, and medical vision-language captioning.",
    ],
    tools: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Hugging Face Transformers",
      "CLIP",
      "scikit-learn",
    ],
    href: "https://github.com/napolitanodario/NLP-project-submission",
  },
  {
    title: "Pantry and Recipes App",
    venue: "POLIMI",
    description: [
      "PantryDish is a Flutter application for iOS and Android that recommends recipes from ingredients already available at home. It combines a virtual pantry, expiry notifications, and preference-aware recipe discovery to reduce food waste.",
      "Ingredients can be added manually, from fridge or pantry photos, or from receipt OCR. Gemini performs ingredient recognition on those images and receipts and pre-fills product names, quantities, and storage areas. Spoonacular provides recipe search, details, and recommendations filtered by the current pantry and by diet, allergies, cuisine, and difficulty preferences.",
      "The UI centers on a swipe-based recipe feed, with saved recipes, pantry management, and a profile screen. Firebase Authentication manages accounts. Firestore persists profiles, pantry items, and saved recipes. Firebase Cloud Messaging and local notifications deliver expiry reminders. Remote Config exposes maintenance mode and forced-upgrade flags.",
      "The application source is private for the course, while the public design docs describe an MVC architecture with Riverpod for state management. The test suite includes 96 unit tests, 146 widget tests, and 22 integration tests covering authentication, pantry CRUD, swipe flows, vision and OCR paths, and profile settings.",
    ],
    tools: ["Flutter", "Gemini API", "Firebase", "Spoonacular"],
    href: "https://github.com/napolitanodario/DIMA-PantryDish-documentation",
    images: [
      {
        src: "/PantryDish_screens.png",
        alt: "PantryDish mobile screens: recipe feed, pantry, saved recipes and profile preferences.",
      },
    ],
  },
  {
    title: "AI Dobble - Card Recognition",
    venue: "Loyola University",
    description: [
      "Computer vision project that recognises Dobble (Spot It!) cards from photos or a live camera and finds the shared symbol between two cards. Built a small dataset from scanned sheets (grid-cropped into single cards), then expanded it with brightness, shift and zoom augmentations plus full rotations at training time.",
      "A Keras CNN (four Conv2D + MaxPool blocks, dropout, dense head) classifies among 29 card classes; predicted labels are mapped to symbol sets so the intersection yields the matching icon. A live OpenCV demo detects circular cards in the frame, runs the model and overlays the common symbol.",
    ],
    tools: ["Python", "Keras", "TensorFlow", "OpenCV", "scikit-learn"],
    href: "https://github.com/napolitanodario/ai-dobble-v3",
    images: [
      {
        src: "/dobble_augmentations_cover.png",
        alt: "Grid of Dobble cards with lighting and geometry augmentations used for training.",
      },
    ],
  },
  {
    title: "Neural Network from Scratch",
    venue: "Loyola University",
    description: [
      "Project to build and train feed-forward networks without deep learning frameworks: only Python and NumPy. The code models the stack as Neuron, Layer and Network classes so architectures can be declared as a list of layer sizes and activation names, then wired with weights and biases at construction time.",
      "Training implements forward propagation, backpropagation of squared error, per-neuron gradient accumulation and weight updates with a configurable learning rate. Activations include sigmoid, identity and softmax (with matching derivatives); weights can be drawn from a scaled normal distribution or set by hand for small demos. A digits loader reads 16x16 patterns (256 inputs, 10 one-hot outputs) from the bundled dataset, alongside smaller toy shapes used to check the math by hand.",
    ],
    tools: ["Python", "NumPy"],
    href: "https://github.com/napolitanodario/ML-neural-network-from-scratch",
    images: [
      {
        src: "/neural_network_digits.png",
        alt: "Diagram of a feed-forward network classifying handwritten digits from flattened pixels.",
      },
    ],
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
      "Linear Algebra, Physics, Computer Architecture, OOP, Telecommunications, IoT.",
    ],
  },
  {
    degree: "Erasmus+ mobility",
    institution: "Loyola University Andalucia",
    field: "Seville, Spain",
    period: "Sept 2022 - Feb 2024",
    notes: ["Machine Learning, Computer Vision."],
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
    label: "Languages",
    items: [
      "Python",
      "JavaScript",
      "C",
      "C++",
      "Java",
      "Bash",
      "SQL",
      "MATLAB",
    ],
  },
  {
    label: "AI & Data",
    items: [
      "NumPy",
      "pandas",
      "scikit-learn",
      "TensorFlow",
      "Keras",
      "OpenCV",
    ],
  },
  {
    label: "Frameworks",
    items: ["Django", "Flask", "Angular", "Flutter"],
  },
  {
    label: "DevOps & Observability",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "OpenTelemetry",
      "Grafana",
      "Splunk",
      "Dynatrace",
    ],
  },
  {
    label: "Certifications",
    items: [
      {
        label: "Dynatrace Associate",
        href: "https://www.credly.com/badges/0b181577-8c5a-4faf-a78a-82ece15f6c2d/public_url",
      },
    ],
  },
  {
    label: "Spoken languages",
    items: [
      "English: C1 (IELTS 8/9)",
      "Spanish: B2",
      "Italian: Native speaker",
    ],
  },
];
