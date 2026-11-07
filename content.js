/*
 * The graph of the site. Edit this file to add, remove, or change nodes.
 *
 * Node fields (all optional except id + label):
 *   id        url-safe id, used in the address bar (#/projects/graphrag)
 *   label     text under the node
 *   icon      one of the icon names in app.js (ICONS)
 *   title     panel heading (defaults to label)
 *   subtitle  one plain line under the heading: role, place, or what it is
 *   period    when it happened, shown under the subtitle ("June 2024 – August 2026")
 *   teaser    short text on the preview while you drag toward the node
 *   body      array of paragraphs (HTML allowed)
 *   bullets   array of bullet points (HTML allowed)
 *   list      [{ title, meta, text, period }], dates line up in their own column
 *   groups    [{ name, items: [] }]
 *   tags      []
 *   links     [{ label, href }]; the first one is the main action
 *   soon      true: the panel says the page is not published yet
 *   children  [nodes]
 */
window.GRAPH = {
  id: 'start',
  label: 'Damir',
  icon: 'start',
  title: 'Damir Sarsengaliyev',
  subtitle: 'Data scientist at Freedom Holding Corp., working on statistics, machine learning, and LLMs.',
  body: [
    'This site is a graph of my life. Each node is part of the story: where I studied, where I work, what I research and build, and how to reach me.',
  ],
  links: [
    { label: 'Email me', href: 'mailto:damir.sarsengaliyev.03@gmail.com' },
    { label: 'Open CV', href: 'cv.pdf' },
  ],
  children: [
    {
      id: 'about',
      label: 'About',
      icon: 'user',
      title: 'About me',
      teaser: 'Education, skills, life',
      body: [
        'I’m a data scientist at Freedom Holding Corp. in Almaty, building matching, churn, and customer-insight models used across millions of users.',
        'I graduated from Nazarbayev University in 2025 with a BSc in Computer Science, ranked 9th of 255. Along the way I did research on speech and multimodal ML and worked as a software and data engineer. I like problems where careful statistics meets messy real-world data.',
      ],
      children: [
        {
          id: 'education',
          label: 'Education',
          icon: 'cap',
          title: 'Education',
          teaser: 'Nazarbayev University, top 3.5%',
          list: [
            {
              title: 'BSc in Computer Science',
              meta: 'Nazarbayev University, Astana',
              period: 'Graduated June 2025',
              text: 'GPA 3.61 / 4, ranked 9th of 255 (top 3.5%). Dean’s List in Spring 2023, Fall 2024, and Spring 2025.',
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
          title: 'Skills',
          teaser: 'Python, ML, speech, LLMs',
          groups: [
            { name: 'Programming', items: ['Python', 'SQL', 'Java', 'C++'] },
            { name: 'Statistics and data analysis', items: ['Hypothesis testing', 'Time series (Granger causality)', 'Experimental design', 'DuckDB'] },
            { name: 'Machine learning', items: ['Supervised & unsupervised learning', 'XGBoost', 'LightGBM', 'CatBoost', 'K-Means', 'PCA', 'UMAP', 't-SNE', 'Model evaluation & tuning'] },
            { name: 'NLP, speech, and LLMs', items: ['Hugging Face Transformers', 'RAG', 'FAISS', 'Neo4j', 'Whisper / WhisperX', 'Pyannote'] },
            { name: 'Frameworks', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy', 'SciPy'] },
            { name: 'Engineering', items: ['Java Spring Boot', 'Camunda / BPMN', 'Angular', 'PostgreSQL', 'REST APIs', 'Git'] },
          ],
        },
        {
          id: 'life',
          label: 'Beyond work',
          icon: 'heart',
          title: 'Beyond work',
          teaser: 'Languages and clubs',
          groups: [
            { name: 'Languages', items: ['English (IELTS 7.0)', 'Russian (fluent)', 'Kazakh (fluent)'] },
          ],
          list: [
            { title: 'Member of the German Club', meta: 'Nazarbayev University', period: '2022 – 2024', text: 'Weekly German sessions, and helping organize cultural events.' },
            { title: 'Volunteer at the 9th NU Student Awards', meta: 'Nazarbayev University', period: '2022' },
          ],
        },
      ],
    },
    {
      id: 'experience',
      label: 'Experience',
      icon: 'briefcase',
      title: 'Experience',
      teaser: 'Data science and engineering',
      list: [
        { title: 'Data Scientist', meta: 'Freedom Holding Corp.', period: '2026 – now' },
        { title: 'Software Engineer (full stack), part-time', meta: 'Smart Grades LLP', period: '2024 – 2026' },
        { title: 'Software Engineering Intern', meta: 'Financial Monitoring Agency of Kazakhstan', period: '2024' },
        { title: 'Data Engineering Intern', meta: 'Digital Economy Development Center / Kazakhtelecom', period: '2023' },
      ],
      children: [
        {
          id: 'freedom',
          label: 'Freedom Holding',
          icon: 'briefcase',
          title: 'Freedom Holding Corp.',
          subtitle: 'Data Scientist in Almaty',
          period: 'August 2026 – now',
          teaser: 'Data Scientist, current role',
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
          title: 'Smart Grades LLP',
          subtitle: 'Full-stack software engineer, part-time, in Astana',
          period: 'December 2024 – June 2026',
          teaser: 'Full-stack engineering',
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
          title: 'Financial Monitoring Agency',
          subtitle: 'Software engineering intern in Astana',
          period: 'February – May 2024',
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
          title: 'Digital Economy Development Center',
          subtitle: 'Data engineering intern at Kazakhtelecom JSC, Astana',
          period: 'September – October 2023',
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
      title: 'Research',
      teaser: 'Speech, multimodal ML, APSA 2026',
      body: ['Research at Nazarbayev University on speech, survey methodology, and multimodal learning.'],
      list: [
        { title: 'Measuring Sensitivity Bias with Audio Data', meta: 'Working paper for the APSA Annual Meeting', period: '2026' },
        { title: 'Research assistant to Prof. Andrey Tkachenko', meta: 'Part-time', period: '2024 – 2026' },
        { title: 'Research assistant to Prof. Adnan Yazici', meta: 'Multimodal emotion recognition', period: '2024 – 2025' },
      ],
      children: [
        {
          id: 'sensitivity-bias',
          label: 'Sensitivity Bias',
          icon: 'mic',
          title: 'Measuring Sensitivity Bias with Audio Data',
          subtitle: 'Research assistant to Prof. Andrey Tkachenko, Nazarbayev University',
          period: 'June 2024 – August 2026',
          teaser: 'Working paper for APSA 2026',
          bullets: [
            'Built the audio-processing pipeline for 7,324 telephone interviews from five waves of Russian public-opinion polls, testing whether voice and response behavior reveal concealed political attitudes.',
            'Automatic transcription and timestamped segmentation with Whisper; separated interviewer and respondent speech with speaker diarization (Pyannote, WhisperX).',
            'Integrated a Qwen-2.5-3B LLM to clean and normalize noisy speech transcripts for downstream analysis.',
          ],
          body: [
            'Tarasenko, G., Tkachenko, A., &amp; Sarsengaliyev, D. <em>“Measuring Sensitivity Bias with Audio Data: Evidence from Wartime Russia.”</em> Draft prepared for the APSA Annual Meeting, 2026.',
          ],
          tags: ['Whisper', 'WhisperX', 'Pyannote', 'Qwen-2.5', 'Survey methods'],
          links: [{ label: 'View analysis code', href: 'https://github.com/Gunterwill/Survey_RA_predictive_audit' }],
        },
        {
          id: 'emotion',
          label: 'Emotion Recognition',
          icon: 'smile',
          title: 'Multimodal Emotion Recognition',
          subtitle: 'Research assistant to Prof. Adnan Yazici, Nazarbayev University',
          period: 'September 2024 – May 2025',
          teaser: 'Over 90% on IEMOCAP',
          bullets: [
            'Developed a multimodal emotion recognition model combining video, audio, and text: ConvNeXt for vision, RoBERTa for text, and VGG16 for audio features.',
            'Achieved over 90% accuracy on the IEMOCAP benchmark.',
            'Deployed the model as a real-time, video-based emotion classification system with a web interface.',
          ],
          body: [
            'Bachelor thesis: <em>Enhanced Multimodal Emotion Recognition System with Deep Learning and Hybrid Fusion</em> (2024).',
          ],
          tags: ['PyTorch', 'ConvNeXt', 'RoBERTa', 'VGG16'],
          links: [{ label: 'Read the thesis record', href: 'https://nur.nu.edu.kz/handle/123456789/8967' }],
        },
      ],
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'layers',
      title: 'Projects',
      teaser: 'Selected work',
      body: ['Selected work across retrieval, statistics, machine learning, and interpretability.'],
      children: [
        {
          id: 'graphrag',
          label: 'Legal GraphRAG',
          icon: 'graph',
          title: 'Agentic Legal GraphRAG',
          subtitle: 'Question answering over Omani law',
          period: 'June 2026',
          teaser: 'Multi-hop questions over Omani law',
          bullets: [
            'An agentic GraphRAG system over 1,000+ legal documents: a ReAct-style tool-calling agent (Groq function calling) that picks between hybrid retrieval, Neo4j graph traversal, and topic lookup to answer multi-hop legal questions, such as tracing amendment and repeal chains across laws.',
            'Hybrid retrieval: multilingual dense embeddings and BM25 fused with Reciprocal Rank Fusion, with mode-aware cross-encoder reranking across Arabic and English indexes.',
          ],
          tags: ['Python', 'Neo4j', 'Groq', 'RAG', 'BM25'],
          links: [{ label: 'View code on GitHub', href: 'https://github.com/Gunterwill/legal-graphrag-pipeline' }],
        },
        {
          id: 'calibration',
          label: 'Market Calibration',
          icon: 'chart',
          title: 'Prediction Market Calibration',
          subtitle: 'Does public attention explain miscalibration?',
          period: 'April 2026',
          teaser: '679K contracts and 72M trades',
          bullets: [
            'Analyzed 679K Kalshi contracts and 72M trades with DuckDB to study how public attention affects prediction-market calibration error.',
            'Identified five market types with K-Means over PCA, UMAP, and t-SNE embeddings, validated with Kruskal-Wallis and Dunn post-hoc tests.',
            'Ran Granger causality tests between Google Trends and miscalibration, and built a FAISS similarity index over all contracts for calibration prediction.',
          ],
          tags: ['DuckDB', 'K-Means', 'UMAP', 'FAISS', 'Granger causality'],
          links: [{ label: 'View code on GitHub', href: 'https://github.com/Gunterwill/prediction-markets-analysis' }],
        },
        {
          id: 'ahs',
          label: 'Household Income',
          icon: 'home',
          title: 'Household Income and Tenure Prediction',
          subtitle: 'U.S. Census Bureau American Housing Survey, 2023',
          period: 'April 2026',
          teaser: 'AUC 0.974 on tenure',
          bullets: [
            'Processed the AHS 2023 dataset (48,527 units, 1,000+ variables) with structured leakage removal, missing-value handling, and encoding across mixed feature types.',
            'Compared five models (linear/logistic regression, Random Forest, XGBoost, LightGBM, CatBoost); XGBoost reached R² = 0.334 for income and AUC = 0.974 for tenure.',
            'Ablation study on the marginal value of person demographics; RandomizedSearchCV tuning cut the Random Forest overfitting gap from 0.61 to 0.08.',
          ],
          tags: ['XGBoost', 'LightGBM', 'CatBoost', 'scikit-learn'],
          links: [{ label: 'View code on GitHub', href: 'https://github.com/Gunterwill/ahs2023-ml-pipeline' }],
        },
        {
          id: 'steering',
          label: 'Activation Steering',
          icon: 'steer',
          title: 'Activation Steering in Small LLMs',
          subtitle: 'Interpretability on Qwen3-4B',
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
          title: 'Next experiment',
          soon: true,
          soonNote: 'The next project is in progress. New code lands on GitHub first.',
          links: [{ label: 'Open GitHub', href: 'https://github.com/Gunterwill' }],
        },
      ],
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: 'mail',
      title: 'Contact',
      teaser: 'Email, GitHub, LinkedIn',
      body: ['Email is the fastest way to reach me. I’m happy to talk about data science roles, research, or anything on this graph.'],
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
          title: 'Email',
          subtitle: 'damir.sarsengaliyev.03@gmail.com',
          links: [{ label: 'Write an email', href: 'mailto:damir.sarsengaliyev.03@gmail.com' }],
        },
        {
          id: 'github',
          label: 'GitHub',
          icon: 'branch',
          title: 'GitHub',
          subtitle: 'github.com/Gunterwill',
          links: [{ label: 'Open GitHub profile', href: 'https://github.com/Gunterwill' }],
        },
        {
          id: 'linkedin',
          label: 'LinkedIn',
          icon: 'linkedin',
          title: 'LinkedIn',
          subtitle: 'linkedin.com/in/damir-sarsengaliyev',
          links: [{ label: 'Open LinkedIn profile', href: 'https://www.linkedin.com/in/damir-sarsengaliyev-843816254/' }],
        },
        {
          id: 'leetcode',
          label: 'LeetCode',
          icon: 'code',
          title: 'LeetCode',
          subtitle: 'leetcode.com/u/Gunterwill',
          links: [{ label: 'Open LeetCode profile', href: 'https://leetcode.com/u/Gunterwill/' }],
        },
      ],
    },
    {
      id: 'cv',
      label: 'CV',
      icon: 'file',
      title: 'Curriculum vitae',
      subtitle: 'Two pages, PDF',
      teaser: 'Two pages, PDF',
      body: ['Everything on this graph, on two pages.'],
      links: [
        { label: 'Open CV', href: 'cv.pdf' },
        { label: 'Download PDF', href: 'cv.pdf', download: true },
      ],
    },
  ],
};
