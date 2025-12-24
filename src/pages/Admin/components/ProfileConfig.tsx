import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
    onBack: () => void;
}

const ProfileConfig: React.FC<Props> = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setFullName(data.full_name || '');
                setRole(data.role || '');
                setBio(data.bio || '');
                setAvatarUrl(data.avatar_url || '');
            }
        }
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const updates = {
                id: user.id,
                full_name: fullName,
                role,
                bio,
                avatar_url: avatarUrl,
                updated_at: new Date(),
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                setMsg(`Error: ${error.message}`);
            } else {
                setMsg('SUCCESS: Profile Configuration Updated.');
            }
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> PROFILE_CONFIG
                </h2>
                <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                    &larr; RETURN_ROOT
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Preview Section */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-gray-900 border border-gray-800 p-4 rounded text-center">
                        <label className="block text-gray-500 text-xs font-mono mb-4 text-left">AVATAR_PREVIEW</label>
                        <div className="w-32 h-32 mx-auto bg-black rounded-full overflow-hidden border-2 border-red-500/50 mb-4 relative group">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-xs">NO_IMAGE</div>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-xs font-mono text-white">PREVIEW</span>
                            </div>
                        </div>
                        <h3 className="text-white font-bold font-mono">{fullName || 'USER_NAME'}</h3>
                        <p className="text-red-400 text-xs font-mono mt-1">{role || 'SYSTEM_ROLE'}</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleSave} className="bg-gray-900/30 border border-gray-800 p-8 rounded space-y-6 relative overflow-hidden">
                        {/* Decorative Line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/20"></div>

                        {msg && (
                            <div className={`p-4 border font-mono text-xs ${msg.includes('Error') ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-green-500 bg-green-500/10 text-green-500'}`}>
                                {msg}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-500 text-xs font-mono mb-2 uppercase">Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-500 focus:outline-none font-mono text-sm transition-colors"
                                    placeholder="Vijay Machkuri"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-xs font-mono mb-2 uppercase">Specialization Level (Role)</label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-500 focus:outline-none font-mono text-sm transition-colors"
                                    placeholder="AI Engineer"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-500 text-xs font-mono mb-2 uppercase">Bio / Directive</label>
                            <textarea
                                value={bio}
                                onChange={e => setBio(e.target.value)}
                                rows={4}
                                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-red-500 focus:outline-none font-mono text-sm transition-colors"
                                placeholder="Brief description of capabilities..."
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-xs font-mono mb-2 uppercase">Avatar Source URL</label>
                            <input
                                type="text"
                                value={avatarUrl}
                                onChange={e => setAvatarUrl(e.target.value)}
                                className="w-full bg-black border border-gray-700 p-3 text-gray-400 focus:border-red-500 focus:text-white focus:outline-none font-mono text-sm transition-colors"
                                placeholder="https://..."
                            />
                            <p className="text-[10px] text-gray-600 mt-2 font-mono">Accepts direct image links or Supabase Storage URLs.</p>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black font-bold py-3 px-8 font-mono hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 tracking-widest uppercase flex items-center gap-2"
                            >
                                {loading ? 'SAVING...' : 'SAVE_CONFIGURATION'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfig;
