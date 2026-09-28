import { GITHUB_REPO_OVERRIDES, RepoOverride } from './repoOverrides';

export interface GitHubPortfolioProject {
  id: string;
  repoName: string;
  name: string;
  displayTitle: string;
  primaryCategory: 'DATA SCIENCE' | 'DATA ANALYTICS' | 'MACHINE LEARNING' | 'DEEP LEARNING' | 'AI / GEN AI' | 'DATA ENGINEERING' | 'SOFTWARE ENGINEERING';
  secondaryTags: string[];
  description: string;
  readmeSummary?: {
    problem?: string;
    approach?: string;
    stack?: string;
    status?: string;
  };
  evidence: string;
  metrics: { label: string; value: string; highlight?: boolean }[];
  status: 'LIVE' | 'COMPLETED' | 'ACTIVE' | 'ONGOING' | 'SOURCE ONLY' | 'ARCHIVED';
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
  updatedAt: string;
  primaryLanguage: string;
  featured: boolean;
  priority: number;
  visualType: 'dashboard' | 'pipeline' | 'model' | 'vision' | 'api' | 'nlp' | 'metrics';
}

// Cached fallback payload generated directly from public GitHub repos & verified READMEs
export const VERIFIED_CACHED_PROJECTS: GitHubPortfolioProject[] = [
  // 1. DATA SCIENCE
  {
    id: 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    repoName: 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    name: 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    displayTitle: 'A/B Testing Analysis: E-Commerce Recommendation Optimization',
    primaryCategory: 'DATA SCIENCE',
    secondaryTags: ['PYTHON', 'PANDAS', 'NUMPY', 'SCIPY', 'A/B TESTING', 'STATISTICS', 'STREAMLIT'],
    description: 'Rigorous statistical experimentation comparing heuristic recommendation algorithms against baseline controls using CUPED variance reduction and bootstrap hypothesis testing.',
    readmeSummary: {
      problem: 'E-commerce recommendation conversion plateaus and high covariate variance.',
      approach: 'Two-sample proportion Z-tests + CUPED variance reduction technique.',
      stack: 'Python / Pandas / NumPy / SciPy / Streamlit',
      status: 'COMPLETED'
    },
    evidence: '50,000 USERS · 237,000 SESSIONS · CUPED VARIANCE REDUCTION',
    metrics: [
      { label: 'Conversion Lift', value: '+8.45%', highlight: true },
      { label: 'P-Value', value: 'p < 0.001', highlight: true },
      { label: 'Statistical Power', value: '0.88' },
      { label: 'Baseline → Variant', value: '15.1% → 16.4%' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    liveUrl: 'https://github.com/mrkarthik14/Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-27',
    primaryLanguage: 'Python',
    featured: true,
    priority: 100,
    visualType: 'dashboard'
  },
  {
    id: 'marketplace-insights-dashboard',
    repoName: 'marketplace-insights-dashboard',
    name: 'marketplace-insights-dashboard',
    displayTitle: 'Marketplace Insights: Strategic E-Commerce Analytics',
    primaryCategory: 'DATA SCIENCE',
    secondaryTags: ['PYTHON', 'PANDAS', 'STREAMLIT', 'PLOTLY', 'EDA', 'BUSINESS INTELLIGENCE'],
    description: 'Data-driven marketplace intelligence exploring e-commerce transaction patterns, vendor performance distributions, discount elasticity, and unit economics.',
    readmeSummary: {
      problem: 'Identifying revenue drivers and discount margin erosions across e-commerce vendors.',
      approach: 'Interactive exploratory analysis with 5 focused strategic business intelligence vectors.',
      stack: 'Python 3.9+ / Streamlit 1.29+ / Plotly / Pandas',
      status: 'COMPLETED'
    },
    evidence: '5 ACTIONABLE BUSINESS INSIGHTS · 10,000+ TRANSACTIONS',
    metrics: [
      { label: 'Actionable Insights', value: '5 Strategic', highlight: true },
      { label: 'Interactive Views', value: '12+ Charts' },
      { label: 'Framework', value: 'Streamlit + Plotly' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/marketplace-insights-dashboard',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-27',
    primaryLanguage: 'Python',
    featured: true,
    priority: 95,
    visualType: 'dashboard'
  },

  // 2. DATA ANALYTICS
  {
    id: 'retail-bigquery-analytics',
    repoName: 'retail-bigquery-analytics',
    name: 'retail-bigquery-analytics',
    displayTitle: 'Retail Fashion Analytics: Google BigQuery & SQL Platform',
    primaryCategory: 'DATA ANALYTICS',
    secondaryTags: ['SQL', 'GOOGLE BIGQUERY', 'PYTHON', 'STREAMLIT', 'RFM ANALYSIS', 'ANALYTICS'],
    description: 'Enterprise retail intelligence system querying high-volume fashion e-commerce records via Google BigQuery, window analytical functions, and RFM customer segmentation.',
    readmeSummary: {
      problem: 'Decoupling batch retail transactional databases from executive KPI reporting.',
      approach: 'Partitioned BigQuery SQL pipelines with real-time Streamlit executive dashboard.',
      stack: 'Google BigQuery / SQL / Python / Streamlit',
      status: 'LIVE'
    },
    evidence: 'BIGQUERY SQL · WINDOW FUNCTIONS · RFM SEGMENTATION',
    metrics: [
      { label: 'Engine', value: 'Google BigQuery', highlight: true },
      { label: 'Query Latency', value: '< 1.4s' },
      { label: 'Segmentation', value: 'RFM + Cohorts' },
      { label: 'Interface', value: 'Streamlit' }
    ],
    status: 'LIVE',
    githubUrl: 'https://github.com/mrkarthik14/retail-bigquery-analytics',
    liveUrl: 'https://retail-bigquery-analytics.streamlit.app',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-26',
    primaryLanguage: 'Python',
    featured: true,
    priority: 98,
    visualType: 'dashboard'
  },
  {
    id: 'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard',
    repoName: 'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard',
    name: 'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard',
    displayTitle: 'ICC T20 World Cup 2022: Player Impact & Batting Analytics',
    primaryCategory: 'DATA ANALYTICS',
    secondaryTags: ['POWER BI', 'DAX', 'SQL', 'PYTHON', 'SPORTS ANALYTICS', 'STAR SCHEMA'],
    description: 'Dynamic Power BI intelligence dashboard analyzing ball-by-ball tournament outcomes, dot-ball pressure indices, boundary percentages, and dimensional star-schema modeling.',
    readmeSummary: {
      problem: 'Complex unstructured tournament match statistics lacking role-specific evaluation.',
      approach: 'Dimensional star schema + custom DAX calculated measures across match phases.',
      stack: 'Power BI / DAX / SQL Server / Python',
      status: 'COMPLETED'
    },
    evidence: '200+ PLAYERS · 45+ MATCHES · STAR SCHEMA DAX',
    metrics: [
      { label: 'Athletes Analyzed', value: '200+ Players', highlight: true },
      { label: 'Dashboards', value: '15+ Views' },
      { label: 'Data Model', value: 'Dimensional Star' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard',
    stars: 1,
    forks: 0,
    updatedAt: '2026-01-04',
    primaryLanguage: 'Jupyter Notebook',
    featured: true,
    priority: 94,
    visualType: 'dashboard'
  },
  {
    id: 'Credit-Card-Fraud-Risk-Analysis',
    repoName: 'Credit-Card-Fraud-Risk-Analysis',
    name: 'Credit-Card-Fraud-Risk-Analysis',
    displayTitle: 'Credit Card Fraud Risk Analysis & Detection Platform',
    primaryCategory: 'DATA ANALYTICS',
    secondaryTags: ['PYTHON', 'PANDAS', 'POWER BI', 'STREAMLIT', 'FRAUD ANALYTICS', 'RISK MODELING'],
    description: 'Financial transaction fraud surveillance system identifying anomalous purchase vectors, risk scoring thresholds, and cardholder behavioral variance.',
    readmeSummary: {
      problem: 'High-frequency transaction fraud causing substantial financial losses and chargebacks.',
      approach: 'Statistical outlier detection, risk score thresholding, and real-time dashboard.',
      stack: 'Python / Streamlit / Power BI / Pandas',
      status: 'COMPLETED'
    },
    evidence: 'STREAMLIT PLATFORM · RISK SCORING · ANOMALY DETECTION',
    metrics: [
      { label: 'Risk Profiling', value: 'Multi-Factor', highlight: true },
      { label: 'Stack', value: 'Python + Power BI' },
      { label: 'Deploy', value: 'Streamlit Cloud' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/Credit-Card-Fraud-Risk-Analysis',
    stars: 1,
    forks: 0,
    updatedAt: '2026-06-08',
    primaryLanguage: 'Python',
    featured: false,
    priority: 85,
    visualType: 'metrics'
  },
  {
    id: 'Zomato-data',
    repoName: 'Zomato-data',
    name: 'Zomato-data',
    displayTitle: 'Zomato Restaurant Data: Exploratory Market Analytics',
    primaryCategory: 'DATA ANALYTICS',
    secondaryTags: ['PYTHON', 'PANDAS', 'SEABORN', 'MATPLOTLIB', 'EDA', 'RESTAURANT ANALYTICS'],
    description: 'Exploratory data analysis uncovering dining price distributions, rating determinants, cuisine cluster preferences, and locality market densities.',
    readmeSummary: {
      problem: 'Understanding restaurant success factors across dense urban metropolitan markets.',
      approach: 'Bivariate and multivariate correlation matrices between pricing, online orders, and customer ratings.',
      stack: 'Python / Pandas / Seaborn / Matplotlib',
      status: 'COMPLETED'
    },
    evidence: 'JUPYTER EDA · PRICE-TO-RATING CORRELATION · GEOLOCAL DENSITY',
    metrics: [
      { label: 'Analysis Type', value: 'Bivariate & Multivariate' },
      { label: 'Cuisine Density', value: 'Citywide Clustering' }
    ],
    status: 'SOURCE ONLY',
    githubUrl: 'https://github.com/mrkarthik14/Zomato-data',
    stars: 0,
    forks: 0,
    updatedAt: '2025-01-29',
    primaryLanguage: 'Jupyter Notebook',
    featured: false,
    priority: 70,
    visualType: 'dashboard'
  },
  {
    id: 'Power-BI-projects',
    repoName: 'Power-BI-projects',
    name: 'Power-BI-projects',
    displayTitle: 'Power BI Business Intelligence Portfolio',
    primaryCategory: 'DATA ANALYTICS',
    secondaryTags: ['POWER BI', 'DAX', 'BUSINESS INTELLIGENCE', 'DATA MODELING', 'EXECUTIVE KPIS'],
    description: 'Curated repository of executive KPI reporting dashboards, DAX calculated measures, star-schema data modeling, and corporate BI visualizations.',
    readmeSummary: {
      problem: 'Converting disconnected business logs into dynamic executive decision views.',
      approach: 'Multi-table star-schema data modeling with time-intelligence DAX functions.',
      stack: 'Power BI Desktop / DAX / Power Query',
      status: 'COMPLETED'
    },
    evidence: 'DAX MEASURES · STAR SCHEMA · EXECUTIVE KPI DRILL-DOWN',
    metrics: [
      { label: 'Tooling', value: 'Power BI Desktop + Service' },
      { label: 'Modeling', value: 'Star Schema & DAX' }
    ],
    status: 'SOURCE ONLY',
    githubUrl: 'https://github.com/mrkarthik14/Power-BI-projects',
    stars: 1,
    forks: 0,
    updatedAt: '2026-03-31',
    primaryLanguage: 'Power BI',
    featured: false,
    priority: 75,
    visualType: 'dashboard'
  },

  // 3. MACHINE LEARNING
  {
    id: 'telco-churn-prediction-customer-churn-prediction',
    repoName: 'telco-churn-prediction-customer-churn-prediction',
    name: 'telco-churn-prediction-customer-churn-prediction',
    displayTitle: 'Telco Customer Churn Prediction: End-to-End ML Pipeline',
    primaryCategory: 'MACHINE LEARNING',
    secondaryTags: ['PYTHON', 'SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'FASTAPI', 'ML PIPELINE'],
    description: 'Production-ready ML classification pipeline predicting 30-60 day telecom subscriber attrition with feature engineering, cost-sensitive threshold tuning, and FastAPI simulation.',
    readmeSummary: {
      problem: 'Telecom customer attrition costing $1,200-$2,400 per customer lifetime value.',
      approach: 'End-to-end ML lifecycle from EDA to feature engineering, XGBoost modeling, and FastAPI serving.',
      stack: 'Python 3.8+ / Scikit-learn / XGBoost / FastAPI / Pandas',
      status: 'COMPLETED'
    },
    evidence: 'END-TO-END PIPELINE · FEATURE ENGINEERING · FASTAPI SERVICE',
    metrics: [
      { label: 'Prediction Horizon', value: '30-60 Days', highlight: true },
      { label: 'Algorithms', value: 'XGBoost · Random Forest · Logistic' },
      { label: 'Deployment', value: 'FastAPI REST Service' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/telco-churn-prediction-customer-churn-prediction',
    stars: 1,
    forks: 0,
    updatedAt: '2026-02-28',
    primaryLanguage: 'Python',
    featured: true,
    priority: 99,
    visualType: 'model'
  },
  {
    id: 'Defect-Detection-in-Hot-Rolling',
    repoName: 'Defect-Detection-in-Hot-Rolling',
    name: 'Defect-Detection-in-Hot-Rolling',
    displayTitle: 'Tata Steel AI: Defect Detection in Hot Rolling Process',
    primaryCategory: 'MACHINE LEARNING',
    secondaryTags: ['PYTHON', 'MACHINE LEARNING', 'INDUSTRIAL AI', 'SCIKIT-LEARN', 'FEATURE SELECTION', 'TELEMETRY'],
    description: 'Industrial binary classification system predicting defective steel coils during continuous hot rolling manufacturing using 49 high-frequency sensor and pyrometer telemetry features.',
    readmeSummary: {
      problem: 'Tata Steel Hackathon: Real-time detection of defective coils during high-speed hot rolling.',
      approach: 'Binary classification with sensor feature selection and model cross-validation.',
      stack: 'Python / Scikit-learn / Pandas / NumPy',
      status: 'COMPLETED'
    },
    evidence: 'TATA STEEL HACKATHON · 49 SENSOR FEATURES · INDUSTRIAL CLASSIFICATION',
    metrics: [
      { label: 'Objective', value: 'Defect (Y=1) vs Clean (Y=0)', highlight: true },
      { label: 'Feature Space', value: '49 Sensor Streams' },
      { label: 'Domain', value: 'Industrial Metallurgical AI' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/Defect-Detection-in-Hot-Rolling',
    stars: 0,
    forks: 0,
    updatedAt: '2026-06-16',
    primaryLanguage: 'Jupyter Notebook',
    featured: true,
    priority: 93,
    visualType: 'model'
  },
  {
    id: 'END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
    repoName: 'END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
    name: 'END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
    displayTitle: 'Forest Fire Intensity Prediction: End-to-End ML & Flask',
    primaryCategory: 'MACHINE LEARNING',
    secondaryTags: ['PYTHON', 'MACHINE LEARNING', 'FLASK', 'SCIKIT-LEARN', 'REGRESSION', 'MODEL DEPLOYMENT'],
    description: 'End-to-end regression machine learning workflow modeling environmental conditions to forecast wildfire risk index, packaged with Flask web application deployment.',
    readmeSummary: {
      problem: 'Forecasting wildfire outbreak severity from meteorology indicators.',
      approach: 'Complete ML pipeline from data cleaning to model serializing and web serving.',
      stack: 'Python / Flask / Scikit-learn / HTML / CSS',
      status: 'COMPLETED'
    },
    evidence: 'FULL LIFECYCLE · EDA → FEATURE PIPELINE → FLASK APP',
    metrics: [
      { label: 'Workflow', value: 'Full Lifecycle Pipeline', highlight: true },
      { label: 'Deployment', value: 'Flask Web Application' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
    stars: 0,
    forks: 0,
    updatedAt: '2026-05-20',
    primaryLanguage: 'Jupyter Notebook',
    featured: false,
    priority: 88,
    visualType: 'model'
  },
  {
    id: 'faang-ml-journey',
    repoName: 'faang-ml-journey',
    name: 'faang-ml-journey',
    displayTitle: 'FAANG ML Mastery: Core Machine Learning From Scratch',
    primaryCategory: 'MACHINE LEARNING',
    secondaryTags: ['PYTHON', 'MATHEMATICS', 'ALGORITHMS FROM SCRATCH', 'NUMPY', 'OPTIMIZATION'],
    description: '12-week comprehensive roadmap implementing core ML algorithms from first mathematical principles, loss function gradients, convex optimization, and production thinking.',
    readmeSummary: {
      problem: 'Deeply mastering ML mathematics beyond high-level library abstraction.',
      approach: 'Weekly implementations from scratch: loss gradients, optimization, model selection.',
      stack: 'Python / NumPy / SciPy / Jupyter',
      status: 'COMPLETED'
    },
    evidence: '12-WEEK ROADMAP · SCRATCH IMPLEMENTATIONS · MATH FOUNDATIONS',
    metrics: [
      { label: 'Curriculum', value: '12 Weeks Structured', highlight: true },
      { label: 'Focus', value: 'Algorithms From Scratch' }
    ],
    status: 'SOURCE ONLY',
    githubUrl: 'https://github.com/mrkarthik14/faang-ml-journey',
    stars: 1,
    forks: 0,
    updatedAt: '2026-04-20',
    primaryLanguage: 'Jupyter Notebook',
    featured: false,
    priority: 82,
    visualType: 'model'
  },
  {
    id: 'TensorTonic-Solutions',
    repoName: 'TensorTonic-Solutions',
    name: 'TensorTonic-Solutions',
    displayTitle: 'TensorTonic: Fundamental ML & DL Algorithm Implementations',
    primaryCategory: 'MACHINE LEARNING',
    secondaryTags: ['PYTHON', 'NUMPY', 'DEEP LEARNING', 'MACHINE LEARNING', 'TENSOR MATH'],
    description: 'Verified programmatic solutions implementing low-level machine learning and deep learning tensor computations, matrix backpropagation, and custom loss functions.',
    readmeSummary: {
      problem: 'Validating low-level tensor algorithms against automated test suites.',
      approach: 'Direct NumPy vectorized array calculations and mathematical derivation.',
      stack: 'Python / NumPy',
      status: 'COMPLETED'
    },
    evidence: 'ALGORITHMS FROM SCRATCH · TENSOR OPERATIONS · BACKPROPAGATION',
    metrics: [
      { label: 'Platform', value: 'TensorTonic Verified', highlight: true },
      { label: 'Technique', value: 'Vectorized Implementations' }
    ],
    status: 'SOURCE ONLY',
    githubUrl: 'https://github.com/mrkarthik14/TensorTonic-Solutions',
    stars: 1,
    forks: 0,
    updatedAt: '2026-02-12',
    primaryLanguage: 'Python',
    featured: false,
    priority: 80,
    visualType: 'model'
  },

  // 4. DEEP LEARNING
  {
    id: 'SomnoVision',
    repoName: 'SomnoVision',
    name: 'SomnoVision',
    displayTitle: 'SomnoVision: Computer Vision Obstructive Sleep Apnea Screening',
    primaryCategory: 'DEEP LEARNING',
    secondaryTags: ['PYTHON', 'COMPUTER VISION', 'OPENCV', 'DEEP LEARNING', 'STREAMLIT', 'HEALTHCARE AI'],
    description: 'Automated facial morphological biomarker analysis platform utilizing computer vision, facial landmarks, and deep representations for non-invasive Obstructive Sleep Apnea (OSA) screening.',
    readmeSummary: {
      problem: 'Undiagnosed Obstructive Sleep Apnea due to expensive and cumbersome polysomnography sleep studies.',
      approach: 'Automated landmark extraction and craniofacial feature vector modeling via Streamlit.',
      stack: 'Python / OpenCV / Deep Learning / Streamlit',
      status: 'LIVE'
    },
    evidence: 'STREAMLIT LIVE APP · FACIAL LANDMARKS · CLINICAL BIOMARKERS',
    metrics: [
      { label: 'Modality', value: 'Facial Computer Vision', highlight: true },
      { label: 'Application', value: 'OSA Risk Screening' },
      { label: 'Deployment', value: 'Streamlit Cloud' }
    ],
    status: 'LIVE',
    githubUrl: 'https://github.com/mrkarthik14/SomnoVision',
    liveUrl: 'https://somnovision.streamlit.app/',
    stars: 0,
    forks: 0,
    updatedAt: '2026-06-04',
    primaryLanguage: 'Jupyter Notebook',
    featured: true,
    priority: 96,
    visualType: 'vision'
  },

  // 5. AI / GENERATIVE AI
  {
    id: 'AI-Agents',
    repoName: 'AI-Agents',
    name: 'AI-Agents',
    displayTitle: 'Autonomous AI Agents: Multi-Agent Reasoning & Tool Use',
    primaryCategory: 'AI / GEN AI',
    secondaryTags: ['PYTHON', 'AI AGENTS', 'LLM', 'TOOL CALLING', 'REASONING', 'GENERATIVE AI'],
    description: 'Architectures and exploratory implementations of autonomous generative AI agents, chain-of-thought tool execution, structured memory buffers, and agentic workflows.',
    readmeSummary: {
      problem: 'Single-turn LLMs lack persistent state, self-correction, and tool orchestration.',
      approach: 'Multi-agent coordination loops with dynamic tool invocation and prompt engineering.',
      stack: 'Python / LLM Frameworks / Jupyter',
      status: 'ACTIVE'
    },
    evidence: 'MULTI-AGENT ARCHITECTURE · PROMPT REASONING · TOOL INVOCATION',
    metrics: [
      { label: 'Architecture', value: 'Agentic Reasoning Loop', highlight: true },
      { label: 'Capabilities', value: 'Tool Use & Function Calling' }
    ],
    status: 'ACTIVE',
    githubUrl: 'https://github.com/mrkarthik14/AI-Agents',
    stars: 0,
    forks: 0,
    updatedAt: '2026-02-17',
    primaryLanguage: 'Jupyter Notebook',
    featured: true,
    priority: 90,
    visualType: 'nlp'
  },

  // 6. DATA ENGINEERING
  {
    id: 'retail-data-pipeline-adf-sqlserver-snowflake',
    repoName: 'retail-data-pipeline-adf-sqlserver-snowflake',
    name: 'retail-data-pipeline-adf-sqlserver-snowflake',
    displayTitle: 'Retail ELT Data Pipeline: Azure Data Factory, SQL Server & Snowflake',
    primaryCategory: 'DATA ENGINEERING',
    secondaryTags: ['AZURE DATA FACTORY', 'SNOWFLAKE', 'SQL SERVER', 'ETL / ELT', 'DATA PIPELINES', 'CLOUD DATA'],
    description: 'Production-grade enterprise ELT data pipeline extracting retail operational transactions from SQL Server, orchestrating ingestion via Azure Data Factory, and staging in Snowflake.',
    readmeSummary: {
      problem: 'Siloed on-premise transactional retail databases hindering unified cloud analytics.',
      approach: 'Automated ELT architecture: SQL Server extraction → ADF orchestration → Snowflake transformation.',
      stack: 'Azure Data Factory / Snowflake / SQL Server / PLpgSQL',
      status: 'COMPLETED'
    },
    evidence: 'PRODUCTION ARCHITECTURE · ADF ORCHESTRATION · SNOWFLAKE WAREHOUSE',
    metrics: [
      { label: 'Orchestrator', value: 'Azure Data Factory', highlight: true },
      { label: 'Target Warehouse', value: 'Snowflake Cloud' },
      { label: 'Source', value: 'SQL Server Enterprise' },
      { label: 'Pattern', value: 'ELT Architecture' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/retail-data-pipeline-adf-sqlserver-snowflake',
    stars: 0,
    forks: 0,
    updatedAt: '2026-05-07',
    primaryLanguage: 'PLpgSQL',
    featured: true,
    priority: 97,
    visualType: 'pipeline'
  },

  // 7. SOFTWARE ENGINEERING
  {
    id: 'a-silent-thread-react',
    repoName: 'a-silent-thread-react',
    name: 'a-silent-thread-react',
    displayTitle: 'A Silent Thread: Flowing Community Rental Architecture',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['TYPESCRIPT', 'REACT', 'TAILWIND CSS', 'FULL-STACK', 'WEB ARCHITECTURE'],
    description: 'Modern community peer-to-peer rental marketplace visualizing social connections and services as interactive thread graphs with typed schema contracts and modular state management.',
    readmeSummary: {
      problem: 'Fragmented local service exchanges lacking transparent social trust representation.',
      approach: 'Component-driven graph visualization of relationships, real-time messaging, and rental checkout.',
      stack: 'TypeScript 5.8 / React 19 / Tailwind CSS / Vite',
      status: 'LIVE'
    },
    evidence: 'LIVE PRODUCTION APP · TYPESCRIPT ARCHITECTURE · COMPONENT SYSTEM',
    metrics: [
      { label: 'Status', value: 'Live Production', highlight: true },
      { label: 'Type Safety', value: '100% Strict TypeScript' },
      { label: 'Domain', value: 'P2P Rental & Community' }
    ],
    status: 'LIVE',
    githubUrl: 'https://github.com/mrkarthik14/a-silent-thread-react',
    liveUrl: 'https://a-silent-thread.vly.site',
    stars: 1,
    forks: 0,
    updatedAt: '2026-03-01',
    primaryLanguage: 'TypeScript',
    featured: true,
    priority: 92,
    visualType: 'api'
  },
  {
    id: 'aws-serverless-dice-api',
    repoName: 'aws-serverless-dice-api',
    name: 'aws-serverless-dice-api',
    displayTitle: 'AWS Serverless REST API: Lambda, API Gateway & SAM',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['AWS LAMBDA', 'API GATEWAY', 'AWS SAM', 'PYTHON', 'SERVERLESS', 'REST API'],
    description: 'Cloud-native serverless REST API engineered with AWS Lambda, Amazon API Gateway, and Infrastructure as Code (IaC) via AWS Serverless Application Model (SAM).',
    readmeSummary: {
      problem: 'Deploying maintainable zero-idle-cost cloud endpoints without container overhead.',
      approach: 'Stateless AWS Lambda handler managed with parameterized SAM YAML declarations.',
      stack: 'AWS Lambda / API Gateway / AWS SAM / Python',
      status: 'COMPLETED'
    },
    evidence: 'AWS SAM IAC · CLOUD-NATIVE SERVERLESS · REST ENDPOINT',
    metrics: [
      { label: 'Compute', value: 'AWS Lambda Serverless', highlight: true },
      { label: 'Gateway', value: 'Amazon API Gateway' },
      { label: 'IaC', value: 'AWS SAM Template' }
    ],
    status: 'COMPLETED',
    githubUrl: 'https://github.com/mrkarthik14/aws-serverless-dice-api',
    stars: 0,
    forks: 0,
    updatedAt: '2026-07-15',
    primaryLanguage: 'Python',
    featured: false,
    priority: 84,
    visualType: 'api'
  },
  {
    id: 'Nexgile-MediOracle-Healthcare-Workforce-Portal',
    repoName: 'Nexgile-MediOracle-Healthcare-Workforce-Portal',
    name: 'Nexgile-MediOracle-Healthcare-Workforce-Portal',
    displayTitle: 'MediOracle: Enterprise Healthcare Workforce Management Portal',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['DJANGO REST FRAMEWORK', 'REACT', 'TYPESCRIPT', 'HEALTHCARE TECH', 'ENTERPRISE'],
    description: 'Healthcare operations platform connecting clinical facilities with nurses and allied professionals with AI-assisted shift dispatch, credential compliance, and exception-safe billing.',
    readmeSummary: {
      problem: 'Managing complex clinical shift scheduling and credential certifications in healthcare.',
      approach: 'Decoupled Django REST Framework API consumed by a responsive React operations portal.',
      stack: 'Django REST Framework / React / TypeScript / PostgreSQL',
      status: 'ACTIVE'
    },
    evidence: 'DJANGO REST FRAMEWORK · REACT PORTAL · WORKFORCE SCHEDULING',
    metrics: [
      { label: 'Backend', value: 'Django REST Framework', highlight: true },
      { label: 'Frontend', value: 'React + TypeScript' }
    ],
    status: 'ACTIVE',
    githubUrl: 'https://github.com/mrkarthik14/Nexgile-MediOracle-Healthcare-Workforce-Portal',
    stars: 0,
    forks: 0,
    updatedAt: '2026-09-04',
    primaryLanguage: 'TypeScript',
    featured: false,
    priority: 86,
    visualType: 'api'
  },
  {
    id: 'multi-container-app',
    repoName: 'multi-container-app',
    name: 'multi-container-app',
    displayTitle: 'Multi-Container Docker Architecture Orchestration',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['DOCKER', 'DOCKER COMPOSE', 'CONTAINERIZATION', 'MICROSERVICES', 'DEVOPS'],
    description: 'Multi-tier containerized service setup configured via Docker Compose demonstrating isolated container networking, persistent volume mounts, and service discovery.',
    readmeSummary: {
      problem: 'Simplifying local reproduction of multi-tier containerized dependencies.',
      approach: 'Declarative Docker Compose service topology with isolated internal networks.',
      stack: 'Docker / Docker Compose / Node.js / EJS',
      status: 'COMPLETED'
    },
    evidence: 'DOCKER COMPOSE · MULTI-CONTAINER ARCHITECTURE · VOLUME PERSISTENCE',
    metrics: [
      { label: 'Runtime', value: 'Docker Engine' },
      { label: 'Composition', value: 'Docker Compose YAML' }
    ],
    status: 'SOURCE ONLY',
    githubUrl: 'https://github.com/mrkarthik14/multi-container-app',
    stars: 0,
    forks: 0,
    updatedAt: '2026-07-19',
    primaryLanguage: 'EJS',
    featured: false,
    priority: 76,
    visualType: 'api'
  },
  {
    id: 'DSA_Using_Neetcode',
    repoName: 'DSA_Using_Neetcode',
    name: 'DSA_Using_Neetcode',
    displayTitle: 'Algorithms & Data Structures: NeetCode Problem Bank',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['PYTHON', 'DATA STRUCTURES', 'ALGORITHMS', 'DYNAMIC PROGRAMMING', 'COMPLEXITY ANALYSIS'],
    description: 'Systematic algorithmic implementations across dynamic programming, graph theory, trees, and two-pointer patterns with rigorous asymptotic time and space complexity evaluations.',
    readmeSummary: {
      problem: 'Mastery of foundational algorithmic paradigms and spatial efficiency.',
      approach: 'Optimal code submissions automatically synced from NeetCode.io.',
      stack: 'Python / Algorithms / Data Structures',
      status: 'ACTIVE'
    },
    evidence: 'CURATED SUBMISSIONS · ASYMPTOTIC TIME/SPACE PROOFS',
    metrics: [
      { label: 'Coverage', value: 'Arrays · Graphs · DP' },
      { label: 'Verification', value: 'Optimal O(N) Bounds' }
    ],
    status: 'ACTIVE',
    githubUrl: 'https://github.com/mrkarthik14/DSA_Using_Neetcode',
    stars: 0,
    forks: 0,
    updatedAt: '2026-08-09',
    primaryLanguage: 'Python',
    featured: false,
    priority: 72,
    visualType: 'model'
  },
  {
    id: 'LifeFlow',
    repoName: 'LifeFlow',
    name: 'LifeFlow',
    displayTitle: 'LifeFlow: Habit & Task Execution Tracker',
    primaryCategory: 'SOFTWARE ENGINEERING',
    secondaryTags: ['TYPESCRIPT', 'REACT', 'PRODUCTIVITY TECH', 'LOCAL STORAGE'],
    description: 'Minimalist habit engineering and task progression dashboard built with TypeScript and clean state persistence for daily focus.',
    readmeSummary: {
      problem: 'Building distraction-free habit logging with client-side persistence.',
      approach: 'Single-page TypeScript application with reactive state models.',
      stack: 'TypeScript / React / Vite',
      status: 'ACTIVE'
    },
    evidence: 'MODULAR COMPONENT ARCHITECTURE · PERSISTENT CLIENT STATE',
    metrics: [
      { label: 'Stack', value: 'TypeScript + React' }
    ],
    status: 'ACTIVE',
    githubUrl: 'https://github.com/mrkarthik14/LifeFlow',
    stars: 0,
    forks: 0,
    updatedAt: '2026-05-11',
    primaryLanguage: 'TypeScript',
    featured: false,
    priority: 70,
    visualType: 'api'
  }
];

export const GITHUB_IDENTITY = {
  name: 'Nayakanti Charan Karthik',
  username: 'mrkarthik14',
  githubProfileUrl: 'https://github.com/mrkarthik14',
  publicDisplayHandle: '@mrkarthik14',
  actualAccount: 'mrkarthik14',
  totalPublicRepos: 27,
  location: 'Hyderabad',
  portfolioSite: 'https://mrkarthik14.github.io'
};

// Automatic Classification Logic
export function classifyGitHubRepo(repo: any, readmeText = ''): GitHubPortfolioProject['primaryCategory'] {
  const name = (repo.name || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());
  const readme = readmeText.toLowerCase();

  const allSignals = `${name} ${desc} ${lang} ${topics.join(' ')} ${readme.slice(0, 800)}`;

  // Priority 1: DATA ANALYTICS
  if (
    allSignals.includes('power bi') ||
    allSignals.includes('tableau') ||
    allSignals.includes('dashboard') ||
    allSignals.includes('bigquery') ||
    allSignals.includes('rfm') ||
    allSignals.includes('business intelligence') ||
    allSignals.includes('analytics') ||
    allSignals.includes('dax') ||
    name.includes('zomato')
  ) {
    return 'DATA ANALYTICS';
  }

  // Priority 2: DATA SCIENCE
  if (
    allSignals.includes('a/b test') ||
    allSignals.includes('cuped') ||
    allSignals.includes('experimentation') ||
    allSignals.includes('hypothesis') ||
    allSignals.includes('data science') ||
    allSignals.includes('eda') ||
    allSignals.includes('statistics')
  ) {
    return 'DATA SCIENCE';
  }

  // Priority 3: MACHINE LEARNING
  if (
    allSignals.includes('churn') ||
    allSignals.includes('scikit-learn') ||
    allSignals.includes('xgboost') ||
    allSignals.includes('random-forest') ||
    allSignals.includes('regression') ||
    allSignals.includes('classification') ||
    allSignals.includes('machine learning') ||
    allSignals.includes('ml') ||
    allSignals.includes('tensortonic')
  ) {
    return 'MACHINE LEARNING';
  }

  // Priority 4: DEEP LEARNING
  if (
    allSignals.includes('computer vision') ||
    allSignals.includes('sleep apnea') ||
    allSignals.includes('somnovision') ||
    allSignals.includes('opencv') ||
    allSignals.includes('deep learning') ||
    allSignals.includes('pytorch') ||
    allSignals.includes('tensorflow') ||
    allSignals.includes('keras') ||
    allSignals.includes('cnn')
  ) {
    return 'DEEP LEARNING';
  }

  // Priority 5: AI / GEN AI
  if (
    allSignals.includes('agent') ||
    allSignals.includes('ai-agent') ||
    allSignals.includes('generative ai') ||
    allSignals.includes('llm') ||
    allSignals.includes('langchain') ||
    allSignals.includes('rag')
  ) {
    return 'AI / GEN AI';
  }

  // Priority 6: DATA ENGINEERING
  if (
    allSignals.includes('data pipeline') ||
    allSignals.includes('etl') ||
    allSignals.includes('elt') ||
    allSignals.includes('azure data factory') ||
    allSignals.includes('snowflake') ||
    allSignals.includes('sql server') ||
    allSignals.includes('spark') ||
    allSignals.includes('pyspark')
  ) {
    return 'DATA ENGINEERING';
  }

  // Priority 7: SOFTWARE ENGINEERING
  return 'SOFTWARE ENGINEERING';
}
