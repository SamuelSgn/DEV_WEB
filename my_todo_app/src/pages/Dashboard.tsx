import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  ClipboardList, 
  FileText,
  Calendar,
  Clock,
  ChevronRight,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: string;
  dueTime: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'todos' | 'notes'>('todos');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueTime: '' });
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'todos') {
        const res = await api.get('/todos');
        setTodos(res.data);
      } else {
        const res = await api.get('/notes');
        setNotes(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/todos', { ...newTodo, status: 'pending' });
      setNewTodo({ title: '', description: '', dueTime: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/notes', newNote);
      setNewNote({ title: '', content: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTodo = async (todo: Todo) => {
    try {
      const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
      await api.put(`/todos/${todo.id}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex-1 pt-32 pb-24 px-6 animate-fade-in relative z-10">
      <div className="container mx-auto max-w-6xl">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
           <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bonjour, {user?.name || 'Utilisateur'} !</h1>
              <p className="text-white/40 font-medium">Bonne gestion de vos priorités aujourd'hui.</p>
           </div>
           <div className="flex items-center gap-3 p-1.5 glass-card border-white/5 bg-white/5 rounded-2xl">
              <button 
                 onClick={() => setActiveTab('todos')}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'todos' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                 <ClipboardList size={18} /> Tâches
              </button>
              <button 
                 onClick={() => setActiveTab('notes')}
                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'notes' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
              >
                 <FileText size={18} /> Notes
              </button>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
           {/* Form Section */}
           <div className="glass-card p-8 border-white/5 relative overflow-hidden h-fit animate-fade-in">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-600/50" />
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold text-white">Ajouter un élément</h2>
                 <div className="bg-indigo-600/20 p-2 rounded-xl border border-indigo-500/20">
                    <PlusSquare size={20} className="text-indigo-400" />
                 </div>
              </div>

              {activeTab === 'todos' ? (
                <form onSubmit={handleAddTodo} className="space-y-6">
                  <InputGroup 
                    label="Titre de la tâche" 
                    placeholder="Quoi de neuf ?" 
                    value={newTodo.title}
                    onChange={(v: string) => setNewTodo({...newTodo, title: v})}
                  />
                  <InputGroup 
                    label="Échéance" 
                    type="datetime-local" 
                    value={newTodo.dueTime}
                    onChange={(v: string) => setNewTodo({...newTodo, dueTime: v})}
                  />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Déscription</label>
                    <textarea 
                       value={newTodo.description}
                       onChange={e => setNewTodo({...newTodo, description: e.target.value})}
                       placeholder="Détails (Optionnel)"
                       className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm resize-none h-24"
                    />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                     Créer la tâche <ChevronRight size={18} />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAddNote} className="space-y-6">
                  <InputGroup 
                    label="Titre de la note" 
                    placeholder="Une idée géniale ?" 
                    value={newNote.title}
                    onChange={(v: string) => setNewNote({...newNote, title: v})}
                  />
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Contenu</label>
                    <textarea 
                       value={newNote.content}
                       onChange={e => setNewNote({...newNote, content: e.target.value})}
                       placeholder="Écrivez ici..."
                       className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm resize-none h-48"
                       required
                    />
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3">
                     Enregistrer la note <ChevronRight size={18} />
                  </button>
                </form>
              )}
           </div>

           {/* List Section */}
           <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="glass-card p-12 text-center text-white/40 animate-pulse">Chargement intelligent...</div>
              ) : (
                <>
                  {activeTab === 'todos' ? (
                    todos.length > 0 ? (
                      todos.map((todo) => (
                        <TodoItem 
                          key={todo.id} 
                          todo={todo} 
                          onToggle={() => toggleTodo(todo)} 
                          onDelete={() => deleteTodo(todo.id)} 
                        />
                      ))
                    ) : (
                      <EmptyState icon={<LayoutDashboard size={48} />} title="Liste de tâches vide" description="Commencez par ajouter votre première priorité dans le panneau de gauche." />
                    )
                  ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                      {notes.length > 0 ? (
                        notes.map((note) => (
                          <NoteItem 
                            key={note.id} 
                            note={note} 
                            onDelete={() => deleteNote(note.id)} 
                          />
                        ))
                      ) : (
                        <div className="col-span-2">
                           <EmptyState icon={<FileText size={48} />} title="Zéro Note" description="Vos meilleures idées commencent toujours par une page blanche." />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, type = 'text', placeholder, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm"
      required
    />
  </div>
);

const TodoItem = ({ todo, onToggle, onDelete }: any) => (
  <div className="glass-card p-6 border-white/5 flex items-start gap-6 group hover:border-white/10 transition-all">
    <button 
       onClick={onToggle}
       className={`mt-1 transition-all ${todo.status === 'completed' ? 'text-indigo-400 scale-110' : 'text-white/20 hover:text-white/40'}`}
    >
       {todo.status === 'completed' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
    </button>
    <div className="flex-1">
       <h3 className={`text-lg font-bold transition-all ${todo.status === 'completed' ? 'text-white/30 line-through' : 'text-white'}`}>
          {todo.title}
       </h3>
       {todo.description && <p className="text-white/40 text-sm mt-1">{todo.description}</p>}
       <div className="flex items-center gap-6 mt-4">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 px-2.5 py-1 bg-indigo-600/10 rounded-lg border border-indigo-500/10 uppercase tracking-widest">
             <Calendar size={12} /> {new Date(todo.dueTime).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-400 px-2.5 py-1 bg-indigo-600/10 rounded-lg border border-indigo-500/10 uppercase tracking-widest">
             <Clock size={12} /> {new Date(todo.dueTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </div>
       </div>
    </div>
    <button 
       onClick={onDelete}
       className="p-2 text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all h-fit"
    >
       <Trash2 size={20} />
    </button>
  </div>
);

const NoteItem = ({ note, onDelete }: any) => (
  <div className="glass-card p-6 border-white/5 flex flex-col gap-4 group hover:border-white/10 transition-all relative overflow-hidden h-fit">
     <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all">
        <button onClick={onDelete} className="text-white/20 hover:text-red-500 transition-colors">
           <Trash2 size={18} />
        </button>
     </div>
     <h3 className="text-lg font-bold text-indigo-100 pr-8">{note.title}</h3>
     <p className="text-white/40 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
     <div className="pt-4 border-t border-white/5 text-[9px] font-bold text-white/20 uppercase tracking-widest">
        Crée le {new Date(note.createdAt).toLocaleString()}
     </div>
  </div>
);

const EmptyState = ({ icon, title, description }: any) => (
  <div className="glass-card p-16 py-24 text-center border-dashed border-white/10 flex flex-col items-center">
     <div className="text-indigo-400/20 mb-6">{icon}</div>
     <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
     <p className="text-white/30 max-w-sm">{description}</p>
  </div>
);

const PlusSquare = ({ size, className }: any) => (
  <PlusCircle size={size} className={className} />
);

export default Dashboard;
