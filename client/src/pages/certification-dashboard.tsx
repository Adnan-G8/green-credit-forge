import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, Clock, FileCheck, Award, TrendingUp, Search } from 'lucide-react';

export default function CertificationDashboard() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Dashboard Certificazione' : 'Certification Dashboard'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Validazione e certificazione progetti CO₂ secondo standard EUFD2025-001'
                      : 'CO₂ project validation and certification according to EUFD2025-001 standard'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Search className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Cerca Progetti' : 'Search Projects'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Certification Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-800">
                        {language === 'it' ? 'In Revisione' : 'Under Review'}
                      </p>
                      <p className="text-2xl font-bold text-amber-900">7</p>
                    </div>
                    <Clock className="h-8 w-8 text-amber-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'In Validazione' : 'In Validation'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">5</p>
                    </div>
                    <FileCheck className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        {language === 'it' ? 'Certificati' : 'Certified'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">23</p>
                    </div>
                    <Award className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {language === 'it' ? 'Richiede Correzioni' : 'Needs Corrections'}
                      </p>
                      <p className="text-2xl font-bold text-red-900">3</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Projects Pending Certification */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Shield className="h-5 w-5 mr-2 text-purple-600" />
                      {language === 'it' ? 'Progetti in Certificazione' : 'Projects Under Certification'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: language === 'it' ? 'Progetto Fotovoltaico Milano' : 'Milan Solar Project',
                          id: 'PV-2024-001',
                          type: 'Solar',
                          co2: '750t',
                          status: 'validation',
                          priority: 'high',
                          submittedBy: 'Marco Rossi',
                          daysLeft: 2
                        },
                        {
                          name: language === 'it' ? 'Parco Eolico Sardegna' : 'Sardinia Wind Farm',
                          id: 'WF-2024-008',
                          type: 'Wind',
                          co2: '1,850t',
                          status: 'review',
                          priority: 'medium',
                          submittedBy: 'Sofia Bianchi',
                          daysLeft: 5
                        },
                        {
                          name: language === 'it' ? 'Idroelettrico Valle d\'Aosta' : 'Valle d\'Aosta Hydroelectric',
                          id: 'HY-2024-003',
                          type: 'Hydro',
                          co2: '1,200t',
                          status: 'corrections',
                          priority: 'high',
                          submittedBy: 'Giuseppe Verdi',
                          daysLeft: 1
                        }
                      ].map((project, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-slate-800">{project.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {project.id}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              {project.status === 'validation' && (
                                <Badge className="bg-blue-100 text-blue-800">
                                  {language === 'it' ? 'Validazione' : 'Validation'}
                                </Badge>
                              )}
                              {project.status === 'review' && (
                                <Badge className="bg-amber-100 text-amber-800">
                                  {language === 'it' ? 'Revisione' : 'Review'}
                                </Badge>
                              )}
                              {project.status === 'corrections' && (
                                <Badge variant="destructive">
                                  {language === 'it' ? 'Correzioni' : 'Corrections'}
                                </Badge>
                              )}
                              {project.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  {language === 'it' ? 'Alta' : 'High'}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-600 mb-3">
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Tipo:' : 'Type:'}</span>
                              <span className="ml-1">{project.type}</span>
                            </div>
                            <div>
                              <span className="font-medium">CO₂:</span>
                              <span className="ml-1">{project.co2}</span>
                            </div>
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Inviato da:' : 'Submitted by:'}</span>
                              <span className="ml-1">{project.submittedBy}</span>
                            </div>
                            <div>
                              <span className="font-medium">{language === 'it' ? 'Scadenza:' : 'Deadline:'}</span>
                              <span className={`ml-1 ${project.daysLeft <= 2 ? 'text-red-600 font-medium' : ''}`}>
                                {project.daysLeft} {language === 'it' ? 'giorni' : 'days'}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button size="sm" variant="outline">
                              {language === 'it' ? 'Rivedi' : 'Review'}
                            </Button>
                            {project.status === 'validation' && (
                              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                {language === 'it' ? 'Certifica' : 'Certify'}
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Certification Tools & Analytics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                      {language === 'it' ? 'Statistiche Mensili' : 'Monthly Statistics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Progetti Certificati' : 'Certified Projects'}</span>
                      <span className="font-semibold text-emerald-600">23</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'CO₂ Totale Certificata' : 'Total Certified CO₂'}</span>
                      <span className="font-semibold text-blue-600">15,420t</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Tempo Medio' : 'Average Time'}</span>
                      <span className="font-semibold text-purple-600">4.2 giorni</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Tasso Approvazione' : 'Approval Rate'}</span>
                      <span className="font-semibold text-emerald-600">87%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
                      {language === 'it' ? 'Standard EUFD2025-001' : 'EUFD2025-001 Standard'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        {language === 'it' ? 'Conformità ISO 14064-1' : 'ISO 14064-1 Compliance'}
                      </p>
                      <p className="text-xs text-green-600">100% {language === 'it' ? 'Conforme' : 'Compliant'}</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Blockchain Verifiche' : 'Blockchain Verifications'}
                      </p>
                      <p className="text-xs text-blue-600">
                        {language === 'it' ? 'Attive su G8Chain' : 'Active on G8Chain'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Shield className="h-5 w-5 mr-2 text-slate-600" />
                      {language === 'it' ? 'Strumenti Certificazione' : 'Certification Tools'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileCheck className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Valida Documenti' : 'Validate Documents'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Genera Certificati' : 'Generate Certificates'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Report Audit' : 'Audit Reports'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}