import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/lib/AuthContext';
import { db, CVData, CVDesign, FormalStudy, ComplementaryStudy, Experience, Reference } from '@/lib/mockDb';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Plus, Trash2, CheckCircle2 } from 'lucide-react';

const steps = [
  'Diseño',
  'Datos Personales',
  'Estudios Formales',
  'Estudios Complementarios',
  'Experiencia',
  'Referencias'
];

export default function CreateCV() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<Partial<CVData>>({
    userId: user?.id,
    design: 'masculino',
    personal: {
      names: user?.fullName.split(' ')[0] || '',
      surnames: user?.fullName.split(' ').slice(1).join(' ') || '',
      docType: 'CC',
      document: user?.document || '',
      docIssuePlace: '',
      dob: user?.dob || '',
      birthPlace: '',
      maritalStatus: 'Soltero(a)',
      phone: user?.phone || '',
      email: user?.email || '',
      address: '',
      neighborhood: '',
      city: ''
    },
    hasFormalStudies: false,
    formalStudies: [],
    hasComplementaryStudies: false,
    complementaryStudies: [],
    hasExperience: false,
    experiences: [],
    hasReferences: false,
    references: []
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    else handleSubmit();
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    const newCV = db.createCV(formData as Omit<CVData, 'id' | 'createdAt'>);
    navigate(`/cv/${newCV.id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-600 rounded-full z-0 transition-all duration-500"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            
            {steps.map((step, index) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${
                    index <= currentStep ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {index < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block absolute top-12 whitespace-nowrap ${index <= currentStep ? 'text-indigo-900' : 'text-slate-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 min-h-[500px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {currentStep === 0 && <StepDesign formData={formData} setFormData={setFormData} />}
              {currentStep === 1 && <StepPersonal formData={formData} setFormData={setFormData} />}
              {currentStep === 2 && <StepFormalStudies formData={formData} setFormData={setFormData} />}
              {currentStep === 3 && <StepComplementaryStudies formData={formData} setFormData={setFormData} />}
              {currentStep === 4 && <StepExperience formData={formData} setFormData={setFormData} />}
              {currentStep === 5 && <StepReferences formData={formData} setFormData={setFormData} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </Button>
            <Button 
              onClick={handleNext}
              className="gap-2 shadow-lg shadow-indigo-500/25"
            >
              {currentStep === steps.length - 1 ? 'Finalizar y Ver CV' : 'Siguiente'} <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// --- Steps Components ---

function StepDesign({ formData, setFormData }: any) {
  const designs = [
    { id: 'masculino', name: 'Masculino', desc: 'Tonos oscuros, estructurado y profesional.' },
    { id: 'femenino', name: 'Femenino', desc: 'Tonos suaves, elegante y moderno.' },
    { id: 'ats', name: 'ATS', desc: 'Minimalista, optimizado para sistemas de selección.' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Elige un Diseño</h2>
        <p className="text-slate-500">Selecciona la plantilla que mejor se adapte a tu perfil.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {designs.map(d => (
          <div 
            key={d.id}
            onClick={() => setFormData({ ...formData, design: d.id })}
            className={`cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
              formData.design === d.id 
                ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100' 
                : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center ${
              formData.design === d.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {formData.design === d.id && <CheckCircle2 className="w-6 h-6" />}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{d.name}</h3>
            <p className="text-sm text-slate-600">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepPersonal({ formData, setFormData }: any) {
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      personal: { ...formData.personal, [e.target.name]: e.target.value }
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Datos Personales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Nombres" name="names" value={formData.personal.names} onChange={handleChange} required />
        <Input label="Apellidos" name="surnames" value={formData.personal.surnames} onChange={handleChange} required />
        <Select 
          label="Tipo de Documento" 
          name="docType" 
          value={formData.personal.docType} 
          onChange={handleChange}
          options={[
            { value: 'CC', label: 'Cédula de Ciudadanía' },
            { value: 'CE', label: 'Cédula de Extranjería' },
            { value: 'TI', label: 'Tarjeta de Identidad' },
            { value: 'PAS', label: 'Pasaporte' }
          ]}
        />
        <Input label="Número de Documento" name="document" value={formData.personal.document} onChange={handleChange} required />
        <Input label="Lugar de Expedición" name="docIssuePlace" value={formData.personal.docIssuePlace} onChange={handleChange} />
        <Input label="Fecha de Nacimiento" type="date" name="dob" value={formData.personal.dob} onChange={handleChange} />
        <Input label="Lugar de Nacimiento" name="birthPlace" value={formData.personal.birthPlace} onChange={handleChange} />
        <Select 
          label="Estado Civil" 
          name="maritalStatus" 
          value={formData.personal.maritalStatus} 
          onChange={handleChange}
          options={[
            { value: 'Soltero(a)', label: 'Soltero(a)' },
            { value: 'Casado(a)', label: 'Casado(a)' },
            { value: 'Unión Libre', label: 'Unión Libre' },
            { value: 'Divorciado(a)', label: 'Divorciado(a)' },
            { value: 'Viudo(a)', label: 'Viudo(a)' }
          ]}
        />
        <Input label="Celular" name="phone" value={formData.personal.phone} onChange={handleChange} required />
        <Input label="Correo Electrónico" type="email" name="email" value={formData.personal.email} onChange={handleChange} required />
        <Input label="Dirección" name="address" value={formData.personal.address} onChange={handleChange} />
        <Input label="Barrio" name="neighborhood" value={formData.personal.neighborhood} onChange={handleChange} />
        <Input label="Ciudad" name="city" value={formData.personal.city} onChange={handleChange} />
      </div>
    </div>
  );
}

function StepFormalStudies({ formData, setFormData }: any) {
  const [study, setStudy] = useState<Partial<FormalStudy>>({
    institute: '', type: 'Profesional', degree: '', endDate: '', city: ''
  });

  const handleAdd = () => {
    if (!study.institute || !study.degree) return;
    setFormData({
      ...formData,
      formalStudies: [...formData.formalStudies, { ...study, id: Date.now().toString() }]
    });
    setStudy({ institute: '', type: 'Profesional', degree: '', endDate: '', city: '' });
  };

  const handleRemove = (id: string) => {
    setFormData({
      ...formData,
      formalStudies: formData.formalStudies.filter((s: any) => s.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Estudios Formales</h2>
      
      <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="font-medium text-slate-700">¿Tienes estudios formales para agregar?</span>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant={formData.hasFormalStudies ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, hasFormalStudies: true })}
          >Sí</Button>
          <Button 
            size="sm" 
            variant={!formData.hasFormalStudies ? 'primary' : 'outline'}
            onClick={() => setFormData({ ...formData, hasFormalStudies: false, formalStudies: [] })}
          >No</Button>
        </div>
      </div>

      {formData.hasFormalStudies && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <Input label="Nombre Instituto" value={study.institute} onChange={e => setStudy({...study, institute: e.target.value})} />
            <Select 
              label="Tipo de Estudio" 
              value={study.type} 
              onChange={e => setStudy({...study, type: e.target.value})}
              options={[
                { value: 'Básica Primaria', label: 'Básica Primaria' },
                { value: 'Secundaria', label: 'Secundaria' },
                { value: 'Técnico', label: 'Técnico' },
                { value: 'Tecnólogo', label: 'Tecnólogo' },
                { value: 'Profesional', label: 'Profesional' },
                { value: 'Especialista', label: 'Especialista' },
                { value: 'Magíster', label: 'Magíster' }
              ]}
            />
            <Input label="Título Obtenido" value={study.degree} onChange={e => setStudy({...study, degree: e.target.value})} />
            <Input label="Fecha Terminación" type="date" value={study.endDate} onChange={e => setStudy({...study, endDate: e.target.value})} />
            <Input label="Ciudad" value={study.city} onChange={e => setStudy({...study, city: e.target.value})} />
            <div className="flex items-end">
              <Button onClick={handleAdd} className="w-full gap-2"><Plus className="w-4 h-4" /> Agregar Estudio</Button>
            </div>
          </div>

          <div className="space-y-3">
            {formData.formalStudies.map((s: any) => (
              <div key={s.id} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-900">{s.degree}</h4>
                  <p className="text-sm text-slate-500">{s.institute} - {s.type} ({s.endDate})</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemove(s.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StepComplementaryStudies({ formData, setFormData }: any) {
  const [study, setStudy] = useState<Partial<ComplementaryStudy>>({ institute: '', degree: '' });

  const handleAdd = () => {
    if (!study.institute || !study.degree) return;
    setFormData({
      ...formData,
      complementaryStudies: [...formData.complementaryStudies, { ...study, id: Date.now().toString() }]
    });
    setStudy({ institute: '', degree: '' });
  };

  const handleRemove = (id: string) => {
    setFormData({
      ...formData,
      complementaryStudies: formData.complementaryStudies.filter((s: any) => s.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Estudios Complementarios</h2>
      
      <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="font-medium text-slate-700">¿Tienes diplomados, talleres o cursos?</span>
        <div className="flex gap-2">
          <Button size="sm" variant={formData.hasComplementaryStudies ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasComplementaryStudies: true })}>Sí</Button>
          <Button size="sm" variant={!formData.hasComplementaryStudies ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasComplementaryStudies: false, complementaryStudies: [] })}>No</Button>
        </div>
      </div>

      {formData.hasComplementaryStudies && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            <Input label="Nombre Institución" value={study.institute} onChange={e => setStudy({...study, institute: e.target.value})} />
            <Input label="Título Obtenido" value={study.degree} onChange={e => setStudy({...study, degree: e.target.value})} />
            <div className="md:col-span-2">
              <Button onClick={handleAdd} className="w-full gap-2"><Plus className="w-4 h-4" /> Agregar Estudio</Button>
            </div>
          </div>

          <div className="space-y-3">
            {formData.complementaryStudies.map((s: any) => (
              <div key={s.id} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-900">{s.degree}</h4>
                  <p className="text-sm text-slate-500">{s.institute}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemove(s.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StepExperience({ formData, setFormData }: any) {
  const [exp, setExp] = useState<Partial<Experience>>({ company: '', position: '', startDate: '', endDate: '', city: '' });

  const handleAdd = () => {
    if (!exp.company || !exp.position || formData.experiences.length >= 4) return;
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { ...exp, id: Date.now().toString() }]
    });
    setExp({ company: '', position: '', startDate: '', endDate: '', city: '' });
  };

  const handleRemove = (id: string) => {
    setFormData({
      ...formData,
      experiences: formData.experiences.filter((e: any) => e.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Experiencia Laboral</h2>
      
      <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="font-medium text-slate-700">¿Tienes experiencia laboral? (Máx. 4)</span>
        <div className="flex gap-2">
          <Button size="sm" variant={formData.hasExperience ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasExperience: true })}>Sí</Button>
          <Button size="sm" variant={!formData.hasExperience ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasExperience: false, experiences: [] })}>No</Button>
        </div>
      </div>

      {formData.hasExperience && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
          {formData.experiences.length < 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
              <Input label="Nombre Empresa" value={exp.company} onChange={e => setExp({...exp, company: e.target.value})} />
              <Input label="Cargo" value={exp.position} onChange={e => setExp({...exp, position: e.target.value})} />
              <Input label="Fecha Ingreso" type="date" value={exp.startDate} onChange={e => setExp({...exp, startDate: e.target.value})} />
              <Input label="Fecha Salida" type="date" value={exp.endDate} onChange={e => setExp({...exp, endDate: e.target.value})} />
              <Input label="Ciudad" value={exp.city} onChange={e => setExp({...exp, city: e.target.value})} />
              <div className="flex items-end">
                <Button onClick={handleAdd} className="w-full gap-2"><Plus className="w-4 h-4" /> Agregar Experiencia</Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {formData.experiences.map((e: any) => (
              <div key={e.id} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-900">{e.position} en {e.company}</h4>
                  <p className="text-sm text-slate-500">{e.startDate} - {e.endDate} | {e.city}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemove(e.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StepReferences({ formData, setFormData }: any) {
  const [ref, setRef] = useState<Partial<Reference>>({ name: '', type: 'Personal', phone: '', city: '' });

  const handleAdd = () => {
    if (!ref.name || !ref.phone || formData.references.length >= 4) return;
    setFormData({
      ...formData,
      references: [...formData.references, { ...ref, id: Date.now().toString() }]
    });
    setRef({ name: '', type: 'Personal', phone: '', city: '' });
  };

  const handleRemove = (id: string) => {
    setFormData({
      ...formData,
      references: formData.references.filter((r: any) => r.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Referencias</h2>
      
      <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <span className="font-medium text-slate-700">¿Tienes referencias para agregar? (Máx. 4)</span>
        <div className="flex gap-2">
          <Button size="sm" variant={formData.hasReferences ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasReferences: true })}>Sí</Button>
          <Button size="sm" variant={!formData.hasReferences ? 'primary' : 'outline'} onClick={() => setFormData({ ...formData, hasReferences: false, references: [] })}>No</Button>
        </div>
      </div>

      {formData.hasReferences && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-6">
          {formData.references.length < 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
              <Input label="Nombre" value={ref.name} onChange={e => setRef({...ref, name: e.target.value})} />
              <Select 
                label="Tipo" 
                value={ref.type} 
                onChange={e => setRef({...ref, type: e.target.value as any})}
                options={[
                  { value: 'Familiar', label: 'Familiar' },
                  { value: 'Personal', label: 'Personal' }
                ]}
              />
              <Input label="Celular" value={ref.phone} onChange={e => setRef({...ref, phone: e.target.value})} />
              <Input label="Ciudad" value={ref.city} onChange={e => setRef({...ref, city: e.target.value})} />
              <div className="md:col-span-2">
                <Button onClick={handleAdd} className="w-full gap-2"><Plus className="w-4 h-4" /> Agregar Referencia</Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {formData.references.map((r: any) => (
              <div key={r.id} className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <div>
                  <h4 className="font-bold text-slate-900">{r.name}</h4>
                  <p className="text-sm text-slate-500">{r.type} | {r.phone} | {r.city}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemove(r.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
