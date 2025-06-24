import { 
  ArchivePost, 
  GazetteArticle, 
  IndexItem, 
  SalonEntry, 
  ContentFilters
} from '@/types/content'

// Mock data - in a real app, this would come from a CMS or API
const mockArchivePosts: ArchivePost[] = [
  {
    id: '1',
    type: 'archive',
    slug: 'the-lost-garden-of-diamond-street',
    title: 'The Lost Garden of Diamond Street',
    date_display: 'Spring, 1823',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    images: [
      {
        id: 'img1',
        src: '/png/1.png',
        alt: 'A mysterious garden path',
        caption: 'The entrance to what was once a magnificent garden',
        order: 1
      }
    ],
    caption: 'A photographic essay documenting the remains of the once-famous Diamond Street gardens',
    body: 'In the spring of 1823, the gardens of Diamond Street were said to be the most beautiful in all of London...',
    archivist_notes: 'Note: The exact location of these gardens remains disputed among historians.',
    location: 'Diamond Street, London',
    era: 'Early 19th Century',
    tags: ['gardens', 'lost', 'spring', 'london']
  }
]

const mockGazetteArticles: GazetteArticle[] = [
  {
    id: '1',
    type: 'gazette',
    slug: 'on-the-nature-of-collecting',
    title: 'On the Nature of Collecting',
    date_display: 'December 15, 1847',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    author: 'Lady Eleanor Blackwood',
    author_bio: 'A distinguished collector and patron of the arts',
    subtitle: 'A philosophical treatise on the aristocratic impulse to preserve',
    body: 'The act of collecting is not merely an accumulation of objects, but a form of time travel...',
    tags: ['philosophy', 'collecting', 'aristocracy'],
    featured: true,
    editor_pick: true
  }
]

