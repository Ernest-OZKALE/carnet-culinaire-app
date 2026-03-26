import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION SUPABASE ---
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- CONFIGURATION FIREBASE (SUPPRIMÉE) ---

// --- INLINE SVG ICONS ---
const PlusCircle = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>;
const X = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const BookOpen = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const Trash2 = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;
const Search = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const Loader2 = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
const ChevronDown = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const Camera = ({className}) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>;
const LogOut = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const GoogleIcon = () => <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#4285F4" d="M43.611,20.083H24v8.53h11.303c-1.649,4.657-6.08,8.12-11.303,8.12c-8.749,0-15.842-7.092-15.842-15.842s7.093-15.842,15.842-15.842c4.761,0,9.045,1.94,12.079,5.022l6.59-6.59C39.203,3.545,32.135,0,24,0C10.75,0,0,10.75,0,24s10.75,24,24,24c12.438,0,23.023-9.25,23.023-23.023c0-1.583-0.16-3.125-0.412-4.583H43.611z"></path></svg>;
const Sparkles = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.93 2.07a2 2 0 0 1 4.14 0l.53 1.6a.5.5 0 0 0 .4.4l1.6.53a2 2 0 0 1 0 4.14l-1.6.53a.5.5 0 0 0-.4.4l-.53 1.6a2 2 0 0 1-4.14 0l-.53-1.6a.5.5 0 0 0-.4-.4l-1.6-.53a2 2 0 0 1 0-4.14l1.6-.53a.5.5 0 0 0 .4-.4zM4.5 14.5a2 2 0 0 1 0-4.14l1.6-.53a.5.5 0 0 0 .4-.4l.53-1.6a2 2 0 0 1 4.14 0l.53 1.6a.5.5 0 0 0 .4.4l1.6.53a2 2 0 0 1 0 4.14l-1.6.53a.5.5 0 0 0-.4.4l-.53 1.6a2 2 0 0 1-4.14 0l-.53-1.6a.5.5 0 0 0-.4-.4z"/></svg>;
const Dices = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M12 12h.01"></path><path d="M12 18h.01"></path><path d="M12 6h.01"></path><path d="M18 12h.01"></path><path d="M6 12h.01"></path></svg>;
const Check = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>;
const BrainCircuit = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2a2.5 2.5 0 0 1 2.5 2.5v.4a2 2 0 0 0 2 2h.4a2.5 2.5 0 0 1 2.5 2.5v.4a2 2 0 0 0 2 2h.4a2.5 2.5 0 0 1 2.5 2.5v4a2.5 2.5 0 0 1-2.5 2.5h-.4a2 2 0 0 0-2 2v.4a2.5 2.5 0 0 1-2.5 2.5h-4a2.5 2.5 0 0 1-2.5-2.5v-.4a2 2 0 0 0-2-2h-.4a2.5 2.5 0 0 1-2.5-2.5v-4a2.5 2.5 0 0 1 2.5-2.5h.4a2 2 0 0 0 2-2v-.4A2.5 2.5 0 0 1 12 2Z"/><path d="M4.5 10.5h.01"/><path d="M4.5 13.5h.01"/><path d="M19.5 10.5h.01"/><path d="M19.5 13.5h.01"/><path d="M10.5 4.5v.01"/><path d="M13.5 4.5v.01"/><path d="M10.5 19.5v.01"/><path d="M13.5 19.5v.01"/></svg>;
const MapPin = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;


// --- CONFIGURATION FIREBASE (À MIGRER VERS SUPABASE) ---
const firebaseConfig = {
    // Audit Sécurité : Ces clés seront déplacées vers des variables d'environnement
    apiKey: "AIzaSyBZDyGiT7698jJuY57hkgj8Xy3qhS_hitI",
    authDomain: "carnet-culinaire.firebaseapp.com",
    projectId: "carnet-culinaire",
    storageBucket: "carnet-culinaire.appspot.com",
    messagingSenderId: "306027327689",
    appId: "1:306027327689:web:347e355216ad9cd7805d18"
};

// --- INITIALISATION DES SERVICES ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- COMPOSANT PRINCIPAL DE L'APPLICATION ---
export default function App() {
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        // Migration vers Supabase Auth
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setIsAuthReady(true);
        });
        
        return () => subscription.unsubscribe();
    }, []);

    if (!isAuthReady) {
        return <div className="bg-stone-50 min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 text-amber-600 animate-spin" /></div>;
    }
    
    return (
        <div className="bg-stone-50 min-h-screen font-sans text-stone-800">
            {user ? <MainApp user={user} /> : <AuthView />}
        </div>
    );
}

const AuthView = () => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setError('');
        setIsLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'select_account',
                    },
                },
            });
            if (error) throw error;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-stone-100 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <BookOpen className="h-12 w-12 text-amber-600 mx-auto" />
                    <h1 className="text-4xl font-serif text-stone-800 font-bold mt-4">Carnet Culinaire</h1>
                    <p className="text-stone-500 mt-2">Connectez-vous pour accéder à vos critiques.</p>
                </div>
                
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button onClick={handleGoogleSignIn} disabled={isLoading} className="w-full flex justify-center items-center space-x-2 bg-white text-stone-700 border border-stone-300 py-3 rounded-full font-bold shadow-sm hover:bg-stone-50 transition-all disabled:bg-stone-200">
                    {isLoading ? <Loader2 className="animate-spin" /> : <><GoogleIcon /><span>Continuer avec Google</span></>}
                </button>
            </div>
        </div>
    );
};

const MainApp = ({ user }) => {
    const [view, setView] = useState('critiques');
    const [critiqueToOpen, setCritiqueToOpen] = useState(null);

    const openCritiqueFromWishlist = useCallback((wishlistItem) => {
        if (!wishlistItem) return;
        const critiqueData = {
            restaurantName: wishlistItem.name || '',
            address: wishlistItem.address || '',
            phone: wishlistItem.phone || '',
            website: wishlistItem.website || '',
            cuisineType: wishlistItem.cuisineType || '',
            budget: wishlistItem.budget || '€€',
            mainPhotoUrl: wishlistItem.photoUrl || '',
            wishlistItemId: wishlistItem.id
        };
        setCritiqueToOpen(critiqueData);
        setView('critiques');
    }, []);

    const clearCritiqueToOpen = useCallback(() => {
        setCritiqueToOpen(null);
    }, []);

    return (
        <>
            <Header view={view} setView={setView} user={user} />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {view === 'critiques' ? 
                    <CritiquesView 
                        userId={user.uid} 
                        critiqueToOpen={critiqueToOpen}
                        clearCritiqueToOpen={clearCritiqueToOpen}
                    /> : 
                    <WishlistView 
                        userId={user.uid} 
                        onConvertToCritique={openCritiqueFromWishlist}
                    />
                }
            </main>
            <Footer />
        </>
    );
};


