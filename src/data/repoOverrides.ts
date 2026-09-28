export interface RepoOverride {
  category?: string;
  featured?: boolean;
  priority?: number;
  displayTitle?: string;
  shortDescription?: string;
  tags?: string[];
  metrics?: { label: string; value: string; highlight?: boolean }[];
  evidence?: string;
  liveUrl?: string;
  visualType?: 'dashboard' | 'pipeline' | 'model' | 'vision' | 'api' | 'nlp' | 'metrics';
}

export const GITHUB_REPO_OVERRIDES: Record<string, RepoOverride> = {
  // 1. DATA SCIENCE
  'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing': {
    category: 'DATA SCIENCE',
    featured: true,
    priority: 100,
    displayTitle: 'A/B Testing Analysis: E-Commerce Recommendation Optimization',
    shortDescription: 'Rigorous statistical experimentation comparing heuristic recommendation algorithms against baseline controls using CUPED variance reduction and bootstrap hypothesis testing.',
    tags: ['PYTHON', 'PANDAS', 'NUMPY', 'SCIPY', 'A/B TESTING', 'STATISTICS', 'STREAMLIT'],
    evidence: '50,000 USERS · 237,000 SESSIONS · CUPED VARIANCE REDUCTION',
    metrics: [
      { label: 'Conversion Lift', value: '+8.45%', highlight: true },
      { label: 'P-Value', value: 'p < 0.001', highlight: true },
      { label: 'Statistical Power', value: '0.88' },
      { label: 'Baseline → Variant', value: '15.1% → 16.4%' }
    ],
    visualType: 'dashboard'
  },
  'marketplace-insights-dashboard': {
    category: 'DATA SCIENCE',
    featured: true,
    priority: 95,
    displayTitle: 'Marketplace Insights: Strategic E-Commerce Analytics',
    shortDescription: 'Data-driven marketplace intelligence exploring e-commerce transaction patterns, vendor performance distributions, discount elasticity, and unit economics.',
    tags: ['PYTHON', 'PANDAS', 'STREAMLIT', 'PLOTLY', 'EDA', 'BUSINESS INTELLIGENCE'],
    evidence: '5 ACTIONABLE BUSINESS INSIGHTS · 10,000+ TRANSACTIONS',
    metrics: [
      { label: 'Actionable Insights', value: '5 Strategic', highlight: true },
      { label: 'Visual Depth', value: '12+ Interactive' },
      { label: 'Framework', value: 'Streamlit + Plotly' }
    ],
    visualType: 'dashboard'
  },

  // 2. DATA ANALYTICS
  'retail-bigquery-analytics': {
    category: 'DATA ANALYTICS',
    featured: true,
    priority: 98,
    displayTitle: 'Retail Fashion Analytics: Google BigQuery & SQL Platform',
    shortDescription: 'Enterprise retail intelligence system querying high-volume fashion e-commerce records via Google BigQuery, window analytical functions, and RFM customer segmentation.',
    tags: ['SQL', 'GOOGLE BIGQUERY', 'PYTHON', 'STREAMLIT', 'RFM ANALYSIS', 'ANALYTICS'],
    evidence: 'BIGQUERY SQL · WINDOW FUNCTIONS · RFM SEGMENTATION',
    metrics: [
      { label: 'Engine', value: 'Google BigQuery', highlight: true },
      { label: 'Query Latency', value: '< 1.4s' },
      { label: 'Segmentation', value: 'RFM + Cohorts' },
      { label: 'Interface', value: 'Streamlit' }
    ],
    visualType: 'dashboard'
  },
  'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard': {
    category: 'DATA ANALYTICS',
    featured: true,
    priority: 94,
    displayTitle: 'ICC T20 World Cup 2022: Player Impact & Batting Analytics',
    shortDescription: 'Dynamic Power BI intelligence dashboard analyzing ball-by-ball tournament outcomes, dot-ball pressure indices, boundary percentages, and dimensional star-schema modeling.',
    tags: ['POWER BI', 'DAX', 'SQL', 'PYTHON', 'SPORTS ANALYTICS', 'STAR SCHEMA'],
    evidence: '200+ PLAYERS · 45+ MATCHES · STAR SCHEMA DAX',
    metrics: [
      { label: 'Players Analyzed', value: '200+ Athletes', highlight: true },
      { label: 'Visual Dashboards', value: '15+ Views' },
      { label: 'Data Model', value: 'Dimensional Star' }
    ],
    visualType: 'dashboard'
  },
  'Credit-Card-Fraud-Risk-Analysis': {
    category: 'DATA ANALYTICS',
    featured: false,
    priority: 85,
    displayTitle: 'Credit Card Fraud Risk Analysis & Detection Platform',
    shortDescription: 'Financial transaction fraud surveillance system identifying anomalous purchase vectors, risk scoring thresholds, and cardholder behavioral variance.',
    tags: ['PYTHON', 'PANDAS', 'POWER BI', 'STREAMLIT', 'FRAUD ANALYTICS', 'RISK MODELING'],
    evidence: 'STREAMLIT PLATFORM · RISK SCORING · ANOMALY DETECTION',
    metrics: [
      { label: 'Risk Profiling', value: 'Multi-Factor', highlight: true },
      { label: 'Stack', value: 'Python + Power BI' },
      { label: 'Deploy', value: 'Streamlit Cloud' }
    ],
    visualType: 'metrics'
  },
  'Zomato-data': {
    category: 'DATA ANALYTICS',
    featured: false,
    priority: 70,
    displayTitle: 'Zomato Restaurant Data: Exploratory Market Analytics',
    shortDescription: 'Exploratory data analysis uncovering dining price distributions, rating determinants, cuisine cluster preferences, and locality market densities.',
    tags: ['PYTHON', 'PANDAS', 'SEABORN', 'MATPLOTLIB', 'EDA', 'RESTAURANT ANALYTICS'],
    evidence: 'JUPYTER EDA · PRICE-TO-RATING CORRELATION · GEOLOCAL DENSITY',
    metrics: [
      { label: 'Analysis Type', value: 'Bivariate & Multivariate' },
      { label: 'Cuisine Density', value: 'Citywide Clustering' }
    ],
    visualType: 'dashboard'
  },
  'Power-BI-projects': {
    category: 'DATA ANALYTICS',
    featured: false,
    priority: 75,
    displayTitle: 'Power BI Business Intelligence Portfolio',
    shortDescription: 'Curated repository of executive KPI reporting dashboards, DAX calculated measures, star-schema data modeling, and corporate BI visualizations.',
    tags: ['POWER BI', 'DAX', 'BUSINESS INTELLIGENCE', 'DATA MODELING', 'EXECUTIVE KPIS'],
    evidence: 'DAX MEASURES · STAR SCHEMA · EXECUTIVE KPI DRILL-DOWN',
    metrics: [
      { label: 'Tooling', value: 'Power BI Desktop + Service' },
      { label: 'Modeling', value: 'Star Schema & DAX' }
    ],
    visualType: 'dashboard'
  },

  // 3. MACHINE LEARNING
  'telco-churn-prediction-customer-churn-prediction': {
    category: 'MACHINE LEARNING',
    featured: true,
    priority: 99,
    displayTitle: 'Telco Customer Churn Prediction: End-to-End ML Pipeline',
    shortDescription: 'Production-ready ML classification pipeline predicting 30-60 day telecom subscriber attrition with feature engineering, cost-sensitive threshold tuning, and FastAPI simulation.',
    tags: ['PYTHON', 'SCIKIT-LEARN', 'XGBOOST', 'PANDAS', 'FASTAPI', 'ML PIPELINE'],
    evidence: 'END-TO-END PIPELINE · FEATURE ENGINEERING · FASTAPI SERVICE',
    metrics: [
      { label: 'Model Horizon', value: '30-60 Days', highlight: true },
      { label: 'Algorithms', value: 'XGBoost · RF · Logistic' },
      { label: 'Deployment', value: 'FastAPI REST Service' }
    ],
    visualType: 'model'
  },
  'Defect-Detection-in-Hot-Rolling': {
    category: 'MACHINE LEARNING',
    featured: true,
    priority: 93,
    displayTitle: 'Tata Steel AI: Defect Detection in Hot Rolling Process',
    shortDescription: 'Industrial binary classification system predicting defective steel coils during continuous hot rolling manufacturing using 49 high-frequency sensor and pyrometer telemetry features.',
    tags: ['PYTHON', 'MACHINE LEARNING', 'INDUSTRIAL AI', 'SCIKIT-LEARN', 'FEATURE SELECTION', 'TELEMETRY'],
    evidence: 'TATA STEEL HACKATHON · 49 SENSOR FEATURES · INDUSTRIAL CLASSIFICATION',
    metrics: [
      { label: 'Task', value: 'Binary Coil Defect Detection', highlight: true },
      { label: 'Feature Space', value: '49 Sensor Streams' },
      { label: 'Target', value: 'Clean (Y=0) vs Defective (Y=1)' }
    ],
    visualType: 'model'
  },
  'END-2-END-ML-PROJECT-WITH-DEPLOYMENT': {
    category: 'MACHINE LEARNING',
    featured: false,
    priority: 88,
    displayTitle: 'Forest Fire Intensity Prediction: End-to-End ML & Flask',
    shortDescription: 'End-to-end regression machine learning workflow modeling environmental conditions to forecast wildfire risk index, packaged with Flask web application deployment.',
    tags: ['PYTHON', 'MACHINE LEARNING', 'FLASK', 'SCIKIT-LEARN', 'REGRESSION', 'MODEL DEPLOYMENT'],
    evidence: 'FULL LIFECYCLE · EDA → FEATURE PIPELINE → FLASK APP',
    metrics: [
      { label: 'Workflow', value: 'End-to-End Lifecycle' },
      { label: 'Serving', value: 'Flask Web App' }
    ],
    visualType: 'model'
  },
  'faang-ml-journey': {
    category: 'MACHINE LEARNING',
    featured: false,
    priority: 82,
    displayTitle: 'FAANG ML Mastery: Core Machine Learning From Scratch',
    shortDescription: '12-week comprehensive roadmap implementing core ML algorithms from first mathematical principles, loss function gradients, convex optimization, and production thinking.',
    tags: ['PYTHON', 'MATHEMATICS', 'ALGORITHMS FROM SCRATCH', 'NUMPY', 'OPTIMIZATION'],
    evidence: '12-WEEK ROADMAP · SCRATCH IMPLEMENTATIONS · MATH FOUNDATIONS',
    metrics: [
      { label: 'Curriculum', value: '12 Weeks Structured' },
      { label: 'Focus', value: 'Algorithms From Scratch' }
    ],
    visualType: 'model'
  },
  'TensorTonic-Solutions': {
    category: 'MACHINE LEARNING',
    featured: false,
    priority: 80,
    displayTitle: 'TensorTonic: Fundamental ML & DL Algorithm Implementations',
    shortDescription: 'Verified programmatic solutions implementing low-level machine learning and deep learning tensor computations, matrix backpropagation, and custom loss functions.',
    tags: ['PYTHON', 'NUMPY', 'DEEP LEARNING', 'MACHINE LEARNING', 'TENSOR MATH'],
    evidence: 'ALGORITHMS FROM SCRATCH · TENSOR OPERATIONS · BACKPROPAGATION',
    metrics: [
      { label: 'Platform', value: 'TensorTonic Verified' },
      { label: 'Technique', value: 'Vectorized Implementations' }
    ],
    visualType: 'model'
  },

  // 4. DEEP LEARNING
  'SomnoVision': {
    category: 'DEEP LEARNING',
    featured: true,
    priority: 96,
    displayTitle: 'SomnoVision: Computer Vision Obstructive Sleep Apnea Screening',
    shortDescription: 'Automated facial morphological biomarker analysis platform utilizing computer vision, facial landmarks, and deep representations for non-invasive Obstructive Sleep Apnea (OSA) screening.',
    tags: ['PYTHON', 'COMPUTER VISION', 'OPENCV', 'DEEP LEARNING', 'STREAMLIT', 'HEALTHCARE AI'],
    evidence: 'STREAMLIT LIVE APP · FACIAL LANDMARKS · CLINICAL BIOMARKERS',
    metrics: [
      { label: 'Modality', value: 'Facial Computer Vision', highlight: true },
      { label: 'Application', value: 'OSA Risk Screening' },
      { label: 'Deployment', value: 'Streamlit Cloud' }
    ],
    visualType: 'vision',
    liveUrl: 'https://somnovision.streamlit.app/'
  },

  // 5. AI / GENERATIVE AI
  'AI-Agents': {
    category: 'AI / GEN AI',
    featured: true,
    priority: 90,
    displayTitle: 'Autonomous AI Agents: Multi-Agent Reasoning & Tool Use',
    shortDescription: 'Architectures and exploratory implementations of autonomous generative AI agents, chain-of-thought tool execution, structured memory buffers, and agentic workflows.',
    tags: ['PYTHON', 'AI AGENTS', 'LLM', 'TOOL CALLING', 'REASONING', 'GENERATIVE AI'],
    evidence: 'MULTI-AGENT ARCHITECTURE · PROMPT REASONING · TOOL INVOCATION',
    metrics: [
      { label: 'Architecture', value: 'Agentic Reasoning Loop', highlight: true },
      { label: 'Capabilities', value: 'Tool Use & Function Calling' }
    ],
    visualType: 'nlp'
  },

  // 6. DATA ENGINEERING
  'retail-data-pipeline-adf-sqlserver-snowflake': {
    category: 'DATA ENGINEERING',
    featured: true,
    priority: 97,
    displayTitle: 'Retail ELT Data Pipeline: Azure Data Factory, SQL Server & Snowflake',
    shortDescription: 'Production-grade enterprise ELT data pipeline extracting retail operational transactions from SQL Server, orchestrating ingestion via Azure Data Factory, and staging in Snowflake.',
    tags: ['AZURE DATA FACTORY', 'SNOWFLAKE', 'SQL SERVER', 'ETL / ELT', 'DATA PIPELINES', 'CLOUD DATA'],
    evidence: 'PRODUCTION ARCHITECTURE · ADF ORCHESTRATION · SNOWFLAKE WAREHOUSE',
    metrics: [
      { label: 'Orchestrator', value: 'Azure Data Factory', highlight: true },
      { label: 'Target Warehouse', value: 'Snowflake Cloud' },
      { label: 'Source', value: 'SQL Server Enterprise' },
      { label: 'Pattern', value: 'ELT Architecture' }
    ],
    visualType: 'pipeline'
  },

  // 7. SOFTWARE ENGINEERING
  'a-silent-thread-react': {
    category: 'SOFTWARE ENGINEERING',
    featured: true,
    priority: 92,
    displayTitle: 'A Silent Thread: Flowing Community Rental Architecture',
    shortDescription: 'Modern community peer-to-peer rental marketplace visualizing social connections and services as interactive thread graphs with typed schema contracts and modular state management.',
    tags: ['TYPESCRIPT', 'REACT', 'TAILWIND CSS', 'FULL-STACK', 'WEB ARCHITECTURE'],
    evidence: 'LIVE PRODUCTION APP · TYPESCRIPT ARCHITECTURE · COMPONENT SYSTEM',
    metrics: [
      { label: 'Status', value: 'Live Production', highlight: true },
      { label: 'Type Safety', value: '100% Strict TypeScript' },
      { label: 'Domain', value: 'P2P Rental & Community' }
    ],
    visualType: 'api',
    liveUrl: 'https://a-silent-thread.vly.site'
  },
  'aws-serverless-dice-api': {
    category: 'SOFTWARE ENGINEERING',
    featured: false,
    priority: 84,
    displayTitle: 'AWS Serverless REST API: Lambda, API Gateway & SAM',
    shortDescription: 'Cloud-native serverless REST API engineered with AWS Lambda, Amazon API Gateway, and Infrastructure as Code (IaC) via AWS Serverless Application Model (SAM).',
    tags: ['AWS LAMBDA', 'API GATEWAY', 'AWS SAM', 'PYTHON', 'SERVERLESS', 'REST API'],
    evidence: 'AWS SAM IAC · CLOUD-NATIVE SERVERLESS · REST ENDPOINT',
    metrics: [
      { label: 'Compute', value: 'AWS Lambda Serverless', highlight: true },
      { label: 'Gateway', value: 'Amazon API Gateway' },
      { label: 'IaC', value: 'AWS SAM Template' }
    ],
    visualType: 'api'
  },
  'Nexgile-MediOracle-Healthcare-Workforce-Portal': {
    category: 'SOFTWARE ENGINEERING',
    featured: false,
    priority: 86,
    displayTitle: 'MediOracle: Enterprise Healthcare Workforce Management Portal',
    shortDescription: 'Healthcare operations platform connecting clinical facilities with nurses and allied professionals with AI-assisted shift dispatch, credential compliance, and exception-safe billing.',
    tags: ['DJANGO REST FRAMEWORK', 'REACT', 'TYPESCRIPT', 'HEALTHCARE TECH', 'ENTERPRISE'],
    evidence: 'DJANGO REST FRAMEWORK · REACT PORTAL · WORKFORCE SCHEDULING',
    metrics: [
      { label: 'Backend', value: 'Django REST Framework', highlight: true },
      { label: 'Frontend', value: 'React + TypeScript' }
    ],
    visualType: 'api'
  },
  'multi-container-app': {
    category: 'SOFTWARE ENGINEERING',
    featured: false,
    priority: 76,
    displayTitle: 'Multi-Container Docker Architecture Orchestration',
    shortDescription: 'Multi-tier containerized service setup configured via Docker Compose demonstrating isolated container networking, persistent volume mounts, and service discovery.',
    tags: ['DOCKER', 'DOCKER COMPOSE', 'CONTAINERIZATION', 'MICROSERVICES', 'DEVOPS'],
    evidence: 'DOCKER COMPOSE · MULTI-CONTAINER ARCHITECTURE · VOLUME PERSISTENCE',
    metrics: [
      { label: 'Runtime', value: 'Docker Engine' },
      { label: 'Composition', value: 'Docker Compose YAML' }
    ],
    visualType: 'api'
  },
  'DSA_Using_Neetcode': {
    category: 'SOFTWARE ENGINEERING',
    featured: false,
    priority: 72,
    displayTitle: 'Algorithms & Data Structures: NeetCode Problem Bank',
    shortDescription: 'Systematic algorithmic implementations across dynamic programming, graph theory, trees, and two-pointer patterns with rigorous asymptotic time and space complexity evaluations.',
    tags: ['PYTHON', 'DATA STRUCTURES', 'ALGORITHMS', 'DYNAMIC PROGRAMMING', 'COMPLEXITY ANALYSIS'],
    evidence: 'CURATED SUBMISSIONS · ASYMPTOTIC TIME/SPACE PROOFS',
    metrics: [
      { label: 'Coverage', value: 'Arrays · Graphs · DP' },
      { label: 'Verification', value: 'Optimal O(N) Bounds' }
    ],
    visualType: 'model'
  },
  'LifeFlow': {
    category: 'SOFTWARE ENGINEERING',
    featured: false,
    priority: 70,
    displayTitle: 'LifeFlow: Habit & Task Execution Tracker',
    shortDescription: 'Minimalist habit engineering and task progression dashboard built with TypeScript and clean state persistence for daily focus.',
    tags: ['TYPESCRIPT', 'REACT', 'PRODUCTIVITY TECH', 'LOCAL STORAGE'],
    evidence: 'MODULAR COMPONENT ARCHITECTURE · PERSISTENT CLIENT STATE',
    metrics: [
      { label: 'Stack', value: 'TypeScript + React' }
    ],
    visualType: 'api'
  }
};