const mockIndexItems: IndexItem[] = [
  {
    id: '1',
    type: 'index',
    slug: 'the-crystal-chandelier',
    title: 'The Crystal Chandelier',
    date_display: 'Circa 1815',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/2.png',
    short_description: 'A magnificent crystal chandelier said to have illuminated the grand ballroom',
    full_description: 'This extraordinary chandelier, crafted by the renowned Venetian glassmakers, once illuminated the grand ballroom of Diamond Street Manor. Its thousand crystal prisms captured and refracted light in such a way that guests reported seeing spectral figures dancing in the shadows.',
    provenance: 'Originally commissioned by the Duke of Diamond Street for his grand ballroom',
    status: 'Lost',
    era: 'Regency',
    category: 'Lighting',
    owner: 'Duke of Diamond Street',
    estimated_value: '£50,000',
    location: 'Unknown'
  },
  {
    id: '2',
    type: 'index',
    slug: 'the-forgotten-portrait',
    title: 'The Forgotten Portrait',
    date_display: 'Circa 1790',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/3.png',
    short_description: 'A portrait of an unknown woman, her identity lost to time',
    full_description: 'This haunting portrait depicts a young woman in Georgian dress, her expression enigmatic and her identity unknown. The artist\'s signature has been worn away by time, leaving only the faintest traces of what might have been "J. Blackwood" or similar.',
    provenance: 'Discovered in the attic of Diamond Street Manor during renovations in 1923',
    status: 'In Collection',
    era: 'Georgian',
    category: 'Art',
    owner: 'Unknown',
    estimated_value: '£15,000',
    location: 'Diamond Street Manor, East Wing'
  },
  {
    id: '3',
    type: 'index',
    slug: 'the-clockwork-bird',
    title: 'The Clockwork Bird',
    date_display: 'Circa 1820',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/4.png',
    short_description: 'An intricate mechanical bird that sings when wound',
    full_description: 'This remarkable automaton, crafted by the master clockmaker Henri Dubois, takes the form of a nightingale perched on a golden branch. When wound, it not only sings but also moves its wings and head in a lifelike manner.',
    provenance: 'Gifted to Lady Eleanor Blackwood by her husband on their 25th wedding anniversary',
    status: 'On Display',
    era: 'Regency',
    category: 'Automata',
    owner: 'Lady Eleanor Blackwood',
    estimated_value: '£75,000',
    location: 'Diamond Street Manor, Music Room'
  },
  {
    id: '4',
    type: 'index',
    slug: 'the-golden-goblet',
    title: 'The Golden Goblet',
    date_display: 'Circa 1802',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/5.png',
    short_description: 'A goblet said to grant visions to those who drink from it',
    full_description: 'This ornate goblet, crafted from gold and encrusted with rubies, was rumored to grant prophetic visions to those who drank from it during the solstice.',
    provenance: 'Passed down through generations of the Blackwood family',
    status: 'On Display',
    era: 'Georgian',
    category: 'Tableware',
    owner: 'Blackwood Family',
    estimated_value: '£30,000',
    location: 'Diamond Street Manor, Dining Hall'
  },
  {
    id: '5',
    type: 'index',
    slug: 'the-missing-music-box',
    title: 'The Missing Music Box',
    date_display: 'Circa 1830',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/6.png',
    short_description: 'A music box that vanished during a masquerade ball',
    full_description: 'This delicate music box, inlaid with mother-of-pearl, played a haunting melody. It disappeared mysteriously during the infamous masquerade of 1830.',
    provenance: 'Gifted to Lady Eleanor by a secret admirer',
    status: 'Lost',
    era: 'Regency',
    category: 'Music',
    owner: 'Unknown',
    estimated_value: '£12,000',
    location: 'Unknown'
  },
  {
    id: '6',
    type: 'index',
    slug: 'the-ivory-letter-opener',
    title: 'The Ivory Letter Opener',
    date_display: 'Circa 1795',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/7.png',
    short_description: 'A letter opener carved from ivory, rumored to be cursed',
    full_description: 'This finely carved letter opener was said to bring misfortune to those who used it to open correspondence from rivals.',
    provenance: 'Acquired at auction in 1920',
    status: 'In Collection',
    era: 'Georgian',
    category: 'Desk Accessories',
    owner: 'Diamond Street Collective',
    estimated_value: '£2,500',
    location: 'Diamond Street Manor, Study'
  },
  {
    id: '7',
    type: 'index',
    slug: 'the-emerald-brooch',
    title: 'The Emerald Brooch',
    date_display: 'Circa 1810',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/8.png',
    short_description: 'A brooch set with a large emerald, lost during a storm',
    full_description: 'This exquisite brooch was last seen pinned to Lady Eleanor\'s cloak before the great storm of 1810.',
    provenance: 'Commissioned from a Parisian jeweler',
    status: 'Lost',
    era: 'Regency',
    category: 'Jewelry',
    owner: 'Lady Eleanor Blackwood',
    estimated_value: '£22,000',
    location: 'Unknown'
  },
  {
    id: '8',
    type: 'index',
    slug: 'the-porcelain-tea-set',
    title: 'The Porcelain Tea Set',
    date_display: 'Circa 1825',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    image: '/png/9.png',
    short_description: 'A tea set imported from China, used in secret gatherings',
    full_description: 'This delicate tea set was used during clandestine meetings of the Diamond Street Society.',
    provenance: 'Imported from China in 1825',
    status: 'On Display',
    era: 'Regency',
    category: 'Tableware',
    owner: 'Diamond Street Collective',
    estimated_value: '£8,000',
    location: 'Diamond Street Manor, Parlor'
  }
]

const mockSalonEntries: SalonEntry[] = [
  {
    id: '1',
    type: 'salon',
    slug: 'memory-of-a-place-that-never-existed',
    title: 'Memory of a Place That Never Existed',
    date_display: 'January 15, 2024',
    created_at: '2024-01-15',
    updated_at: '2024-01-15',
    pseudonym: 'The Anonymous Wanderer',
    message: 'I remember the library that stood at the corner of Diamond Street and Memory Lane...',
    prompt: 'Write a memory from a place that never existed',
    approved: true,
    timestamp: '2024-01-15T10:30:00Z'
  }
]

