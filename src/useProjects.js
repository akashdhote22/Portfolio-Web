import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, isConfigured } from './firebase';
 
export const SAMPLE = [
  {
    id: 's1',
    title: 'College Management System',
    description: 'A platform to manage students, teachers, attendance, and results.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '',
    imageUrl: '',
    color: '#4d7a0f'
  },
  {
    id: 's2',
    title: 'Smart Face Attendance',
    description: 'An AI-based system for automatic student attendance using face recognition.',
    tags: ['Python', 'OpenCV', 'AI/ML'],
    link: '',
    imageUrl: '',
    color: '#5b35c9'
  },
  {
    id: 's3',
    title: 'Anonymous Chat Application',
    description: 'A real-time platform for anonymous, topic-based group discussions.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '',
    imageUrl: '',
    color: '#a8232f'
  },
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
 