/*
 * The graph of the site. Edit this file to add, remove, or change nodes.
 *
 * Node fields (all optional except id + label):
 *   id        url-safe id, used in the address bar (#/projects/graphrag)
 *   label     text under the node
 *   icon      one of the icon names in app.js (ICONS)
 *   kicker    small caps line above the panel title
 *   title     panel title (defaults to label)
 *   subtitle  one-line summary under the title
 *   teaser    short text on the ghost preview while you drag toward the node
 *   body      array of paragraphs (HTML allowed)
 *   bullets   array of bullet points (HTML allowed)
 *   list      [{ title, meta, text }]
 *   groups    [{ name, items: [] }]
 *   tags      []
 *   links     [{ label, href }]  — links without an href are skipped
 *   soon      true → panel shows "Coming soon"
 *   children  [nodes]
 */
window.GRAPH = {
  id: 'start',
  label: 'Start',
  icon: 'start',
  kicker: 'Hello, I am',
  title: 'Damir Sarsengaliyev',
  subtitle: 'Data Scientist at Freedom Holding Corp. Statistics, machine learning, and LLMs.',
  body: [
    'This site is a graph of my life. Every node is a piece of the story: where I studied, where I work, what I research and build, and how to reach me.',
  ],
  children: [
    {
      id: 'about',
      label: 'About',
      icon: 'user',
      kicker: 'Who I am',
      title: 'About me',
      teaser: 'Education, skills, life',
      body: [
        'I am a Data Scientist at Freedom Holding Corp. in Almaty, building matching, churn, and customer-insight models used across millions of users.',
        'I graduated from Nazarbayev University in 2025 with a BSc in Computer Science, ranked 9th of 255. Along the way I did research on speech and multimodal ML, and worked as a software and data engineer. I like problems where careful statistics meets messy real-world data.',
      ],
      children: [
        {
          id: 'education',
          label: 'Education',
          icon: 'cap',
          kicker: 'About · Education',
          title: 'Education',
          teaser: 'Nazarbayev University · top 3.5%',
          list: [
            {
              title: 'BSc Computer Science',
              meta: 'Nazarbayev University · Astana · Graduated June 2025',
              text: 'GPA 3.61 / 4, ranked 9th of 255 (top 3.5%). Dean’s List: Spring 2023, Fall 2024, Spring 2025.',
            },
          ],
          groups: [
            {
              name: 'Relevant coursework',
              items: ['Machine Learning: Theory and Practice', 'Deep Learning', 'Generative AI', 'Database Systems', 'Probability', 'Artificial Intelligence', 'Algorithms'],
            },
          ],
        },
        {
          id: 'skills',
          label: 'Skills',
          icon: 'bolt',
          kicker: 'About · Skills',
          title: 'Skills',
          teaser: 'Python, ML, speech, LLMs',
          groups: [
            { name: 'Programming', items: ['Python', 'SQL', 'Java', 'C++'] },
            { name: 'Statistics and data analysis', items: ['Hypothesis testing', 'Time series (Granger causality)', 'Experimental design', 'DuckDB'] },
            { name: 'Machine learning', items: ['Supervised & unsupervised learning', 'XGBoost', 'LightGBM', 'CatBoost', 'K-Means', 'PCA', 'UMAP', 't-SNE', 'Model evaluation & tuning'] },
            { name: 'NLP, speech and LLMs', items: ['Hugging Face Transformers', 'RAG', 'FAISS', 'Neo4j', 'Whisper / WhisperX', 'Pyannote'] },
            { name: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'SciPy'] },
            { name: 'Engineering', items: ['Java Spring Boot', 'Camunda / BPMN', 'Angular', 'PostgreSQL', 'REST APIs', 'Git'] },
          ],
        },
        {
          id: 'life',
          label: 'Beyond work',
          icon: 'heart',
          kicker: 'About · Life',
          title: 'Beyond work',
          teaser: 'Languages and clubs',
          groups: [
            { name: 'Languages', items: ['English (IELTS 7.0)', 'Russian (fluent)', 'Kazakh (fluent)'] },
          ],
          list: [
            { title: 'Member, German Club', meta: 'Nazarbayev University · 2022 – 2024', text: 'Weekly German language sessions and organizing cultural events.' },
            { title: 'Volunteer, 9th Annual NU Student Awards Ceremony', meta: '2022' },
          ],
        },
      ],
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: 'briefcase',
      kicker: 'Where I work',
      title: 'Experience',
      teaser: 'Data science and engineering',
      list: [
        { title: 'Data Scientist', meta: 'Freedom Holding Corp. · Aug 2026 – present' },
        { title: 'Software Engineer (Full Stack), part-time', meta: 'Smart Grades LLP · Dec 2024 – Jun 2026' },
        { title: 'Intern (Software Engineer)', meta: 'Financial Monitoring Agency of Kazakhstan · Feb – May 2024' },
        { title: 'Intern (Data Engineer)', meta: 'Digital Economy Development Center / Kazakhtelecom · Sep – Oct 2023' },
      ],
      children: [
        {
          id: 'freedom',
          label: 'Freedom Holding',
          icon: 'briefcase',
          kicker: 'Experience · Aug 2026 – present',
          title: 'Freedom Holding Corp.',
          subtitle: 'Data Scientist · Almaty',
          teaser: 'Data Scientist · current',
          bullets: [
            'Built product matching, normalization, and clustering pipelines for categories, names, and attributes across millions of products, deployed to the production admin backend.',
            'Developed CatBoost models for service-adoption and churn prediction across the ecosystem’s services (ticketing, e-grocery, travel) on a base of millions of users.',
            'Built a survival model (XGBoost AFT) to predict next-purchase timing, calibrated using users’ service-click behavior.',
            'Developing a customer-insight layer that feeds model predictions into a RAG-backed LLM with a user-sequence encoder to generate natural-language customer profiles.',
          ],
          tags: ['CatBoost', 'XGBoost AFT', 'Clustering', 'RAG', 'LLMs'],
        },
        {
          id: 'smartgrades',
          label: 'Smart Grades',
          icon: 'code',
          kicker: 'Experience · Dec 2024 – Jun 2026',
          title: 'Smart Grades LLP',
          subtitle: 'Software Engineer (Full Stack), part-time · Astana',
          teaser: 'Full-stack engineer',
          bullets: [
            'Designed and maintained Java Spring Boot microservices and REST APIs with PostgreSQL for a quasi-governmental platform, including services for downstream analytics and model integration.',
            'Modeled and automated CRM business-process workflows in BPMN using Camunda.',
            'Built Angular web interfaces and improved reliability and data consistency across the distributed system.',
          ],
          tags: ['Java Spring Boot', 'PostgreSQL', 'Camunda', 'Angular'],
        },
        {
          id: 'afm',
          label: 'Financial Monitoring',
          icon: 'shield',
          kicker: 'Experience · Feb – May 2024',
          title: 'Financial Monitoring Agency',
          subtitle: 'Intern (Software Engineer) · Astana',
          teaser: 'Crypto OSINT for AML',
          bullets: [
            'Built Python pipelines to collect and structure open-source (OSINT) crypto data for anti-money-laundering investigations.',
            'Cleaned and structured large-scale web data into datasets for ML model training and investigative analysis.',
          ],
          tags: ['Python', 'OSINT', 'AML'],
        },
        {
          id: 'kazakhtelecom',
          label: 'Kazakhtelecom',
          icon: 'database',
          kicker: 'Experience · Sep – Oct 2023',
          title: 'Digital Economy Development Center',
          subtitle: 'Intern (Data Engineer) · Kazakhtelecom JSC · Astana',
          teaser: 'National product data',
          bullets: [
            'Built data-processing pipelines for millions of national product records in MongoDB and automated computer-vision validation of product labeling.',
          ],
          tags: ['MongoDB', 'Computer vision', 'Data pipelines'],
        },
      ],
    },
    {
      id: 'research',
      label: 'Research',
      icon: 'flask',
      kicker: 'What I study',
      title: 'Research',
      teaser: 'Speech, multimodal ML, APSA 2026',
      body: ['Research at Nazarbayev University on speech, survey methodology, and multimodal learning.'],
      list: [
        { title: 'Measuring Sensitivity Bias with Audio Data', meta: 'Working paper · APSA Annual Meeting 2026' },
        { title: 'Research Assistant, Prof. Andrey Tkachenko', meta: 'Jun 2024 – Aug 2026 · part-time' },
        { title: 'Research Assistant, Prof. Adnan Yazici', meta: 'Sep 2024 – May 2025' },
      ],
      children: [
        {
          id: 'sensitivity-bias',
          label: 'Sensitivity Bias',
          icon: 'mic',
          kicker: 'Research · Jun 2024 – Aug 2026',
          title: 'Measuring Sensitivity Bias with Audio Data',
          subtitle: 'Research Assistant with Prof. Andrey Tkachenko · Nazarbayev University',
          teaser: 'Working paper · APSA 2026',
          bullets: [
            'Built the audio-processing pipeline for 7,324 telephone interviews from five waves of Russian public-opinion polls, testing whether voice and response behavior reveal concealed political attitudes.',
            'Automatic transcription and timestamped segmentation with Whisper; separated interviewer and respondent speech with speaker diarization (Pyannote, WhisperX).',
            'Integrated a Qwen-2.5-3B LLM to clean and normalize noisy speech transcripts for downstream analysis.',
          ],
          body: [
            'Tarasenko, G., Tkachenko, A., &amp; Sarsengaliyev, D. <em>“Measuring Sensitivity Bias with Audio Data: Evidence from Wartime Russia.”</em> Draft prepared for the APSA Annual Meeting, 2026.',
          ],
          tags: ['Whisper', 'WhisperX', 'Pyannote', 'Qwen-2.5', 'Survey methods'],
          links: [{ label: 'Analysis code', href: 'https://github.com/Gunterwill/Survey_RA_predictive_audit' }],
        },
        {
          id: 'emotion',
          label: 'Emotion Recognition',
          icon: 'smile',
          kicker: 'Research · Sep 2024 – May 2025',
          title: 'Multimodal Emotion Recognition',
          subtitle: 'Research Assistant with Prof. Adnan Yazici · Nazarbayev University',
          teaser: '90%+ on IEMOCAP',
          bullets: [
            'Developed a multimodal emotion recognition model combining video, audio, and text: ConvNeXt for vision, RoBERTa for text, and VGG16 for audio features.',
            'Achieved over 90% accuracy on the IEMOCAP benchmark.',
            'Deployed the model as a real-time, video-based emotion classification system with a web interface.',
          ],
          body: [
            'Bachelor thesis: <em>Enhanced Multimodal Emotion Recognition System with Deep Learning and Hybrid Fusion</em> (2024).',
          ],
          tags: ['PyTorch', 'ConvNeXt', 'RoBERTa', 'VGG16'],
          links: [{ label: 'Thesis', href: 'https://nur.nu.edu.kz/handle/123456789/8967' }],
        },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'layers',
      kicker: 'What I build',
      title: 'Projects',
      teaser: 'Selected work',
      body: ['Selected work across retrieval, statistics, machine learning, and interpretability. Pick a node to see the details.'],
      children: [
        {
          id: 'graphrag',
          label: 'Legal GraphRAG',
          icon: 'graph',
          kicker: 'Project · June 2026',
          title: 'Agentic Legal GraphRAG',
          teaser: 'Multi-hop QA over Omani law',
          bullets: [
            'An agentic GraphRAG system over 1,000+ legal documents: a ReAct-style tool-calling agent (Groq function calling) that picks between hybrid retrieval, Neo4j graph traversal, and topic lookup to answer multi-hop legal questions, such as tracing amendment and repeal chains across laws.',
            'Hybrid retrieval: multilingual dense embeddings and BM25 fused with Reciprocal Rank Fusion, with mode-aware cross-encoder reranking across Arabic and English indexes.',
          ],
          tags: ['Python', 'Neo4j', 'Groq', 'RAG', 'BM25'],
          links: [{ label: 'Code', href: 'https://github.com/Gunterwill/legal-graphrag-pipeline' }],
        },
        {
          id: 'calibration',
          label: 'Market Calibration',
          icon: 'chart',
          kicker: 'Project · April 2026',
          title: 'Prediction Market Calibration',
          teaser: '679K contracts · 72M trades',
          bullets: [
            'Analyzed 679K Kalshi contracts and 72M trades with DuckDB to study how public attention affects prediction-market calibration error.',
            'Identified five market types with K-Means over PCA, UMAP, and t-SNE embeddings, validated with Kruskal-Wallis and Dunn post-hoc tests.',
            'Ran Granger causality tests between Google Trends and miscalibration, and built a FAISS similarity index over all contracts for calibration prediction.',
          ],
          tags: ['DuckDB', 'K-Means', 'UMAP', 'FAISS', 'Granger causality'],
          links: [{ label: 'Code', href: 'https://github.com/Gunterwill/prediction-markets-analysis' }],
        },
        {
          id: 'ahs',
          label: 'Household Income',
          icon: 'home',
          kicker: 'Project · April 2026',
          title: 'Household Income and Tenure Prediction',
          subtitle: 'U.S. Census Bureau AHS 2023',
          teaser: 'AUC 0.974 on tenure',
          bullets: [
            'Processed the AHS 2023 dataset (48,527 units, 1,000+ variables) with structured leakage removal, missing-value handling, and encoding across mixed feature types.',
            'Compared five models (linear/logistic regression, Random Forest, XGBoost, LightGBM, CatBoost); XGBoost reached R² = 0.334 for income and AUC = 0.974 for tenure.',
            'Ablation study on the marginal value of person demographics; RandomizedSearchCV tuning cut the Random Forest overfitting gap from 0.61 to 0.08.',
          ],
          tags: ['XGBoost', 'LightGBM', 'CatBoost', 'scikit-learn'],
          links: [{ label: 'Code', href: 'https://github.com/Gunterwill/ahs2023-ml-pipeline' }],
        },
        {
          id: 'steering',
          label: 'Activation Steering',
          icon: 'steer',
          kicker: 'Project',
          title: 'Activation Steering in Small LLMs',
          teaser: 'Skill directions in Qwen3-4B',
          body: [
            'Found skill-specific directions in the residual stream of Qwen3-4B, with peak separability in middle layers, and compared several steering-vector strategies on math benchmarks.',
          ],
          tags: ['PyTorch', 'Interpretability', 'MATH-500'],
        },
        {
          id: 'next',
          label: 'Next experiment',
          icon: 'clock',
          kicker: 'Project',
          title: 'Next experiment',
          soon: true,
        },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'mail',
      kicker: 'Say hi',
      title: 'Contact',
      teaser: 'Email, GitHub, LinkedIn',
      body: ['The fastest way to reach me is email. I am happy to talk about data science roles, research, or anything on this graph.'],
      links: [
        { label: 'Email me', href: 'mailto:damir.sarsengaliyev.03@gmail.com' },
        { label: 'GitHub', href: 'https://github.com/Gunterwill' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/damir-sarsengaliyev-843816254/' },
      ],
      children: [
        {
          id: 'email',
          label: 'Email',
          icon: 'mail',
          kicker: 'Contact · Email',
          title: 'Email',
          subtitle: 'damir.sarsengaliyev.03@gmail.com',
          links: [{ label: 'Write to me', href: 'mailto:damir.sarsengaliyev.03@gmail.com' }],
        },
        {
          id: 'github',
          label: 'GitHub',
          icon: 'branch',
          kicker: 'Contact · GitHub',
          title: 'GitHub',
          subtitle: 'github.com/Gunterwill',
          links: [{ label: 'Open GitHub', href: 'https://github.com/Gunterwill' }],
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          icon: 'linkedin',
          kicker: 'Contact · LinkedIn',
          title: 'LinkedIn',
          subtitle: 'linkedin.com/in/damir-sarsengaliyev',
          links: [{ label: 'Open LinkedIn', href: 'https://www.linkedin.com/in/damir-sarsengaliyev-843816254/' }],
        },
        {
          id: 'leetcode',
          label: 'LeetCode',
          icon: 'code',
          kicker: 'Contact · LeetCode',
          title: 'LeetCode',
          subtitle: 'leetcode.com/u/Gunterwill',
          links: [{ label: 'Open LeetCode', href: 'https://leetcode.com/u/Gunterwill/' }],
        },
      ],
    },
    {
      id: 'cv',
      label: 'CV',
      icon: 'file',
      kicker: 'Résumé',
      title: 'Curriculum vitae',
      teaser: 'Two pages, PDF',
      body: ['Everything on this graph, condensed to two pages.'],
      links: [
        { label: 'Open CV', href: 'cv.pdf' },
        { label: 'Download', href: 'cv.pdf', download: true },
      ],
    },
  ],
};
