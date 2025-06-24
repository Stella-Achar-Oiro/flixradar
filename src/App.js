import React, { useState } from 'react';
import { WatchlistProvider } from './context/WatchlistContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Watchlist from './pages/Watchlist';
import useSearch from './hooks/useSearch';
import './App.css';
import './styles/theme.css';
import './styles/responsive.css';

function App() {
  const { results, isLoading, error, search } = useSearch();
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
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
          <main className="main-content animate-fadeIn">
            <SearchResults 
              results={results} 
              isLoading={isLoading} 
              error={error}
              searchQuery={searchQuery}
            />
          </main>
        );
    }
  };

  return (
    <ThemeProvider>
      <WatchlistProvider>
        <div className="App min-h-screen">
          <Header 
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            onSearch={handleSearch}
          />
          {renderContent()}
        </div>
      </WatchlistProvider>
    </ThemeProvider>
  );
}

export default App;