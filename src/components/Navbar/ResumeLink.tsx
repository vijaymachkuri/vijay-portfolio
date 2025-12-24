import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

const ResumeLink: React.FC = () => {
    const [resumeUrl, setResumeUrl] = useState<string>('/resume.pdf');

    useEffect(() => {
        const fetchResume = async () => {
            const { data } = await supabase.from('profiles').select('resume_url').single();
            if (data?.resume_url) {
                setResumeUrl(data.resume_url);
            }
        };
        fetchResume();
    }, []);

    return (
        <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-nth-red hover:text-nth-white transition-colors uppercase tracking-wider"
        >
            <Download size={14} />
            Resume
        </a>
    );
};

export default ResumeLink;
