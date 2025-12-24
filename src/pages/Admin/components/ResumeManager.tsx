import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
    onBack: () => void;
}

const ResumeManager: React.FC<Props> = ({ onBack }) => {
    const [resumeUrl, setResumeUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchResume();
    }, []);

    const fetchResume = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('profiles').select('resume_url').eq('id', user.id).single();
            if (data?.resume_url) setResumeUrl(data.resume_url);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setMsg('');
            if (!e.target.files || e.target.files.length === 0) {
                setUploading(false);
                return;
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `resume-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage.from('documents').upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(filePath);

            // 3. Update Profile with URL
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ resume_url: publicUrl })
                    .eq('id', user.id);

                if (updateError) throw updateError;

                setResumeUrl(publicUrl);
                setMsg('SUCCESS: Resume uploaded and linked.');
            }

        } catch (error: any) {
            setMsg(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Delete current resume link? This does not delete the file from storage (manual cleanup required safely) but removes the link.')) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase.from('profiles').update({ resume_url: null }).eq('id', user.id);
            setResumeUrl('');
            setMsg('Link removed.');
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3">
                    <span className="text-red-500">//</span> RESUME_CONTROLLER
                </h2>
                <button onClick={onBack} className="text-xs font-mono border border-gray-700 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
                    &larr; RETURN_ROOT
                </button>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 p-8 rounded max-w-2xl mx-auto text-center space-y-6">
                <div className="w-20 h-20 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                </div>

                <h3 className="text-white font-mono text-xl">CURRENT_RESUME_STATUS</h3>

                {resumeUrl ? (
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded inline-block text-center">
                        <p className="text-green-500 font-mono text-xs mb-2">ACTIVE FILE DETECTED</p>
                        <a href={resumeUrl} target="_blank" rel="noreferrer" className="text-white underline font-mono text-sm break-all">{resumeUrl}</a>
                        <div className="mt-4">
                            <button onClick={handleDelete} className="text-red-500 hover:text-white text-xs font-mono border border-red-500/50 px-3 py-1 bg-red-500/10 hover:bg-red-500 transition-all">UNLINK_FILE</button>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded inline-block">
                        <p className="text-red-500 font-mono text-xs">NO FILE LINKED TO PROFILE</p>
                    </div>
                )}

                <div className="pt-8 border-t border-gray-800 mt-8">
                    <label className="block text-gray-500 text-xs font-mono mb-4 uppercase tracking-widest">Upload New Revision (PDF Only)</label>
                    <label className={`cursor-pointer bg-white text-black font-bold py-3 px-8 font-mono hover:bg-red-500 hover:text-white transition-all uppercase inline-block ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {uploading ? 'UPLOADING...' : 'SELECT_FILE'}
                        <input type="file" accept=".pdf" onChange={handleUpload} disabled={uploading} className="hidden" />
                    </label>
                    {msg && <p className="text-xs font-mono mt-4 text-gray-400">{msg}</p>}
                </div>
            </div>
        </div>
    );
};

export default ResumeManager;
