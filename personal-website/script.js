/* ================================================
   PREMIUM PERSONAL WEBSITE - JAVASCRIPT
   All interactive features with localStorage integration
   Author: Premium Portfolio Template
   Version: 1.0.0
================================================= */

// ================================================
// GLOBAL STATE MANAGEMENT
// Centralized data storage for the application
// ================================================

const AppState = {
    // Current note being edited (null if creating new note)
    currentNoteId: null,
    // Target category for watchlist modal ('wantToWatch' or 'watched')
    watchlistTarget: 'wantToWatch',
    // Currently selected gallery image index
    currentGalleryIndex: 0,
    // Track currently playing audio element
    currentlyPlaying: null,
};

// ================================================
// DOM ELEMENT REFERENCES
// Cache frequently used DOM elements for performance
// ================================================

const Elements = {
    // Theme toggle
    themeToggle: document.getElementById('themeToggle'),
    body: document.body,

    // Side navigation
    menuToggle: document.getElementById('menuToggle'),
    sideNav: document.getElementById('sideNav'),
    closeSideNav: document.getElementById('closeSideNav'),
    navOverlay: document.getElementById('navOverlay'),
    navLinks: document.querySelectorAll('.nav-link'),

    // Search
    searchToggle: document.getElementById('searchToggle'),
    searchOverlay: document.getElementById('searchOverlay'),
    closeSearch: document.getElementById('closeSearch'),
    searchInput: document.getElementById('searchInput'),
    searchResults: document.getElementById('searchResults'),

    // Notes
    addNoteBtn: document.getElementById('addNoteBtn'),
    notesGrid: document.getElementById('notesGrid'),
    notesEmptyState: document.getElementById('notesEmptyState'),
    noteModal: document.getElementById('noteModal'),
    closeNoteModal: document.getElementById('closeNoteModal'),
    noteInput: document.getElementById('noteInput'),
    saveNote: document.getElementById('saveNote'),
    cancelNote: document.getElementById('cancelNote'),
    noteModalTitle: document.getElementById('noteModalTitle'),

    // Watchlist
    addToWantBtn: document.getElementById('addToWantBtn'),
    addToWatchedBtn: document.getElementById('addToWatchedBtn'),
    wantToWatchGrid: document.getElementById('wantToWatchGrid'),
    watchedGrid: document.getElementById('watchedGrid'),
    watchlistModal: document.getElementById('watchlistModal'),
    closeWatchlistModal: document.getElementById('closeWatchlistModal'),
    watchlistForm: document.getElementById('watchlistForm'),
    cancelWatchlist: document.getElementById('cancelWatchlist'),

    // Gallery
    galleryItems: document.querySelectorAll('.gallery-item'),
    galleryModal: document.getElementById('galleryModal'),
    closeGalleryModal: document.getElementById('closeGalleryModal'),
    modalImage: document.getElementById('modalImage'),
    modalCaption: document.getElementById('modalCaption'),
    modalCounter: document.getElementById('modalCounter'),
    prevPhoto: document.getElementById('prevPhoto'),
    nextPhoto: document.getElementById('nextPhoto'),

    // Projects
    viewProjectBtns: document.querySelectorAll('.view-project'),
    projectModal: document.getElementById('projectModal'),
    closeProjectModal: document.getElementById('closeProjectModal'),
    projectDetails: document.getElementById('projectDetails'),

    // Settings
    settingsToggle: document.getElementById('settingsToggle'),
    settingsModal: document.getElementById('settingsModal'),
    closeSettingsModal: document.getElementById('closeSettingsModal'),
    colorOptions: document.querySelectorAll('.color-option'),
    fontOptions: document.querySelectorAll('.font-option'),
    cardStyleOptions: document.querySelectorAll('.card-style-option'),
    resetSettings: document.getElementById('resetSettings'),

    // Music Players
    playBtns: document.querySelectorAll('.play-btn'),
    audioElements: document.querySelectorAll('.audio-element'),
    volumeSliders: document.querySelectorAll('.volume-slider'),
    progressBars: document.querySelectorAll('.progress-bar'),
};

