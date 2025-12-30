import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Terminal } from 'lucide-react';

export default function Navbar() {
    const apiKey = localStorage.getItem('social_api_key');
    const navigate = useNavigate();
    // Force re-render on location change to check localStorage again roughly
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('social_api_key');
        navigate('/');
    };

    return (
        <nav className="w-full border-b border-white/10 bg-surface/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    <Terminal className="w-6 h-6 text-primary" />
                    <span>SocialAPI</span>
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Docs</a>

                    {apiKey ? (
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-sm font-medium border border-white/5">
                                Dashboard
                            </Link>
                            <button onClick={handleLogout} className="text-sm text-red-400 hover:text-red-300">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/dashboard" className="px-5 py-2 rounded-full bg-primary hover:bg-primaryHover text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
