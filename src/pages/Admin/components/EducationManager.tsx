import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
    onBack: () => void;
}

interface Education {
    id: number;
    degree: string;
    institution: string;
    year: string;
    description: string;
}

const EducationManager: React.FC<Props> = ({ onBack }) => {
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [current, setCurrent] = useState<Partial<Education>>({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        const { data } = await supabase.from('education').select('*').order('id', { ascending: false });
        if (data) setEducation(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!current.degree) return;

        if (current.id) {
            await supabase.from('education').update(current).eq('id', current.id);
        } else {
            await supabase.from('education').insert([current]);
        }
        setIsEditing(false);
        setCurrent({});
        fetchData();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this education entry?')) return;
        await supabase.from('education').delete().eq('id', id);
        fetchData();
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> EDUCATION_HISTORY
                </h2>
                <div className="flex gap-4">
                    <button onClick={() => { setCurrent({}); setIsEditing(true); }} className="bg-red-600 text-white text-xs font-bold py-2 px-4 font-mono hover:bg-red-500 transition-all uppercase">+ ADD_DEGREE</button>
                    <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">&larr; BACK</button>
                </div>
            </div>

            {isEditing && (
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded mb-8 relative">
                    <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white">&times;</button>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Degree</label><input type="text" value={current.degree || ''} onChange={e => setCurrent({ ...current, degree: e.target.value })} className="w-full bg-black border border-gray-700 p-2 text-white font-mono text-sm" required /></div>
                            <div><label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Institution</label><input type="text" value={current.institution || ''} onChange={e => setCurrent({ ...current, institution: e.target.value })} className="w-full bg-black border border-gray-700 p-2 text-white font-mono text-sm" required /></div>
                        </div>
                        <div><label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Year</label><input type="text" value={current.year || ''} onChange={e => setCurrent({ ...current, year: e.target.value })} className="w-full bg-black border border-gray-700 p-2 text-white font-mono text-sm" placeholder="e.g. 2019 - 2023" required /></div>
                        <div><label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Description</label><textarea value={current.description || ''} onChange={e => setCurrent({ ...current, description: e.target.value })} rows={3} className="w-full bg-black border border-gray-700 p-2 text-white font-mono text-sm" required /></div>
                        <div className="flex justify-end"><button type="submit" className="bg-white text-black font-bold py-2 px-6 font-mono hover:bg-red-500 hover:text-white text-xs uppercase">SAVE_ENTRY</button></div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {education.map(edu => (
                    <div key={edu.id} className="bg-gray-900 border border-gray-800 p-4 rounded group hover:border-red-500/30 transition-colors flex justify-between items-start">
                        <div>
                            <h3 className="text-white font-bold font-mono">{edu.degree}</h3>
                            <p className="text-red-500 text-sm font-mono">{edu.institution}</p>
                            <p className="text-gray-500 text-xs font-mono mb-2">{edu.year}</p>
                            <p className="text-gray-400 text-sm">{edu.description}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => { setCurrent(edu); setIsEditing(true); }} className="text-blue-500 hover:text-white text-xs font-mono">EDIT</button>
                            <button onClick={() => handleDelete(edu.id)} className="text-red-500 hover:text-white text-xs font-mono">DELETE</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationManager;
