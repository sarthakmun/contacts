import React, { useState, useEffect } from 'react';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContactModal from './components/AddContactModal';
import ContactDetailsModal from './components/ContactDetailsModal';
import AlphabetFilter from './components/AlphabetFilter';
import LoadingSpinner from './components/LoadingSpinner';
import EmptyState from './components/EmptyState';
import { mockContacts } from './data/mockData';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

    // Mock API call with loading state
    useEffect(() => {
        const fetchContacts = async () => {
            setIsLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Sort contacts alphabetically by name
            const sortedContacts = [...mockContacts].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setContacts(sortedContacts);
            setFilteredContacts(sortedContacts);
            setIsLoading(false);
        };

        fetchContacts();
    }, []);

    // Filter contacts based on search term and selected letter
    useEffect(() => {
        let filtered = contacts;

        // Filter by search term
        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(contact =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contact.phone.includes(searchTerm)
            );
        }

        // Filter by selected letter
        if (selectedLetter) {
            filtered = filtered.filter(contact =>
                contact.name.charAt(0).toUpperCase() === selectedLetter
            );
        }

        setFilteredContacts(filtered);
    }, [searchTerm, selectedLetter, contacts]);

    const handleAddContact = (newContact) => {
        const contactWithId = {
            ...newContact,
            id: Date.now().toString(),
            isFavorite: false,
        };
        setContacts(prev => {
            const newContacts = [contactWithId, ...prev];
            // Sort alphabetically
            return newContacts.sort((a, b) => a.name.localeCompare(b.name));
        });
        setIsModalOpen(false);
    };

    const handleToggleFavorite = (contactId) => {
        setContacts(prev =>
            prev.map(contact => {
                if (contact.id === contactId) {
                    const updatedContact = { ...contact, isFavorite: !contact.isFavorite };
                    // Update selectedContact if it's the same contact
                    if (selectedContact && selectedContact.id === contactId) {
                        setSelectedContact(updatedContact);
                    }
                    return updatedContact;
                }
                return contact;
            })
        );
    };

    const favoriteContacts = filteredContacts.filter(contact => contact.isFavorite);
    const regularContacts = filteredContacts.filter(contact => !contact.isFavorite);
    const displayContacts = showFavorites ? favoriteContacts : filteredContacts;

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setIsDetailsModalOpen(true);
    };

    const handleEditContact = (contact) => {
        // TODO: Implement edit functionality
        console.log('Edit contact:', contact);
        setIsDetailsModalOpen(false);
    };

    const handleDeleteContact = (contactId) => {
        setContacts(prev => prev.filter(contact => contact.id !== contactId));
        setIsDetailsModalOpen(false);
    };

    const handleUpdateContact = (updatedContact) => {
        setContacts(prev =>
            prev.map(contact =>
                contact.id === updatedContact.id ? updatedContact : contact
            )
        );
        setSelectedContact(updatedContact);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="app">
            <div className="app-container">
                <header className="app-header">
                    <h1 className="app-title">Contacts</h1>
                    <p className="app-subtitle">{contacts.length} contacts</p>
                </header>

                <div className="app-controls">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                    />
                    <AlphabetFilter
                        selectedLetter={selectedLetter}
                        onLetterSelect={setSelectedLetter}
                        contacts={contacts}
                    />
                    <div className="control-buttons">
                        <button
                            className={`filter-btn ${showFavorites ? 'active' : ''}`}
                            onClick={() => setShowFavorites(!showFavorites)}
                        >
                            <span className="star-icon">⭐</span>
                            {showFavorites ? 'Show All' : `Favorites (${favoriteContacts.length})`}
                        </button>
                        <button
                            className="add-contact-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="add-icon">+</span>
                            Add Contact
                        </button>
                    </div>
                </div>

                <main className="app-main">
                    {contacts.length === 0 ? (
                        <EmptyState
                            title="No contacts yet"
                            subtitle="Add your first contact to get started"
                            onAddContact={() => setIsModalOpen(true)}
                        />
                    ) : displayContacts.length === 0 ? (
                        <EmptyState
                            title={showFavorites ? "No favorite contacts" : "No results found"}
                            subtitle={showFavorites ? "Mark contacts as favorites to see them here" : `No contacts match "${searchTerm}"`}
                            showAddButton={false}
                        />
                    ) : (
                        <>
                            {showFavorites && favoriteContacts.length > 0 && (
                                <div className="section-header">
                                    <h2 className="section-title">⭐ FAVORITE CONTACTS</h2>
                                </div>
                            )}
                            <ContactList
                                contacts={displayContacts}
                                onToggleFavorite={handleToggleFavorite}
                                onContactClick={handleContactClick}
                            />
                        </>
                    )}
                </main>

                {isModalOpen && (
                    <AddContactModal
                        onClose={() => setIsModalOpen(false)}
                        onAddContact={handleAddContact}
                    />
                )}

                {isDetailsModalOpen && selectedContact && (
                    <ContactDetailsModal
                        contact={selectedContact}
                        onClose={() => setIsDetailsModalOpen(false)}
                        onEdit={handleEditContact}
                        onDelete={handleDeleteContact}
                        onToggleFavorite={handleToggleFavorite}
                        onUpdateContact={handleUpdateContact}
                    />
                )}
            </div>
        </div>
    );
}

export default App;