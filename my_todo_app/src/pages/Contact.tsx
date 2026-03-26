import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simuler un envoi
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="flex-1 pt-40 pb-24 px-6 animate-fade-in">
       <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 px-6">
             <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">On reste en <span className="text-indigo-400">contact</span> ?</h1>
             <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                Une question, un retour ou simplement pour dire bonjour. Notre équipe est à votre écoute.
             </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 items-start">
             {/* Info Panel */}
             <div className="md:col-span-2 space-y-6">
                <div className="glass-card p-10 border-white/5 space-y-8">
                   <h2 className="text-2xl font-bold text-white mb-2">Informations</h2>
                   <ContactInfo icon={<Mail className="text-indigo-400" />} label="Email" value="hello@skyflow.app" />
                   <ContactInfo icon={<Phone className="text-indigo-400" />} label="Téléphone" value="+33 1 23 45 67 89" />
                   <ContactInfo icon={<MapPin className="text-indigo-400" />} label="Bureaux" value="Place de l'Innovation, 75000 Paris" />
                   
                   <div className="pt-8 border-t border-white/5">
                      <p className="text-white/40 text-sm mb-4 font-medium uppercase tracking-[0.2em]">Réseaux Sociaux</p>
                      <div className="flex gap-4">
                         {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-all cursor-pointer">
                               <div className="w-4 h-4 bg-white/20 rounded-sm" />
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* Form Panel */}
             <div className="md:col-span-3">
                <form onSubmit={handleSubmit} className="glass-card p-10 border-white/5 space-y-6 relative overflow-hidden">
                   {submitted && (
                      <div className="absolute inset-0 bg-indigo-950/90 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in z-20">
                         <div className="bg-green-500/20 p-4 rounded-full mb-4">
                            <CheckCircle2 size={48} className="text-green-400" />
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-2">Message envoyé !</h3>
                         <p className="text-white/60">On vous répond très vite (promis).</p>
                      </div>
                   )}

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Nom Complet</label>
                         <input type="text" placeholder="Jean Dupont" className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm" required />
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Email</label>
                         <input type="email" placeholder="jean@email.com" className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm" required />
                      </div>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Sujet</label>
                      <select className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm appearance-none cursor-pointer">
                         <option>Support Technique</option>
                         <option>Partenariat</option>
                         <option>Bug Report</option>
                         <option>Autre</option>
                      </select>
                   </div>

                   <div className="space-y-2">
                      <label className="text-xs font-bold text-white/30 uppercase tracking-widest ml-1">Message</label>
                      <textarea rows={6} placeholder="Votre message..." className="w-full glass-input rounded-2xl px-6 py-4 outline-none text-white text-sm resize-none" required />
                   </div>

                   <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                      Envoyer le message <Send size={20} />
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

const ContactInfo = ({ icon, label, value }: any) => (
  <div className="flex gap-4">
     <div className="bg-indigo-600/10 p-3 rounded-xl border border-indigo-500/10 h-fit">
        {icon}
     </div>
     <div>
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-white/80 font-medium">{value}</p>
     </div>
  </div>
);

export default Contact;
