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
  /** Optional repository URL. When set, a GitHub icon is shown next to the title. */
  href?: string;
  /** Optional paper URL. When set, an external-link icon is shown next to the GitHub icon. */
  paperHref?: string;
  /** Optional preview figures shown under the title, before the description. */
  images?: {
    src: string;
    alt: string;
  }[];
};

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  details: string;
  href: string;
  period?: string;
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
      "As a hackathon output for the CSI course at NECSTLab (Politecnico di Milano) we built SafeNet: a home monitoring system on an Arduino UNO Q. It is meant to learn a person's habits from entry and exit events, then notice when that pattern breaks. The board splits the workload across two processors: the Arduino Linux environment runs Python for audio, machine learning and cloud sync, while the STM32 reads a reed switch and a PIR sensor so we can infer when someone comes in or leaves.",
      "We trained an Isolation Forest on those events, plus a statistical model of how long someone usually stays out, so the system can flag an unusual hour or a late return. We also trained and ran a keyword-spotting model on-device to catch the word \"aiuto\" and raise an alarm.",
      "For alerting we built and deployed a custom web dashboard, with a Telegram bot as a second channel.",
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
      "For the Artificial Neural Networks and Deep Learning course, our team worked on two computer vision competitions: blood-cell image classification and Martian terrain segmentation.",
      "In the first competition we classified microscopic blood-cell images into eight types. The dataset was small, about 14,000 RGB images at 96x96, so we started from ImageNet-pretrained CNNs in Keras rather than training from scratch. Transfer learning moved accuracy from 42% to 62%. Larger models did not always help: MobileNetV2 (2M parameters) beat ConvNeXtBase (87M), and fine-tuning big networks often overfit. Light augmentations helped; heavier ones did not. Combining two complementary architectures, a shallower one for generic visual features and a deeper one for more semantic ones, brought the score to 70%.",
      "In the second competition we segmented Martian terrain: each pixel of a 64x128 grayscale image had to be assigned to one of five surface types. Labels were noisy and classes were imbalanced. In PyTorch we compared several architectures; U-Net and U-Net++ with a MobileNetV2 encoder worked better than DeepLabV3+, SegFormer, PSPNet, and FPN. We handled the rare class by duplicating its images and trained with Focal Loss so the model did not ignore minority surfaces. Counting the background class in the loss made the network ignore the rest and dropped mIoU by more than 10%. An ensemble of four models reached 68.4% mIoU, which placed us 19th out of 197 teams.",
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
      "This is a prototyped wearable device meant to help blind and visually impaired individuals navigate urban and domestic environments. I developed it as my bachelor's thesis in Computer Engineering at UNIMORE, later published at AREA 2025 (Springer CCIS), with Prof. Valeria Villani as supervisor and Andrea Ruo as co-supervisor. The system detects nearby obstacles, classifies objects in the scene, and reports their position and distance through text-to-speech. It runs on a Raspberry Pi 4 with an Intel RealSense D415, which provides synchronized RGB frames and depth maps from active stereo vision.",
      "Two independent Python processes exchange data through multiprocessing queues. The obstacle-detection pipeline filters depth maps by a distance threshold, applies morphological closing and contour detection, then tracks blob centroids across frames. Consecutive depth frames are combined to reduce missing values. The object-detection pipeline classifies objects in RGB frames: EfficientDet-Lite0 on the Raspberry Pi, YOLOv8 on the desktop. Detected objects are matched to obstacles by centroid proximity so an alert can include both the class and the measured distance.",
      "On the Raspberry Pi 4, obstacle detection runs at about 7 fps, which is sufficient given that spoken updates are issued periodically rather than at every frame.",
    ],
    tools: ["OpenCV", "TensorFlow", "Intel RealSense", "multiprocessing"],
    href: "https://github.com/napolitanodario/visual-impaiment-assistant",
    paperHref:
      "https://link.springer.com/chapter/10.1007/978-3-032-08049-3_3",
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
      "For the Natural Language Processing course at Politecnico di Milano, our team ran a multimodal study on the NIH Chest X-ray 14 dataset. It has about 112,000 samples, each with 512-dimensional BiomedCLIP image and text embeddings, view position, and 15 pathology labels. The labels are strongly imbalanced: No Finding alone accounts for more than half of the rows.",
      "We compared classical retrieval (BM25, TF-IDF, and Word2Vec) over radiology-style prompts, and indexed image embeddings in ChromaDB with cosine similarity for text, image, and raw-vector queries. On classification we went from multilayer perceptrons on frozen embeddings to DenseNet121 fine-tuned on a class-balanced image subset. Embedding-based models reached high mAUROC, but exact multilabel F1 stayed low when rare pathologies dominated the error.",
      "For captioning we mapped image embeddings through a CLIP-prefix GPT-2 model to short pathology descriptions. Fine-tuning MedGemma 4B with LoRA raised label F1 to about 0.47 on a 100-sample check. Qwen 2.5-VL at 3B and 7B, trained on the same image-pathology pairs, scored lower there. The project is most useful as a comparison of retrieval, class imbalance, and medical vision-language captioning.",
    ],
    tools: [
      "PyTorch",
      "TensorFlow",
      "Keras",
      "Hugging Face",
      "CLIP",
      "scikit-learn",
    ],
    href: "https://github.com/napolitanodario/NLP-project-submission",
    images: [
      {
        src: "/nlp_dataset.png",
        alt: "Eight NIH Chest X-ray examples of thorax diseases, each with a circled finding: atelectasis, cardiomegaly, effusion, infiltration, mass, nodule, pneumonia, and pneumothorax.",
      },
    ],
  },
  {
    title: "Pantry and Recipes App",
    venue: "POLIMI",
    description: [
      "PantryDish is a Flutter app for iOS and Android that recommends recipes from ingredients already at home. It combines a virtual pantry, expiry notifications, and preference-aware recipe discovery to reduce food waste.",
      "Ingredients can be added by hand, from fridge or pantry photos, or from receipt OCR. Gemini recognises ingredients on those images and receipts and fills in product names, quantities, and storage areas. Spoonacular provides recipe search, details, and recommendations filtered by the current pantry and by diet, allergies, cuisine, and difficulty.",
      "The UI is built around a swipe-based recipe feed, with saved recipes, pantry management, and a profile screen. Firebase Authentication handles accounts. Firestore stores profiles, pantry items, and saved recipes. Firebase Cloud Messaging and local notifications send expiry reminders. Remote Config exposes maintenance mode and forced-upgrade flags.",
      "The app source is private for the course, while the public design docs describe an MVC architecture with Riverpod for state management. The test suite includes 96 unit tests, 146 widget tests, and 22 integration tests covering authentication, pantry CRUD, swipe flows, vision and OCR paths, and profile settings.",
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
      "A computer vision project that recognises Dobble (Spot It!) cards from photos or a live camera and finds the shared symbol between two cards. I built a small dataset from scanned sheets, cropped into single cards, then expanded it with brightness, shift and zoom augmentations plus full rotations at training time.",
      "A Keras CNN with four Conv2D and MaxPool blocks, dropout, and a dense head classifies among 29 card classes. Predicted labels are mapped to symbol sets so the intersection gives the matching icon. A live OpenCV demo detects circular cards in the frame, runs the model, and overlays the common symbol. In that setting it outpaced a human player on reaction time.",
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
      "As a group project at Loyola University we built and trained feed-forward networks without deep learning frameworks, using only Python and NumPy. The stack is modelled as Neuron, Layer and Network classes, so architectures can be declared as a list of layer sizes and activation names, then wired with weights and biases at construction time.",
      "Training runs forward propagation, backpropagation of squared error, per-neuron gradient accumulation, and weight updates with a configurable learning rate. Activations include sigmoid, identity and softmax, with matching derivatives. Weights can be drawn from a scaled normal distribution or set by hand for small demos. A digits loader reads 16x16 patterns (256 inputs, 10 one-hot outputs) from the bundled dataset, next to smaller toy shapes used to check the math by hand.",
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
/* Publications: peer-reviewed work, most recent first                 */
/* ------------------------------------------------------------------ */

export const publications: Publication[] = [
  {
    title:
      "A Wearable Stereo Vision-Based Obstacle Detection System for Visually Impaired Individuals",
    authors:
      "Dario Napolitano, Andrea Ruo (co-supervisor) and Prof. Valeria Villani (supervisor)",
    venue: "AREA 2025",
    details:
      "Workshop on Agents and Robots for reliable Engineered Autonomy. Springer CCIS, vol. 2700, pp. 35-50.",
    href: "https://link.springer.com/chapter/10.1007/978-3-032-08049-3_3",
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
