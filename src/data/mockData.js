// Initial rich mock data for Studion

export const initialTasks = [
  {
    id: 'task-1',
    title: 'Review Machine Learning lecture notes (Backprop & SGD)',
    course: 'CS 480',
    priority: 'High',
    category: 'Academics',
    dueDate: '2026-09-26',
    estimatedMinutes: 45,
    completed: false,
  },
  {
    id: 'task-2',
    title: 'Submit Lab 4: Distributed Systems consensus algorithm',
    course: 'CS 340',
    priority: 'High',
    category: 'Assignments',
    dueDate: '2026-09-25',
    estimatedMinutes: 90,
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Solve Calculus Problem Set 7 (Differential Equations)',
    course: 'MATH 220',
    priority: 'Medium',
    category: 'Academics',
    dueDate: '2026-09-28',
    estimatedMinutes: 60,
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Read Chapter 5: Cognitive Biases in Decision Making',
    course: 'PSYCH 101',
    priority: 'Low',
    category: 'Reading',
    dueDate: '2026-09-29',
    estimatedMinutes: 30,
    completed: true,
  },
  {
    id: 'task-5',
    title: 'Prepare slides for Research Capstone checkpoint presentation',
    course: 'CAPSTONE',
    priority: 'Medium',
    category: 'Projects',
    dueDate: '2026-09-30',
    estimatedMinutes: 120,
    completed: false,
  },
  {
    id: 'task-6',
    title: 'Weekly backup of study notes to GitHub repo',
    course: 'Personal',
    priority: 'Low',
    category: 'Personal',
    dueDate: '2026-09-27',
    estimatedMinutes: 15,
    completed: true,
  }
];

export const initialAssignments = [
  {
    id: 'asg-1',
    title: 'Operating Systems: Kernel Threads & Memory Virtualization',
    course: 'CS 320',
    dueDate: '2026-09-27T23:59:00',
    progress: 75,
    weight: '15%',
    priority: 'High',
    type: 'Programming Project',
    description: 'Implement user-level threading library with cooperative multitasking and virtual page table simulation.',
    status: 'In Progress'
  },
  {
    id: 'asg-2',
    title: 'Organic Chemistry II: Synthesis Pathway Final Report',
    course: 'CHEM 230',
    dueDate: '2026-09-29T17:00:00',
    progress: 40,
    weight: '20%',
    priority: 'High',
    type: 'Lab Report',
    description: 'Spectroscopy analysis of aromatic carbonyls and synthesis pathway documentation with mechanistic arrows.',
    status: 'In Progress'
  },
  {
    id: 'asg-3',
    title: 'Modern Linear Algebra: Eigenvalues & Principal Component Analysis',
    course: 'MATH 250',
    dueDate: '2026-10-02T12:00:00',
    progress: 90,
    weight: '10%',
    priority: 'Medium',
    type: 'Problem Set',
    description: 'Rigorous proofs for spectral theorem and Python implementation of SVD image compression.',
    status: 'Almost Done'
  },
  {
    id: 'asg-4',
    title: 'Artificial Intelligence: Deep Reinforcement Learning Agent',
    course: 'CS 482',
    dueDate: '2026-10-08T23:59:00',
    progress: 15,
    weight: '25%',
    priority: 'High',
    type: 'Term Project',
    description: 'Train a PPO or DQN agent to solve the multi-agent lunar lander simulation environment with obstacle avoidance.',
    status: 'Not Started'
  },
  {
    id: 'asg-5',
    title: 'Ethics in Computer Science: Algorithmic Fairness Essay',
    course: 'PHIL 215',
    dueDate: '2026-10-14T23:59:00',
    progress: 0,
    weight: '10%',
    priority: 'Low',
    type: 'Essay',
    description: '2,500 word critical evaluation of algorithmic bias in criminal recidivism predictions.',
    status: 'Not Started'
  }
];

