import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import ProfileConfig from './components/ProfileConfig';
import SkillsMatrix from './components/SkillsMatrix';
import ProjectsLog from './components/ProjectsLog';

import ExperienceManager from './components/ExperienceManager';
import EducationManager from './components/EducationManager';
import ResumeManager from './components/ResumeManager';
import DatabaseSeeder from './components/DatabaseSeeder';

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'dashboard' | 'profile' | 'skills' | 'projects' | 'experience' | 'education' | 'resume' | 'seeder'>('dashboard');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                navigate('/login');
            }
            setLoading(false);
        });
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">LOADING SYSTEM...</div>
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Admin Header */}
            <header className="border-b border-gray-800 p-6 flex justify-between items-center">
                <h1 className="text-xl font-mono font-bold text-red-500">ADMIN_CONSOLE // <span className="text-white">DASHBOARD</span></h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setView('seeder')}
                        className="text-xs font-mono text-yellow-500 hover:text-white border border-yellow-500/50 hover:bg-yellow-500/10 px-3 py-2 transition-colors uppercase"
                    >
                        ⚠️ INITIALIZE_DB
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-xs font-mono border border-gray-700 px-4 py-2 hover:bg-gray-800 transition-colors"
                    >
                        TERMINATE_SESSION
                    </button>
                </div>
            </header>

            <main className="p-8">
                {view === 'dashboard' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                        {/* Profile Module */}
                        <div
                            onClick={() => setView('profile')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">PROFILE_CONFIG</h3>
                            <p className="text-xs text-gray-500">Update bio, avatar, and personal details.</p>
                        </div>

                        {/* Skills Module */}
                        <div
                            onClick={() => setView('skills')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">SKILLS_MATRIX</h3>
                            <p className="text-xs text-gray-500">Manage technical stack and categories.</p>
                        </div>

                        {/* Projects Module */}
                        <div
                            onClick={() => setView('projects')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">PROJECTS_LOG</h3>
                            <p className="text-xs text-gray-500">Add, edit, or remove portfolio works.</p>
                        </div>

                        {/* Experience Module */}
                        <div
                            onClick={() => setView('experience')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">EXPERIENCE_TIMELINE</h3>
                            <p className="text-xs text-gray-500">Manage work history and roles.</p>
                        </div>

                        {/* Education Module */}
                        <div
                            onClick={() => setView('education')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">EDUCATION_HISTORY</h3>
                            <p className="text-xs text-gray-500">Manage degrees and certifications.</p>
                        </div>

                        {/* Resume Module */}
                        <div
                            onClick={() => setView('resume')}
                            className="border border-gray-800 p-6 bg-gray-900/50 rounded hover:border-red-500/50 transition-colors cursor-pointer group"
                        >
                            <h3 className="font-mono text-gray-400 group-hover:text-white mb-2">RESUME_CONTROLLER</h3>
                            <p className="text-xs text-gray-500">Upload, update, or remove resume file.</p>
                        </div>


                    </div>
                )}

                {view === 'profile' && <ProfileConfig onBack={() => setView('dashboard')} />}
                {view === 'skills' && <SkillsMatrix onBack={() => setView('dashboard')} />}
                {view === 'projects' && <ProjectsLog onBack={() => setView('dashboard')} />}
                {view === 'experience' && <ExperienceManager onBack={() => setView('dashboard')} />}
                {view === 'education' && <EducationManager onBack={() => setView('dashboard')} />}
                {view === 'resume' && <ResumeManager onBack={() => setView('dashboard')} />}
                {view === 'seeder' && <DatabaseSeeder onBack={() => setView('dashboard')} />}

                {view === 'dashboard' && (
                    <div className="mt-12 p-4 border border-blue-900/30 bg-blue-900/10 rounded font-mono text-xs text-blue-200">
                        <span className="font-bold">SYSTEM STATUS:</span> Database connection established. All subsystems operational.
                    </div>
                )}
            </main>
        </div>
    );
};

export default Admin;
