import React from 'react';
import { Search, Globe, Users, Trophy } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="flex-1 pt-40 pb-24 px-6 animate-fade-in">
       <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16 px-6">
             <h1 className="text-5xl font-bold mb-6 text-white tracking-tight">À propos de <span className="text-indigo-400">SkyFlow</span></h1>
             <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                Notre mission est d'aider les individus à se concentrer sur l'essentiel en fournissant les meilleurs outils de productivité modernes.
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
             <div className="glass-card p-12 overflow-hidden border-white/5 relative group">
                <div className="absolute top-0 right-0 p-8 text-indigo-500/10 group-hover:scale-125 transition-all duration-500">
                   <Users size={160} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6 relative z-10">L'Humain au cœur de tout</h2>
                <p className="text-white/50 text-lg leading-relaxed relative z-10 mb-6">
                   SkyFlow est né d'un constat simple : les outils de gestion de tâches sont souvent trop complexes ou visuellement monotones. Nous avons voulu créer quelque chose de <span className="text-indigo-300 font-semibold">plus humain</span>.
                </p>
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-1 bg-indigo-500 rounded-full" />
                   <span className="font-bold text-indigo-400 tracking-widest uppercase text-xs">Notre Philosophie</span>
                </div>
             </div>
             
             <div className="space-y-8">
                <StatCard 
                   icon={<Search className="text-emerald-400" />} 
                   title="Transparence Totale" 
                   description="Aucun frais caché, une protection des données complète et une éthique de développement sans compromis."
                />
                <StatCard 
                   icon={<Globe className="text-blue-400" />} 
                   title="Accessibilité Mondiale" 
                   description="Utilisez SkyFlow depuis n'importe où dans le monde, sur n'importe quel appareil."
                />
                <StatCard 
                   icon={<Trophy className="text-amber-400" />} 
                   title="Excellence Design" 
                   description="Chaque pixel est pensé pour offrir une expérience esthétique et fonctionnelle supérieure."
                />
             </div>
          </div>

          <div className="text-center glass-card p-16 py-24 mb-24 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/10 via-transparent to-pink-600/10 -z-10" />
             <h2 className="text-4xl font-bold text-white mb-8">Prêt à changer votre quotidien ?</h2>
             <p className="text-xl text-white/50 mb-8 max-w-2xl mx-auto">
                Plus qu'un simple gestionnaire de tâches, un allié pour votre sérénité digitale.
             </p>
          </div>
       </div>
    </div>
  );
};

const StatCard = ({ icon, title, description }: any) => (
  <div className="flex gap-6 p-6 glass hover:bg-white/5 transition-all rounded-3xl border-white/5 group">
    <div className="bg-white/5 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 h-fit">
      {icon}
    </div>
    <div>
       <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
       <p className="text-white/40 text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

export default About;
