import { Project, Capability, ProcessStep } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'ab-testing-ecommerce',
    number: '01',
    title: 'A/B Testing Analysis: E-Commerce Recommendation Optimization',
    category: 'EXPERIMENTATION / DATA SCIENCE',
    status: 'COMPLETED',
    description:
      'Rigorous statistical experimentation evaluating algorithm-driven recommendation modules against baseline heuristics. Controlled for pre-experiment variance with CUPED and evaluated guardrail metric safety across user segments.',
    evidence: '50,000 USERS · 237,000 SESSIONS · 3-WEEK EXPERIMENT',
    tools: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Seaborn', 'Streamlit'],
    methodology: [
      'Two-sample proportion Z-tests',
      'Confidence intervals (95% bootstrap & Wilson score)',
      'CUPED variance reduction technique',
      'Bayesian probability of being best',
      'Multi-factor cohort segmentation',
      'Guardrail metrics (latency, bounce rate)'
    ],
    keyResults: [
      { label: 'Conversion Lift', value: '+8.45%', highlight: true },
      { label: 'Baseline → Variant', value: '15.12% → 16.40%' },
      { label: 'P-Value', value: 'p < 0.001', highlight: true },
      { label: 'Statistical Power', value: '0.88 (β = 0.12)' }
    ],
    githubUrl: 'https://github.com/mrkarthik14/Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    liveUrl: 'https://github.com/mrkarthik14/Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
    codeSnippet: {
      filename: 'experiment_stats.py',
      language: 'python',
      code: `def calculate_cuped(df, metric_col, covariate_col):
    theta = df[metric_col].cov(df[covariate_col]) / df[covariate_col].var()
    df['cuped_metric'] = df[metric_col] - theta * (df[covariate_col] - df[covariate_col].mean())
    z_stat, p_val = stats.ttest_ind(
        df[df['group'] == 'treatment']['cuped_metric'],
        df[df['group'] == 'control']['cuped_metric'],
        equal_var=False
    )
    return {'theta': round(theta, 4), 'p_value': p_val, 'lift_pct': 8.45}`
    }
  },
  {
    id: 'icc-t20-analytics',
    number: '02',
    title: 'ICC T20 World Cup 2022 Player Performance Analytics',
    category: 'SPORTS ANALYTICS / BUSINESS INTELLIGENCE',
    status: 'COMPLETED',
    description:
      'Comprehensive sports intelligence dashboard dissecting match outcomes, batting boundary percentages, dot-ball pressure indices, and phase-wise bowling economies using enterprise Power BI and dimensional star schema.',
    evidence: '200+ PLAYERS · 45+ MATCHES · 15+ VISUALIZATIONS',
    tools: ['Power BI', 'DAX', 'SQL Server', 'Python'],
    methodology: [
      'Dimensional Star-Schema data modelling',
      'Row-Level Security (RLS) policies',
      'Incremental data refresh orchestration',
      'Phase analysis: Powerplay vs Death overs',
      'Composite player impact scoring formula'
    ],
    keyResults: [
      { label: 'Report Performance', value: '60% Faster', highlight: true },
      { label: 'Data Refresh Time', value: '75% Reduction', highlight: true },
      { label: 'Matches Analyzed', value: '45+ Matches' },
      { label: 'Custom Measures', value: '38 DAX formulas' }
    ],
    githubUrl: 'https://github.com/mrkarthik14',
    codeSnippet: {
      filename: 'player_impact.dax',
      language: 'dax',
      code: `Player Impact Index = 
VAR TotalRuns = SUM(Fact_BallByBall[RunsScored])
VAR BallsFaced = COUNTROWS(Fact_BallByBall)
VAR StrikeRate = DIVIDE(TotalRuns, BallsFaced, 0) * 100
VAR BoundaryPct = DIVIDE(CALCULATE(COUNT(Fact_BallByBall[IsBoundary]), Fact_BallByBall[IsBoundary] = 1), BallsFaced, 0)
RETURN
    (StrikeRate * 0.40) + (BoundaryPct * 100 * 0.35) + ([WicketsImpact] * 0.25)`
    }
  },
  {
    id: 'credit-card-fraud-risk',
    number: '03',
    title: 'Credit Card Fraud Risk Analysis & Detection',
    category: 'FRAUD ANALYTICS',
    status: 'COMPLETED',
    description:
      'Automated transaction anomaly scanner and risk stratification system. Processed high-volume noisy credit records to isolate fraudulent signatures, geofence disparities, and rapid velocity spikes.',
    evidence: '10,000+ TRANSACTIONS · 28% DATA ISSUES PROCESSED',
    tools: ['Power BI', 'Power Query', 'DAX'],
    methodology: [
      'Data hygiene and imputation pipelines in Power Query',
      'Multi-factor anomaly scoring thresholds',
      'Rolling transaction velocity analysis',
      'Risk index quartile distribution'
    ],
    keyResults: [
      { label: 'High-Risk Transactions', value: '15% Isolated', highlight: true },
      { label: 'Dashboard Performance', value: '+35% Improvement' },
      { label: 'Metric Accuracy Lift', value: '+22% Accuracy', highlight: true },
      { label: 'Cleaned Records', value: '10,000+ Rows' }
    ],
    githubUrl: 'https://github.com/mrkarthik14'
  },
  {
    id: 'call-center-insights',
    number: '04',
    title: 'Call Center Insights: Operational Efficiency',
    category: 'DATA ANALYTICS / BI',
    status: 'COMPLETED',
    description:
      'Granular performance audit across operational telephonic logs. Identified call arrival surge windows, resolution bottlenecks, and agent idle distributions to optimize staffing rosters.',
    evidence: '50K+ CALL LOGS',
    tools: ['Excel', 'SQL', 'Tableau', 'Power BI'],
    isTypographicOnly: true,
    statNumber: '50K+',
    statLabel: 'CALL LOGS ANALYZED',
    methodology: [
      'Call volume time-series decomposition',
      'Queue arrival Poisson distribution modelling',
      'Agent resolution time standardization',
      'Customer satisfaction (CSAT) regression correlation'
    ],
    keyResults: [
      { label: 'Agent Allocation Efficiency', value: '+30%', highlight: true },
      { label: 'Response Time Reduction', value: '-15%', highlight: true },
      { label: 'Call Records', value: '50,000+' },
      { label: 'Target SLA Met', value: '94.2%' }
    ],
    githubUrl: 'https://github.com/mrkarthik14'
  },
  {
    id: 'customer-retention-intelligence',
    number: '05',
    title: 'Customer Retention & Churn Predictive Intelligence',
    category: 'MACHINE LEARNING / E-COMMERCE',
    status: 'ONGOING',
    description:
      'Predictive churn classification pipeline analyzing customer repurchase decay curves, feature importance ranking, and dynamic risk cohort clustering for e-commerce lifetime value preservation.',
    evidence: '100K+ RECORDS · CUSTOMER CHURN · RETENTION ANALYTICS',
    tools: ['Python', 'Scikit-Learn', 'Pandas', 'XGBoost', 'Machine Learning'],
    isTypographicOnly: true,
    statNumber: '100K+',
    statLabel: 'ACTIVE RECORDS',
    methodology: [
      'Feature engineering from RFM (Recency, Frequency, Monetary) telemetry',
      'Survival curve estimation for churn inflection points',
      'SHAP value interpretability for customer health scores',
      'Class imbalance correction (SMOTE & focal loss tuning)'
    ],
    keyResults: [
      { label: 'Project Status', value: 'ONGOING', highlight: true },
      { label: 'Telemetry Records', value: '100,000+' },
      { label: 'Risk Cohorts', value: '4 Tiers' },
      { label: 'Core Objective', value: 'Early Churn Flagging' }
    ],
    githubUrl: 'https://github.com/mrkarthik14'
  },
  {
    id: 'fullstack-experimental',
    number: '06',
    title: 'Full-Stack Systems & Experimental Products',
    category: 'FULL-STACK / SYSTEM ARCHITECTURE',
    status: 'PRODUCTION',
    description:
      'Applied software product experiments including A Silent Thread, Rent My Life, and AI Mentor. Built with robust REST microservice backends, clean relational schemas, and responsive interfaces.',
    evidence: '3 LIVE APPS · FLASK · SUPABASE/POSTGRESQL · DOCKER',
    tools: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'REST APIs', 'Supabase'],
    methodology: [
      'Stateless JWT session authentication',
      'Relational data normalisation & indexing in PostgreSQL',
      'Docker containerized microservices for zero-drift deployment',
      'Real-time streaming and event pub/sub hooks'
    ],
    keyResults: [
      { label: 'Selected Products', value: '3 Systems', highlight: true },
      { label: 'Architecture', value: 'Flask + PostgreSQL' },
      { label: 'Deployment', value: 'Docker Containerized' },
      { label: 'API Protocols', value: 'RESTful Endpoints' }
    ],
    githubUrl: 'https://github.com/mrkarthik14',
    codeSnippet: {
      filename: 'app_service.py',
      language: 'python',
      code: `@app.route('/api/v1/mentor/infer', methods=['POST'])
@token_required
def handle_inference(current_user):
    payload = request.get_json()
    validated = schema.validate(payload)
    pipeline_result = ai_engine.dispatch(
        context=validated['context'],
        user_tier=current_user.tier
    )
    db.session.add(TelemetryLog(user_id=current_user.id, tokens=pipeline_result.cost))
    db.session.commit()
    return jsonify(pipeline_result.to_dict()), 200`
    }
  }
];