// ================================================
// 1. DARK/LIGHT MODE TOGGLE
// Theme switching with localStorage persistence
// ================================================

function initThemeToggle() {
    // Load saved theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Add click event listener to theme toggle button
    Elements.themeToggle.addEventListener('click', () => {
        // Toggle between light and dark themes
        const currentTheme = Elements.body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(currentTheme);
        // Save preference to localStorage
        localStorage.setItem('theme', currentTheme);
    });
}

function applyTheme(theme) {
    if (theme === 'light') {
        // Add light theme class to body
        Elements.body.classList.add('light-theme');
        // Change icon to sun
        Elements.themeToggle.querySelector('i').className = 'fas fa-sun';
    } else {
        // Remove light theme class (dark is default)
        Elements.body.classList.remove('light-theme');
        // Change icon to moon
        Elements.themeToggle.querySelector('i').className = 'fas fa-moon';
    }
}

// ================================================
// 2. SIDE NAVIGATION MENU
// Animated slide-in menu from left
// ================================================

function initSideNav() {
    // Open side navigation
    Elements.menuToggle.addEventListener('click', () => {
        Elements.sideNav.classList.add('active');
        Elements.navOverlay.classList.add('active');
    });

    // Close side navigation - close button
    Elements.closeSideNav.addEventListener('click', closeSideNav);

    // Close side navigation - overlay click
    Elements.navOverlay.addEventListener('click', closeSideNav);

    // Close side navigation when clicking a link (after smooth scroll)
    Elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeSideNav();
        });
    });
}

function closeSideNav() {
    Elements.sideNav.classList.remove('active');
    Elements.navOverlay.classList.remove('active');
}

// ================================================
// 3. SEARCH FUNCTIONALITY
// Real-time client-side search across all content
// ================================================

function initSearch() {
    // Open search overlay
    Elements.searchToggle.addEventListener('click', () => {
        Elements.searchOverlay.classList.add('active');
        // Focus on input field
        Elements.searchInput.focus();
    });

    // Close search overlay
    Elements.closeSearch.addEventListener('click', closeSearch);

    // Close search on ESC key
    Elements.searchOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSearch();
    });

    // Real-time search as user types
    Elements.searchInput.addEventListener('input', performSearch);
}

function closeSearch() {
    Elements.searchOverlay.classList.remove('active');
    Elements.searchInput.value = '';
    Elements.searchResults.innerHTML = '<p class="search-hint">Start typing to search...</p>';
}

