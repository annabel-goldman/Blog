# Diamond Street Collective

A fictional lifestyle and art blog styled as an aristocratic legacy brand with ironic and elegant tones. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏛️ About

Diamond Street Collective presents itself as a sophisticated digital estate cataloging the artifacts, essays, and archival materials of a fictional aristocratic family. The site combines historical fiction with modern web design, creating an immersive experience that blurs the line between reality and imagination.

## ✨ Features

### Phase 1: Foundation
- ✅ Next.js 15 with TypeScript and App Router
- ✅ Tailwind CSS with custom aristocratic color palette
- ✅ Responsive design with mobile-first approach
- ✅ Custom fonts (Playfair Display for headings, Inter for body text)
- ✅ Base layout components (Navigation, Footer)
- ✅ TypeScript types for all content models
- ✅ Content management utilities with mock data
- ✅ Homepage with branding and featured content

### Phase 2: Core Components
- ✅ Reusable UI components (PostCard, TagList, ImageGallery, etc.)
- ✅ FakeDateRenderer for stylized historical dates
- ✅ SubmissionForm for user-generated content
- ✅ Page templates for all main routes
- ✅ Responsive grid layouts
- ✅ Image carousel with fullscreen mode

### Phase 3: Routing & Structure
- ✅ App Router structure with dynamic routes
- ✅ Next.js 15 compatibility fixes
- ✅ SEO-optimized metadata
- ✅ Static site generation support
- ✅ Proper error handling for missing content

### Phase 4: Enhanced User Experience ⭐
- ✅ **Site-wide search functionality** with suggestions
- ✅ **Advanced filtering and sorting** system
- ✅ **Loading states and skeleton screens**
- ✅ **Error boundaries and 404 pages**
- ✅ **Smooth animations and transitions**
- ✅ **Accessibility improvements**
- ✅ **Performance optimizations**

### Phase 5: Testing & Quality Assurance 🧪
- ✅ **Cypress E2E testing suite** for critical user flows
- ✅ **Component testing** for UI components
- ✅ **Automated test scripts** for CI/CD integration
- ✅ **Test coverage** for homepage, search, and archive functionality

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd blog

# Install dependencies
npm install

# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 🧪 Testing

This project includes a comprehensive Cypress testing suite for both end-to-end (E2E) and component testing.

### Running Tests

```bash
# Open Cypress Test Runner (interactive mode)
npm run cypress:open

# Run E2E tests (headless mode)
npm run cypress:run

# Start dev server and run E2E tests
npm run test:e2e

# Run component tests
npm run test:component
```

### Test Structure

- `cypress/e2e/` - End-to-end tests for critical user flows
  - `homepage.cy.ts` - Homepage functionality
  - `search.cy.ts` - Search functionality  
  - `archive.cy.ts` - Archive page functionality
- `cypress/component/` - Component tests for UI components
- `cypress/support/` - Support files and custom commands

For detailed testing documentation, see [cypress/README.md](cypress/README.md).

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── archive/           # Archive section (photo essays)
│   ├── gazette/           # Gazette section (articles)
│   ├── index/             # Index section (catalog)
│   ├── salon/             # Salon section (submissions)
│   ├── search/            # Search functionality
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── not-found.tsx      # 404 page
├── components/
│   ├── layout/            # Layout components
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components
│       ├── AdvancedFilters.tsx
│       ├── ErrorBoundary.tsx
│       ├── FakeDateRenderer.tsx
│       ├── ImageGallery.tsx
│       ├── IndexFilters.tsx
│       ├── LoadingSpinner.tsx
│       ├── PostCard.tsx
│       ├── SearchBar.tsx
│       ├── SubmissionForm.tsx
│       └── TagList.tsx
├── lib/
│   ├── content.ts         # Content management utilities
│   └── utils.ts           # Utility functions
├── types/
│   └── content.ts         # TypeScript type definitions
└── styles/                # Additional styles
cypress/                   # Cypress testing suite
├── e2e/                   # End-to-end tests
├── component/             # Component tests
├── support/               # Support files and commands
├── fixtures/              # Test data
└── README.md              # Testing documentation
```

## 🎨 Design System

### Color Palette
- **Parchment**: `#f5f2ed` - Background and subtle elements
- **Charcoal**: `#262626` - Primary text and accents
- **Aristocratic Red**: `#8B4513` - Decorative elements
- **Aristocratic Gold**: `#DAA520` - Highlights and special elements

### Typography
- **Display**: Playfair Display (serif) - Headings and titles
- **Body**: Inter (sans-serif) - Body text and UI elements

### Animations
- Smooth fade-in effects
- Staggered list animations
- Hover lift effects
- Reduced motion support for accessibility

## 🔍 Search & Discovery

### Search Features
- **Site-wide search** across all content types
- **Search suggestions** with autocomplete
- **Advanced filtering** by era, category, status, author
- **Sorting options** by date, title, author, category
- **Search results** organized by content type

### Content Types
- **Archive**: Photographic essays with historical context
- **Gazette**: Long-form articles and cultural commentary
- **Index**: Catalog of fictional estate artifacts
- **Salon**: User-generated submissions and letters

## 🛠️ Technical Features

### Performance
- Static site generation for optimal loading
- Image optimization with Next.js Image component
- Lazy loading for better performance
- Skeleton screens for loading states

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Reduced motion support

### SEO
- Dynamic metadata generation
- Open Graph tags
- Structured data support
- Sitemap generation ready

## 📝 Content Management

The site uses a mock content system that can be easily replaced with a real CMS:

```typescript
// Example content structure
interface ArchivePost {
  id: string
  type: 'archive'
  title: string
  date_display: string
  images: ArchiveImage[]
  caption: string
  body: string
  tags: string[]
  location?: string
  era?: string
}
```

## 🎯 Future Enhancements

### Potential Phase 5 Features
- User authentication and profiles
- Real-time comments and discussions
- Advanced image galleries with filters
- Newsletter subscription system
- Social media integration
- Analytics and insights dashboard
- Multi-language support
- Dark mode toggle

### CMS Integration
- Headless CMS integration (Strapi, Contentful, etc.)
- Real-time content updates
- Media management system
- Editorial workflow

## 🤝 Contributing

This is a fictional project for demonstration purposes, but contributions to improve the codebase are welcome.

## 📄 License

This project is for educational and demonstration purposes.

---

*"Est. 1809 (allegedly)"* - Diamond Street Collective