export const CAPABILITIES: Capability[] = [
  {
    id: 'data-analytics',
    index: '01',
    title: 'DATA ANALYTICS',
    durationChip: 'ANALYSE → VISUALISE',
    description:
      'Cleaning data, exploratory analysis, KPI systems, reporting, dashboards and decision-oriented insights.',
    deliverables: ['SQL', 'PYTHON', 'POWER BI', 'DAX', 'VISUALISATION'],
    iconType: 'analytics'
  },
  {
    id: 'machine-learning',
    index: '02',
    title: 'MACHINE LEARNING',
    durationChip: 'DATA → MODEL',
    description:
      'Supervised learning, feature engineering, model evaluation and practical predictive systems.',
    deliverables: ['SCIKIT-LEARN', 'PANDAS', 'NUMPY', 'MODEL EVALUATION', 'EXPERIMENTATION'],
    iconType: 'ml'
  },
  {
    id: 'ai-gen-ai',
    index: '03',
    title: 'AI / GEN AI',
    durationChip: 'IDEA → PROTOTYPE',
    description:
      'Applied AI experimentation, NLP, LLM systems and AI-powered product ideas.',
    deliverables: ['NLP', 'LLM', 'RAG', 'AI SYSTEMS', 'PROTOTYPING'],
    iconType: 'ai'
  },
  {
    id: 'software-engineering',
    index: '04',
    title: 'SOFTWARE / DATA ENGINEERING',
    durationChip: 'BUILD → DEPLOY',
    description:
      'APIs, databases, backend systems, dashboards and deployable technical products.',
    deliverables: ['PYTHON', 'FLASK', 'SQL', 'POSTGRESQL', 'DOCKER'],
    iconType: 'engineering'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: '00',
    title: 'DEFINE',
    stageName: 'QUESTION',
    summary: 'Isolate the core engineering or business problem. Quantify the target KPI before touching data.',
    actions: ['Establish hypothesis & success criteria', 'Define minimum detectable effect (MDE)', 'Audit operational guardrails'],
    metricFocus: 'Problem Scoping & KPI Formulation'
  },
  {
    index: '01',
    title: 'EXPLORE',
    stageName: 'DATA',
    summary: 'Audit schemas, profile missingness, detect outliers, and engineer baseline analytical features.',
    actions: ['Exploratory data analysis (EDA)', 'Distribution checks & outlier handling', 'Normalization & dimensional star schemas'],
    metricFocus: 'Data Quality & Feature Fidelity'
  },
  {
    index: '02',
    title: 'EXPERIMENT',
    stageName: 'MODEL',
    summary: 'Formulate hypotheses, train models, conduct A/B testing with statistical variance reduction.',
    actions: ['Model training & cross-validation', 'CUPED & Bayesian significance checks', 'Feature importance & SHAP explainability'],
    metricFocus: 'Statistical Power & Model Robustness'
  },
  {
    index: '03',
    title: 'BUILD',
    stageName: 'BUILD',
    summary: 'Architect resilient APIs, modular pipeline scripts, and interactive executive dashboards.',
    actions: ['Flask/FastAPI microservices', 'Power BI / Tableau DAX measures', 'Dockerized workflow orchestration'],
    metricFocus: 'Production Readiness & Latency'
  },
  {
    index: '04',
    title: 'ITERATE',
    stageName: 'MEASURE',
    summary: 'Monitor production drift, validate lift against control groups, and iterate continuously.',
    actions: ['Post-experiment verification', 'Telemetry auditing & error monitoring', 'Continuous feedback integration'],
    metricFocus: 'Realized Lift & Ongoing Precision'
  }
];

export const TECH_CHIPS = [
  'PYTHON',
  'SQL',
  'PANDAS',
  'NUMPY',
  'SCIKIT-LEARN',
  'POWER BI',
  'DAX',
  'TABLEAU',
  'EXCEL',
  'MATPLOTLIB',
  'SEABORN',
  'POSTGRESQL',
  'MYSQL',
  'GIT',
  'GITHUB',
  'DOCKER',
  'AWS',
  'FLASK',
  'FASTAPI',
  'JUPYTER',
  'PYSPARK',
  'MACHINE LEARNING',
  'NLP',
  'GEN AI'
];
