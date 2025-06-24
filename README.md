# FlixRadar

A modern, responsive movie and TV show discovery application built with React.

## Features

🎬 **Movie & TV Discovery**
- Search movies and TV shows using real-time search
- Browse trending and popular content
- View detailed information including ratings, cast, and synopsis

❤️ **Personal Watchlist**
- Add movies and TV shows to your personal watchlist
- Export watchlist data in JSON or CSV format
- Persistent storage using localStorage

🎨 **Theme System**
- Dark and light theme support
- System preference detection
- Customizable appearance settings

📱 **Responsive Design**
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interactions

## Tech Stack

- **React** - Frontend framework
- **Context API** - State management
- **CSS Variables** - Theme system
- **TMDB API** - Movie/TV data
- **OMDB API** - Additional ratings and metadata

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Stella-Achar-Oiro/flixradar.git
cd flixradar
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_OMDB_API_KEY=your_omdb_api_key
```

5. Start the development server:
```bash
npm start
```

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API and external services
├── styles/             # Global styles and themes
└── utils/              # Utility functions
```

## API Keys

You'll need API keys from:
- [TMDB](https://www.themoviedb.org/settings/api) - Free API for movie/TV data
- [OMDB](http://www.omdbapi.com/apikey.aspx) - Free API for additional ratings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie database
- [OMDB](http://www.omdbapi.com/) for additional movie information
