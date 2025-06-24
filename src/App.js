import React from 'react';
import { WatchlistProvider } from './context/WatchlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Watchlist from './pages/Watchlist';
import useSearch from './hooks/useSearch';
import './App.css';
import './styles/theme.css';
import './styles/responsive.css';

function App() {
  const { results, isLoading, error, search } = useSearch();
  const [currentPage, setCurrentPage] = React.useState('home');

  const handleSearch = (query) => {
    search(query);
    if (currentPage !== 'home') {
      setCurrentPage('home');
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'watchlist':
        return <Watchlist />;
      case 'home':
      default:
        return (
          <main className="main-content">
            <div className="search-section">
              <SearchBar onSearch={handleSearch} />
            </div>
            <SearchResults 
              results={results} 
              isLoading={isLoading} 
              error={error}
            />
          </main>
        );
    }
  };

  return (
    <ThemeProvider>
      <WatchlistProvider>
        <div className="App">
          <Header 
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
          <div className="container">
            {renderContent()}
          </div>
        </div>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;