function performSearch() {
    const query = Elements.searchInput.value.toLowerCase().trim();

    if (!query) {
        Elements.searchResults.innerHTML = '<p class="search-hint">Start typing to search...</p>';
        return;
    }

    // Collect searchable content from different sections
    const searchableContent = [
        // Notes
        ...getNotesFromStorage().map(note => ({
            type: 'Note',
            title: 'Personal Note',
            content: note.content,
            section: 'notes'
        })),
        // Projects
        ...getProjectsData().map(project => ({
            type: 'Project',
            title: project.title,
            content: project.description,
            section: 'projects'
        })),
        // Music tracks
        ...getMusicData().map(track => ({
            type: 'Music',
            title: track.title,
            content: track.artist,
            section: 'music'
        })),
        // Watchlist items
        ...getWatchlistFromStorage().wantToWatch.map(item => ({
            type: 'Watchlist (Want to Watch)',
            title: item.title,
            content: `${item.year} • ${item.genre}`,
            section: 'watchlist'
        })),
        ...getWatchlistFromStorage().watched.map(item => ({
            type: 'Watchlist (Watched)',
            title: item.title,
            content: `${item.year} • ${item.genre}`,
            section: 'watchlist'
        }))
    ];

    // Filter results based on query
    const results = searchableContent.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
    );

    // Display results
    if (results.length === 0) {
        Elements.searchResults.innerHTML = '<p class="search-hint">No results found.</p>';
    } else {
        Elements.searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="scrollToSection('${result.section}')">
                <div class="search-result-title">[${result.type}] ${highlightText(result.title, query)}</div>
                <div class="search-result-content">${highlightText(result.content, query)}</div>
            </div>
        `).join('');
    }
}

function highlightText(text, query) {
    // Highlight matched text with special styling
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function scrollToSection(sectionId) {
    // Close search and scroll to section
    closeSearch();
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ================================================
// 4. MUSIC PLAYER
// Custom audio player with controls
// ================================================

function initMusicPlayer() {
    // Initialize each music player
    Elements.playBtns.forEach((btn, index) => {
        const audio = Elements.audioElements[index];
        const progressFill = document.querySelector(`.progress-fill[data-track="${index}"]`);
        const progressBar = btn.closest('.music-player').querySelector('.progress-bar');
        const currentTimeElem = btn.closest('.music-player').querySelector('.current-time');
        const totalTimeElem = btn.closest('.music-player').querySelector('.total-time');
        const volumeSlider = document.querySelector(`.volume-slider[data-track="${index}"]`);
        const disc = btn.closest('.music-player').querySelector('.music-disc');

        // Play/Pause button click
        btn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause any currently playing audio
                pauseAllAudio();
                // Play this audio
                audio.play();
                btn.querySelector('i').className = 'fas fa-pause';
                btn.classList.add('playing');
                disc.classList.remove('rotating-paused');
                disc.classList.add('rotating');
                AppState.currentlyPlaying = audio;
            } else {
                // Pause this audio
                audio.pause();
                btn.querySelector('i').className = 'fas fa-play';
                btn.classList.remove('playing');
                disc.classList.add('rotating-paused');
                disc.classList.remove('rotating');
            }
        });

        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progress}%`;
            currentTimeElem.textContent = formatTime(audio.currentTime);
        });

        // Update total time when metadata loads
        audio.addEventListener('loadedmetadata', () => {
            totalTimeElem.textContent = formatTime(audio.duration);
        });

        // Click on progress bar to seek
        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            audio.currentTime = percentage * audio.duration;
        });

        // Volume slider control
        volumeSlider.addEventListener('input', (e) => {
            audio.volume = e.target.value / 100;
        });

        // Reset button when audio ends
        audio.addEventListener('ended', () => {
            btn.querySelector('i').className = 'fas fa-play';
            btn.classList.remove('playing');
            disc.classList.add('rotating-paused');
            disc.classList.remove('rotating');
            progressFill.style.width = '0%';
        });
    });
}

function pauseAllAudio() {
    // Pause all audio players
    Elements.audioElements.forEach((audio, index) => {
        if (!audio.paused) {
            audio.pause();
            const btn = Elements.playBtns[index];
            btn.querySelector('i').className = 'fas fa-play';
            btn.classList.remove('playing');
            const disc = btn.closest('.music-player').querySelector('.music-disc');
            disc.classList.add('rotating-paused');
            disc.classList.remove('rotating');
        }
    });
}

function formatTime(seconds) {
    // Convert seconds to MM:SS format
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ================================================
// 5. NOTES SYSTEM
// Dynamic CRUD operations with localStorage
// ================================================

function initNotes() {
    // Add note button
    Elements.addNoteBtn.addEventListener('click', () => {
        AppState.currentNoteId = null;
        Elements.noteModalTitle.innerHTML = '<i class="fas fa-sticky-note"></i> Add Note';
        Elements.noteInput.value = '';
        Elements.noteModal.classList.add('active');
        Elements.noteInput.focus();
    });

    // Save note button
    Elements.saveNote.addEventListener('click', saveNote);

    // Cancel note button
    Elements.cancelNote.addEventListener('click', closeNoteModal);

    // Close modal button
    Elements.closeNoteModal.addEventListener('click', closeNoteModal);

    // Close modal on ESC key
    Elements.noteModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNoteModal();
    });

    // Load and display existing notes
    renderNotes();
}