export const initialDecks = [
  {
    id: 'deck-1',
    name: 'Data Structures & Algorithms',
    category: 'Computer Science',
    color: '#8A2BE2',
    cards: [
      {
        id: 'c-1',
        front: 'What is the amortized time complexity of inserting into a dynamic array (like std::vector)?',
        back: 'O(1) amortized. While resizing requires copying all N elements taking O(N) time, geometric capacity doubling (e.g. 2x) ensures the total work over N insertions is O(N), yielding O(1) average per insertion.',
        difficulty: 'Good',
        streak: 4
      },
      {
        id: 'c-2',
        front: 'Explain the difference between Dijkstra’s algorithm and A* search.',
        back: 'Dijkstra expands nodes strictly by shortest path cost g(n) from start. A* guides search with a heuristic h(n) estimating remaining distance to goal, ordering by f(n) = g(n) + h(n), making it much faster when an admissible heuristic is available.',
        difficulty: 'Easy',
        streak: 6
      },
      {
        id: 'c-3',
        front: 'When does a hash table degrade to O(N) lookup time?',
        back: 'When all inserted keys hash to the same bucket (worst-case hash collisions with linked-list chaining) or when the load factor becomes too high without re-hashing.',
        difficulty: 'Good',
        streak: 3
      },
      {
        id: 'c-4',
        front: 'What is the Master Theorem for divide-and-conquer recurrences T(n) = a*T(n/b) + f(n)?',
        back: 'It compares f(n) with n^(log_b(a)). Case 1: f(n) is polynomial smaller -> O(n^(log_b a)). Case 2: f(n) = Theta(n^(log_b a) * log^k(n)) -> O(n^(log_b a) * log^(k+1)(n)). Case 3: f(n) is polynomial larger and satisfies regularity -> O(f(n)).',
        difficulty: 'Hard',
        streak: 1
      }
    ]
  },
  {
    id: 'deck-2',
    name: 'Organic Chemistry & Biochemistry',
    category: 'Chemistry',
    color: '#06b6d4',
    cards: [
      {
        id: 'c-5',
        front: 'What are the key conditions that favor an SN2 over an SN1 substitution reaction?',
        back: 'SN2 is favored by: strong nucleophile, unhindered substrate (primary > secondary >> tertiary), and polar aprotic solvent (e.g., DMSO, acetone, DMF) which does not solvate the nucleophile.',
        difficulty: 'Good',
        streak: 3
      },
      {
        id: 'c-6',
        front: 'What is Markovnikov’s Rule in electrophilic additions to alkenes?',
        back: 'In the addition of HX to an unsymmetrical alkene, the hydrogen atom adds to the carbon having more hydrogen substituents, creating the more stable carbocation intermediate (tertiary > secondary > primary).',
        difficulty: 'Easy',
        streak: 5
      },
      {
        id: 'c-7',
        front: 'Describe the peptide bond and why it exhibits partial double-bond character.',
        back: 'The peptide bond forms between carboxyl (-COOH) and amino (-NH2) groups with loss of water. Resonance delocalization of the nitrogen lone pair into the carbonyl pi system gives it ~40% double bond character, preventing free rotation and keeping it planar.',
        difficulty: 'Hard',
        streak: 2
      }
    ]
  },
  {
    id: 'deck-3',
    name: 'Linear Algebra & Machine Learning',
    category: 'Mathematics',
    color: '#ec4899',
    cards: [
      {
        id: 'c-8',
        front: 'What is Singular Value Decomposition (SVD) of a real matrix A (m x n)?',
        back: 'A = U * Sigma * V^T, where U is m x m orthogonal (left singular vectors), Sigma is m x n diagonal (singular values in descending order), and V is n x n orthogonal (right singular vectors).',
        difficulty: 'Good',
        streak: 3
      },
      {
        id: 'c-9',
        front: 'Why does gradient descent with momentum help navigate ravines?',
        back: 'Momentum accumulates velocity along directions of consistent gradient while dampening high-frequency oscillations across steep valleys, accelerating convergence towards the minimum.',
        difficulty: 'Easy',
        streak: 4
      }
    ]
  }
];

