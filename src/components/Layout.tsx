import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { FileText, LogOut, User } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode; showNav?: boolean }> = ({ children, showNav = true }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {showNav && (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
              <FileText className="w-6 h-6" />
              <span>Cv Builder</span>
            </Link>
            <nav className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                    <span className="text-sm font-medium text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <User className="w-4 h-4" />
                      </div>
                      {user.fullName.split(' ')[0]}
                    </span>
                    <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
                    Registrarse
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
      )}
      <main className="flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col"
        >
          {children}
        </motion.div>
      </main>
      {showNav && (
        <footer className="bg-slate-900 text-slate-300 py-12">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-tight mb-4">
                <FileText className="w-6 h-6 text-indigo-400" />
                <span>Cv Builder</span>
              </Link>
              <p className="text-sm text-slate-400 max-w-xs">
                Rápido, fácil, genera pdf y comparte. La mejor herramienta para crear tu hoja de vida profesional.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>Calle 52 A No. 34 H 101 Local 1 Primero de Mayo</li>
                <li>Barrancabermeja, Santander</li>
                <li><a href="mailto:ciber1mayo@gmail.com" className="hover:text-white transition-colors">ciber1mayo@gmail.com</a></li>
                <li>
                  <a href="https://wa.me/573052319414" target="_blank" rel="noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 mt-2">
                    WhatsApp: 3052319414
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Enlaces</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-white transition-colors">Iniciar Sesión</Link></li>
                <li><Link to="/register" className="hover:text-white transition-colors">Registrarse</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
            © {new Date().getFullYear()} Trámites y Servicios. Todos los derechos reservados.
          </div>
        </footer>
      )}
    </div>
  );
};
