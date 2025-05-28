# Team Showcase Component

A responsive, feature-rich team showcase component built with React, Next.js, and Tailwind CSS. Perfect for displaying team members with search and pagination capabilities.

![Team Showcase Preview](https://via.placeholder.com/800x400/f3f4f6/374151?text=Team+Showcase+Component)

## Features

- **Responsive Design** - Works seamlessly on all screen sizes
- **Enhanced Search** - Search by name, job title, bio, or skills
- **Pagination** - Navigate through team members efficiently
- **Hover Animations** - Smooth scale and shadow effects
- **Detailed Profiles** - Display bio, skills, email, and phone
- **Contact & Social Links** - Email, Phone, LinkedIn, and Twitter integration
- **Lazy Loading** - Optimized performance with dynamic imports (Note: Image lazy loading is handled by `next/image`)
- **Accessibility** - ARIA labels and semantic HTML
- **Loading States** - Skeleton loading animations (Note: Removed loading state for local JSON data loading)

## Quick Start


###  Setup

#### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

#### Installation Steps

1. **Create a new Next.js project**
   \`\`\`bash
   npx create-next-app@latest team-showcase --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   cd team-showcase
   \`\`\`

2. **Initialize shadcn/ui**
   \`\`\`bash
   npx shadcn@latest init
   \`\`\`

3. **Install required components**
   \`\`\`bash
   npx shadcn@latest add card button select badge input
   \`\`\`

4. **Install additional dependencies**
   \`\`\`bash
   npm install lucide-react
   \`\`\`

5. **Add the project files**
   - Copy the component files from this project
   - Ensure the file structure matches the project layout

6. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

Visit \`http://localhost:3000\` to see your Team Showcase!

## Project Structure

\`\`\`
team-showcase/
├── src/
│   ├── data/
│   │   └── team-data.json          # Team member data
│   ├── components/
│   │   ├── ui/                        # shadcn/ui components
│   │   │   ├── card.tsx
│   │   │   ├── button.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   └── input.tsx
│   │   └── team-showcase.tsx          # Main component
│   ├── app/
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   └── lib/
│       └── utils.ts                  # Utility functions
├── public/ # Public assets
└── ... other project files (tailwind.config.ts, package.json, etc.)
\`\`\`

## Usage

### Basic Usage

\`\`\`tsx
import TeamShowcase from '@/components/team-showcase'

export default function Page() {
  return (
    <main>
      <TeamShowcase itemsPerPage={6} />
    </main>
  )
}
\`\`\`

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`itemsPerPage\` | \`number\` | \`6\` | Number of team members to display per page |

## Data Structure

Team member data is stored in \`src/data/team-data.json\`. Each team member object should follow this structure:

\`\`\`json
{
  "id": number,
  "name": string,
  "jobTitle": string,
  "department": string, // Optional: Currently not used for filtering in the component
  "photo": string, // URL or path to the team member's photo
  "bio": string, // Optional
  "email": string, // Optional
  "phone": string, // Optional
  "socialLinks": { // Optional
    "linkedin": string, // Optional
    "twitter": string // Optional
  },
  "skills": string[] // Optional
}
\`\`\`

### Required Fields

- \`id\`: Unique identifier (number)
- \`name\`: Full name (string)
- \`jobTitle\`: Job position (string)
- \`photo\`: Image URL or path (string)

### Optional Fields

- \`department\`: Department name (string). Note: The component currently does not filter by department.
- \`bio\`: A short biography (string).
- \`email\`: Email address (string).
- \`phone\`: Phone number (string).
- \`socialLinks\`: Object containing social media URLs.
  - \`linkedin\`: LinkedIn profile URL (string).
  - \`twitter\`: Twitter profile URL (string).
- \`skills\`: An array of strings representing skills.

## Customization

### Adding Team Members

Edit \`src/data/team-data.json\` and add new entries following the data structure described above.

### Changing Items Per Page

\`\`\`tsx
<TeamShowcase itemsPerPage={9} />
\`\`\`

### Styling Customization

The component uses Tailwind CSS classes. Key areas for customization:

- **Card hover effects**: Modify \`hover:scale-105 hover:shadow-lg\`
- **Color scheme**: Update badge variants and text colors
- **Spacing**: Adjust padding and margin classes
- **Animations**: Customize transition durations

### Adding New Departments

While the component doesn't currently filter by department, you can still include the \`department\` field in \`src/data/team-data.json\` for organizational purposes or future development.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically


### Other Platforms

- **Netlify**: Connect your Git repository
- **AWS Amplify**: Use the Amplify console
- **Docker**: See Docker section below

## Docker Setup

Create a \`Dockerfile\`:

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

Build and run:

\`\`\`bash
docker build -t team-showcase .
docker run -p 3000:3000 team-showcase
\`\`\`

##  Testing

### Setup Testing (Optional)

\`\`\`bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
\`\`\`

### Example Test

\`\`\`tsx
import { render, screen } from '@testing-library/react'
import TeamShowcase from '@/components/team-showcase'

test('renders team showcase header', () => {
  render(<TeamShowcase />)
  expect(screen.getByText('Meet Our Team')).toBeInTheDocument()
})
\`\`\`

##  Troubleshooting

### Common Issues

**Import errors with JSON file**
- Ensure \`src/data/team-data.json\` is in the correct location.
- Check that the import path in \`src/components/team-showcase.tsx\` is correct (\`.././data/team-data.json\`).
- Verify the JSON syntax is valid.

**Invalid \`src\` prop on \`next/image\`**
- Ensure the hostname for external images (e.g., \`images.unsplash.com\`) is configured in \`next.config.js\` under the \`images.domains\` array.

## Performance Optimization

The component includes several performance optimizations:

- **Lazy Loading**: Component is loaded dynamically using Next.js \`dynamic\`
- **Pagination**: Limits DOM elements by showing only current page items
- **Optimized Images**: Uses Next.js \`Image\` component for automatic optimization
- **Efficient Filtering**: Uses React state for client-side filtering

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature-name\`
3. Commit changes: \`git commit -am 'Add feature'\`
4. Push to branch: \`git push origin feature-name\`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information

---


\`\`\`