export const initialResources = [
  {
    id: 'res-1',
    title: 'MIT 6.006: Introduction to Algorithms (Spring 2024)',
    type: 'Video',
    category: 'Computer Science',
    url: 'https://youtube.com',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
    description: 'Comprehensive video lectures by Prof. Erik Demaine covering sorting, balanced trees, graph traversal, and dynamic programming.',
    tags: ['algorithms', 'mit', 'trees', 'dp'],
    addedDate: '2026-09-20'
  },
  {
    id: 'res-2',
    title: 'Linear Algebra Done Right (4th Ed) - PDF Companion',
    type: 'PDF',
    category: 'Mathematics',
    url: 'https://linear.axler.net',
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=60',
    description: 'Dr. Sheldon Axler’s official chapter solutions, vector space diagrams, and inner product proof sheets.',
    tags: ['math', 'linalg', 'textbook', 'proofs'],
    addedDate: '2026-09-22'
  },
  {
    id: 'res-3',
    title: 'Stanford CS229: Machine Learning Course Cheatsheets',
    type: 'Link',
    category: 'Artificial Intelligence',
    url: 'https://stanford.edu',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&auto=format&fit=crop&q=60',
    description: 'Afshine & Shervine Amidi’s famous cheat sheets on Supervised Learning, Deep Learning, and Probabilistic Graphical Models.',
    tags: ['ai', 'cheatsheet', 'stanford', 'ml'],
    addedDate: '2026-09-23'
  },
  {
    id: 'res-4',
    title: '3Blue1Brown: The Essence of Calculus Visual Series',
    type: 'Video',
    category: 'Mathematics',
    url: 'https://youtube.com',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60',
    description: 'Geometric visual intuition behind limits, derivatives, chain rule, and Taylor polynomial expansions.',
    tags: ['calculus', '3b1b', 'visual', 'derivatives'],
    addedDate: '2026-09-21'
  },
  {
    id: 'res-5',
    title: 'Distributed Systems Patterns & Raft Consensus Spec',
    type: 'Doc',
    category: 'Computer Science',
    url: 'https://raft.github.io',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60',
    description: 'Official interactive visualization of the Raft distributed consensus protocol: leader election, log replication, and split brain prevention.',
    tags: ['distributed', 'raft', 'systems', 'networking'],
    addedDate: '2026-09-24'
  }
];

export const initialHabits = [
  {
    id: 'h-1',
    name: 'Deep Work (90 Mins)',
    category: 'Study',
    icon: 'Brain',
    color: '#8A2BE2',
    targetDaysPerWeek: 6,
    streak: 8,
    // History for the last 7 days [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
    completedDays: [true, true, true, true, true, true, true]
  },
  {
    id: 'h-2',
    name: 'Review 20 Flashcards',
    category: 'Memory',
    icon: 'Layers',
    color: '#06b6d4',
    targetDaysPerWeek: 7,
    streak: 12,
    completedDays: [true, true, true, true, true, false, true]
  },
  {
    id: 'h-3',
    name: 'Hydrate 2.5 Liters',
    category: 'Health',
    icon: 'Droplets',
    color: '#3b82f6',
    targetDaysPerWeek: 7,
    streak: 5,
    completedDays: [true, true, true, false, true, true, true]
  },
  {
    id: 'h-4',
    name: 'Read 15 Pages Academic Text',
    category: 'Learning',
    icon: 'BookOpen',
    color: '#ec4899',
    targetDaysPerWeek: 5,
    streak: 4,
    completedDays: [false, true, true, true, true, false, false]
  },
  {
    id: 'h-5',
    name: '30m Physical Exercise / Walk',
    category: 'Wellness',
    icon: 'Activity',
    color: '#10b981',
    targetDaysPerWeek: 4,
    streak: 3,
    completedDays: [true, false, true, false, true, true, false]
  }
];

export const initialFolders = [
  { id: 'f-1', name: 'Computer Science', count: 3, icon: 'Cpu' },
  { id: 'f-2', name: 'Applied Mathematics', count: 2, icon: 'Sigma' },
  { id: 'f-3', name: 'Chemistry & Biology', count: 1, icon: 'FlaskConical' },
  { id: 'f-4', name: 'Philosophy & Ethics', count: 1, icon: 'Compass' },
];

