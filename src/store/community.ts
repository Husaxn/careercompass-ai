import { createStore } from './create-store';

export interface Comment {
  id: string;
  author: string;
  text: string;
}

export interface Post {
  id: string;
  author: string;
  title: string;
  body: string;
  category: string;
  timeAgo: string;
  imageUri?: string;
  comments: Comment[];
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  topics: string;
  bio: string;
  years: string;
  mentees: number;
  specialties: string[];
}

export interface ChatMessage {
  id: string;
  text: string;
  mine: boolean;
}

interface CommunityState {
  posts: Post[];
  mentors: Mentor[];
  chats: Record<string, ChatMessage[]>;
  mentorRequests: string[];
}

const seedPosts: Post[] = [
  {
    id: 'p1',
    author: 'Priya Sharma',
    title: 'How I switched into product management',
    body: 'I moved from engineering to product by leaning into user research and building a side-project portfolio. Here are the steps that worked for me: talk to users every week, ship small experiments, and document outcomes. It took about a year before I felt confident applying.',
    category: 'Product',
    timeAgo: '2h ago',
    comments: [
      { id: 'c1', author: 'Maya', text: 'This was so helpful, thank you!' },
      { id: 'c2', author: 'Leo', text: 'Saving this for reference.' },
    ],
  },
  {
    id: 'p2',
    author: 'Daniel Kim',
    title: 'Favorite resources for data analysis?',
    body: 'I am building my data skills from scratch. What free courses, datasets, or practice sites did you find most useful early on? Would love recommendations from folks already in the field.',
    category: 'Data',
    timeAgo: '5h ago',
    comments: [
      { id: 'c3', author: 'Nina', text: 'Start with SQL first, then pandas. Kaggle datasets are great for practice.' },
      { id: 'c4', author: 'Omar', text: 'StrataScratch and LeetCode SQL are what I used to interview prep.' },
    ],
  },
  {
    id: 'p3',
    author: 'Sofia Reyes',
    title: 'Portfolio review thread — drop your links',
    body: 'I want to help more people land great roles. Drop your portfolio links below and I will take a look and leave honest, actionable feedback over the next few days.',
    category: 'Career',
    timeAgo: '1d ago',
    comments: [
      { id: 'c5', author: 'Jason', text: 'Dropping mine: jasont.dev. Would love feedback on the project section!' },
      { id: 'c6', author: 'Hana', text: 'Thanks for doing this, Sofia. Just added my case study.' },
    ],
  },
  {
    id: 'p4',
    author: 'Aisha Okafor',
    title: 'My 3-step prep plan for behavioral interviews',
    body: 'I went from freezing up to confident in behavioral rounds using this: (1) write 5 STAR stories covering conflict, failure, leadership, and a win; (2) rehearse each out loud in under 90 seconds; (3) always end with what you learned. It made every interview feel like a conversation.',
    category: 'Interview',
    timeAgo: '6h ago',
    comments: [],
  },
  {
    id: 'p5',
    author: 'Marco Ruiz',
    title: 'Sharing my React learning path after 3 months',
    body: 'Three months ago I barely knew JSX. Today I shipped my first real project. What worked: building one small thing every week, reading the official docs over random tutorials, and getting code reviews from a mentor. Happy to share my reading list if anyone is starting out.',
    category: 'Frontend',
    timeAgo: '2d ago',
    comments: [],
  },
];

