import {
  Brain,
  BookOpen,
  Layout,
  SquareStack,
  MessageSquare,
  TrendingUp,
  Timer,
  Target,
  Calendar,
  Bot,
  BarChart3,
  ShieldCheck,
  ClipboardCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface FeatureBenefit {
  title: string;
  description: string;
}

export interface StudentFeature {
  slug: string;
  title: string;
  description: string;
  tagline: string;
  icon: LucideIcon;
  image: string;
  benefits: FeatureBenefit[];
  howItWorks: string[];
}

export const studentFeatures: StudentFeature[] = [
  {
    slug: "unlimited-ai-practice-questions",
    title: "Unlimited AI Practice Questions",
    description:
      "Create and practice with unlimited AI-generated questions tailored to your course material.",
    tagline: "Master every topic with endless, curriculum-aligned practice",
    icon: Brain,
    image: "/features/Unlimited_questions.png",
    benefits: [
      {
        title: "Endless Question Bank",
        description:
          "Never run out of practice material. Our AI generates fresh questions every time you study.",
      },
      {
        title: "Curriculum-Aligned Content",
        description:
          "Questions are mapped to VCE, HSC, QCE, SACE, and WACE study designs so you practise what matters.",
      },
      {
        title: "Adaptive Difficulty",
        description:
          "The AI adjusts question complexity based on your performance, keeping you in the optimal learning zone.",
      },
      {
        title: "Instant Feedback",
        description:
          "Receive detailed mark breakdowns and examiner commentary the moment you submit an answer.",
      },
    ],
    howItWorks: [
      "Select your subject, topic, and difficulty level.",
      "The AI generates a fresh set of exam-style questions.",
      "Answer each question using the interactive editor.",
      "Get instant feedback with mark breakdowns and tips to improve.",
    ],
  },
  {
    slug: "infinite-canvas-mindmapping",
    title: "Infinite Canvas Mindmapping",
    description:
      "Visualise complex concepts with our AI-powered infinite canvas for brainstorming and mindmapping.",
    tagline: "Turn complex ideas into clear visual maps with AI assistance",
    icon: Layout,
    image: "/features/infinite canvas.png",
    benefits: [
      {
        title: "Unlimited Workspace",
        description:
          "An infinite canvas means you never run out of room to map your ideas, no matter how complex.",
      },
      {
        title: "AI-Generated Connections",
        description:
          "Skolar suggests links between concepts so you discover relationships you might have missed.",
      },
      {
        title: "Multi-Subject Support",
        description:
          "Build maps for any subject: sciences, humanities, maths, or creative arts.",
      },
      {
        title: "Export & Share",
        description:
          "Download your maps as images or PDFs, or share them with classmates for collaborative study.",
      },
    ],
    howItWorks: [
      "Open a new canvas and enter your central topic.",
      "The AI expands the map with related subtopics and key terms.",
      "Drag, rearrange, and add your own notes to customise the layout.",
      "Export the finished mind map or keep iterating as you learn more.",
    ],
  },
  {
    slug: "flash-cards",
    title: "Flash Cards",
    description:
      "Generate comprehensive flashcards from your notes and study materials with a single click.",
    tagline: "Remember more, forget less with AI-optimised spaced repetition",
    icon: SquareStack,
    image: "/features/flashcards.jpeg",
    benefits: [
      {
        title: "One-Click Generation",
        description:
          "Upload your notes or PDFs and Skolar instantly creates a complete flashcard deck.",
      },
      {
        title: "Spaced Repetition",
        description:
          "Cards resurface at scientifically optimal intervals to maximise long-term retention.",
      },
      {
        title: "Multiple Card Types",
        description:
          "Term and definition, fill-in-the-blank, multiple choice, and cloze deletion formats.",
      },
      {
        title: "Progress Tracking",
        description:
          "See which cards you have mastered and which need more review at a glance.",
      },
    ],
    howItWorks: [
      "Upload your notes, PDFs, or select a topic.",
      "The AI generates a tailored flashcard deck for you.",
      "Study using spaced repetition, rating each card by difficulty.",
      "Review analytics to see your retention curve improve over time.",
    ],
  },
  {
    slug: "notes-bank",
    title: "Notes Bank",
    description:
      "Store, organise, and revisit your notes in one searchable library.",
    tagline: "Your entire study library, organised and searchable in one place",
    icon: BookOpen,
    image: "/features/Notes_bank.png",
    benefits: [
      {
        title: "Centralised Library",
        description:
          "All your notes, summaries, and resources live in one organised, searchable location.",
      },
      {
        title: "Smart Search",
        description:
          "Find any concept instantly with AI-powered semantic search across all your materials.",
      },
      {
        title: "Auto-Summarisation",
        description:
          "Skolar condenses long notes into key points so you can review faster before exams.",
      },
      {
        title: "Cross-Device Access",
        description:
          "Access your notes from any device, anywhere, and pick up right where you left off.",
      },
    ],
    howItWorks: [
      "Upload or paste your notes into the Notes Bank.",
      "Skolar auto-tags and organises them by subject and topic.",
      "Search, browse, or let the AI summarise your materials.",
      "Revisit your notes anytime and generate study aids from them.",
    ],
  },
  {
    slug: "examiner-style-feedback",
    title: "Examiner-Style Feedback",
    description:
      "Get detailed, examiner-style feedback on your practice answers to understand how to improve.",
    tagline:
      "Know exactly where marks are won and lost before the real exam",
    icon: MessageSquare,
    image: "/features/Examinar-style feedback.png",
    benefits: [
      {
        title: "Mark-by-Mark Breakdown",
        description:
          "See precisely where you earned marks and where you fell short, just like a real examiner would score it.",
      },
      {
        title: "Rubric Alignment",
        description:
          "Feedback is generated against official curriculum rubrics so you learn the language examiners use.",
      },
      {
        title: "Improvement Suggestions",
        description:
          "Actionable tips on how to restructure, elaborate, or refine your answers for maximum marks.",
      },
      {
        title: "Historical Comparison",
        description:
          "Track how your answer quality improves across attempts and over time.",
      },
    ],
    howItWorks: [
      "Choose a past exam question or generate a new one.",
      "Write your answer in the interactive editor.",
      "Submit to receive an instant examiner-style feedback report.",
      "Apply the suggestions and re-attempt to see your score climb.",
    ],
  },
  {
    slug: "progress-tracking",
    title: "Progress Tracking",
    description:
      "Monitor your learning journey with detailed analytics and insights into your academic performance.",
    tagline:
      "Visualise your growth and stay on track to hit your ATAR target",
    icon: TrendingUp,
    image: "/features/progress_tracking.jpeg",
    benefits: [
      {
        title: "Learning Hexagon",
        description:
          "Our proprietary model maps your performance across six cognitive dimensions for a complete picture.",
      },
      {
        title: "Topic-Level Heatmaps",
        description:
          "Instantly see which topics are strong and which need urgent attention with colour-coded heatmaps.",
      },
      {
        title: "Goal Setting",
        description:
          "Set ATAR or subject-score targets and track your trajectory towards them week by week.",
      },
      {
        title: "Weekly Reports",
        description:
          "Receive a summary of your study activity, strengths, and areas for improvement every week.",
      },
    ],
    howItWorks: [
      "Complete practice sets, quizzes, and flashcard sessions.",
      "Skolar aggregates your results into visual dashboards.",
      "Review your Learning Hexagon and topic heatmaps.",
      "Adjust your study plan based on data-driven insights.",
    ],
  },
  {
    slug: "exam-simulation",
    title: "Exam Simulation",
    description:
      "Practice under real exam conditions with timed simulations designed to build confidence.",
    tagline:
      "Experience the real exam before exam day so nothing catches you off guard",
    icon: Timer,
    image: "/features/exam_simulation.png",
    benefits: [
      {
        title: "Realistic Conditions",
        description:
          "Timed sessions, mark allocations, and question formats that mirror actual ATAR exams.",
      },
      {
        title: "Full-Length Papers",
        description:
          "Sit a complete exam paper or focus on specific sections depending on your study needs.",
      },
      {
        title: "Post-Exam Analysis",
        description:
          "After each simulation, get a detailed report showing where you spent time and where marks were dropped.",
      },
      {
        title: "Confidence Building",
        description:
          "Repeated simulations reduce exam anxiety and help you develop effective time management strategies.",
      },
    ],
    howItWorks: [
      "Select your subject and choose a full or partial simulation.",
      "Start the timed session under realistic exam conditions.",
      "Submit your answers when the timer runs out or when you finish.",
      "Review your results, time allocation, and examiner feedback.",
    ],
  },
  {
    slug: "targeted-weak-point-testing",
    title: "Targeted Weak-Point Testing",
    description:
      "Identify and focus on your knowledge gaps with AI-driven targeted testing and practice.",
    tagline:
      "Stop wasting time on what you already know and close the gaps that matter",
    icon: Target,
    image: "/features/Targeted_weakpoint_testing.png",
    benefits: [
      {
        title: "Gap Detection",
        description:
          "The AI analyses your performance history to pinpoint exactly which topics need work.",
      },
      {
        title: "Focused Practice Sets",
        description:
          "Automatically generated question sets that zero in on your weakest areas.",
      },
      {
        title: "Mastery Thresholds",
        description:
          "Topics are marked as mastered only when you consistently score above the target threshold.",
      },
      {
        title: "Efficient Study Time",
        description:
          "Spend your limited study hours where they will have the biggest impact on your results.",
      },
    ],
    howItWorks: [
      "Complete an initial diagnostic assessment across your subjects.",
      "Skolar identifies your weakest topics and ranks them by priority.",
      "Work through targeted practice sets designed to close each gap.",
      "Re-test to confirm mastery and watch topics turn green on your dashboard.",
    ],
  },
  {
    slug: "personalised-study-planner",
    title: "Personalised Study Planner",
    description:
      "Get a custom-built study schedule that adapts to your pace and academic goals.",
    tagline:
      "A study plan that adapts to you, not the other way around",
    icon: Calendar,
    image: "/features/study_planner.png",
    benefits: [
      {
        title: "Adaptive Scheduling",
        description:
          "The planner adjusts your daily and weekly schedule based on upcoming exams, workload, and progress.",
      },
      {
        title: "Smart Reminders",
        description:
          "Get notified when it is time to study, review flashcards, or complete a practice test.",
      },
      {
        title: "Balanced Workload",
        description:
          "Skolar distributes study time evenly across subjects so no topic is neglected.",
      },
      {
        title: "Calendar Integration",
        description:
          "Sync your study plan with Google Calendar or Apple Calendar for seamless scheduling.",
      },
    ],
    howItWorks: [
      "Enter your subjects, exam dates, and weekly availability.",
      "Skolar generates an optimised study schedule tailored to you.",
      "Follow daily tasks and check them off as you complete them.",
      "The planner re-balances automatically as your progress evolves.",
    ],
  },
  {
    slug: "ai-tutor-support",
    title: "AI-Tutor Support",
    description:
      "Chat with your personal AI tutor anytime to get help with difficult concepts or questions.",
    tagline:
      "A personal tutor available 24/7, trained on the Australian curriculum",
    icon: Bot,
    image: "/features/AI_tutor.png",
    benefits: [
      {
        title: "24/7 Availability",
        description:
          "Get help at midnight before an exam or during a weekend study session, whenever you need it.",
      },
      {
        title: "Curriculum-Trained",
        description:
          "The AI tutor understands VCE, HSC, QCE, SACE, and WACE syllabi so answers are always relevant.",
      },
      {
        title: "Step-by-Step Explanations",
        description:
          "Complex problems are broken down into manageable steps so you truly understand the method.",
      },
      {
        title: "Conversational Learning",
        description:
          "Ask follow-up questions naturally, just like you would with a real tutor.",
      },
    ],
    howItWorks: [
      "Open the AI Tutor chat from any page in Skolar.",
      "Ask a question or paste a problem you are stuck on.",
      "Receive a detailed, step-by-step explanation instantly.",
      "Ask follow-ups until you fully understand the concept.",
    ],
  },
];

export const schoolFeatures = [
  {
    title: "Actionable Classroom intelligence",
    description:
      "Gain deep insights into student performance and engagement to inform teaching strategies.",
    icon: BarChart3,
    image:
      "https://placehold.co/600x400/3b82f6/white?text=Classroom+Intelligence",
  },
  {
    title: "Curriculum-Aligned AI (You can Trust)",
    description:
      "Safe and secure AI grounded in the Australian curriculum to support teacher and student needs.",
    icon: ShieldCheck,
    image:
      "https://placehold.co/600x400/3b82f6/white?text=Curriculum-Aligned+AI",
  },
  {
    title: "Assessment and Reporting tools",
    description:
      "Streamline grading and generate comprehensive reports with AI-assisted assessment tools.",
    icon: ClipboardCheck,
    image: "https://placehold.co/600x400/3b82f6/white?text=Assessment+Tools",
  },
  {
    title: "School-Wide Oversight",
    description:
      "Manage and monitor AI usage and academic progress across your entire school community.",
    icon: Users,
    image:
      "https://placehold.co/600x400/3b82f6/white?text=School-Wide+Oversight",
  },
];
