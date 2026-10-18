import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db, isConfigured } from './firebase';
import { Button, Eyebrow, H2 } from './ui';
import { C } from './theme';
 
const EMPTY = { title: '', description: '', tags: '', link: '', imageUrl: '', color: '#5b35c9', order: '1' };
 
function Field({ label, value, onChange, multiline }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput value={value} onChangeText={onChange} multiline={multiline} placeholderTextColor={C.mute}
        autoCapitalize="none" style={[s.input, multiline && { minHeight: 80, textAlignVertical: 'top' }]} />
    </View>
  );
}
 
export default function Admin({ onBack }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [msg, setMsg] = useState('');
 
  useEffect(() => (isConfigured ? onAuthStateChanged(auth, setUser) : undefined), []);
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    return onSnapshot(q, (snap) => setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), (e) => setErr(e.message));
  }, [user]);
 
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const login = async () => {
    setErr('');
    try { await signInWithEmailAndPassword(auth, email.trim(), pass); } catch (e) { setErr('Login failed: ' + e.code); }
  };
  const save = async () => {
    if (!form.title.trim()) { setErr('Title is required.'); return; }
    setErr('');
    const data = {
      title: form.title.trim(), description: form.description.trim(), link: form.link.trim(), imageUrl: form.imageUrl.trim(),
      color: form.color.trim() || '#5b35c9', order: Number(form.order) || 1,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };
    try {
      if (editId) await updateDoc(doc(db, 'projects', editId), data);
      else await addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() });
      setMsg(editId ? 'Project updated.' : 'Project added.');
      setForm({ ...EMPTY, order: String(rows.length + 2) }); setEditId(null);
    } catch (e) { setErr('Could not save: ' + e.message); }
  };
  const edit = (p) => {
    setEditId(p.id); setMsg('');
    setForm({ title: p.title || '', description: p.description || '', tags: (p.tags || []).join(', '), link: p.link || '', imageUrl: p.imageUrl || '', color: p.color || '#5b35c9', order: String(p.order ?? 1) });
  };
  const remove = async (id) => {
    if (confirmId !== id) { setConfirmId(id); return; } // pehla tap = confirm, doosra tap = delete
    try { await deleteDoc(doc(db, 'projects', id)); setConfirmId(null); } catch (e) { setErr(e.message); }
  };
 
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.ink }} contentContainerStyle={s.page}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Eyebrow>Admin panel</Eyebrow>
        <Button label="← Portfolio" ghost onPress={onBack} />
      </View>
      <H2 size={56} accent="projects">Manage</H2>
 
      {!isConfigured ? (
        <Text style={s.note}>Firebase is not connected yet. Paste your config into src/firebase.js, then login will work here.</Text>
      ) : !user ? (
        <View style={{ gap: 16, marginTop: 28 }}>
          <Field label="EMAIL" value={email} onChange={setEmail} />
          <View style={{ gap: 6 }}>
            <Text style={s.label}>PASSWORD</Text>
            <TextInput value={pass} onChangeText={setPass} secureTextEntry style={s.input} onSubmitEditing={login} />
          </View>
          <Button label="Login" onPress={login} />
        </View>
      ) : (
        <View style={{ gap: 28, marginTop: 28 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={s.mute}>Login: {user.email}</Text>
            <Button label="Logout" ghost onPress={() => signOut(auth)} />
          </View>
 
          <View style={s.box}>
            <Text style={s.boxT}>{editId ? 'EDIT PROJECT' : 'NEW PROJECT'}</Text>
            <Field label="TITLE" value={form.title} onChange={set('title')} />
            <Field label="DESCRIPTION" value={form.description} onChange={set('description')} multiline />
            <Field label="TAGS (comma separated)" value={form.tags} onChange={set('tags')} />
            <Field label="LINK (live site / GitHub)" value={form.link} onChange={set('link')} />
            <Field label="IMAGE URL (optional)" value={form.imageUrl} onChange={set('imageUrl')} />
            <Field label="CARD COLOR (hex)" value={form.color} onChange={set('color')} />
            <Field label="ORDER (1 shows first)" value={form.order} onChange={set('order')} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button label={editId ? 'Update' : 'Add project'} onPress={save} />
              {editId ? <Button label="Cancel" ghost onPress={() => { setEditId(null); setForm(EMPTY); }} /> : null}
            </View>
          </View>
 
          <View style={{ gap: 12 }}>
            <Text style={s.boxT}>MY PROJECTS ({rows.length})</Text>
            {rows.length === 0 ? <Text style={s.mute}>No projects yet. Add your first one above and it will appear on the portfolio right away.</Text> : null}
            {rows.map((p) => (
              <View key={p.id} style={s.item}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Text style={{ color: C.paper, fontWeight: '700' }}>{p.order}. {p.title}</Text>
                  <Text style={s.mute} numberOfLines={2}>{p.description}</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Button label="Edit" ghost onPress={() => edit(p)} />
                  <Button label={confirmId === p.id ? 'Confirm delete?' : 'Delete'} danger={confirmId === p.id} ghost={confirmId !== p.id} onPress={() => remove(p.id)} />
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      {msg ? <Text style={{ color: C.lime, marginTop: 16 }}>{msg}</Text> : null}
      {err ? <Text style={{ color: C.danger, marginTop: 16 }}>{err}</Text> : null}
    </ScrollView>
  );
}
 
const s = StyleSheet.create({
  page: { padding: 20, maxWidth: 760, width: '100%', alignSelf: 'center', paddingBottom: 80 },
  note: { color: C.mute, marginTop: 24, lineHeight: 22 },
  mute: { color: C.mute, fontSize: 14, lineHeight: 20 },
  label: { color: C.mute, fontSize: 11, letterSpacing: 1.5 },
  input: { backgroundColor: C.ink2, color: C.paper, borderWidth: 1, borderColor: C.line, borderRadius: 12, padding: 12, fontSize: 16 },
  box: { borderWidth: 1, borderColor: C.line, borderRadius: 18, padding: 20, gap: 14, backgroundColor: C.ink2 },
  boxT: { color: C.lime, letterSpacing: 2, fontSize: 12, fontWeight: '700' },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: C.line, borderRadius: 14, padding: 14, flexWrap: 'wrap' },
});
 