function saveNote() {
    const content = Elements.noteInput.value.trim();

    if (!content) {
        alert('Please enter some content for your note.');
        return;
    }

    const notes = getNotesFromStorage();

    if (AppState.currentNoteId !== null) {
        // Edit existing note
        const noteIndex = notes.findIndex(n => n.id === AppState.currentNoteId);
        if (noteIndex !== -1) {
            notes[noteIndex].content = content;
            notes[noteIndex].timestamp = Date.now();
        }
    } else {
        // Create new note
        const newNote = {
            id: Date.now(),
            content: content,
            timestamp: Date.now()
        };
        notes.push(newNote);
    }

    // Save to localStorage
    localStorage.setItem('notes', JSON.stringify(notes));

    // Re-render notes
    renderNotes();

    // Close modal
    closeNoteModal();
}

function deleteNote(noteId) {
    if (!confirm('Are you sure you want to delete this note?')) return;

    let notes = getNotesFromStorage();
    notes = notes.filter(n => n.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

function editNote(noteId) {
    const notes = getNotesFromStorage();
    const note = notes.find(n => n.id === noteId);

    if (note) {
        AppState.currentNoteId = noteId;
        Elements.noteModalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Note';
        Elements.noteInput.value = note.content;
        Elements.noteModal.classList.add('active');
        Elements.noteInput.focus();
    }
}

function renderNotes() {
    const notes = getNotesFromStorage();

    if (notes.length === 0) {
        Elements.notesGrid.innerHTML = '';
        Elements.notesEmptyState.style.display = 'block';
    } else {
        Elements.notesEmptyState.style.display = 'none';
        Elements.notesGrid.innerHTML = notes.map(note => `
            <div class="note-card">
                <div class="note-content">${escapeHtml(note.content)}</div>
                <div class="note-footer">
                    <span class="note-time">${formatDate(note.timestamp)}</span>
                    <div class="note-actions">
                        <button class="note-btn" onclick="editNote(${note.id})" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="note-btn" onclick="deleteNote(${note.id})" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function closeNoteModal() {
    Elements.noteModal.classList.remove('active');
    AppState.currentNoteId = null;
}

function getNotesFromStorage() {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
}

// ================================================
// 6. WATCHLIST SYSTEM
// Movie/series tracker with drag-and-drop
// ================================================

function initWatchlist() {
    // Add to "Want to Watch" button
    Elements.addToWantBtn.addEventListener('click', () => {
        AppState.watchlistTarget = 'wantToWatch';
        Elements.watchlistModal.classList.add('active');
    });

    // Add to "Watched" button
    Elements.addToWatchedBtn.addEventListener('click', () => {
        AppState.watchlistTarget = 'watched';
        Elements.watchlistModal.classList.add('active');
    });

    // Form submission
    Elements.watchlistForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addWatchlistItem();
    });

    // Cancel button
    Elements.cancelWatchlist.addEventListener('click', closeWatchlistModal);

    // Close modal button
    Elements.closeWatchlistModal.addEventListener('click', closeWatchlistModal);

    // Close modal on ESC key
    Elements.watchlistModal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeWatchlistModal();
    });

    // Initialize default watchlist if empty
    initializeDefaultWatchlist();

    // Render watchlist
    renderWatchlist();
}

function addWatchlistItem() {
    const title = document.getElementById('movieTitle').value.trim();
    const year = document.getElementById('movieYear').value.trim();
    const genre = document.getElementById('movieGenre').value.trim();
    const poster = document.getElementById('moviePoster').value.trim();

    if (!title || !year || !genre) {
        alert('Please fill in all required fields.');
        return;
    }

    const watchlist = getWatchlistFromStorage();

    const newItem = {
        id: Date.now(),
        title: title,
        year: year,
        genre: genre,
        poster: poster || `https://placehold.co/300x450/${getRandomColor()}/ffffff?text=${encodeURIComponent(title.substring(0, 10))}`
    };

    watchlist[AppState.watchlistTarget].push(newItem);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));

    renderWatchlist();
    closeWatchlistModal();

    // Reset form
    Elements.watchlistForm.reset();
}

function deleteWatchlistItem(category, itemId) {
    if (!confirm('Remove this item from your watchlist?')) return;

    const watchlist = getWatchlistFromStorage();
    watchlist[category] = watchlist[category].filter(item => item.id !== itemId);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderWatchlist();
}

function moveWatchlistItem(itemId, fromCategory, toCategory) {
    const watchlist = getWatchlistFromStorage();
    const itemIndex = watchlist[fromCategory].findIndex(item => item.id === itemId);

    if (itemIndex !== -1) {
        const item = watchlist[fromCategory][itemIndex];
        watchlist[fromCategory].splice(itemIndex, 1);
        watchlist[toCategory].push(item);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        renderWatchlist();
    }
}

function renderWatchlist() {
    const watchlist = getWatchlistFromStorage();

    // Render "Want to Watch"
    if (watchlist.wantToWatch.length === 0) {
        Elements.wantToWatchGrid.innerHTML = '<p class="empty-state" style="grid-column: 1/-1;">No items yet. Click "Add Movie" to get started!</p>';
    } else {
        Elements.wantToWatchGrid.innerHTML = watchlist.wantToWatch.map(item => `
            <div class="watchlist-card" draggable="true" data-id="${item.id}" data-category="wantToWatch">
                <img src="${item.poster}" alt="${item.title}" class="watchlist-poster">
                <div class="watchlist-info">
                    <h4 class="watchlist-title">${escapeHtml(item.title)}</h4>
                    <p class="watchlist-meta">${item.year} • ${item.genre}</p>
                </div>
                <div class="watchlist-actions">
                    <button class="watchlist-action-btn" onclick="moveWatchlistItem(${item.id}, 'wantToWatch', 'watched')" title="Mark as Watched">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="watchlist-action-btn" onclick="deleteWatchlistItem('wantToWatch', ${item.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Render "Watched"
    if (watchlist.watched.length === 0) {
        Elements.watchedGrid.innerHTML = '<p class="empty-state" style="grid-column: 1/-1;">No items yet. Click "Add Movie" to get started!</p>';
    } else {
        Elements.watchedGrid.innerHTML = watchlist.watched.map(item => `
            <div class="watchlist-card" draggable="true" data-id="${item.id}" data-category="watched">
                <img src="${item.poster}" alt="${item.title}" class="watchlist-poster">
                <div class="watchlist-info">
                    <h4 class="watchlist-title">${escapeHtml(item.title)}</h4>
                    <p class="watchlist-meta">${item.year} • ${item.genre}</p>
                </div>
                <div class="watchlist-actions">
                    <button class="watchlist-action-btn" onclick="moveWatchlistItem(${item.id}, 'watched', 'wantToWatch')" title="Move to Want to Watch">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="watchlist-action-btn" onclick="deleteWatchlistItem('watched', ${item.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Initialize drag and drop
    initDragAndDrop();
}

function initDragAndDrop() {
    const draggables = document.querySelectorAll('.watchlist-card');
    const containers = document.querySelectorAll('.watchlist-grid');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        });
    });

    containers.forEach(container => {
        container.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            container.appendChild(draggable);
        });

        container.addEventListener('drop', (e) => {
            e.preventDefault();
            const draggable = document.querySelector('.dragging');
            const newCategory = container.dataset.category;
            const itemId = parseInt(draggable.dataset.id);
            const oldCategory = draggable.dataset.category;

            if (newCategory !== oldCategory) {
                moveWatchlistItem(itemId, oldCategory, newCategory);
            } else {
                // Just reordering within same category
                saveWatchlistOrder(container, newCategory);
            }
        });
    });
}

