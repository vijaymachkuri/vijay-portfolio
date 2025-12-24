import React, { useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { SKILLS, PROJECTS, EXPERIENCE, EDUCATION, CONTACT_INFO, PROFILE_IMAGE_URL } from '../../../constants';

interface Props {
    onBack: () => void;
}

const DatabaseSeeder: React.FC<Props> = ({ onBack }) => {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const seedDatabase = async () => {
        if (!window.confirm("WARNING: Starting Seeding Protocol. The system will check for existing records to prevent duplicates.")) return;

        setLoading(true);
        setMsg('Initializing seeding process...');

        try {
            // 1. Seed Profile (Safe to Upsert as it uses User ID)
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setMsg('Verifying Profile Configuration...');
                await supabase.from('profiles').upsert({
                    id: user.id,
                    full_name: "Vijay Machkuri",
                    role: "AI Engineer",
                    bio: "AI & ML Enthusiast | Developer | Problem Solver",
                    avatar_url: "",
                    email: CONTACT_INFO.email
                });
            }

            // 2. Seed Skills (Check by Name)
            setMsg('Synchronizing Skills Matrix...');
            const { data: existingSkills } = await supabase.from('skills').select('*');
            const existingSkillsMap = new Map(existingSkills?.map(s => [s.name, s.id]));
            let skillsAdded = 0;
            let skillsUpdated = 0;

            for (const skill of SKILLS) {
                if (existingSkillsMap.has(skill.name)) {
                    // Update existing skill (to ensure icon_url/category is fresh)
                    const id = existingSkillsMap.get(skill.name);
                    await supabase.from('skills').update({
                        category: skill.category,
                        icon_url: skill.icon_url
                    }).eq('id', id);
                    skillsUpdated++;
                } else {
                    // Insert new skill
                    await supabase.from('skills').insert({
                        name: skill.name,
                        category: skill.category,
                        icon_url: skill.icon_url
                    });
                    skillsAdded++;
                }
            }

            // 3. Seed Projects (Check by Title)
            setMsg('Synchronizing Projects Log...');
            const { data: existingProjects } = await supabase.from('projects').select('title');
            const existingTitles = new Set(existingProjects?.map(p => p.title));
            let projectsAdded = 0;

            for (const project of PROJECTS) {
                if (!existingTitles.has(project.title)) {
                    await supabase.from('projects').insert({
                        title: project.title,
                        description: project.description,
                        tech: project.tech,
                        image_url: project.image_url,
                        link: project.link
                    });
                    projectsAdded++;
                }
            }

            // 4. Seed Experience (Check by Role + Company)
            setMsg('Synchronizing Experience Timeline...');
            const { data: existingExp } = await supabase.from('experience').select('role, company');
            const expKeys = new Set(existingExp?.map(e => `${e.role}-${e.company}`));
            let expAdded = 0;

            for (const exp of EXPERIENCE) {
                const key = `${exp.role}-${exp.company}`;
                if (!expKeys.has(key)) {
                    await supabase.from('experience').insert({
                        role: exp.role,
                        company: exp.company,
                        duration: exp.period,
                        description: exp.description
                    });
                    expAdded++;
                }
            }

            // 5. Seed Education (Check by Degree + Institution)
            setMsg('Synchronizing Education History...');
            const { data: existingEdu } = await supabase.from('education').select('degree, institution');
            const eduKeys = new Set(existingEdu?.map(e => `${e.degree}-${e.institution}`));
            let eduAdded = 0;

            for (const edu of EDUCATION) {
                const key = `${edu.degree}-${edu.school}`;
                if (!eduKeys.has(key)) {
                    await supabase.from('education').insert({
                        degree: edu.degree,
                        institution: edu.school,
                        year: edu.period,
                        description: edu.grade
                    });
                    eduAdded++;
                }
            }

            setMsg(`SUCCESS: Database synchronized. Added: ${skillsAdded} Skills (${skillsUpdated} Updated), ${projectsAdded} Projects, ${expAdded} Roles, ${eduAdded} Degrees.`);

        } catch (error: any) {
            setMsg(`ERROR: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> DATABASE_SEEDER
                </h2>
                <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                    &larr; RETURN_ROOT
                </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-8 rounded max-w-2xl mx-auto text-center space-y-6">
                <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
                <h3 className="text-white font-mono text-xl">INITIALIZE_DATA_STREAMS</h3>
                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    Your database appears to be empty. Use this tool to one-time import all your hardcoded portfolio data (Skills, Projects, Experience, etc.) into Supabase.
                </p>
                <p className="text-red-400 text-xs font-mono">
                    Warning: Clicking this multiple times will create duplicate entries.
                </p>

                <button
                    onClick={seedDatabase}
                    disabled={loading}
                    className="bg-red-600 text-white font-bold py-4 px-8 font-mono hover:bg-red-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest mt-4 flex items-center justify-center gap-3 mx-auto"
                >
                    {loading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
                    {loading ? 'INJECTING_DATA...' : 'RUN_SEEDER_PROTOCOL'}
                </button>

                {msg && (
                    <div className={`mt-6 p-4 rounded font-mono text-xs border ${msg.includes('ERROR') ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-green-500 bg-green-500/10 text-green-500'}`}>
                        {msg}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatabaseSeeder;
