import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, isConfigured } from './firebase';
 
export const SAMPLE = [
  { id: 's1', title: 'Instagram Automation', description: 'Posting, replies and analytics in a single dashboard.', tags: ['Node.js', 'React'], link: '', imageUrl: '', color: '#4d7a0f' },
  { id: 's2', title: 'Desktop AI Assistant', description: 'A voice-controlled assistant that opens apps and gets things done.', tags: ['Python', 'LLM'], link: '', imageUrl: '', color: '#5b35c9' },
  { id: 's3', title: 'Live Translate App', description: 'Real-time translation across 20+ languages, mobile first.', tags: ['Flutter', 'Firebase'], link: '', imageUrl: '', color: '#a8232f' },
];
 
// Firestore ke "projects" collection se live projects. Config/data na ho to SAMPLE dikhata hai.
export function useProjects() {
  const [projects, setProjects] = useState(SAMPLE);
  const [live, setLive] = useState(false);
  useEffect(() => {
    if (!isConfigured) return;
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    return onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (rows.length) { setProjects(rows); setLive(true); }
      },
      (err) => console.warn('Firestore error:', err.message)
    );
  }, []);
  return { projects, live };
}
 