function saveWatchlistOrder(container, category) {
    const watchlist = getWatchlistFromStorage();
    const cards = container.querySelectorAll('.watchlist-card');
    const newOrder = Array.from(cards).map(card => parseInt(card.dataset.id));

    // Reorder items based on DOM order
    watchlist[category] = newOrder.map(id =>
        watchlist[category].find(item => item.id === id)
    ).filter(Boolean);

    localStorage.setItem('watchlist', JSON.stringify(watchlist));
}

function closeWatchlistModal() {
    Elements.watchlistModal.classList.remove('active');
    Elements.watchlistForm.reset();
}

function getWatchlistFromStorage() {
    const watchlist = localStorage.getItem('watchlist');
    return watchlist ? JSON.parse(watchlist) : { wantToWatch: [], watched: [] };
}

function initializeDefaultWatchlist() {
    const existing = localStorage.getItem('watchlist');
    if (!existing) {
        const defaultWatchlist = {
            wantToWatch: [
                {
                    id: 1,
                    title: 'Inception',
                    year: '2010',
                    genre: 'Sci-Fi',
                    poster: 'https://placehold.co/300x450/a855f7/ffffff?text=Inception'
                },
                {
                    id: 2,
                    title: 'The Matrix',
                    year: '1999',
                    genre: 'Action',
                    poster: 'https://placehold.co/300x450/3b82f6/ffffff?text=The+Matrix'
                },
                {
                    id: 3,
                    title: 'Interstellar',
                    year: '2014',
                    genre: 'Adventure',
                    poster: 'https://placehold.co/300x450/ec4899/ffffff?text=Interstellar'
                }
            ],
            watched: [
                {
                    id: 4,
                    title: 'Breaking Bad',
                    year: '2008',
                    genre: 'Series',
                    poster: 'https://placehold.co/300x450/14b8a6/ffffff?text=Breaking+Bad'
                },
                {
                    id: 5,
                    title: 'The Dark Knight',
                    year: '2008',
                    genre: 'Action',
                    poster: 'https://placehold.co/300x450/f59e0b/ffffff?text=Dark+Knight'
                }
            ]
        };
        localStorage.setItem('watchlist', JSON.stringify(defaultWatchlist));
    }
}