// --- EN-TÊTE ET PIED DE PAGE ---
const Header = ({ view, setView, user }) => {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) console.error("Erreur de déconnexion", error);
    };

    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between h-14">
                    <div className="flex items-center space-x-3 min-w-0">
                        <BookOpen className="h-8 w-8 text-amber-600 flex-shrink-0" />
                        <h1 className="text-2xl sm:text-3xl font-serif text-stone-800 font-bold truncate">Carnet Culinaire</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <nav className="hidden sm:flex items-center space-x-2 bg-stone-100 p-1 rounded-full">
                            <button onClick={() => setView('critiques')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${view === 'critiques' ? 'bg-white text-amber-700 shadow' : 'text-stone-600 hover:bg-white/50'}`}>Critiques</button>
                            <button onClick={() => setView('wishlist')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${view === 'wishlist' ? 'bg-white text-amber-700 shadow' : 'text-stone-600 hover:bg-white/50'}`}>Envies</button>
                        </nav>
                        <div className="flex items-center space-x-3">
                            {user.user_metadata?.avatar_url && <img src={user.user_metadata.avatar_url} alt="User" className="w-8 h-8 rounded-full" />}
                            <button onClick={handleLogout} className="text-stone-500 hover:text-amber-600" title="Se déconnecter">
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
                 <nav className="sm:hidden flex items-center justify-center space-x-2 bg-stone-100 p-1 rounded-full mt-2">
                    <button onClick={() => setView('critiques')} className={`flex-1 text-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${view === 'critiques' ? 'bg-white text-amber-700 shadow' : 'text-stone-600 hover:bg-white/50'}`}>Critiques</button>
                    <button onClick={() => setView('wishlist')} className={`flex-1 text-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${view === 'wishlist' ? 'bg-white text-amber-700 shadow' : 'text-stone-600 hover:bg-white/50'}`}>Envies</button>
                </nav>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="text-center py-6 text-sm text-stone-400 font-sans">
        <p>Carnet de Bord Culinaire - Conçu avec soin pour un critique exigeant.</p>
    </footer>
);

// --- SECTION CRITIQUES ---
const CritiquesView = ({ userId, critiqueToOpen, clearCritiqueToOpen }) => {
    const [critiques, setCritiques] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCritique, setCurrentCritique] = useState(null);
    const [sortBy, setSortBy] = useState('visitDate');

    useEffect(() => {
        if (critiqueToOpen) {
            handleOpenModal(critiqueToOpen);
            clearCritiqueToOpen();
        }
    }, [critiqueToOpen, clearCritiqueToOpen]);

    useEffect(() => {
        if (!userId) return;
        
        // Chargement initial des critiques
        const fetchCritiques = async () => {
            const { data, error } = await supabase
                .from('critiques')
                .select('*')
                .order('visit_date', { ascending: false });
            
            if (error) console.error("Erreur lors de la récupération des critiques:", error);
            else setCritiques(data);
            setIsLoading(false);
        };

        fetchCritiques();

        // Abonnement aux changements en temps réel (Realtime)
        const channel = supabase
            .channel('public:critiques')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'critiques', filter: `user_id=eq.${userId}` }, (payload) => {
                fetchCritiques();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [userId]);

    const sortedCritiques = useMemo(() => {
        const critiquesCopy = [...critiques];
        if (sortBy === 'visitDate') {
            critiquesCopy.sort((a, b) => (b.visitDate?.toDate() || 0) - (a.visitDate?.toDate() || 0));
        } else if (sortBy === 'name') {
            critiquesCopy.sort((a, b) => a.restaurantName.localeCompare(b.restaurantName, 'fr', { sensitivity: 'base' }));
        }
        return critiquesCopy;
    }, [critiques, sortBy]);

    const deleteCritique = async (id) => {
        try {
            const { error } = await supabase
                .from('critiques')
                .delete()
                .eq('id', id);
            if (error) throw error;
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    };

    const handleOpenModal = (critique = null) => {
        setCurrentCritique(critique);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentCritique(null);
    };
    
    if (isLoading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" /></div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl sm:text-4xl font-serif text-stone-700">Mes Critiques</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-full">
                        <span className="text-sm font-medium text-stone-600 pl-2">Trier par:</span>
                        <button onClick={() => setSortBy('visitDate')} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'visitDate' ? 'bg-white shadow text-amber-700' : 'text-stone-600 hover:bg-stone-200'}`}>Date</button>
                        <button onClick={() => setSortBy('name')} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${sortBy === 'name' ? 'bg-white shadow text-amber-700' : 'text-stone-600 hover:bg-stone-200'}`}>Nom</button>
                    </div>
                    <button onClick={() => handleOpenModal()} className="flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all transform hover:scale-105 text-sm sm:text-base"><PlusCircle className="w-5 h-5 sm:w-6 sm:h-6" /><span>Ajouter</span></button>
                </div>
            </div>
            {sortedCritiques.length === 0 ? <EmptyState title="Aucune critique pour le moment" message="Commencez votre aventure culinaire en ajoutant votre première évaluation." buttonText="Ajouter ma première critique" onButtonClick={() => handleOpenModal()} /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedCritiques.map(critique => <CritiqueCard key={critique.id} critique={critique} onEdit={() => handleOpenModal(critique)} onDelete={() => deleteCritique(critique.id)} />)}
                </div>
            )}
            {isModalOpen && <CritiqueModal critique={currentCritique} onClose={handleCloseModal} userId={userId} />}
        </div>
    );
};

const CritiqueCard = ({ critique, onEdit, onDelete }) => {
    const verdictEmojis = {
        '⭐ Coup de cœur absolu': '⭐',
        '👍 Une valeur sûre': '👍',
        '🤔 Mitigé': '🤔',
        '❌ À éviter': '❌'
    };
    const visitDate = critique.visit_date ? new Date(critique.visit_date) : new Date();
    
    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div 
            onClick={onEdit}
            className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-stone-100 flex flex-col h-full animate-in fade-in-0 zoom-in-95"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                    src={critique.main_photo_url || 'https://placehold.co/600x400/f5f5f4/a8a29e?text=No+Image'} 
                    alt={critique.restaurant_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-sm flex items-center space-x-1.5">
                    <span className="text-xl">{verdictEmojis[critique.verdict]}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <button onClick={handleDelete} className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100"><Trash2 className="w-5 h-5" /></button>
                </div>
            </div>
            <div className="p-6">
                <p className="text-sm text-stone-500 font-medium">{critique.cuisine_type} • {visitDate.toLocaleDateString('fr-FR')}</p>
                <h3 className="font-serif text-2xl font-bold text-stone-800 mt-1 truncate">{critique.restaurant_name}</h3>
            </div>
        </div>
    );
};


const EmptyState = ({ title, message, buttonText, onButtonClick }) => (
    <div className="text-center bg-white rounded-2xl p-12 lg:p-20 border-2 border-dashed border-stone-300">
        <h3 className="text-2xl font-serif font-bold text-stone-700">{title}</h3>
        <p className="mt-2 text-stone-500 max-w-md mx-auto">{message}</p>
        <button onClick={onButtonClick} className="mt-6 flex items-center space-x-2 bg-amber-600 text-white px-5 py-3 rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all transform hover:scale-105 mx-auto"><PlusCircle className="w-6 h-6" /><span>{buttonText}</span></button>
    </div>
);