export const initialNotes = [
  {
    id: 'note-1',
    title: 'Transformer Architecture & Multi-Head Self-Attention',
    folder: 'Computer Science',
    tags: ['DeepLearning', 'Transformers', 'NLP'],
    pinned: true,
    lastEdited: '2026-09-25T11:20:00',
    shared: true,
    shareId: 'studion-nlp-transformer-7x',
    content: `# Transformer Architecture & Multi-Head Self-Attention

### 1. Introduction
The Transformer replaces recurrence and convolutions entirely with **Self-Attention mechanisms** to compute representations of its input and output sequences without sequence-aligned RNNs or convolution.

### 2. Scaled Dot-Product Attention
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$$

- **Q (Query):** Vectors representing what we are looking for.
- **K (Key):** Vectors representing what each position contains.
- **V (Value):** Content retrieved when query matches key.
- **$\\sqrt{d_k}$ Scaling factor:** Counteracts large dot products pushing softmax into regions with extremely small gradients.

### 3. Multi-Head Attention
Instead of performing a single attention function with $d_{\\text{model}}$-dimensional keys, queries and values:
- We linearly project the queries, keys, and values $h$ times with learned linear projections.
- In practice, $h = 8$ heads and $d_k = d_v = d_{\\text{model}} / h = 64$.

> **Key Exam Tip:** Remember that Positional Encoding is required because self-attention is permutation-invariant without it!`
  },
  {
    id: 'note-2',
    title: 'Singular Value Decomposition (SVD) & Low-Rank Approximation',
    folder: 'Applied Mathematics',
    tags: ['LinearAlgebra', 'Matrix', 'PCA'],
    pinned: true,
    lastEdited: '2026-09-24T18:45:00',
    shared: false,
    shareId: 'studion-math-svd-99a',
    content: `# Singular Value Decomposition (SVD)

### Definition
For any real matrix $A \\in \\mathbb{R}^{m \\times n}$:
$$A = U \\Sigma V^T$$

Where:
1. $U \\in \\mathbb{R}^{m \\times m}$ is an orthonormal matrix whose columns are eigenvectors of $A A^T$.
2. $\\Sigma \\in \\mathbb{R}^{m \\times n}$ is a diagonal matrix containing the singular values $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$.
3. $V \\in \\mathbb{R}^{n \\times n}$ is an orthonormal matrix whose columns are eigenvectors of $A^T A$.

### Eckart-Young-Mirsky Theorem
The best rank-$k$ approximation ($k < r$) to $A$ in both Frobenius and spectral norms is given by:
$$A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$$

Used extensively in:
- Image compression
- Latent Semantic Analysis (LSA)
- Noise filtering in sensor data`
  },
  {
    id: 'note-3',
    title: 'Distributed Consensus: Paxos vs Raft Comparison',
    folder: 'Computer Science',
    tags: ['DistributedSystems', 'Consensus', 'Raft'],
    pinned: false,
    lastEdited: '2026-09-23T14:10:00',
    shared: true,
    shareId: 'studion-dist-raft-paxos-2b',
    content: `# Distributed Consensus: Paxos vs Raft

### Why Consensus Matters
In asynchronous networks with unreliable communication and node crashes, distributed state machines require consensus to maintain consistent replicated logs.

### Key Differences
| Feature | Paxos | Raft |
| :--- | :--- | :--- |
| **Understandability** | Extremely difficult | Decomposed into Leader Election, Log Replication, Safety |
| **Leader Role** | Optional / Multi-Paxos | Strong Leader (all changes flow through Leader) |
| **Log Gaps** | Possible | Strictly sequential, no log holes |
| **Term Numbers** | Ballots | Monotonically increasing Terms |`
  },
  {
    id: 'note-4',
    title: 'Stereochemistry: Enantiomers, Diastereomers & Meso Compounds',
    folder: 'Chemistry & Biology',
    tags: ['OrganicChem', 'Isomers'],
    pinned: false,
    lastEdited: '2026-09-21T09:30:00',
    shared: false,
    shareId: 'studion-chem-stereo-4p',
    content: `# Stereochemistry Essentials

### Chiral Centers
A carbon atom bonded to four different groups is a **stereocenter**. Maximum number of stereoisomers = $2^n$ where $n$ is chiral centers.

### Classifications:
1. **Enantiomers:** Non-superimposable mirror images. Identical physical properties (bp, mp) except optical rotation.
2. **Diastereomers:** Stereoisomers that are not mirror images. Different physical properties.
3. **Meso Compounds:** Molecules containing stereocenters that possess an internal plane of symmetry, making the overall molecule achiral.`
  }
];

export const initialSharedVaultNotes = [
  {
    id: 'shared-vault-1',
    author: 'Elena Rostova (MIT \'26)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Ultimate Data Structures Cheat Sheet & Big-O Reference',
    category: 'Computer Science',
    downloads: 1420,
    likes: 389,
    snippet: 'Complete breakdown of Trees, Heaps, Hash Tables, Graph representations with space/time trade-offs and C++/Python snippets.',
    date: '2 days ago'
  },
  {
    id: 'shared-vault-2',
    author: 'Marcus Chen (Stanford \'25)',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    title: 'Multivariable Calculus: Stokes\' Theorem & Surface Integrals',
    category: 'Applied Mathematics',
    downloads: 980,
    likes: 245,
    snippet: 'Step-by-step intuition for line integrals, conservative vector fields, Green\'s theorem, Divergence theorem, and differential forms.',
    date: '4 days ago'
  },
  {
    id: 'shared-vault-3',
    author: 'Sarah Jenkins (Oxford \'27)',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    title: 'Cognitive Neuroscience: Memory Consolidation Mechanisms',
    category: 'Neuroscience',
    downloads: 720,
    likes: 182,
    snippet: 'Hippocampal-neocortical interactions during slow-wave sleep, long-term potentiation (LTP), and synaptic plasticity pathways.',
    date: '1 week ago'
  }
];