// ================================================
// 7. GALLERY LIGHTBOX
// Photo viewer with navigation
// ================================================

function initGallery() {
    Elements.galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            openGalleryModal(index);
        });
    });

    // Close modal
    Elements.closeGalleryModal.addEventListener('click', closeGalleryModal);

    // Navigation buttons
    Elements.prevPhoto.addEventListener('click', showPrevPhoto);
    Elements.nextPhoto.addEventListener('click', showNextPhoto);

    // Modal click outside to close
    Elements.galleryModal.addEventListener('click', (e) => {
        if (e.target === Elements.galleryModal) {
            closeGalleryModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (Elements.galleryModal.classList.contains('active')) {
            if (e.key === 'Escape') closeGalleryModal();
            if (e.key === 'ArrowLeft') showPrevPhoto();
            if (e.key === 'ArrowRight') showNextPhoto();
        }
    });
}

function openGalleryModal(index) {
    AppState.currentGalleryIndex = index;
    displayGalleryImage();
    Elements.galleryModal.classList.add('active');
}

function closeGalleryModal() {
    Elements.galleryModal.classList.remove('active');
}

function showPrevPhoto() {
    AppState.currentGalleryIndex--;
    if (AppState.currentGalleryIndex < 0) {
        AppState.currentGalleryIndex = Elements.galleryItems.length - 1;
    }
    displayGalleryImage();
}

function showNextPhoto() {
    AppState.currentGalleryIndex++;
    if (AppState.currentGalleryIndex >= Elements.galleryItems.length) {
        AppState.currentGalleryIndex = 0;
    }
    displayGalleryImage();
}

function displayGalleryImage() {
    const currentItem = Elements.galleryItems[AppState.currentGalleryIndex];
    const img = currentItem.querySelector('img');
    const caption = currentItem.querySelector('.gallery-caption');

    Elements.modalImage.src = img.src;
    Elements.modalImage.alt = img.alt;
    Elements.modalCaption.textContent = caption.textContent;
    Elements.modalCounter.textContent = `${AppState.currentGalleryIndex + 1} / ${Elements.galleryItems.length}`;
}

// ================================================
// 8. PROJECT MODAL
// Display project details
// ================================================

