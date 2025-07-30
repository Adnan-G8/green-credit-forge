import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, BarChart3, Settings, Plus, TrendingUp, Calendar, Award } from 'lucide-react';

export default function TeamDashboard() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Dashboard Team Member' : 'Team Member Dashboard'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Gestione progetti multipli e coordinamento team FAGRI'
                      : 'Multi-project management and FAGRI team coordination'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Nuovo Progetto Team' : 'New Team Project'}
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Progetti Team' : 'Team Projects'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 bg-emerald-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        {language === 'it' ? 'Progetti Attivi' : 'Active Projects'}
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">8</p>
                    </div>
                    <FileText className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">
                        {language === 'it' ? 'CO₂ Certificata' : 'Certified CO₂'}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">2,450t</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        {language === 'it' ? 'Crescita Mensile' : 'Monthly Growth'}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">+18%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Team Projects */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      {language === 'it' ? 'Progetti Team Attivi' : 'Active Team Projects'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: language === 'it' ? 'Progetto Fotovoltaico Toscana' : 'Tuscany Solar Project',
                          type: 'Solar',
                          status: language === 'it' ? 'In Certificazione' : 'In Certification',
                          co2: '450t',
                          progress: 75
                        },
                        {
                          name: language === 'it' ? 'Parco Eolico Puglia' : 'Puglia Wind Farm',
                          type: 'Wind',
                          status: language === 'it' ? 'Attivo' : 'Active',
                          co2: '1,200t',
                          progress: 100
                        },
                        {
                          name: language === 'it' ? 'Biomasse Lombardia' : 'Lombardy Biomass',
                          type: 'Biomass',
                          status: language === 'it' ? 'Pianificazione' : 'Planning',
                          co2: '800t',
                          progress: 25
                        }
                      ].map((project, index) => (
                        <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium text-slate-800">{project.name}</h3>
                            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {project.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-slate-600">
                            <span>{project.status}</span>
                            <span className="font-medium">{project.co2} CO₂</span>
                          </div>
                          <div className="mt-2 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Analytics & Tools */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                      {language === 'it' ? 'Analisi Team' : 'Team Analytics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Efficienza Team' : 'Team Efficiency'}</span>
                      <span className="font-semibold text-emerald-600">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Progetti Completati' : 'Completed Projects'}</span>
                      <span className="font-semibold text-blue-600">4</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Media CO₂/Progetto' : 'Avg CO₂/Project'}</span>
                      <span className="font-semibold text-purple-600">306t</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                      {language === 'it' ? 'Scadenze Team' : 'Team Deadlines'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">
                        {language === 'it' ? 'Scadenza Certificazione' : 'Certification Deadline'}
                      </p>
                      <p className="text-xs text-red-600">
                        {language === 'it' ? 'Progetto Toscana - 3 giorni' : 'Tuscany Project - 3 days'}
                      </p>
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">
                        {language === 'it' ? 'Revisione Documenti' : 'Document Review'}
                      </p>
                      <p className="text-xs text-amber-600">
                        {language === 'it' ? 'Parco Eolico - 1 settimana' : 'Wind Farm - 1 week'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Settings className="h-5 w-5 mr-2 text-slate-600" />
                      {language === 'it' ? 'Strumenti Team' : 'Team Tools'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Report Progetti' : 'Project Reports'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Gestione Team' : 'Team Management'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Analisi Avanzate' : 'Advanced Analytics'}
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