const CritiqueModal = ({ critique, onClose, userId }) => {
    const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    const [stage, setStage] = useState(critique ? 'form' : 'search');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [formData, setFormData] = useState(getInitialFormData(critique));
    const [isSaving, setIsSaving] = useState(false);
    
    function getInitialFormData(critique) {
        const defaultCritique = {
            restaurant_name: '', address: '', phone: '', website: '',
            visit_date: new Date().toISOString().split('T')[0],
            cuisine_type: '', budget: '€€', main_photo_url: '', wishlistItemId: null,
            accueil: 50, ambiance_tags: [], service: 50, confort_solo: 'Moyennement',
            meal_items: [], verdict: '👍 Une valeur sûre', detail_qui_tue: '',
            occasion_tags: [], general_appreciation: '',
        };

        const mergedCritique = { ...defaultCritique, ...critique };
        
        const sourceItems = Array.isArray(critique?.meal_items) ? critique.meal_items : [];
        mergedCritique.meal_items = sourceItems.map(item => {
            const validItem = item && typeof item === 'object' ? item : {};
            const defaultItem = getNewMealItem();
            return {
                ...defaultItem,
                ...validItem,
                id: validItem.id || defaultItem.id,
                standard: { ...defaultItem.standard, ...(validItem.standard || {}) },
                expert: {
                    ...defaultItem.expert,
                    ...(validItem.expert || {}),
                    context: { ...defaultItem.expert.context, ...(validItem.expert?.context || {}) },
                    sensory: { 
                        ...defaultItem.expert.sensory, 
                        ...(validItem.expert?.sensory || {}),
                        visual: { ...defaultItem.expert.sensory.visual, ...(validItem.expert?.sensory?.visual || {}) },
                        olfactory: { ...defaultItem.expert.sensory.olfactory, ...(validItem.expert?.sensory?.olfactory || {}) },
                        gustatory: { 
                            ...defaultItem.expert.sensory.gustatory, 
                            ...(validItem.expert?.sensory?.gustatory || {}),
                            tasteRatings: { ...defaultItem.expert.sensory.gustatory.tasteRatings, ...(validItem.expert?.sensory?.gustatory?.tasteRatings || {}) }
                        },
                    },
                    intellectual: { ...defaultItem.expert.intellectual, ...(validItem.expert?.intellectual || {}) },
                    synthesis: { ...defaultItem.expert.synthesis, ...(validItem.expert?.synthesis || {}) },
                }
            };
        });

        return mergedCritique;
    }
    
    const handleSearch = async () => {
        if (!searchQuery.trim() || !PLACES_API_KEY || PLACES_API_KEY === "VOTRE_CLE_API_ICI") {
            setSearchError("Veuillez entrer une recherche et configurer votre clé API.");
            return;
        }
        setIsSearching(true);
        setSearchResults([]);
        setSearchError(null);
        
        const endpoint = `https://places.googleapis.com/v1/places:searchText`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': PLACES_API_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id'
                },
                body: JSON.stringify({ textQuery: searchQuery, languageCode: 'fr' })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || `Erreur ${response.status}`);
            
            setSearchResults(data.places || []);
            if (!data.places || data.places.length === 0) {
                setSearchError("Aucun restaurant trouvé.");
            }

        } catch (error) {
            setSearchError(`Erreur: ${error.message}`);
        } finally {
            setIsSearching(false);
        }
    };

    const selectRestaurant = async (place) => {
        setStage('form');
        setFormData(prev => ({...prev, restaurant_name: place.displayName.text, address: place.formattedAddress}));
        
        const detailsEndpoint = `https://places.googleapis.com/v1/places/${place.id}`;
        
        try {
            const response = await fetch(detailsEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': PLACES_API_KEY,
                    'X-Goog-FieldMask': 'types,internationalPhoneNumber,websiteUri,priceLevel,photos'
                }
            });
            
            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || `Erreur ${response.status}`);

            const budgetMap = { PRICE_LEVEL_INEXPENSIVE: '€', PRICE_LEVEL_MODERATE: '€€', PRICE_LEVEL_EXPENSIVE: '€€€', PRICE_LEVEL_VERY_EXPENSIVE: '€€€€' };
            const photoUrl = data.photos?.[0]?.name ? `https://places.googleapis.com/v1/${data.photos[0].name}/media?maxHeightPx=800&key=${PLACES_API_KEY}` : '';

            const foundType = data.types?.find(t => t.includes('food') || t.includes('restaurant'));
            const finalCuisineType = foundType ? foundType.replace(/_/g, ' ').replace('restaurant', '').trim() : '';

            setFormData(prev => ({
                ...prev,
                phone: data.internationalPhoneNumber || '',
                website: data.websiteUri || '',
                cuisine_type: finalCuisineType,
                budget: budgetMap[data.priceLevel] || '€€',
                main_photo_url: photoUrl
            }));

        } catch (error) {
            console.error("Erreur de récupération des détails:", error);
        }
    };

    const handleManualEntry = () => setStage('form');
    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    const handleTagChange = (field, tag) => {
        setFormData(p => {
            const newTags = p[field].includes(tag) ? p[field].filter(t => t !== tag) : [...p[field], tag];
            return { ...p, [field]: newTags };
        });
    };

    const handleMealItemChange = useCallback((index, updatedItem) => {
        setFormData(prev => {
            const newMealItems = [...prev.meal_items];
            newMealItems[index] = updatedItem;
            return { ...prev, meal_items: newMealItems };
        });
    }, []);

    const addMealItem = () => {
        setFormData(p => ({ ...p, meal_items: [...p.meal_items, getNewMealItem()] }));
    };

    const removeMealItem = useCallback((id) => {
        setFormData(p => ({ ...p, meal_items: p.meal_items.filter(item => item.id !== id) }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId || !formData.restaurant_name) return;
        setIsSaving(true);
        try {
            const { wishlistItemId, ...dataToSave } = { ...formData, user_id: userId, updated_at: new Date() };
            
            if (critique && !wishlistItemId) {
                const { error } = await supabase
                    .from('critiques')
                    .update(dataToSave)
                    .eq('id', critique.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('critiques')
                    .insert([dataToSave]);
                if (error) throw error;
            }

            if (wishlistItemId) {
                await supabase.from('wishlist').delete().eq('id', wishlistItemId);
            }

            onClose();
        } catch (error) {
            console.error("Erreur d'enregistrement:", error);
        } finally {
            setIsSaving(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`bg-stone-50 rounded-2xl shadow-2xl w-full max-h-[95vh] overflow-y-auto ${stage === 'search' ? 'max-w-2xl' : 'max-w-6xl'} transition-all duration-300`}>
                {stage === 'search' && (
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif font-bold text-stone-800">Rechercher un restaurant</h3>
                            <button onClick={onClose} className="text-stone-400 hover:text-stone-700"><X className="w-6 h-6"/></button>
                        </div>
                        <div className="flex space-x-2">
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Nom, adresse, ville..." className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500" onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
                            <button onClick={handleSearch} disabled={isSearching} className="bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-amber-300">{isSearching ? <Loader2 className="w-5 h-5 animate-spin"/> : <Search className="w-5 h-5"/>}</button>
                        </div>
                        {searchError && <p className="text-red-600 text-sm mt-2">{searchError}</p>}
                        <div className="mt-6 space-y-2 max-h-60 overflow-y-auto">
                            {searchResults.map((r) => <div key={r.id} onClick={() => selectRestaurant(r)} className="p-3 bg-white rounded-lg cursor-pointer hover:bg-amber-50 border"><p className="font-bold">{r.displayName.text}</p><p className="text-sm text-stone-500">{r.formattedAddress}</p></div>)}
                        </div>
                        <div className="text-center mt-6"><button onClick={handleManualEntry} className="text-amber-600 font-semibold hover:underline">ou ajouter manuellement</button></div>
                    </div>
                )}
                
                {stage === 'form' && (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                        <div className="flex justify-between items-start">
                            <div><h3 className="text-3xl font-serif font-bold text-stone-800">{critique ? "Modifier la critique" : "Nouvelle critique"}</h3><p className="text-stone-500 mt-1">Remplissez votre fiche d'évaluation détaillée.</p></div>
                            <button type="button" onClick={onClose} className="text-stone-400 hover:text-stone-700"><X className="w-7 h-7"/></button>
                        </div>

                        <Accordion title="Expérience" defaultOpen>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-stone-700 mb-2">Photo Principale</label>
                                    <FormInput label="" name="main_photo_url" value={formData.main_photo_url} onChange={handleChange} placeholder="URL de l'image..." />
                                </div>
                                <FormInput label="Nom de l'établissement" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} required />
                                <FormInput label="Type de cuisine" name="cuisine_type" value={formData.cuisine_type} onChange={handleChange} />
                                <FormInput label="Date de la visite" name="visit_date" type="date" value={formData.visit_date} onChange={handleChange} required />
                                <FormSelect label="Budget" name="budget" value={formData.budget} onChange={handleChange}><option>€</option><option>€€</option><option>€€€</option><option>€€€€</option></FormSelect>
                                <div className="md:col-span-2"><FormInput label="Adresse" name="address" value={formData.address} onChange={handleChange} /></div>
                            </div>
                        </Accordion>
                        
                        <Accordion title="Évaluation">
                            <div className="space-y-6">
                                <RangeSlider label="Accueil" value={formData.accueil} onChange={handleChange} name="accueil" minLabel="Froid" maxLabel="Chaleureux" />
                                <RangeSlider label="Service" value={formData.service} onChange={handleChange} name="service" minLabel="Lent" maxLabel="Pro-actif" />
                                <TagSelector label="Ambiance & Décor" tags={['Calme', 'Animé', 'Intimiste', 'Tendance', 'Bruyant', 'Décor soigné', 'Simple']} selectedTags={formData.ambiance_tags} onTagClick={(tag) => handleTagChange('ambiance_tags', tag)} />
                                <PillButtonSelector label="À l'aise en solo ?" name="confort_solo" options={['Oui, parfaitement', 'Moyennement', 'Pas vraiment']} value={formData.confort_solo} onChange={handleChange} />
                            </div>
                        </Accordion>

                        <Accordion title="Décomposition du Repas" defaultOpen>
                            <div className="space-y-4">
                                {formData.meal_items.map((item, index) => (
                                    <MealAnalysisCard 
                                        key={item.id}
                                        initialItem={item}
                                        index={index}
                                        onItemChange={handleMealItemChange}
                                        onRemoveItem={removeMealItem}
                                    />
                                ))}
                                <button type="button" onClick={addMealItem} className="mt-4 flex items-center space-x-2 text-amber-600 font-semibold hover:text-amber-800"><PlusCircle className="w-5 h-5" /><span>Ajouter un plat</span></button>
                            </div>
                        </Accordion>
                        
                        <Accordion title="Synthèse & Verdict">
                             <div className="space-y-6">
                                <PillButtonSelector label="Verdict du Contrôleur" name="verdict" options={['⭐ Coup de cœur absolu', '👍 Une valeur sûre', '🤔 Mitigé', '❌ À éviter']} value={formData.verdict} onChange={handleChange} isIcon />
                                <div><label className="block text-sm font-medium text-stone-700 mb-1">Appréciation générale</label><textarea name="general_appreciation" value={formData.general_appreciation} onChange={handleChange} rows="4" className="w-full px-3 py-2 border border-stone-300 rounded-lg" placeholder="Votre analyse globale de l'expérience..."></textarea></div>
                                <div><label className="block text-sm font-medium text-stone-700 mb-1">Le détail qui tue</label><textarea name="detail_qui_tue" value={formData.detail_qui_tue} onChange={handleChange} rows="3" className="w-full px-3 py-2 border border-stone-300 rounded-lg" placeholder="Le petit plus (ou moins) qui a fait la différence..."></textarea></div>
                                <TagSelector label="Idéal pour..." tags={['Un date', 'Entre amis', 'Déjeuner pro', 'Pause solo', 'Grande occasion', 'Terrasse']} selectedTags={formData.occasion_tags} onTagClick={(tag) => handleTagChange('occasion_tags', tag)} />
                            </div>
                        </Accordion>

                        <div className="flex justify-end items-center pt-4">
                            <button type="submit" disabled={isSaving} className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all transform hover:scale-105 disabled:bg-amber-300 flex items-center space-x-2">{isSaving && <Loader2 className="w-5 h-5 animate-spin" />}<span>{critique ? "Enregistrer les modifications" : "Enregistrer la critique"}</span></button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

// --- SECTION LISTE D'ENVIES (WISHLIST) ---
const WishlistView = ({ userId, onConvertToCritique }) => {
    const [wishlist, setWishlist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [surpriseResult, setSurpriseResult] = useState(null);
    const [discoveryMode, setDiscoveryMode] = useState(false);
    
    useEffect(() => {
        if (!userId) return;
        
        const fetchWishlist = async () => {
            const { data, error } = await supabase
                .from('wishlist')
                .select('*')
                .order('added_at', { ascending: false });
            
            if (error) console.error("Erreur wishlist:", error);
            else setWishlist(data);
            setIsLoading(false);
        };

        fetchWishlist();

        const channel = supabase
            .channel('public:wishlist')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'wishlist', filter: `user_id=eq.${userId}` }, (payload) => {
                fetchWishlist();
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, [userId]);
    
    const handleSurpriseMe = () => {
        if (wishlist.length === 0) return;
        const randomIndex = Math.floor(Math.random() * wishlist.length);
        setSurpriseResult(wishlist[randomIndex]);
    };

    const deleteFromWishlist = async (id) => {
        const { error } = await supabase.from('wishlist').delete().eq('id', id);
        if (error) console.error("Erreur suppression wishlist:", error);
    };

    const addWish = async (wishData) => {
        const { error } = await supabase.from('wishlist').insert([{ ...wishData, user_id: userId }]);
        if (error) console.error("Erreur ajout wishlist:", error);
    };

    if (isLoading) return <div className="text-center py-20"><Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" /></div>;

    if (discoveryMode) {
        return <DiscoveryMode userId={userId} onExit={() => setDiscoveryMode(false)} existingWishlist={wishlist} addWish={addWish} />;
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h2 className="text-3xl sm:text-4xl font-serif text-stone-700">Mes Envies</h2>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setDiscoveryMode(true)} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 text-sm sm:text-base"><Sparkles className="w-5 h-5 sm:w-6 sm:h-6" /><span>Découvrir</span></button>
                    <button onClick={handleSurpriseMe} disabled={wishlist.length === 0} className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105 disabled:bg-purple-300 text-sm sm:text-base"><Dices className="w-5 h-5 sm:w-6 sm:h-6" /><span>Surprends-moi !</span></button>
                </div>
            </div>
            <WishlistManualAdd onAddWish={addWish} />
            {surpriseResult && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center" onClick={() => setSurpriseResult(null)}>
                    <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-in fade-in-0 zoom-in-95">
                        <p className="text-stone-500">Votre prochaine destination est...</p>
                        <h3 className="text-4xl font-serif font-bold text-amber-600 my-4">{surpriseResult.name}</h3>
                        <button onClick={() => setSurpriseResult(null)} className="mt-4 text-sm text-stone-500 hover:underline">Fermer</button>
                    </div>
                </div>
            )}
            <div className="mt-8">
                {wishlist.length === 0 ? <EmptyState title="Votre liste d'envies est vide" message="Ajoutez des restaurants manuellement ou utilisez le mode Découverte !" buttonText="Découvrir des pépites" onButtonClick={() => setDiscoveryMode(true)} /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlist.map(item => (
                            <div key={item.id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer overflow-hidden border border-stone-100 flex flex-col h-full animate-in fade-in-0 zoom-in-95">
                                <div className="relative aspect-video">
                                    <img src={item.photo_url || 'https://placehold.co/600x400/f5f5f4/a8a29e?text=No+Image'} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h3 className="font-serif text-2xl font-bold text-stone-800">{item.name}</h3>
                                    <p className="text-sm text-stone-500">{item.cuisine_type}</p>
                                    <div className="flex justify-between items-center mt-4">
                                        <button onClick={() => deleteFromWishlist(item.id)} className="text-red-500 hover:text-red-700"><Trash2 className="w-5 h-5" /></button>
                                        <button onClick={() => onConvertToCritique({ ...item, wishlistItemId: item.id })} className="flex items-center space-x-1 text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200"><Check className="w-4 h-4"/><span>J'y suis allé !</span></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
const WishlistManualAdd = ({ onAddWish }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const API_KEY = "AIzaSyBZDyGiT7698jJuY57hkgj8Xy3qhS_hitI";

    const handleSearch = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        const endpoint = `https://places.googleapis.com/v1/places:searchText`;
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.id,places.types,places.photos' },
                body: JSON.stringify({ textQuery: query, languageCode: 'fr' })
            });
            const data = await response.json();
            setSearchResults(data.places || []);
        } catch (error) { console.error("Error fetching places:", error); } 
        finally { setIsSearching(false); }
    }, [API_KEY]);

    useEffect(() => {
        const debounceTimer = setTimeout(() => { handleSearch(searchQuery); }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery, handleSearch]);

    const handleSelectPlace = async (place) => {
        const photoUrl = place.photos?.[0]?.name ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxHeightPx=800&key=${API_KEY}` : '';
        const wishData = {
            name: place.displayName.text,
            cuisine_type: place.types?.find(t => t.includes('food') || t.includes('restaurant'))?.replace(/_/g, ' ').replace('restaurant', '').trim() || 'Lieu',
            address: place.formattedAddress,
            photo_url: photoUrl,
        };
        await onAddWish(wishData);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <Accordion title="Ajout Rapide" defaultOpen>
            <div className="pt-4 space-y-2 relative">
                <p className="text-sm text-stone-600">Une recommandation ? Une envie soudaine ? Ajoutez un restaurant directement ici.</p>
                <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" /><input type="text" placeholder="Rechercher un restaurant..." className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />{isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 animate-spin" />}</div>
                {searchResults.length > 0 && (
                    <div className="absolute z-10 w-full bg-white border border-stone-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">{searchResults.map(place => (<div key={place.id} onClick={() => handleSelectPlace(place)} className="p-3 hover:bg-amber-50 cursor-pointer border-b border-stone-100"><p className="font-bold text-stone-800">{place.displayName.text}</p><p className="text-sm text-stone-500">{place.formattedAddress}</p></div>))}</div>
                )}
            </div>
        </Accordion>
    );
};
const DiscoveryMode = ({ userId, onExit, existingWishlist, addWish }) => {
    const API_KEY = "AIzaSyBZDyGiT7698jJuY57hkgj8Xy3qhS_hitI";
    const [mode, setMode] = useState('boussole');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isAdded, setIsAdded] = useState({});
    const [selectedTypes, setSelectedTypes] = useState(['restaurant']);
    const [radius, setRadius] = useState(2000);
    const [searchLocation, setSearchLocation] = useState({ description: 'Autour de moi', coords: null });
    const existingWishlistNames = useMemo(() => existingWishlist.map(item => item.name), [existingWishlist]);
    const autocompleteInput = useRef(null);
    const autocompleteInstance = useRef(null);

    useEffect(() => {
        if (mode !== 'boussole' || !window.google) return;
        if (!autocompleteInstance.current && autocompleteInput.current) {
            autocompleteInstance.current = new window.google.maps.places.Autocomplete(autocompleteInput.current, { types: ['geocode'], componentRestrictions: { country: 'fr' } });
            autocompleteInstance.current.addListener('place_changed', () => {
                const place = autocompleteInstance.current.getPlace();
                if (place.geometry) {
                    setSearchLocation({ description: place.formatted_address, coords: { latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() } });
                }
            });
        }
        return () => { if (autocompleteInstance.current) { window.google.maps.event.clearInstanceListeners(autocompleteInstance.current); } }
    }, [mode]);

    const availableTypes = { "Types de lieux": [{ id: 'restaurant', name: 'Restaurant' }, { id: 'cafe', name: 'Café' }, { id: 'bakery', name: 'Boulangerie' }, { id: 'bar', name: 'Bar' }], "Spécialités": [{ id: 'pizzeria', name: 'Pizzeria' }, { id: 'fast food restaurant', name: 'Fast Food' }, { id: 'creperie', name: 'Crêperie' }, { id: 'burger restaurant', name: 'Burger' }], "Cuisines du Monde": [{ id: 'french restaurant', name: 'Français' }, { id: 'italian restaurant', name: 'Italien' }, { id: 'japanese restaurant', name: 'Japonais' }, { id: 'vegetarian restaurant', name: 'Végétarien' }] };
    const handleTypeToggle = (typeId) => { setSelectedTypes(prev => prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]); };
    const findNearbyRestaurants = useCallback(async (centerCoords) => {
        if (selectedTypes.length === 0) { setError("Veuillez sélectionner au moins une catégorie."); return; }
        setIsLoading(true); setError(''); setSuggestions([]);
        const endpoint = `https://places.googleapis.com/v1/places:searchText`;
        const body = { textQuery: selectedTypes.join(' or '), maxResultCount: 10, locationBias: { circle: { center: centerCoords, radius: radius } }, languageCode: 'fr' };
        try {
            const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY, 'X-Goog-FieldMask': 'places.displayName,places.types,places.websiteUri,places.id,places.photos,places.formattedAddress' }, body: JSON.stringify(body) });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || 'Erreur API');
            const formattedSuggestions = data.places?.map(p => ({ id: p.id, name: p.displayName.text, address: p.formattedAddress, cuisine_type: p.types?.find(t => t.includes('restaurant') || t.includes('food'))?.replace(/_/g, ' ').replace('restaurant', '').trim() || p.types?.[0]?.replace(/_/g, ' ') || 'Lieu', website: p.websiteUri || '', photo_url: p.photos?.[0]?.name ? `https://places.googleapis.com/v1/${p.photos[0].name}/media?maxHeightPx=400&key=${API_KEY}` : '' })) || [];
            setSuggestions(formattedSuggestions.filter(s => !existingWishlistNames.includes(s.name)));
            if (formattedSuggestions.length === 0) { setError("Aucun résultat trouvé pour ces filtres."); }
        } catch (err) { setError(`Erreur: ${err.message}`); } finally { setIsLoading(false); }
    }, [API_KEY, existingWishlistNames, selectedTypes, radius]);

    const handleSearchFromLocation = () => {
        if (searchLocation.coords) { findNearbyRestaurants(searchLocation.coords); } 
        else {
            if (!navigator.geolocation) { setError("La géolocalisation n'est pas supportée."); return; }
            navigator.geolocation.getCurrentPosition( (position) => { findNearbyRestaurants({ latitude: position.coords.latitude, longitude: position.coords.longitude }); }, () => { setError("Impossible d'obtenir votre position."); });
        }
    };
    const findAiSuggestions = useCallback(async () => { /* Logic from previous version */ }, [userId, API_KEY, existingWishlistNames]);
    const addToWishlist = async (suggestion) => { setIsAdded(prev => ({ ...prev, [suggestion.id]: true })); await addWish(suggestion); };
    const handleRunDiscovery = () => { if (mode === 'boussole') handleSearchFromLocation(); if (mode === 'radar') findAiSuggestions(); };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-200 animate-in fade-in-0">
            <div className="flex justify-between items-center gap-4 mb-8">
                <div><h2 className="text-3xl sm:text-4xl font-serif text-stone-700">Mode Découverte</h2><p className="text-stone-500 mt-1">Trouvez votre prochaine destination.</p></div>
                <button onClick={onExit} className="text-stone-500 hover:text-stone-800 font-semibold text-sm">Retour</button>
            </div>
            <div className="flex items-center space-x-2 bg-stone-100 p-1 rounded-full max-w-md mx-auto mb-8">
                <button onClick={() => setMode('boussole')} className={`flex-1 text-center px-4 py-2 rounded-full font-medium transition-colors ${mode === 'boussole' ? 'bg-white text-amber-700 shadow' : 'text-stone-600'}`}>Explorateur</button>
                <button onClick={() => setMode('radar')} className={`flex-1 text-center px-4 py-2 rounded-full font-medium transition-colors ${mode === 'radar' ? 'bg-white text-amber-700 shadow' : 'text-stone-600'}`}>Radar à Pépites</button>
            </div>
            <div className="bg-stone-50 p-6 rounded-xl">
                <div className="text-center"><h3 className="text-xl font-bold font-serif text-stone-800">{mode === 'boussole' ? '🧭 Explorateur Gastronomique' : '✨ Radar à Pépites'}</h3><p className="text-stone-500 max-w-xl mx-auto my-2 text-sm">{mode === 'boussole' ? 'Affinez votre recherche pour trouver la perle rare.' : 'Recevez des suggestions sur-mesure de notre IA.'}</p></div>
                {mode === 'boussole' && (
                    <Accordion title="Filtres de recherche" defaultOpen>
                        <div className="space-y-6 pt-4">
                            <div><label className="block text-sm font-medium text-stone-700 mb-2">Rechercher autour de</label><div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" /><input ref={autocompleteInput} type="text" placeholder="Entrez une adresse" defaultValue={searchLocation.description} className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg" /></div></div>
                            <div><label className="block text-sm font-medium text-stone-700 mb-2">Distance</label><div className="flex items-center gap-4"><input type="range" min="500" max="10000" step="500" value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full accent-amber-600" /><span className="font-semibold text-stone-700 text-sm w-24 text-center">{radius < 1000 ? `${radius} m` : `${radius / 1000} km`}</span></div></div>
                            {Object.entries(availableTypes).map(([groupName, types]) => (<div key={groupName}><label className="block text-sm font-medium text-stone-700 mb-3">{groupName}</label><div className="flex flex-wrap gap-2">{types.map(type => (<button key={type.id} onClick={() => handleTypeToggle(type.id)} className={`px-3 py-1.5 text-sm rounded-full border ${selectedTypes.includes(type.id) ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}>{type.name}</button>))}</div></div>))}
                        </div>
                    </Accordion>
                )}
                <div className="mt-6 text-center"><button onClick={handleRunDiscovery} disabled={isLoading || (mode === 'boussole' && selectedTypes.length === 0)} className="flex items-center justify-center space-x-2 w-full sm:w-auto mx-auto bg-amber-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-amber-700 transition-all disabled:bg-amber-300">{isLoading ? <Loader2 className="w-6 h-6 animate-spin"/> : <span>{mode === 'boussole' ? 'Lancer la recherche' : 'Scanner les pépites'}</span>}</button></div>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            <div className="mt-8">{suggestions.length > 0 && (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{suggestions.map(s => <SuggestionCard key={s.id} suggestion={s} onAdd={addToWishlist} isAdded={isAdded[s.id]} />)}</div>)}</div>
        </div>
    );
};
const SuggestionCard = ({ suggestion, onAdd, isAdded }) => {
    const [isAdding, setIsAdding] = useState(false);
    const handleAdd = async () => { setIsAdding(true); await onAdd(suggestion); setIsAdding(false); };
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between animate-in fade-in-0 slide-in-from-bottom-4">
            <div className="h-40 w-full bg-cover bg-center bg-stone-200" style={{backgroundImage: `url(${suggestion.photo_url || 'https://placehold.co/600x400/e2e8f0/64748b?text=??'})`}}></div>
            <div className="p-4 flex-grow"><h3 className="font-serif text-xl font-bold truncate">{suggestion.name}</h3><p className="text-sm text-stone-500 font-medium">{suggestion.cuisine_type}</p>{suggestion.justification && <p className="text-sm text-stone-600 mt-2 italic">"{suggestion.justification}"</p>}</div>
            <div className="p-4 bg-stone-50"><button onClick={handleAdd} disabled={isAdded || isAdding} className={`w-full flex items-center justify-center space-x-2 text-sm font-bold py-2 px-3 rounded-full transition-colors ${isAdded ? 'bg-green-100 text-green-800 cursor-default' : 'bg-amber-100 text-amber-800 hover:bg-amber-200 disabled:bg-stone-200'}`}>{isAdded ? <><Check className="w-4 h-4"/><span>Ajouté !</span></> : (isAdding ? <Loader2 className="w-4 h-4 animate-spin"/> : <span>Ajouter à mes envies</span>)}</button></div>
        </div>
    );
};


// --- COMPOSANTS DE FORMULAIRE RÉUTILISABLES ---
const FormInput = ({ label, as = 'input', ...props }) => {
    const commonClasses = "w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white";
    const InputComponent = as;
    return (
        <div onClick={(e) => e.stopPropagation()}>
            {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
            <InputComponent {...props} className={commonClasses} />
        </div>
    );
};
const FormSelect = ({ label, children, ...props }) => (<div><label className="block text-sm font-medium text-stone-700 mb-1">{label}</label><select {...props} className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 bg-white">{children}</select></div>);
const Accordion = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (<div className="bg-white rounded-xl border border-stone-200"><button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left p-4"><h3 className="font-serif text-lg font-bold text-stone-700">{title}</h3><ChevronDown className={`w-6 h-6 text-amber-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && <div className="p-4 border-t border-stone-200">{children}</div>}</div>);
};
const RangeSlider = ({ label, value, onChange, name, minLabel, maxLabel, ...props }) => (
    <div onClick={(e) => e.stopPropagation()}>
        {label && <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>}
        <input type="range" name={name} value={value || 50} onChange={onChange} className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600" {...props} />
        <div className="flex justify-between text-xs text-stone-500 mt-1"><span>{minLabel}</span><span>{maxLabel}</span></div>
    </div>
);
const TagSelector = ({ label, tags, selectedTags, onTagClick }) => (
    <div onClick={(e) => e.stopPropagation()}>
        <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => <button type="button" key={tag} onClick={() => onTagClick(tag)} className={`px-3 py-1 text-sm rounded-full border transition-colors ${selectedTags.includes(tag) ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'}`}>{tag}</button>)}
        </div>
    </div>
);
const PillButtonSelector = ({ label, name, options, value, onChange, isIcon=false }) => (
    <div onClick={(e) => e.stopPropagation()}>
        <label className="block text-sm font-medium text-stone-700 mb-2">{label}</label>
        <div className={`flex flex-col sm:flex-row gap-2 ${isIcon ? 'sm:gap-4' : ''}`}>
            {options.map(option => (
                <label key={option} className="flex-1">
                    <input type="radio" name={name} value={option} checked={value === option} onChange={onChange} className="sr-only peer" />
                    <div className={`w-full text-center px-4 py-2 rounded-full border border-stone-300 cursor-pointer peer-checked:bg-amber-600 peer-checked:text-white peer-checked:border-amber-600 transition-colors ${isIcon ? 'text-2xl' : 'text-sm'}`}>
                        {option}
                    </div>
                </label>
            ))}
        </div>
    </div>
);
const DynamicTagInput = ({ label, tags, onTagsChange }) => {
    const [inputValue, setInputValue] = useState('');
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault();
            if (!tags.includes(inputValue.trim())) {
                onTagsChange([...tags, inputValue.trim()]);
            }
            setInputValue('');
        }
    };
    const removeTag = (tagToRemove) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
            <div className="flex flex-wrap gap-2 p-2 border border-stone-300 rounded-lg bg-white">
                {tags.map(tag => (
                    <div key={tag} className="flex items-center gap-1 bg-amber-100 text-amber-800 text-sm font-medium px-2 py-1 rounded">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-amber-600 hover:text-amber-800"><X className="w-3 h-3"/></button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow bg-transparent focus:outline-none"
                    placeholder="Ajouter un tag..."
                />
            </div>
        </div>
    );
};
const FlavorRadarChart = React.memo(({ data, onUpdate }) => {
    if (typeof window === 'undefined' || !window.Recharts) {
        return (
            <div className="w-full h-64 sm:h-80 flex items-center justify-center text-stone-400" onClick={(e) => e.stopPropagation()}>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2">Chargement du graphique...</span>
            </div>
        );
    }

    const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } = window.Recharts;
    
    if (!data) {
        return (
            <div className="w-full h-64 sm:h-80 flex items-center justify-center text-stone-400" onClick={(e) => e.stopPropagation()}>
                <p>Données du radar non disponibles.</p>
            </div>
        );
    }

    const chartData = [
        { subject: 'Salé', key: 'salty', value: data.salty || 0, fullMark: 100 },
        { subject: 'Sucré', key: 'sweet', value: data.sweet || 0, fullMark: 100 },
        { subject: 'Acide', key: 'sour', value: data.sour || 0, fullMark: 100 },
        { subject: 'Amer', key: 'bitter', value: data.bitter || 0, fullMark: 100 },
        { subject: 'Umami', key: 'umami', value: data.umami || 0, fullMark: 100 },
    ];
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-64 sm:h-80">
                <ResponsiveContainer>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Plat" dataKey="value" stroke="#c2410c" fill="#f59e0b" fillOpacity={0.6} />
                        <Tooltip />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-4">
                {chartData.map(item => (
                     <div key={item.key}>
                        <label className="block text-sm font-medium text-stone-700 mb-1 text-center">{item.subject}</label>
                        <input type="range" min="0" max="100" value={item.value} onChange={(e) => onUpdate(item.key, Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                ))}
            </div>
        </div>
    );
});

const _CriterionInput = ({ 
    label, 
    hasSlider,
    sliderValue,
    sliderMinLabel,
    sliderMaxLabel,
    onSliderChange,
    sliderDataPath,
    notesValue,
    onNotesChange,
    notesDataPath
}) => {
    const [showNotes, setShowNotes] = useState(!!notesValue);
    
    const handleToggleNotes = (e) => {
        e.stopPropagation();
        setShowNotes(prev => !prev);
    }

    return (
        <div className="bg-stone-50/50 p-3 rounded-lg border border-stone-200/80" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-stone-700">{label}</span>
                <button type="button" onClick={handleToggleNotes} className="text-xs text-amber-600 hover:underline">
                    {showNotes ? 'Masquer notes' : 'Ajouter notes'}
                </button>
            </div>
            {hasSlider && <RangeSlider 
                label=""
                value={sliderValue}
                onChange={onSliderChange}
                minLabel={sliderMinLabel}
                maxLabel={sliderMaxLabel}
                data-path={sliderDataPath}
            />}
            {showNotes && (
                 <textarea
                    value={notesValue || ''}
                    onChange={onNotesChange}
                    className="w-full mt-2 p-2 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Vos notes, arguments, ressentis..."
                    rows="2"
                    data-path={notesDataPath}
                />
            )}
        </div>
    );
};
const CriterionInput = React.memo(_CriterionInput);


// --- COMPOSANTS D'ANALYSE EXPERTE ---
const getNewMealItem = () => ({
    id: Date.now() + Math.random(),
    name: '',
    evaluationMode: 'standard',
    
    standard: {
        ingredientQuality: 'Bonne qualité',
        technique: 50,
        creativity: 50,
        pleasure: 50,
        valueForMoney: 50,
        portionSize: 50,
        freshness: 50,
        strongPoint: '',
        weakPoint: ''
    },
    
    expert: {
        context: {
            menuPromise: { notes: '' },
            mood: { value: 50, notes: '' },
        },
        sensory: {
            visual: {
                generalStyle: { value: 50, notes: '' },
            },
            olfactory: {
                intensity: { value: 50, notes: '' },
            },
            gustatory: {
                tasteRatings: { salty: 0, sweet: 0, sour: 0, bitter: 0, umami: 0 },
            }
        },
        intellectual: {
            coherence: { value: 50, notes: '' },
            wowFactor: { value: 50, notes: '' },
            emotion: { notes: '' },
        },
        synthesis: {
            pairingRating: { value: 50, notes: '' },
            finalScore: { value: 15, notes: '' },
        }
    }
});

const _MealAnalysisCard = ({ initialItem, index, onItemChange, onRemoveItem }) => {
    const [item, setItem] = useState(initialItem);
    
    const debouncedUpdate = useCallback(
        window._.debounce((updatedItem) => {
          onItemChange(index, updatedItem);
        }, 500),
        [index, onItemChange]
    );

    // This useEffect is removed to break the infinite loop
    // useEffect(() => {
    //     setItem(initialItem);
    // }, [initialItem]);

    const handleLocalChange = useCallback((fieldPath, value) => {
        setItem(prevItem => {
            const newItem = JSON.parse(JSON.stringify(prevItem));
            const path = fieldPath.split('.');
            let current = newItem;
            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            debouncedUpdate(newItem);
            return newItem;
        });
    }, [debouncedUpdate]);

    const handleModeChange = (mode) => {
        handleLocalChange('evaluationMode', mode);
    };

    const handleItemNameChange = (e) => {
        handleLocalChange('name', e.target.value);
    };

    const handleStandardChange = (e) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'range' ? Number(value) : value;
        handleLocalChange(`standard.${name}`, finalValue);
    };
    
    const handleExpertChange = (e) => {
        const { path } = e.currentTarget.dataset;
        const { value, type } = e.currentTarget;
        const finalValue = type === 'range' ? Number(value) : value;
        handleLocalChange(`expert.${path}`, finalValue);
    };
    
    const handleRadarUpdate = (key, value) => {
        handleLocalChange(`expert.sensory.gustatory.tasteRatings.${key}`, value);
    };

    useEffect(() => {
        return () => {
          debouncedUpdate.cancel();
        };
    }, [debouncedUpdate]);

    const PhaseSection = ({ title, children }) => (
        <div className="bg-white rounded-lg border border-stone-200/80 shadow-sm">
            <h4 className="font-serif text-lg font-bold text-stone-800 border-b border-stone-200 p-3">{title}</h4>
            <div className="p-4 space-y-4">
                {children}
            </div>
        </div>
    );

    return (
        <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 relative space-y-4">
            <button type="button" onClick={() => onRemoveItem(item.id)} className="absolute top-3 right-3 text-stone-400 hover:text-red-500 z-10"><Trash2 className="w-4 h-4" /></button>
            
            <FormInput label="Type & Nom du Plat" placeholder="Ex: Entrée - Oeuf mayo" value={item.name} onChange={handleItemNameChange} />
            
            <div className="flex items-center justify-center space-x-2 bg-stone-200 p-1 rounded-full">
                <button type="button" onClick={() => handleModeChange('standard')} className={`flex-1 text-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${item.evaluationMode === 'standard' ? 'bg-white text-amber-700 shadow' : 'text-stone-600'}`}>Évaluation Standard</button>
                <button type="button" onClick={() => handleModeChange('expert')} className={`flex-1 flex items-center justify-center gap-2 text-center px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${item.evaluationMode === 'expert' ? 'bg-white text-amber-700 shadow' : 'text-stone-600'}`}><BrainCircuit className="w-4 h-4"/>Palais Raffiné</button>
            </div>

            {item.evaluationMode === 'standard' && (
                <div className="pt-4 space-y-6 animate-in fade-in-0">
                    <PillButtonSelector label="Qualité des Ingrédients" name="ingredientQuality" options={['Standard', 'Bonne qualité', 'Exceptionnel']} value={item.standard?.ingredientQuality} onChange={handleStandardChange} />
                    <RangeSlider label="Maîtrise Technique" name="technique" value={item.standard?.technique} onChange={handleStandardChange} minLabel="Amateur" maxLabel="Parfaite" />
                    <RangeSlider label="Originalité / Créativité" name="creativity" value={item.standard?.creativity} onChange={handleStandardChange} minLabel="Classique" maxLabel="Innovant" />
                    <RangeSlider label="Plaisir / Gourmandise" name="pleasure" value={item.standard?.pleasure} onChange={handleStandardChange} minLabel="Décevant" maxLabel="Jouissif" />
                    <RangeSlider label="Rapport Qualité/Prix" name="valueForMoney" value={item.standard?.valueForMoney} onChange={handleStandardChange} minLabel="Mauvais" maxLabel="Excellent" />
                    <RangeSlider label="Générosité" name="portionSize" value={item.standard?.portionSize} onChange={handleStandardChange} minLabel="Chiche" maxLabel="Généreux" />
                    <RangeSlider label="Fraîcheur perçue" name="freshness" value={item.standard?.freshness} onChange={handleStandardChange} minLabel="Douteuse" maxLabel="Éclatante" />
                    <FormInput label="Point Fort" name="strongPoint" value={item.standard?.strongPoint} onChange={handleStandardChange} />
                    <FormInput label="Point Faible" name="weakPoint" value={item.standard?.weakPoint} onChange={handleStandardChange} />
                </div>
            )}
            
            {item.evaluationMode === 'expert' && (
                <div className="pt-4 space-y-6 animate-in fade-in-0">
                    <PhaseSection title="Phase 1: Contexte & Attentes">
                        <CriterionInput 
                            label="Promesse du Menu & Intitulé"
                            hasSlider={false}
                            notesValue={item.expert?.context?.menuPromise?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="context.menuPromise.notes"
                        />
                        <CriterionInput 
                            label="Humeur & Attentes"
                            hasSlider={true}
                            sliderValue={item.expert?.context?.mood?.value}
                            sliderMinLabel="Fatigué"
                            sliderMaxLabel="En Forme"
                            onSliderChange={handleExpertChange}
                            sliderDataPath="context.mood.value"
                            notesValue={item.expert?.context?.mood?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="context.mood.notes"
                        />
                    </PhaseSection>

                    <PhaseSection title="Phase 2: Analyse Sensorielle">
                        <CriterionInput 
                             label="Style Visuel"
                             hasSlider={true}
                             sliderValue={item.expert?.sensory?.visual?.generalStyle?.value}
                             sliderMinLabel="Brut"
                             sliderMaxLabel="Raffiné"
                             onSliderChange={handleExpertChange}
                             sliderDataPath="sensory.visual.generalStyle.value"
                             notesValue={item.expert?.sensory?.visual?.generalStyle?.notes}
                             onNotesChange={handleExpertChange}
                             notesDataPath="sensory.visual.generalStyle.notes"
                        />
                        <CriterionInput 
                            label="Intensité Olfactive"
                            hasSlider={true}
                            sliderValue={item.expert?.sensory?.olfactory?.intensity?.value}
                            sliderMinLabel="Discret"
                            sliderMaxLabel="Puissant"
                            onSliderChange={handleExpertChange}
                            sliderDataPath="sensory.olfactory.intensity.value"
                            notesValue={item.expert?.sensory?.olfactory?.intensity?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="sensory.olfactory.intensity.notes"
                        />
                        <div onClick={e => e.stopPropagation()}><h5 className="font-serif text-sm font-bold text-stone-600 my-2 text-center">Équilibre des Saveurs</h5><FlavorRadarChart data={item.expert?.sensory?.gustatory?.tasteRatings} onUpdate={handleRadarUpdate} /></div>
                    </PhaseSection>

                    <PhaseSection title="Phase 3: Analyse Intellectuelle">
                         <CriterionInput 
                            label="Cohérence & Construction"
                            hasSlider={true}
                            sliderValue={item.expert?.intellectual?.coherence?.value}
                            sliderMinLabel="Illogique"
                            sliderMaxLabel="Évident"
                            onSliderChange={handleExpertChange}
                            sliderDataPath="intellectual.coherence.value"
                            notesValue={item.expert?.intellectual?.coherence?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="intellectual.coherence.notes"
                         />
                         <CriterionInput 
                            label="Facteur 'Wouah'"
                            hasSlider={true}
                            sliderValue={item.expert?.intellectual?.wowFactor?.value}
                            sliderMinLabel="Déjà-vu"
                            sliderMaxLabel="Génial"
                            onSliderChange={handleExpertChange}
                            sliderDataPath="intellectual.wowFactor.value"
                            notesValue={item.expert?.intellectual?.wowFactor?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="intellectual.wowFactor.notes"
                         />
                         <FormInput label="Émotion & Narration" as="textarea" value={item.expert?.intellectual?.emotion?.notes || ''} onChange={handleExpertChange} data-path="intellectual.emotion.notes" onClick={e => e.stopPropagation()} placeholder="Qu'est-ce que ce plat raconte ?"/>
                    </PhaseSection>

                     <PhaseSection title="Phase 4: Synthèse & Verdict">
                        <CriterionInput 
                            label="Qualité de l'Accord (Mets/Vins...)"
                            hasSlider={true}
                            sliderValue={item.expert?.synthesis?.pairingRating?.value}
                            sliderMinLabel="Discordant"
                            sliderMaxLabel="Divin"
                            onSliderChange={handleExpertChange}
                            sliderDataPath="synthesis.pairingRating.value"
                            notesValue={item.expert?.synthesis?.pairingRating?.notes}
                            onNotesChange={handleExpertChange}
                            notesDataPath="synthesis.pairingRating.notes"
                        />
                        <FormInput label="Note Finale (/20)" type="number" min="0" max="20" step="0.5" value={item.expert?.synthesis?.finalScore?.value || ''} onChange={handleExpertChange} data-path="synthesis.finalScore.value" onClick={e => e.stopPropagation()} />
                     </PhaseSection>
                </div>
            )}
        </div>
    );
};

const MealAnalysisCard = React.memo(_MealAnalysisCard);