function initProjectModals() {
    Elements.viewProjectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectIndex = btn.dataset.project;
            openProjectModal(projectIndex);
        });
    });

    Elements.closeProjectModal.addEventListener('click', closeProjectModal);

    // Close on outside click
    Elements.projectModal.addEventListener('click', (e) => {
        if (e.target === Elements.projectModal) {
            closeProjectModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && Elements.projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(index) {
    const projects = getProjectsData();
    const project = projects[index];

    Elements.projectDetails.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-modal-image">
        <h2 class="project-modal-title">${project.title}</h2>
        <p class="project-modal-description">${project.fullDescription}</p>
        <div class="project-modal-tech">
            <h4>Technologies Used:</h4>
            <div class="project-tags">
                ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
        </div>
    `;

    Elements.projectModal.classList.add('active');
}

function closeProjectModal() {
    Elements.projectModal.classList.remove('active');
}

// ================================================
// 9. SETTINGS PANEL
// Customize theme colors, fonts, and card styles
// ================================================

function initSettings() {
    // Open settings modal
    Elements.settingsToggle.addEventListener('click', () => {
        Elements.settingsModal.classList.add('active');
        updateSettingsUI();
    });

    // Close settings modal
    Elements.closeSettingsModal.addEventListener('click', closeSettingsModal);

    // Close on outside click
    Elements.settingsModal.addEventListener('click', (e) => {
        if (e.target === Elements.settingsModal) {
            closeSettingsModal();
        }
    });

    // Color options
    Elements.colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            applyThemeColor(color);
            localStorage.setItem('themeColor', color);
            updateSettingsUI();
        });
    });

    // Font options
    Elements.fontOptions.forEach(option => {
        option.addEventListener('click', () => {
            const font = option.dataset.font;
            applyFont(font);
            localStorage.setItem('fontFamily', font);
            updateSettingsUI();
        });
    });

    // Card style options
    Elements.cardStyleOptions.forEach(option => {
        option.addEventListener('click', () => {
            const style = option.dataset.style;
            applyCardStyle(style);
            localStorage.setItem('cardStyle', style);
            updateSettingsUI();
        });
    });

    // Reset settings
    Elements.resetSettings.addEventListener('click', () => {
        if (confirm('Reset all settings to default?')) {
            localStorage.removeItem('themeColor');
            localStorage.removeItem('fontFamily');
            localStorage.removeItem('cardStyle');
            applyThemeColor('purple');
            applyFont('Inter');
            applyCardStyle('default');
            updateSettingsUI();
        }
    });

    // Apply saved settings on load
    applySavedSettings();
}

function applySavedSettings() {
    const themeColor = localStorage.getItem('themeColor') || 'purple';
    const fontFamily = localStorage.getItem('fontFamily') || 'Inter';
    const cardStyle = localStorage.getItem('cardStyle') || 'default';

    applyThemeColor(themeColor);
    applyFont(fontFamily);
    applyCardStyle(cardStyle);
}

function applyThemeColor(color) {
    const colors = {
        purple: { primary: '#a855f7', primaryDark: '#9333ea', primaryLight: '#c084fc' },
        blue: { primary: '#3b82f6', primaryDark: '#2563eb', primaryLight: '#60a5fa' },
        pink: { primary: '#ec4899', primaryDark: '#db2777', primaryLight: '#f472b6' },
        green: { primary: '#10b981', primaryDark: '#059669', primaryLight: '#34d399' },
        orange: { primary: '#f59e0b', primaryDark: '#d97706', primaryLight: '#fbbf24' }
    };

    const colorScheme = colors[color];
    document.documentElement.style.setProperty('--primary', colorScheme.primary);
    document.documentElement.style.setProperty('--primary-dark', colorScheme.primaryDark);
    document.documentElement.style.setProperty('--primary-light', colorScheme.primaryLight);
}

function applyFont(font) {
    document.documentElement.style.setProperty('--font-family', `'${font}', sans-serif`);
}

function applyCardStyle(style) {
    document.body.setAttribute('data-card-style', style);
}

function updateSettingsUI() {
    const themeColor = localStorage.getItem('themeColor') || 'purple';
    const fontFamily = localStorage.getItem('fontFamily') || 'Inter';
    const cardStyle = localStorage.getItem('cardStyle') || 'default';

    // Update color options
    Elements.colorOptions.forEach(option => {
        if (option.dataset.color === themeColor) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update font options
    Elements.fontOptions.forEach(option => {
        if (option.dataset.font === fontFamily) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update card style options
    Elements.cardStyleOptions.forEach(option => {
        if (option.dataset.style === cardStyle) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function closeSettingsModal() {
    Elements.settingsModal.classList.remove('active');
}

// ================================================
// 10. SCROLL REVEAL ANIMATIONS
// Intersection Observer for fade-in effects
// ================================================

function initScrollReveal() {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters
    });

    // Observe all elements with data-reveal attribute
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(el => observer.observe(el));
}

// ================================================
// UTILITY FUNCTIONS
// Helper functions used throughout the app
// ================================================

function formatDate(timestamp) {
    // Format timestamp to readable date
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    // If less than 1 minute ago
    if (diff < 60000) return 'Just now';

    // If less than 1 hour ago
    if (diff < 3600000) {
        const mins = Math.floor(diff / 60000);
        return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
    }

    // If less than 24 hours ago
    if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    // Otherwise show date
    return date.toLocaleDateString();
}

function escapeHtml(text) {
    // Prevent XSS attacks by escaping HTML
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function getRandomColor() {
    // Generate random color for placeholders
    const colors = ['a855f7', '3b82f6', 'ec4899', '14b8a6', 'f59e0b', 'ef4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ================================================
// DATA PROVIDERS
// Static data for search and modals
// ================================================

function getProjectsData() {
    // Project data for search and modals
    return [
        {
            title: 'E-Commerce Platform',
            description: 'Modern online store with cart functionality and payment integration',
            fullDescription: 'A full-featured e-commerce platform built with React and Node.js. Features include user authentication, product catalog, shopping cart, checkout process, payment integration with Stripe, order management, and admin dashboard. The platform is fully responsive and optimized for performance.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
            image: 'https://placehold.co/800x500/a855f7/ffffff?text=E-Commerce+Platform'
        },
        {
            title: 'Task Management App',
            description: 'Productivity tool to organize tasks, set deadlines, and track progress',
            fullDescription: 'A comprehensive task management application built with Vue.js and Firebase. Features include task creation, categorization, priority levels, due dates, collaboration features, real-time updates, and progress tracking. The app uses Tailwind CSS for a modern, clean interface.',
            tech: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Vuex'],
            image: 'https://placehold.co/800x500/ec4899/ffffff?text=Task+Manager'
        },
        {
            title: 'Weather Dashboard',
            description: 'Real-time weather information with beautiful visualizations',
            fullDescription: 'A weather dashboard that displays real-time weather data using OpenWeatherMap API. Features include current weather conditions, 7-day forecast, hourly predictions, weather maps, and beautiful visualizations using Chart.js. The app is built with vanilla JavaScript and features a clean, modern UI.',
            tech: ['JavaScript', 'OpenWeather API', 'Chart.js', 'CSS Grid'],
            image: 'https://placehold.co/800x500/3b82f6/ffffff?text=Weather+Dashboard'
        },
        {
            title: 'Social Media Platform',
            description: 'Connect with friends, share photos, and engage in conversations',
            fullDescription: 'A full-stack social media platform built with Next.js and PostgreSQL. Features include user profiles, friend connections, photo sharing, likes and comments, real-time chat, notifications, and a news feed algorithm. Deployed on AWS with optimized performance and scalability.',
            tech: ['Next.js', 'PostgreSQL', 'AWS', 'Socket.io', 'Redis'],
            image: 'https://placehold.co/800x500/14b8a6/ffffff?text=Social+Platform'
        }
    ];
}

function getMusicData() {
    // Music track data for search
    return [
        { title: 'Summer Vibes', artist: 'Artist Name' },
        { title: 'Chill Beats', artist: 'Another Artist' },
        { title: 'Relaxing Jazz', artist: 'Jazz Ensemble' }
    ];
}

// ================================================
// APPLICATION INITIALIZATION
// Initialize all features when DOM is ready
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initThemeToggle();
    initSideNav();
    initSearch();
    initMusicPlayer();
    initNotes();
    initWatchlist();
    initGallery();
    initProjectModals();
    initSettings();
    initScrollReveal();

    console.log('✨ Premium Personal Website Loaded Successfully!');
});
