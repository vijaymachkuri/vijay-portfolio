import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
    onBack: () => void;
}

interface Skill {
    id: number;
    name: string;
    category: string;
    icon_url?: string;
}

const SkillsMatrix: React.FC<Props> = ({ onBack }) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(false);

    // Add New Skill State
    const [newName, setNewName] = useState('');
    const [newCategory, setNewCategory] = useState('AI');
    const [newIconUrl, setNewIconUrl] = useState('');

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('category', { ascending: true });

        if (data) {
            setSkills(data);
        }
        setLoading(false);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName) return;

        const { error } = await supabase
            .from('skills')
            .insert([{ name: newName, category: newCategory, icon_url: newIconUrl }]);

        if (!error) {
            setNewName('');
            setNewIconUrl('');
            fetchSkills();
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Confirm deletion of this skill node?')) return;

        const { error } = await supabase
            .from('skills')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchSkills();
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> SKILLS_MATRIX
                </h2>
                <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                    &larr; RETURN_ROOT
                </button>
            </div>

            {/* Add New Skill Form */}
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded space-y-4">
                <h3 className="text-white font-mono text-sm uppercase border-l-2 border-red-500 pl-3">Inject New Capability</h3>
                <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Skill Name</label>
                        <input
                            type="text"
                            value={newName}
                            onChange={e => setNewName(e.target.value)}
                            className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                            placeholder="e.g. Rust"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Icon URL (Optional)</label>
                        <input
                            type="text"
                            value={newIconUrl}
                            onChange={e => setNewIconUrl(e.target.value)}
                            className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Category</label>
                        <select
                            value={newCategory}
                            onChange={e => setNewCategory(e.target.value)}
                            className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                        >
                            <option value="AI">AI</option>
                            <option value="Web">Web</option>
                            <option value="Tools">Tools</option>
                            <option value="Core">Core</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-red-600 text-white font-bold py-2 px-6 font-mono hover:bg-red-500 transition-all text-sm h-[38px] w-full md:w-auto"
                    >
                        INJECT
                    </button>
                </form>
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['AI', 'Web', 'Tools', 'Core'].map(category => (
                    <div key={category} className="space-y-3">
                        <h4 className="text-red-500 font-mono text-xs border-b border-gray-800 pb-2 flex justify-between">
                            <span>// {category}</span>
                            <span className="text-gray-600">{skills.filter(s => s.category === category).length} Nodes</span>
                        </h4>
                        <div className="space-y-2">
                            {skills.filter(s => s.category === category).map(skill => (
                                <div key={skill.id} className="bg-gray-900 border border-gray-800 p-3 rounded flex justify-between items-center group">
                                    <span className="text-gray-300 font-mono text-sm">{skill.name}</span>
                                    <button
                                        onClick={() => handleDelete(skill.id)}
                                        className="text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all px-2"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                            {skills.filter(s => s.category === category).length === 0 && (
                                <p className="text-gray-700 font-mono text-xs italic">No data nodes found.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsMatrix;
