import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Phone, CreditCard } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    document: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar. El correo ya existe.');
    }
  };

  return (
    <Layout showNav={false}>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
              Crea tu cuenta
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              O{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                inicia sesión si ya tienes una
              </Link>
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-xl border border-red-100">{error}</div>}
            
            <div className="space-y-4">
              <div className="relative">
                <Input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="pl-10 py-6"
                />
                <User className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              
              <div className="relative">
                <Input
                  name="document"
                  type="text"
                  required
                  placeholder="Documento de identidad"
                  value={formData.document}
                  onChange={handleChange}
                  className="pl-10 py-6"
                />
                <CreditCard className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="relative">
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 py-6"
                />
                <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="relative">
                <Input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Celular"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 py-6"
                />
                <Phone className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 py-6"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full py-6 text-lg font-semibold shadow-lg shadow-indigo-500/25">
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