const seedMentors: Mentor[] = [
  {
    id: 'mt1',
    name: 'Priya Sharma',
    role: 'Senior Product Manager',
    topics: 'Product, Leadership',
    bio: '8 years in product across SaaS and marketplaces. Passionate about helping people switch into product from adjacent fields.',
    years: '8 years',
    mentees: 120,
    specialties: ['Product management', 'Career switches', 'Leadership'],
  },
  {
    id: 'mt2',
    name: 'Daniel Kim',
    role: 'Data Lead',
    topics: 'Data, Analytics',
    bio: 'Data lead at a fintech. I help junior analysts build the practical skills hiring managers actually look for.',
    years: '10 years',
    mentees: 85,
    specialties: ['Data analysis', 'SQL', 'Analytics'],
  },
  {
    id: 'mt3',
    name: 'Sofia Reyes',
    role: 'Design Director',
    topics: 'Design, Portfolios',
    bio: 'Design director reviewing portfolios and mentoring designers on their growth and craft.',
    years: '12 years',
    mentees: 200,
    specialties: ['UX design', 'Portfolio reviews', 'Career growth'],
  },
  {
    id: 'mt4',
    name: 'Aisha Okafor',
    role: 'Interview Coach',
    topics: 'Interviews, Resume',
    bio: 'I coach candidates on behavioral interviews and resume storytelling. Focus on turning experience into clear, confident answers.',
    years: '7 years',
    mentees: 60,
    specialties: ['Behavioral interviews', 'Resume reviews', 'Mock interviews'],
  },
  {
    id: 'mt5',
    name: 'Marco Ruiz',
    role: 'Senior Frontend Engineer',
    topics: 'Frontend, React',
    bio: 'Frontend engineer who loves helping juniors level up with React, clean code, and practical project feedback.',
    years: '9 years',
    mentees: 95,
    specialties: ['React', 'Frontend development', 'Portfolio feedback'],
  },
];

const initialState: CommunityState = {
  posts: seedPosts,
  mentors: seedMentors,
  chats: {
    mt1: [
      { id: 'c1', text: 'Hi Alex! Happy to help with your career switch.', mine: false },
      { id: 'c2', text: 'Thanks Priya! I really appreciate it.', mine: true },
    ],
    mt2: [
      { id: 'c1', text: 'Hey Alex, how can I help with your data journey?', mine: false },
      { id: 'c2', text: 'I would love to know where to start with SQL.', mine: true },
      { id: 'c3', text: 'Start with SELECTs and joins, then move to aggregations. I can send you a practice set.', mine: false },
    ],
    mt3: [
      { id: 'c1', text: 'Hi Alex, send over your portfolio when you get a chance!', mine: false },
      { id: 'c2', text: 'Will do, thank you Sofia!', mine: true },
    ],
  },
  mentorRequests: [],
};

const store = createStore<CommunityState>(initialState);

export const communityStore = {
  ...store,
  addPost(input: { author: string; title: string; body: string; category: string; imageUri?: string }) {
    const post: Post = {
      id: `p${Date.now()}`,
      author: input.author,
      title: input.title,
      body: input.body,
      category: input.category,
      timeAgo: 'just now',
      imageUri: input.imageUri,
      comments: [],
    };
    store.setState({ posts: [post, ...store.getSnapshot().posts] });
  },
  addComment(postId: string, author: string, text: string) {
    const posts = store.getSnapshot().posts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        comments: [...post.comments, { id: `c${Date.now()}`, author, text }],
      };
    });
    store.setState({ posts });
  },
  requestMentor(mentorId: string) {
    const existing = store.getSnapshot().mentorRequests;
    if (existing.includes(mentorId)) return;
    store.setState({ mentorRequests: [...existing, mentorId] });
  },
  sendMessage(mentorId: string, text: string) {
    const chats = { ...store.getSnapshot().chats };
    const thread = chats[mentorId] ?? [];
    chats[mentorId] = [...thread, { id: `m${Date.now()}`, text, mine: true }];
    store.setState({ chats });
  },
  /** Clear user-generated community data (logout). */
  reset() {
    store.setState({ posts: seedPosts, mentors: seedMentors, chats: {}, mentorRequests: [] });
  },
};

export function usePosts(): Post[] {
  return store.useStore().posts;
}

export function useMentors(): Mentor[] {
  return store.useStore().mentors;
}

export function useChat(mentorId: string): ChatMessage[] {
  return store.useStore().chats[mentorId] ?? [];
}

export function useMentorRequested(mentorId: string): boolean {
  return store.useStore().mentorRequests.includes(mentorId);
}