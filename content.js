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
  subtitle: 'Data scientist working on statistics, machine learning, and LLMs.',
  body: [
    'This site is a graph of my life. Every node is a piece of the story: where I studied, what I built, and how to reach me.',
  ],
  children: [
    {
      id: 'about',
      label: 'About',
      icon: 'user',
      kicker: 'Who I am',
      title: 'About me',
      teaser: 'Education, experience, skills',
      body: [
        'I am a Data Scientist at Freedom Holding Corp. and hold a BSc in Computer Science from Nazarbayev University.',
        'Before that I worked as a software engineer, data engineer, and research assistant on audio and multimodal ML. I like problems where careful statistics meets messy real-world data.',
      ],
      children: [
        {
          id: 'education',
          label: 'Education',
          icon: 'cap',
          kicker: 'About · Education',
          title: 'Education',
          teaser: 'Nazarbayev University',
          list: [
            { title: 'BSc Computer Science', meta: 'Nazarbayev University' },
          ],
        },
        {
          id: 'experience',
          label: 'Experience',
          icon: 'briefcase',
          kicker: 'About · Experience',
          title: 'Experience',
          teaser: 'Data Scientist at Freedom Holding',
          list: [
            { title: 'Data Scientist', meta: 'Freedom Holding Corp. · Aug 2026 – present' },
            { title: 'Research Assistant', text: 'Audio and multimodal machine learning.' },
            { title: 'Data Engineer' },
            { title: 'Software Engineer' },
          ],
          body: ['The full timeline lives in my <a href="cv.pdf" target="_blank" rel="noopener">CV</a>.'],
        },
        {
          id: 'skills',
          label: 'Skills',
          icon: 'bolt',
          kicker: 'About · Skills',
          title: 'Skills',
          teaser: 'Python, PyTorch, statistics',
          groups: [
            { name: 'Languages', items: ['Python', 'SQL', 'Java', 'C++'] },
            { name: 'Data and ML', items: ['Pandas', 'NumPy', 'SciPy', 'scikit-learn', 'PyTorch'] },
            { name: 'Boosting', items: ['XGBoost', 'LightGBM', 'CatBoost'] },
            { name: 'Storage', items: ['DuckDB', 'Neo4j'] },
            { name: 'Methods', items: ['Statistical testing', 'Experimental design'] },
          ],
        },
        {
          id: 'life',
          label: 'Beyond work',
          icon: 'heart',
          kicker: 'About · Life',
          title: 'Beyond work',
          soon: true,
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
      body: ['Selected work across retrieval, statistics, interpretability, and multimodal learning. Pick a node to see the details.'],
      children: [
        {
          id: 'graphrag',
          label: 'Legal GraphRAG',
          icon: 'graph',
          kicker: 'Project · 01',
          title: 'Agentic Legal GraphRAG',
          teaser: 'Multi-hop QA over Omani law',
          body: [
            'A tool-calling agent over 1,000+ Omani legal documents that answers multi-hop questions, like tracing amendment and repeal chains across laws.',
            'Combines dense + BM25 retrieval with rank fusion, cross-encoder reranking, and Neo4j graph traversal across Arabic and English.',
          ],
          tags: ['Python', 'Neo4j', 'Groq', 'RAG'],
          links: [{ label: 'Code', href: 'https://github.com/Gunterwill/legal-graphrag-pipeline' }],
        },
        {
          id: 'calibration',
          label: 'Market Calibration',
          icon: 'chart',
          kicker: 'Project · 02',
          title: 'Prediction Market Calibration',
          teaser: '679K contracts · 72M trades',
          body: [
            'How public attention affects calibration in prediction markets, using 679K Kalshi contracts and 72M trades.',
            'Clustered markets into five types, validated with Kruskal-Wallis and Dunn tests, and tested Granger causality against Google Trends.',
          ],
          tags: ['DuckDB', 'scikit-learn', 'UMAP', 'FAISS'],
          links: [{ label: 'Code', href: 'https://github.com/Gunterwill/prediction-markets-analysis' }],
        },
        {
          id: 'steering',
          label: 'Activation Steering',
          icon: 'steer',
          kicker: 'Project · 03',
          title: 'Activation Steering in Small LLMs',
          teaser: 'Skill directions in Qwen3-4B',
          body: [
            'Found skill-specific directions in the residual stream of Qwen3-4B, with peak separability in middle layers, and compared several steering-vector strategies on math benchmarks.',
          ],
          tags: ['PyTorch', 'Interpretability', 'MATH-500'],
        },
        {
          id: 'emotion',
          label: 'Emotion Recognition',
          icon: 'smile',
          kicker: 'Project · 04',
          title: 'Multimodal Emotion Recognition',
          teaser: '90%+ on IEMOCAP',
          body: [
            'Video, audio, and text model reaching 90%+ accuracy on IEMOCAP, deployed as a real-time web app.',
            'Bachelor thesis at Nazarbayev University, supervised by Prof. Adnan Yazici: <em>Enhanced Multimodal Emotion Recognition System with Deep Learning and Hybrid Fusion</em> (2024).',
          ],
          tags: ['PyTorch', 'ConvNeXt', 'RoBERTa'],
          links: [{ label: 'Paper', href: 'https://nur.nu.edu.kz/handle/123456789/8967' }],
        },
        {
          id: 'next',
          label: 'Next experiment',
          icon: 'clock',
          kicker: 'Project · 05',
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
      ],
    },
    {
      id: 'cv',
      label: 'CV',
      icon: 'file',
      kicker: 'Résumé',
      title: 'Curriculum vitae',
      teaser: 'One page, PDF',
      body: ['Everything on this graph, condensed to a page.'],
      links: [
        { label: 'Open CV', href: 'cv.pdf' },
        { label: 'Download', href: 'cv.pdf', download: true },
      ],
    },
  ],
};
