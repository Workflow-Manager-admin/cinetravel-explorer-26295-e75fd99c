import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function MainMenu({ onMenuSelect }) {
  return (
    <nav className="navbar ct-navbar">
      <div className="container ct-flex-between">
        <div className="logo ct-logo">
          <span className="logo-symbol ct-logo-symbol" aria-label="film reel" title="CineTravel Explorer">🎬</span>
          CineTravel Explorer
        </div>
        <div className="ct-menu-actions">
          <button className="btn ct-menu-btn" onClick={() => onMenuSelect('map')}>
            🌍 Map
          </button>
        </div>
      </div>
    </nav>
  );
}

// Mock Data
const featuredDestinations = [
  {
    id: 1,
    title: "Skellig Michael, Ireland",
    movie: "Star Wars: The Force Awakens",
    scene: "Luke's Hideaway",
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    trivia: "The island served as Luke Skywalker's home in the Star Wars sequel trilogy.",
  },
  {
    id: 2,
    title: "Amity Island (Martha's Vineyard, USA)",
    movie: "Jaws",
    scene: "The iconic beach scenes",
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    trivia: "Spielberg shot much of 'Jaws' on this real island for authentic summer vibes.",
  },
  {
    id: 3,
    title: "Hobbiton, New Zealand",
    movie: "The Lord of the Rings",
    scene: "Shire's rolling hills",
    image: 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=800&q=80',
    trivia: "The original Hobbiton set remains as a tourist destination for fans.",
  },
  {
    id: 4,
    title: "Dubrovnik, Croatia",
    movie: "Game of Thrones",
    scene: "King's Landing",
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    trivia: "The ancient city walls doubled as the capital city of Westeros.",
  }
];

// PUBLIC_INTERFACE
function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form className="ct-search-bar" onSubmit={e => {e.preventDefault();onSearch();}}>
      <input
        type="text"
        className="ct-search-input"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search movies, locations, scenes..."
        aria-label="Search for destinations"
      />
      <button type="submit" className="btn ct-search-btn">Search</button>
    </form>
  );
}

// PUBLIC_INTERFACE
function DestinationCard({ destination, onSelect }) {
  return (
    <div className="ct-destination-card" onClick={() => onSelect(destination)}>
      <div className="ct-card-img-wrap">
        <img src={destination.image} alt={destination.title} className="ct-card-img"/>
        <span className="ct-card-movie">{destination.movie}</span>
      </div>
      <div className="ct-card-content">
        <h3 className="ct-card-title">{destination.title}</h3>
        <div className="ct-card-scene">{destination.scene}</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function DestinationGrid({ destinations, onSelect }) {
  if (destinations.length === 0) {
    return (
      <div className="ct-grid-empty">No destinations found for your search.</div>
    );
  }
  return (
    <div className="ct-destination-grid">
      {destinations.map(dest => (
        <DestinationCard key={dest.id} destination={dest} onSelect={onSelect}/>
      ))}
    </div>
  );
}

/** 
 * PUBLIC_INTERFACE
 * DestinationModal component for displaying selected destination details,
 * now includes an external trip planner button.
 */
function DestinationModal({ destination, onClose }) {
  // Trip planner external link
  const tripPlannerUrl = "https://www.tripit.com";

  // PUBLIC_INTERFACE
  // Handles clicking the overlay (outside modal content)
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      // Overlay itself, close modal and reset homepage view
      onClose();
    }
  }

  return (
    <div
      className="ct-modal-overlay"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
      data-testid="ct-modal-overlay"
    >
      <div className="ct-modal">
        <button className="ct-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <img src={destination.image} alt={destination.title} className="ct-modal-img"/>
        <div className="ct-modal-content">
          <h2>{destination.title}</h2>
          <div className="ct-modal-movie">{destination.movie}</div>
          <div className="ct-modal-scene"><b>Scene:</b> {destination.scene}</div>
          <div className="ct-modal-trivia">
            <b>Trivia:</b> {destination.trivia}
          </div>
          {/* PUBLIC_INTERFACE: Plan Your Trip button opens an external planner */}
          <a
            className="btn btn-large ct-trip-btn"
            href={tripPlannerUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            Plan Your Trip
          </a>
          <div className="ct-modal-reviews">
            <div className="ct-review-title"><b>User Reviews & Ratings</b> <span className="ct-review-stars">★★★★☆</span></div>
            <p className="ct-review-text">“Absolutely magical! Visiting this location brought my favorite film to life.”</p>
            <form className="ct-review-form" onSubmit={e=>{e.preventDefault();alert("Review submitted!");onClose();}}>
              <input className="ct-review-input" placeholder="Write a review..." maxLength={100}/>
              <button className="btn ct-review-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function MapModal({ onClose }) {
  // This would embed a real map; here, we use a placeholder image.
  return (
    <div className="ct-modal-overlay" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="ct-modal ct-modal-map">
        <button className="ct-modal-close" onClick={onClose} aria-label="Close">&times;</button>
        <h2>Filming Locations Map</h2>
        <img
          src="https://images.unsplash.com/photo-1502920917128-1aa500764ce0?auto=format&fit=crop&w=800&q=80"
          alt="World Map"
          className="ct-map-img"
        />
        <p className="ct-map-desc">Explore film locations worldwide! (Interactive version coming soon.)</p>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Search/filter state
  const [search, setSearch] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const filteredDestinations = search
    ? featuredDestinations.filter(dest =>
        [dest.title, dest.movie, dest.scene].some(field =>
          field.toLowerCase().includes(search.toLowerCase())
        )
      )
    : featuredDestinations;

  function handleMenuSelect(menu) {
    if (menu === 'map') setShowMap(true);
  }

  return (
    <div className="app ct-app">
      <MainMenu onMenuSelect={handleMenuSelect} />

      <main className="ct-main-content">
        <section className="ct-hero" style={{
          backgroundImage: 'linear-gradient(rgba(26,26,46,0.75),rgba(26,26,46,0.96)), url(https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=1400&q=80)'
        }}>
          <div className="ct-hero-content">
            <div className="ct-hero-headline">
              <h1 className="ct-title-film ct-film-shine">
                Discover <span className="ct-accent">Iconic Scenes</span><br />
                <span className="ct-secondary">Where Fantasy Meets Reality</span>
              </h1>
              <div className="ct-hero-desc">
                Explore real travel destinations from your favorite movies and TV shows. Plan your next cinematic adventure and immerse yourself in true film magic!
              </div>
            </div>
            <SearchBar
              search={search}
              setSearch={setSearch}
              onSearch={() => {}}
            />
          </div>
        </section>

        <section className="ct-section ct-featured-section">
          <h2 className="ct-section-title">🌟 Featured Destinations</h2>
          <DestinationGrid
            destinations={filteredDestinations}
            onSelect={setSelectedDestination}
          />
        </section>
      </main>

      <footer className="ct-footer">
        <div className="container">
          <div>
            <span className="ct-footer-title">CineTravel Explorer</span> &copy; 2024 &mdash; Unlock the magic of movie travel!
          </div>
          <nav className="ct-footer-nav">
            <a href="#map" className="ct-footer-link" onClick={e => {e.preventDefault(); setShowMap(true);}}>
              Explore Map
            </a>
            <span className="ct-footer-sep">|</span>
            <a href="#about" className="ct-footer-link" onClick={e=>e.preventDefault()}>
              About
            </a>
          </nav>
        </div>
      </footer>

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {showMap && (
        <MapModal onClose={() => setShowMap(false)} />
      )}
    </div>
  );
}

export default App;
