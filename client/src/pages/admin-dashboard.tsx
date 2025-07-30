import { Navigation } from '@/components/navigation';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Shield, 
  Database, 
  Globe, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  UserPlus,
  FileText,
  CreditCard,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-light text-slate-800">
                    {language === 'it' ? 'Dashboard Amministrazione' : 'Administration Dashboard'}
                  </h1>
                  <p className="text-slate-600 mt-2">
                    {language === 'it' 
                      ? 'Controllo completo sistema FAGRI Digital e gestione utenti globale'
                      : 'Complete FAGRI Digital system control and global user management'
                    }
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Settings className="h-4 w-4 mr-2" />
                    {language === 'it' ? 'Configurazione Sistema' : 'System Configuration'}
                  </Button>
                </div>
              </div>
            </div>

            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Utenti Totali' : 'Total Users'}
                      </p>
                      <p className="text-2xl font-bold text-blue-900">2,847</p>
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
                      <p className="text-2xl font-bold text-emerald-900">1,234</p>
                    </div>
                    <Database className="h-8 w-8 text-emerald-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-800">
                        {language === 'it' ? 'CO₂ Totalmente Gestita' : 'Total CO₂ Managed'}
                      </p>
                      <p className="text-2xl font-bold text-purple-900">89,450t</p>
                    </div>
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        {language === 'it' ? 'Ricavi Mensili' : 'Monthly Revenue'}
                      </p>
                      <p className="text-2xl font-bold text-orange-900">€127,800</p>
                    </div>
                    <CreditCard className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* System Management */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Shield className="h-5 w-5 mr-2 text-red-600" />
                      {language === 'it' ? 'Controllo Sistema' : 'System Control'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-800">
                              {language === 'it' ? 'Status Sistema' : 'System Status'}
                            </p>
                            <p className="text-sm text-green-600">
                              {language === 'it' ? 'Tutti i servizi operativi' : 'All services operational'}
                            </p>
                          </div>
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-blue-800">
                              {language === 'it' ? 'Blockchain G8Chain' : 'G8Chain Blockchain'}
                            </p>
                            <p className="text-sm text-blue-600">
                              {language === 'it' ? 'Sincronizzato' : 'Synchronized'}
                            </p>
                          </div>
                          <Lock className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-slate-800 mb-3">
                        {language === 'it' ? 'Gestione Utenti Recente' : 'Recent User Management'}
                      </h3>
                      
                      {[
                        {
                          action: language === 'it' ? 'Nuovo Utente Team' : 'New Team User',
                          user: 'Alessandro Bianchi',
                          role: 'Team Member',
                          status: 'approved',
                          time: '2 ore fa'
                        },
                        {
                          action: language === 'it' ? 'Aggiornamento Ruolo' : 'Role Update',
                          user: 'Maria Rossi',
                          role: 'Certification → Administration',
                          status: 'pending',
                          time: '4 ore fa'
                        },
                        {
                          action: language === 'it' ? 'Accesso Sospeso' : 'Access Suspended',
                          user: 'Giovanni Verdi',
                          role: 'Fagri Member',
                          status: 'suspended',
                          time: '1 giorno fa'
                        }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-slate-800">{activity.action}</p>
                            <p className="text-sm text-slate-600">{activity.user} - {activity.role}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {activity.status === 'approved' && (
                              <Badge className="bg-green-100 text-green-800">
                                {language === 'it' ? 'Approvato' : 'Approved'}
                              </Badge>
                            )}
                            {activity.status === 'pending' && (
                              <Badge className="bg-amber-100 text-amber-800">
                                {language === 'it' ? 'In Attesa' : 'Pending'}
                              </Badge>
                            )}
                            {activity.status === 'suspended' && (
                              <Badge variant="destructive">
                                {language === 'it' ? 'Sospeso' : 'Suspended'}
                              </Badge>
                            )}
                            <span className="text-xs text-slate-500">{activity.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Admin Tools & Analytics */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <BarChart3 className="h-5 w-5 mr-2 text-emerald-600" />
                      {language === 'it' ? 'Analytics Globali' : 'Global Analytics'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Crescita Utenti' : 'User Growth'}</span>
                      <span className="font-semibold text-emerald-600">+12.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Progetti Certificati' : 'Certified Projects'}</span>
                      <span className="font-semibold text-blue-600">847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Uptime Sistema' : 'System Uptime'}</span>
                      <span className="font-semibold text-green-600">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">{language === 'it' ? 'Soddisfazione Utenti' : 'User Satisfaction'}</span>
                      <span className="font-semibold text-purple-600">94%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                      {language === 'it' ? 'Alerts Sistema' : 'System Alerts'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm font-medium text-amber-800">
                        {language === 'it' ? 'Backup Programmato' : 'Scheduled Backup'}
                      </p>
                      <p className="text-xs text-amber-600">
                        {language === 'it' ? 'Database backup tra 2 ore' : 'Database backup in 2 hours'}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        {language === 'it' ? 'Aggiornamento Sicurezza' : 'Security Update'}
                      </p>
                      <p className="text-xs text-blue-600">
                        {language === 'it' ? 'Patch disponibile' : 'Patch available'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-slate-800">
                      <Settings className="h-5 w-5 mr-2 text-slate-600" />
                      {language === 'it' ? 'Strumenti Admin' : 'Admin Tools'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Gestione Utenti' : 'User Management'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Database Admin' : 'Database Admin'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Report Sistema' : 'System Reports'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Configurazione Sicurezza' : 'Security Configuration'}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {language === 'it' ? 'Analytics Avanzate' : 'Advanced Analytics'}
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