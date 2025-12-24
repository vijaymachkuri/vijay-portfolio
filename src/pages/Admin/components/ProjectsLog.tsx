import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
    onBack: () => void;
}

interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    image_url: string;
    link: string;
}

const ProjectsLog: React.FC<Props> = ({ onBack }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState<Partial<Project>>({ tech: [] });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('id', { ascending: false });

        if (data) setProjects(data);
        setLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentProject.title) return;

        // Ensure tech is array
        const projectData = {
            ...currentProject,
            tech: Array.isArray(currentProject.tech) ? currentProject.tech : (currentProject.tech as string || '').split(',').map((t: string) => t.trim())
        };

        if (currentProject.id) {
            // Update
            await supabase.from('projects').update(projectData).eq('id', currentProject.id);
        } else {
            // Insert
            await supabase.from('projects').insert([projectData]);
        }

        setIsEditing(false);
        setCurrentProject({ tech: [] });
        fetchProjects();
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this project record?')) return;
        await supabase.from('projects').delete().eq('id', id);
        fetchProjects();
    };

    const startEdit = (project?: Project) => {
        setCurrentProject(project || { tech: [] });
        setIsEditing(true);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> PROJECTS_LOG
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => startEdit()}
                        className="bg-red-600 text-white text-xs font-bold py-2 px-4 font-mono hover:bg-red-500 transition-all uppercase"
                    >
                        + NEW_ENTRY
                    </button>
                    <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                        &larr; RETURN_ROOT
                    </button>
                </div>
            </div>

            {/* Edit Modal / Form Area */}
            {isEditing && (
                <div className="bg-gray-900/50 border border-gray-800 p-6 rounded mb-8 relative">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white"
                    >
                        &times;
                    </button>
                    <h3 className="text-white font-mono text-sm uppercase border-l-2 border-red-500 pl-3 mb-4">
                        {currentProject.id ? 'EDIT_ENTRY' : 'NEW_ENTRY'}
                    </h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Title</label>
                                <input
                                    type="text"
                                    value={currentProject.title || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Link URL</label>
                                <input
                                    type="text"
                                    value={currentProject.link || ''}
                                    onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })}
                                    className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Tech Stack (Comma Separated)</label>
                            <input
                                type="text"
                                value={Array.isArray(currentProject.tech) ? currentProject.tech.join(', ') : currentProject.tech || ''}
                                onChange={e => setCurrentProject({ ...currentProject, tech: e.target.value.split(',') })}
                                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                                placeholder="React, TypeScript, Node.js"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Image URL</label>
                            <input
                                type="text"
                                value={currentProject.image_url || ''}
                                onChange={e => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-500 text-[10px] font-mono mb-1 uppercase">Description</label>
                            <textarea
                                value={currentProject.description || ''}
                                onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                                rows={3}
                                className="w-full bg-black border border-gray-700 p-2 text-white focus:border-red-500 focus:outline-none font-mono text-sm"
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="text-gray-400 text-xs font-mono px-4 py-2 hover:text-white"
                            >
                                CANCEL
                            </button>
                            <button
                                type="submit"
                                className="bg-white text-black font-bold py-2 px-6 font-mono hover:bg-red-500 hover:text-white transition-all text-xs uppercase"
                            >
                                SAVE_CHANGE_LOG
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-gray-900 border border-gray-800 rounded overflow-hidden group hover:border-red-500/50 transition-colors">
                        <div className="h-40 bg-black relative">
                            {project.image_url ? (
                                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-xs">NO_IMAGE</div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => startEdit(project)}
                                    className="bg-blue-600 p-1.5 rounded hover:bg-blue-500 text-white"
                                    title="Edit"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="bg-red-600 p-1.5 rounded hover:bg-red-500 text-white"
                                    title="Delete"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-white font-bold font-mono text-lg mb-1">{project.title}</h3>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {project.tech && project.tech.slice(0, 3).map((t, i) => (
                                    <span key={i} className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-mono">{t}</span>
                                ))}
                                {project.tech && project.tech.length > 3 && <span className="text-[10px] text-gray-500">+{project.tech.length - 3}</span>}
                            </div>
                            <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{project.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {projects.length === 0 && !loading && (
                <div className="text-center py-20 border border-dashed border-gray-800 rounded">
                    <p className="text-gray-600 font-mono">No projects initialized in database.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectsLog;
