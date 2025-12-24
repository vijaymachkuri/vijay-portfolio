import React, { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
            <div className="w-full max-w-md bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-red-500 font-mono">SYSTEM ACCESS</h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 mb-4 text-sm font-mono">
                        Error: {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 text-xs font-mono uppercase mb-2">Identifier</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono"
                            placeholder="admin@system.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 text-xs font-mono uppercase mb-2">Passcode</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-500 focus:outline-none transition-colors font-mono"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-bold py-3 font-mono hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                    >
                        {loading ? 'AUTHENTICATING...' : 'ENTER CONSOLE'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
