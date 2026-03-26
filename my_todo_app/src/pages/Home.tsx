import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Zap, Layout, Smartphone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex-1 pt-40 pb-24 overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 text-center max-w-4xl relative">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] -z-10 rounded-full" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 text-sm font-medium text-white/60 mb-8 animate-fade-in">
          <Sparkles size={16} className="text-yellow-400" />
          <span>La nouvelle ère de la productivité</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Organisez votre futur avec <span className="text-indigo-400">SkyFlow</span>
        </h1>
        
        <p className="text-xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Une interface épurée, un design glassmorphique premium et une synchronisation instantanée pour gérer vos tâches en toute sérénité.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link 
            to="/auth" 
            className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 active:scale-95 text-lg"
          >
            Commencer maintenant <ArrowRight size={20} />
          </Link>
          <Link 
            to="/about" 
            className="w-full sm:w-auto px-10 py-5 glass-card hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 flex items-center justify-center gap-3 active:scale-95 text-lg"
          >
            En savoir plus
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 mt-40">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="text-indigo-400" />}
            title="Sûreté & Sécurité"
            description="Vos données sont chiffrées et protégées avec les technologies les plus modernes."
            delay="0.4s"
          />
          <FeatureCard 
            icon={<Zap className="text-pink-400" />}
            title="Performance Éclatante"
            description="Pensé pour la rapidité avec une réactivité instantanée pour toutes vos opérations."
            delay="0.5s"
          />
          <FeatureCard 
            icon={<Layout className="text-purple-400" />}
            title="Design Moderne"
            description="Le style glassmorphism professionnel pour une expérience utilisateur premium."
            delay="0.6s"
          />
        </div>
      </section>

      {/* Mobile-First Section preview */}
      <section className="mt-40 bg-indigo-600/5 py-24 border-y border-white/5 relative">
        <div className="container mx-auto px-6 grid md:grid-cols-2 items-center gap-16">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-white mb-6">Emportez vos tâches partout</h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              En plus de la version web, SkyFlow propose une application mobile optimisée pour ne jamais perdre le fil, que vous soyez au bureau ou en déplacement.
            </p>
            <div className="flex items-center gap-4 p-4 glass-card border-white/10 inline-flex">
              <div className="bg-indigo-600/20 p-3 rounded-xl border border-indigo-500/20">
                <Layout size={24} className="text-indigo-400" />
              </div>
              <span className="font-semibold text-white/80">Disponible prochainement</span>
            </div>
          </div>
          <div className="relative animate-float">
             <div className="w-64 h-[500px] mx-auto bg-slate-900 rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-6 bg-slate-800 flex justify-center items-center">
                   <div className="w-16 h-1 bg-slate-700/50 rounded-full" />
                </div>
                <div className="p-6 space-y-4 pt-10">
                   <div className="h-6 w-3/4 bg-white/10 rounded-md" />
                   <div className="h-20 w-full glass-card rounded-xl" />
                   <div className="h-20 w-full glass-card rounded-xl" />
                   <div className="h-20 w-full glass-card rounded-xl" />
                </div>
             </div>
             <div className="absolute top-20 -right-10 w-40 h-40 bg-pink-500/10 blur-3xl -z-10" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }: any) => (
  <div className="glass-card p-10 hover:border-white/20 transition-all group animate-fade-in" style={{ animationDelay: delay }}>
    <div className="bg-white/5 p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-white/40 leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

export default Home;
