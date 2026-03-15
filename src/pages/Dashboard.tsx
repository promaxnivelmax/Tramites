import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/AuthContext';
import { db, CVData } from '@/lib/mockDb';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Search, FileText, Settings, ExternalLink, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'cvs' | 'settings'>('cvs');
  const [cvs, setCvs] = useState<CVData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setCvs(db.getCVsByUser(user.id));
  }, [user, navigate]);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar esta hoja de vida?')) {
      db.deleteCV(id);
      setCvs(db.getCVsByUser(user!.id));
    }
  };

  const filteredCvs = cvs.filter(cv => 
    cv.personal.names.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.design.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                {user.fullName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 truncate">{user.fullName}</h3>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('cvs')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'cvs' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <FileText className="w-5 h-5" />
                Mis Hojas de Vida
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <Settings className="w-5 h-5" />
                Configuración
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'cvs' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Mis Hojas de Vida</h2>
                  <p className="text-slate-500 text-sm">Gestiona y comparte tus currículums</p>
                </div>
                <Link to="/create-cv">
                  <Button className="gap-2 shadow-lg shadow-indigo-500/25">
                    <Plus className="w-5 h-5" />
                    Crear Hoja de Vida
                  </Button>
                </Link>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <div className="relative mb-6">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input 
                    placeholder="Buscar por nombre o diseño..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {filteredCvs.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <FileText className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No hay hojas de vida</h3>
                    <p className="text-slate-500 mb-6">Aún no has creado ninguna hoja de vida o no coincide con tu búsqueda.</p>
                    <Link to="/create-cv">
                      <Button variant="outline">Crear mi primera CV</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCvs.map(cv => (
                      <div key={cv.id} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-slate-900 text-lg">{cv.personal.names} {cv.personal.surnames}</h4>
                            <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md mt-1 capitalize">
                              Diseño: {cv.design}
                            </span>
                          </div>
                          <button onClick={() => handleDelete(cv.id)} className="text-slate-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-500 mb-4">Creado: {new Date(cv.createdAt).toLocaleDateString()}</p>
                        <div className="flex gap-2">
                          <Link to={`/cv/${cv.id}`} className="flex-1">
                            <Button variant="outline" className="w-full gap-2 text-xs h-9">
                              <ExternalLink className="w-3 h-3" />
                              Ver / Compartir
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <SettingsTab user={user} updateProfile={updateProfile} />
          )}
        </div>
      </div>
    </Layout>
  );
}

function SettingsTab({ user, updateProfile }: { user: any, updateProfile: any }) {
  const [formData, setFormData] = useState({
    dob: user.dob || '',
    email: user.email,
    password: user.password || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    alert('Perfil actualizado correctamente');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Configuración de Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <Input 
          label="Fecha de Nacimiento" 
          type="date" 
          value={formData.dob}
          onChange={e => setFormData({...formData, dob: e.target.value})}
        />
        <Input 
          label="Correo Electrónico" 
          type="email" 
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <Input 
          label="Nueva Contraseña" 
          type="password" 
          placeholder="Dejar en blanco para no cambiar"
          value={formData.password}
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
        <Button type="submit">Guardar Cambios</Button>
      </form>
    </motion.div>
  );
}
