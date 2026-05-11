export type Project = {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  role: string;
  stack: string[];
  problem: string;
  architecture: string[];
  features: string[];
  challenges: { title: string; detail: string }[];
  metrics?: { label: string; value: string }[];
  links?: { github?: string; live?: string };
  highlight: string;
};

export const projects: Project[] = [
  {
    slug: "ai-agent-workflow-platform",
    title: "AI Agent Workflow Platform",
    tagline:
      "Distributed agent execution system with queues, LLM rate-limit control, autoscaling, and workflow orchestration.",
    period: "2024 - Present",
    role: "Backend and AI platform engineer",
    stack: [
      "Node.js",
      "Redis",
      "KeyDB",
      "Temporal",
      "Kafka",
      "Amazon SQS",
      "Bedrock",
      "KEDA",
      "Kubernetes",
      "Docker",
      "NGINX",
    ],
    problem:
      "Agent workloads were growing faster than a single service could handle. The platform needed controlled LLM throughput, retryable execution, dead-letter handling, and predictable scaling under multi-user traffic.",
    architecture: [
      "Temporal orchestrates long-running agent workflows, retries, and human-visible execution states",
      "Redis and KeyDB coordinate rate-limit windows, token budgets, and short-lived execution state",
      "Kafka and SQS isolate high-volume events from slower LLM calls and downstream integrations",
      "KEDA scales workers from queue pressure while Kubernetes keeps workloads isolated by class",
      "NGINX and cloud services route traffic across execution APIs, workers, and provider adapters",
    ],
    features: [
      "LLM provider throttling for OpenAI, Anthropic, Gemini-style APIs, and Amazon Bedrock",
      "Retry and DLQ flows for failed agent jobs and provider timeouts",
      "Credit and token usage controls for multi-user workloads",
      "Autoscaled workers for bursty queue traffic",
      "Payload optimization for large prompts, completions, and workflow state",
    ],
    challenges: [
      {
        title: "LLM rate limits under burst load",
        detail:
          "Built queue-aware throttling and provider fallback so agent work could continue without hammering a single model endpoint.",
      },
      {
        title: "Retry storms and failed jobs",
        detail:
          "Separated transient provider failures from permanent job failures with exponential backoff, DLQ routing, and inspectable workflow state.",
      },
      {
        title: "Autoscaling without runaway cost",
        detail:
          "Used queue depth and execution pressure as scaling signals so workers expanded during bursts and settled back when demand dropped.",
      },
    ],
    metrics: [
      { label: "Queue systems", value: "3+" },
      { label: "Workflow engine", value: "Temporal" },
      { label: "Scaling mode", value: "KEDA" },
    ],
    highlight: "Production-oriented AI execution with rate limits, queues, and autoscaling.",
  },
  {
    slug: "apartment-maintenance-management",
    title: "Apartment Maintenance Management System",
    tagline:
      "Full-stack apartment operations app for flat management, water bills, common maintenance, and Excel reporting.",
    period: "2023 - 2024",
    role: "Full-stack engineer",
    stack: [
      "Angular",
      "DevUI",
      "Nebular",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Sequelize",
      "MongoDB",
      "Excel Export",
    ],
    problem:
      "Apartment admins needed a reliable way to manage flats, monthly maintenance, water bill calculation, records, filtering, and downloadable reports without spreadsheet chaos.",
    architecture: [
      "Angular frontend built with reactive forms and reusable DevUI/Nebular components",
      "Dynamic FormArray flows for flats, nested bill items, and maintenance rows",
      "Node and Express APIs for CRUD, filtering, and report generation",
      "Sequelize-backed data layer with schema boundaries for apartments, flats, and billing records",
      "Excel export pipeline for month and year based reporting",
    ],
    features: [
      "Dynamic apartment and flat creation",
      "Water bill and common maintenance calculations",
      "Nested dynamic forms with validation handling",
      "Month and year filtering for maintenance records",
      "Excel download for admin-friendly reporting",
    ],
    challenges: [
      {
        title: "Dynamic form complexity",
        detail:
          "Handled nested FormArray updates, validation, and recalculation without breaking existing user input.",
      },
      {
        title: "Real-time calculation accuracy",
        detail:
          "Synchronized UI state and business rules so bill totals update immediately as users edit dynamic rows.",
      },
      {
        title: "Report-ready data",
        detail:
          "Normalized records enough for clean filtering and export while keeping the admin workflow simple.",
      },
    ],
    metrics: [
      { label: "Forms", value: "Dynamic" },
      { label: "Reports", value: "Excel" },
      { label: "Billing", value: "Automated" },
    ],
    highlight: "Complex Angular forms turned into a practical operations workflow.",
  },
  {
    slug: "project-checklist-review-system",
    title: "Project Checklist Review System",
    tagline:
      "Role-based project and checklist platform for admins, managers, developers, and L1/L2/L3 reviewers.",
    period: "2023",
    role: "Full-stack engineer",
    stack: ["React", "Node.js", "MongoDB", "Material UI", "RBAC", "REST APIs"],
    problem:
      "Teams needed technology-specific checklists, project assignment, user-role mapping, and reviewer workflows without losing control of permissions.",
    architecture: [
      "React UI with Material UI components for dense admin workflows",
      "Node.js APIs for project, user, role, and checklist resources",
      "MongoDB documents model project assignments and uploaded checklist structures",
      "Role-based screens and actions for admin, manager, developer, and reviewers",
      "Paginated dropdowns and modal flows keep large user/project lists usable",
    ],
    features: [
      "Admin and project manager assignment flows",
      "Technology-based checklist uploads",
      "L1, L2, and L3 review stages",
      "User management and role mapping",
      "Paginated dropdowns and modal-based workflows",
    ],
    challenges: [
      {
        title: "Permission clarity",
        detail:
          "Kept role checks visible in both UI flows and backend APIs so reviewers only touched the right parts of a project.",
      },
      {
        title: "Usable large lists",
        detail:
          "Used paginated dropdowns and focused modal flows so user and project selection remained fast as data grew.",
      },
      {
        title: "Checklist flexibility",
        detail:
          "Modeled checklist uploads around technologies so teams could review different project types without rebuilding the UI.",
      },
    ],
    metrics: [
      { label: "Roles", value: "5+" },
      { label: "Review levels", value: "3" },
      { label: "UI style", value: "MUI" },
    ],
    highlight: "RBAC-heavy review operations with clean React admin workflows.",
  },
  {
    slug: "cloud-devops-delivery",
    title: "Cloud Deployment and DevOps Automation",
    tagline:
      "Multi-environment deployment workflows with Docker, CI/CD, ECR, SSL, and security scanning.",
    period: "2022 - 2024",
    role: "Cloud and DevOps contributor",
    stack: [
      "AWS",
      "Cloud Run",
      "Docker",
      "GitHub Actions",
      "ECR",
      "SSL",
      "CI/CD",
      "Security Scanning",
    ],
    problem:
      "Applications needed repeatable deployments across DEV, UAT, and PROD with fewer manual steps and better confidence before release.",
    architecture: [
      "Dockerized services for consistent runtime behavior across environments",
      "GitHub Actions pipelines for build, scan, push, and deployment steps",
      "ECR used for container image storage and promotion",
      "Environment-specific configuration for DEV, UAT, and PROD",
      "SSL and infrastructure setup handled as part of production readiness",
    ],
    features: [
      "Automated deployment pipelines",
      "Docker image scanning",
      "ECR push workflows",
      "SSL certificate setup",
      "Multi-environment release handling",
    ],
    challenges: [
      {
        title: "Release consistency",
        detail:
          "Moved repeatable deployment steps into pipelines so releases became less dependent on manual command sequences.",
      },
      {
        title: "Environment separation",
        detail:
          "Kept DEV, UAT, and PROD configuration isolated while preserving the same deployable artifact.",
      },
      {
        title: "Security checks",
        detail:
          "Added image scanning and deployment checks before pushing changes toward production.",
      },
    ],
    metrics: [
      { label: "Environments", value: "3" },
      { label: "Runtime", value: "Docker" },
      { label: "Cloud", value: "AWS" },
    ],
    highlight: "Practical release automation across real delivery environments.",
  },
  {
    slug: "unified-social-media-hub",
    title: "Unified Social Media Hub",
    tagline:
      "Social platform architecture combining feed, posts, likes, comments, messaging, and one-time authentication.",
    period: "2024",
    role: "Backend and architecture contributor",
    stack: ["Node.js", "Authentication", "REST APIs", "Social Feeds", "Messaging", "OAuth"],
    problem:
      "The product idea combined LinkedIn, Instagram, and YouTube-like behavior, requiring a flexible backend model for identity, content, engagement, and communication.",
    architecture: [
      "Node.js service boundaries for auth, feed, posts, and messaging concepts",
      "One-time authentication flow for unified platform access",
      "Feed and engagement models for posts, likes, and comments",
      "Messaging architecture concepts for user-to-user communication",
      "Integration-first thinking for multi-platform content experiences",
    ],
    features: [
      "Feed and post flows",
      "Likes and comments",
      "Messaging concepts",
      "Unified authentication",
      "Multi-platform content architecture",
    ],
    challenges: [
      {
        title: "Large product surface",
        detail:
          "Broke social media behavior into smaller backend concepts so the platform could evolve feature by feature.",
      },
      {
        title: "Authentication foundation",
        detail:
          "Focused on identity and session flow early because every social action depends on trustworthy user state.",
      },
      {
        title: "Scalable thinking",
        detail:
          "Designed around separable modules so feeds, messaging, and content actions could grow independently.",
      },
    ],
    metrics: [
      { label: "Modules", value: "5+" },
      { label: "Auth", value: "Unified" },
      { label: "Domain", value: "Social" },
    ],
    highlight: "A broad social product shaped into clear backend architecture pieces.",
  },
  {
    slug: "react-native-mobile-foundation",
    title: "React Native Mobile Foundation",
    tagline:
      "Cross-platform mobile flows with TypeScript, React Navigation, forms, and UI debugging.",
    period: "2022",
    role: "Mobile developer",
    stack: ["React Native", "React Navigation", "TypeScript", "Forms", "Mobile UI"],
    problem:
      "Mobile screens needed reliable navigation, clean TypeScript handling, and form behavior that felt natural on both platforms.",
    architecture: [
      "React Native app structure with typed screens and route parameters",
      "React Navigation for stack and flow management",
      "TypeScript fixes for safer component contracts",
      "Form handling patterns for mobile inputs and validation",
      "Reusable UI flows adapted for small screens",
    ],
    features: [
      "Navigation setup",
      "TypeScript debugging",
      "Mobile form flows",
      "Screen-level UI polish",
      "Cross-platform behavior checks",
    ],
    challenges: [
      {
        title: "Navigation correctness",
        detail:
          "Kept route parameters and screen contracts typed so navigation bugs were easier to catch.",
      },
      {
        title: "Mobile form behavior",
        detail:
          "Adjusted state and validation patterns around the constraints of smaller, keyboard-heavy screens.",
      },
      {
        title: "Fast adaptation",
        detail:
          "Picked up the mobile stack quickly and delivered working flows with practical debugging.",
      },
    ],
    metrics: [
      { label: "Platform", value: "Mobile" },
      { label: "Language", value: "TS" },
      { label: "Navigation", value: "Typed" },
    ],
    highlight: "Cross-platform foundations with React Native and TypeScript.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
