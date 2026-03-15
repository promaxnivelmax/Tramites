import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db, CVData } from '@/lib/mockDb';
import { Button } from '@/components/ui/Button';
import { useReactToPrint } from 'react-to-print';
import { Layout } from '@/components/Layout';
import { Download, ArrowLeft, Share2, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, Users, User } from 'lucide-react';

export default function ViewCV() {
  const { id } = useParams<{ id: string }>();
  const [cv, setCv] = useState<CVData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const data = db.getCVById(id);
      if (data) setCv(data);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: cv ? `CV_${cv.personal.names}_${cv.personal.surnames}` : 'CV',
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Enlace copiado al portapapeles');
  };

  if (!cv) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Hoja de vida no encontrada</h2>
          <Link to="/dashboard">
            <Button>Volver al Dashboard</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={false}>
      <div className="bg-slate-100 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 sticky top-4 z-50">
            <Link to="/dashboard">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Volver
              </Button>
            </Link>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" /> Compartir Link
              </Button>
              <Button onClick={() => handlePrint()} className="gap-2 shadow-lg shadow-indigo-500/25">
                <Download className="w-4 h-4" /> Descargar PDF
              </Button>
            </div>
          </div>

          {/* CV Container */}
          <div className="bg-white shadow-2xl mx-auto overflow-hidden" style={{ width: '210mm', minHeight: '297mm' }}>
            <div ref={componentRef} className="h-full bg-white print:w-[210mm] print:h-[297mm] print:m-0 print:p-0">
              {cv.design === 'masculino' && <MasculinoDesign cv={cv} />}
              {cv.design === 'femenino' && <FemeninoDesign cv={cv} />}
              {cv.design === 'ats' && <ATSDesign cv={cv} />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// --- Designs ---

function MasculinoDesign({ cv }: { cv: CVData }) {
  return (
    <div className="flex h-full min-h-[297mm]">
      {/* Sidebar */}
      <div className="w-1/3 bg-slate-900 text-slate-300 p-8">
        <div className="w-32 h-32 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-slate-500 border-4 border-slate-700">
          {cv.personal.names.charAt(0)}{cv.personal.surnames.charAt(0)}
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider border-b border-slate-700 pb-2 mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-400" /> {cv.personal.phone}</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-400" /> <span className="break-all">{cv.personal.email}</span></li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-400" /> {cv.personal.address}, {cv.personal.city}</li>
              <li className="flex items-center gap-3"><Calendar className="w-4 h-4 text-indigo-400" /> {cv.personal.dob}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider border-b border-slate-700 pb-2 mb-4">Perfil</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-500">Documento:</span> {cv.personal.docType} {cv.personal.document}</li>
              <li><span className="text-slate-500">Expedición:</span> {cv.personal.docIssuePlace}</li>
              <li><span className="text-slate-500">Lugar Nac.:</span> {cv.personal.birthPlace}</li>
              <li><span className="text-slate-500">Estado Civil:</span> {cv.personal.maritalStatus}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-10 bg-white">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-2">{cv.personal.names}</h1>
          <h1 className="text-4xl font-light text-slate-600 uppercase tracking-tight">{cv.personal.surnames}</h1>
        </div>

        <div className="space-y-8">
          {cv.hasExperience && cv.experiences.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b-2 border-indigo-600 inline-block pb-1 mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" /> Experiencia Laboral
              </h2>
              <div className="space-y-6">
                {cv.experiences.map((exp, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-slate-200">
                    <div className="absolute w-3 h-3 bg-indigo-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white"></div>
                    <h3 className="font-bold text-slate-900 text-lg">{exp.position}</h3>
                    <div className="text-indigo-600 font-medium text-sm mb-1">{exp.company} | {exp.city}</div>
                    <div className="text-slate-500 text-sm">{exp.startDate} - {exp.endDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.hasFormalStudies && cv.formalStudies.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b-2 border-indigo-600 inline-block pb-1 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-600" /> Educación Formal
              </h2>
              <div className="space-y-4">
                {cv.formalStudies.map((study, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-slate-900">{study.degree}</h3>
                    <div className="text-slate-600 text-sm">{study.institute} - {study.type}</div>
                    <div className="text-slate-500 text-sm">{study.endDate} | {study.city}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.hasComplementaryStudies && cv.complementaryStudies.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b-2 border-indigo-600 inline-block pb-1 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-600" /> Estudios Complementarios
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                {cv.complementaryStudies.map((study, i) => (
                  <li key={i}><strong>{study.degree}</strong> - {study.institute}</li>
                ))}
              </ul>
            </section>
          )}

          {cv.hasReferences && cv.references.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider border-b-2 border-indigo-600 inline-block pb-1 mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" /> Referencias
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {cv.references.map((ref, i) => (
                  <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <h4 className="font-bold text-slate-900">{ref.name}</h4>
                    <div className="text-xs text-indigo-600 font-medium mb-1">{ref.type}</div>
                    <div className="text-sm text-slate-600">{ref.phone}</div>
                    <div className="text-sm text-slate-500">{ref.city}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function FemeninoDesign({ cv }: { cv: CVData }) {
  return (
    <div className="flex h-full min-h-[297mm] bg-white">
      {/* Sidebar */}
      <div className="w-1/3 bg-teal-600 text-teal-50 p-8 shadow-[4px_0_24px_rgba(0,0,0,0.05)] z-10">
        <div className="w-40 h-40 bg-white rounded-full mx-auto mb-8 flex items-center justify-center text-5xl font-serif text-teal-600 shadow-xl">
          {cv.personal.names.charAt(0)}{cv.personal.surnames.charAt(0)}
        </div>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-white font-serif text-xl border-b border-teal-400/50 pb-2 mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Contacto
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Teléfono</div>
                <div>{cv.personal.phone}</div>
              </li>
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Email</div>
                <div className="break-all">{cv.personal.email}</div>
              </li>
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Dirección</div>
                <div>{cv.personal.address}, {cv.personal.neighborhood}, {cv.personal.city}</div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif text-xl border-b border-teal-400/50 pb-2 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Info Personal
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Nacimiento</div>
                <div>{cv.personal.dob} en {cv.personal.birthPlace}</div>
              </li>
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Identificación</div>
                <div>{cv.personal.docType} {cv.personal.document}</div>
              </li>
              <li>
                <div className="text-teal-200 text-xs uppercase tracking-wider mb-1">Estado Civil</div>
                <div>{cv.personal.maritalStatus}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-12 bg-[#fafafa]">
        <div className="mb-12 border-b-2 border-teal-100 pb-8">
          <h1 className="text-5xl font-serif text-slate-800 mb-2">{cv.personal.names}</h1>
          <h1 className="text-5xl font-serif text-teal-600">{cv.personal.surnames}</h1>
        </div>

        <div className="space-y-10">
          {cv.hasExperience && cv.experiences.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><Briefcase className="w-4 h-4" /></div>
                Experiencia Laboral
              </h2>
              <div className="space-y-6">
                {cv.experiences.map((exp, i) => (
                  <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-800 text-lg">{exp.position}</h3>
                      <span className="text-teal-600 text-sm font-medium bg-teal-50 px-3 py-1 rounded-full">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <div className="text-slate-600 font-medium mb-1">{exp.company}</div>
                    <div className="text-slate-500 text-sm">{exp.city}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.hasFormalStudies && cv.formalStudies.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><GraduationCap className="w-4 h-4" /></div>
                Educación Formal
              </h2>
              <div className="space-y-5">
                {cv.formalStudies.map((study, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1/4 text-sm text-teal-600 font-medium pt-1">{study.endDate}</div>
                    <div className="w-3/4 border-l-2 border-teal-100 pl-4 pb-4">
                      <h3 className="font-bold text-slate-800">{study.degree}</h3>
                      <div className="text-slate-600">{study.institute}</div>
                      <div className="text-slate-500 text-sm">{study.type} | {study.city}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.hasComplementaryStudies && cv.complementaryStudies.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><Award className="w-4 h-4" /></div>
                Estudios Complementarios
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {cv.complementaryStudies.map((study, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-400"></div>
                    <div>
                      <div className="font-bold text-slate-800">{study.degree}</div>
                      <div className="text-sm text-slate-500">{study.institute}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {cv.hasReferences && cv.references.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600"><Users className="w-4 h-4" /></div>
                Referencias
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {cv.references.map((ref, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-slate-800">{ref.name}</h4>
                    <div className="text-sm text-teal-600 mb-1">{ref.type}</div>
                    <div className="text-sm text-slate-600 flex items-center gap-2"><Phone className="w-3 h-3" /> {ref.phone}</div>
                    <div className="text-sm text-slate-500 flex items-center gap-2"><MapPin className="w-3 h-3" /> {ref.city}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function ATSDesign({ cv }: { cv: CVData }) {
  return (
    <div className="p-12 bg-white h-full min-h-[297mm] font-sans text-slate-900">
      {/* Header */}
      <div className="text-center border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{cv.personal.names} {cv.personal.surnames}</h1>
        <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-700">
          <span>{cv.personal.email}</span>
          <span>•</span>
          <span>{cv.personal.phone}</span>
          <span>•</span>
          <span>{cv.personal.city}, {cv.personal.address}</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Personal Info Summary */}
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Información Personal</h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div><span className="font-semibold">Documento:</span> {cv.personal.docType} {cv.personal.document} ({cv.personal.docIssuePlace})</div>
            <div><span className="font-semibold">Fecha Nacimiento:</span> {cv.personal.dob} ({cv.personal.birthPlace})</div>
            <div><span className="font-semibold">Estado Civil:</span> {cv.personal.maritalStatus}</div>
          </div>
        </section>

        {/* Experience */}
        {cv.hasExperience && cv.experiences.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Experiencia Profesional</h2>
            <div className="space-y-4">
              {cv.experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold">
                    <span>{exp.position}</span>
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm italic mb-1">
                    <span>{exp.company}</span>
                    <span>{exp.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {cv.hasFormalStudies && cv.formalStudies.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Educación Formal</h2>
            <div className="space-y-3">
              {cv.formalStudies.map((study, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold">
                    <span>{study.degree}</span>
                    <span>{study.endDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{study.institute} ({study.type})</span>
                    <span>{study.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Complementary */}
        {cv.hasComplementaryStudies && cv.complementaryStudies.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Educación Complementaria</h2>
            <ul className="list-disc list-inside text-sm space-y-1">
              {cv.complementaryStudies.map((study, i) => (
                <li key={i}><span className="font-bold">{study.degree}</span>, {study.institute}</li>
              ))}
            </ul>
          </section>
        )}

        {/* References */}
        {cv.hasReferences && cv.references.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-3 pb-1">Referencias</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {cv.references.map((ref, i) => (
                <div key={i}>
                  <div className="font-bold">{ref.name}</div>
                  <div>{ref.type} - {ref.phone}</div>
                  <div>{ref.city}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