// Content fetching functions
export async function getArchivePosts(filters?: ContentFilters): Promise<ArchivePost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  let posts = [...mockArchivePosts]
  
  if (filters?.tags?.length) {
    posts = posts.filter(post => 
      filters.tags!.some(tag => post.tags.includes(tag))
    )
  }
  
  if (filters?.era) {
    posts = posts.filter(post => post.era === filters.era)
  }
  
  return posts
}

export async function getGazetteArticles(filters?: ContentFilters): Promise<GazetteArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  let articles = [...mockGazetteArticles]
  
  if (filters?.tags?.length) {
    articles = articles.filter(article => 
      filters.tags!.some(tag => article.tags.includes(tag))
    )
  }
  
  if (filters?.author) {
    articles = articles.filter(article => article.author === filters.author)
  }
  
  return articles
}

export async function getIndexItems(filters?: ContentFilters): Promise<IndexItem[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  let items = [...mockIndexItems]
  
  if (filters?.category) {
    items = items.filter(item => item.category === filters.category)
  }
  
  if (filters?.status) {
    items = items.filter(item => item.status === filters.status)
  }
  
  if (filters?.era) {
    items = items.filter(item => item.era === filters.era)
  }
  
  return items
}

export async function getSalonEntries(): Promise<SalonEntry[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockSalonEntries.filter(entry => entry.approved)
}

// Get single item by slug
export async function getArchivePost(slug: string): Promise<ArchivePost | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockArchivePosts.find(post => post.slug === slug) || null
}

export async function getGazetteArticle(slug: string): Promise<GazetteArticle | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockGazetteArticles.find(article => article.slug === slug) || null
}

export async function getIndexItem(slug: string): Promise<IndexItem | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockIndexItems.find(item => item.slug === slug) || null
}

// Get random items
export async function getRandomIndexItem(): Promise<IndexItem | null> {
  await new Promise(resolve => setTimeout(resolve, 100))
  const items = await getIndexItems()
  return items[Math.floor(Math.random() * items.length)] || null
}

// Get featured content
export async function getFeaturedGazetteArticles(): Promise<GazetteArticle[]> {
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockGazetteArticles.filter(article => article.featured || article.editor_pick)
}

// Get all available tags
export async function getAllTags(): Promise<string[]> {
  const archivePosts = await getArchivePosts()
  const gazetteArticles = await getGazetteArticles()
  
  const allTags = [
    ...archivePosts.flatMap(post => post.tags),
    ...gazetteArticles.flatMap(article => article.tags)
  ]
  
  return [...new Set(allTags)].sort()
}

// Get all available categories (for Index)
export async function getAllCategories(): Promise<string[]> {
  const items = await getIndexItems()
  const categories = items.map(item => item.category)
  return [...new Set(categories)].sort()
}

// Get all available eras
export async function getAllEras(): Promise<string[]> {
  const archivePosts = await getArchivePosts()
  const indexItems = await getIndexItems()
  
  const allEras = [
    ...archivePosts.map(post => post.era).filter((era): era is string => Boolean(era)),
    ...indexItems.map(item => item.era)
  ]
  
  return [...new Set(allEras)].sort()
}

// Submit salon entry
export async function submitSalonEntry(data: {
  pseudonym: string;
  message: string;
  prompt: string;
}): Promise<SalonEntry> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate submission delay
  
  const newEntry: SalonEntry = {
    id: Date.now().toString(),
    type: 'salon',
    slug: `salon-${Date.now()}`,
    title: `Submission: ${data.prompt}`,
    date_display: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    pseudonym: data.pseudonym || 'Anonymous',
    message: data.message,
    prompt: data.prompt,
    approved: false, // Would need moderation in real app
    timestamp: new Date().toISOString()
  }
  
  // In a real app, this would save to database
  mockSalonEntries.push(newEntry)
  
  return newEntry
} 