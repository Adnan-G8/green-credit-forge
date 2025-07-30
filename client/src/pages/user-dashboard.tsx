import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/language-provider';
import { 
  User, 
  Key, 
  Shield, 
  Building2, 
  FileCheck, 
  Settings, 
  Copy, 
  Download,
  Clock,
  CheckCircle,
  XCircle,
  UserPlus,
  Eye
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserDashboardProps {
  fagriId: string;
}

interface Authorization {
  id: string;
  accountType: string;
  displayName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewerName?: string;
  reviewNotes?: string;
}

export function UserDashboard({ fagriId }: UserDashboardProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage (in production this would come from backend)
    const userData = localStorage.getItem(`account_${fagriId}`);
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load authorization requests
    const authData = localStorage.getItem(`authorizations_${fagriId}`);
    if (authData) {
      setAuthorizations(JSON.parse(authData));
    }

    setIsLoading(false);
  }, [fagriId]);

  const handleCopyFagriId = () => {
    navigator.clipboard.writeText(fagriId);
    toast({
      title: t('copied-to-clipboard'),
      description: t('fagri-id-copied'),
    });
  };

  const handleDownloadCertificate = () => {
    const certificate = `
FAGRI DIGITAL - Digital Identity Certificate

ALPHAG8 ID KEY: ${fagriId}
Full Name: ${user?.fullName || 'Unknown'}
Email: ${user?.email || 'Unknown'}
Issue Date: ${new Date().toLocaleDateString()}

This certificate confirms your secure digital identity 
within the FAGRI Digital CO₂ Certification Platform.

Security Level: Swiss Banking Standard
Encryption: AES-256 with RSA-4096
Blockchain Network: G8Chain (EVM Compatible)

Valid for: CO₂ Certification Applications
Issuer: FAGRI DIGITAL S.r.l.
Contact: support@fagri.digital

© 2025 FAGRI DIGITAL - All rights reserved
    `;

    const blob = new Blob([certificate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FAGRI-Certificate-${fagriId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: t('certificate-saved-successfully'),
      description: t('certificate-downloaded'),
    });
  };

  const requestAuthorization = (accountType: string, displayName: string) => {
    const newAuth: Authorization = {
      id: `auth_${Date.now()}`,
      accountType,
      displayName,
      status: 'pending',
      requestedAt: new Date().toISOString(),
    };

    const updatedAuths = [...authorizations, newAuth];
    setAuthorizations(updatedAuths);
    localStorage.setItem(`authorizations_${fagriId}`, JSON.stringify(updatedAuths));

    toast({
      title: language === 'it' ? 'Richiesta Inviata' : 'Request Submitted',
      description: language === 'it' 
        ? `La tua richiesta per ${displayName} è stata inviata all'amministrazione.`
        : `Your request for ${displayName} has been sent to administration.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'approved':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">
            {language === 'it' ? 'Dashboard Utente' : 'User Dashboard'}
          </h1>
          <p className="text-slate-600">
            {language === 'it' ? 'Gestisci la tua identità digitale e le autorizzazioni' : 'Manage your digital identity and authorizations'}
          </p>
        </div>

        {/* FAGRI ID KEY Card */}
        <Card className="mb-8 border-2 border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <Key className="h-6 w-6 mr-3" />
              ALPHAG8 ID KEY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-lg font-medium text-emerald-900 bg-white px-4 py-2 rounded-lg border">
                {fagriId}
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={handleCopyFagriId}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-100"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Copia' : 'Copy'}
                </Button>
                <Button
                  onClick={handleDownloadCertificate}
                  variant="outline"
                  size="sm"
                  className="border-emerald-600 text-emerald-700 hover:bg-emerald-100"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {language === 'it' ? 'Scarica Certificato' : 'Download Certificate'}
                </Button>
              </div>
            </div>
            <p className="text-sm text-emerald-700">
              {language === 'it' 
                ? 'La tua identità digitale sicura per accedere ai servizi di certificazione CO₂'
                : 'Your secure digital identity for accessing CO₂ certification services'}
            </p>
          </CardContent>
        </Card>

        {/* Authorization Requests */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-6 w-6 mr-3" />
              {language === 'it' ? 'Richieste di Autorizzazione' : 'Authorization Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* FAGRI Member */}
              <Card className="border-emerald-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => requestAuthorization('fagri-member', language === 'it' ? 'Membro FAGRI' : 'FAGRI Member')}>
                <CardContent className="p-4 text-center">
                  <User className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                  <h4 className="font-medium text-emerald-800">
                    {language === 'it' ? 'Membro FAGRI' : 'FAGRI Member'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'it' ? 'Accesso base alla piattaforma' : 'Basic platform access'}
                  </p>
                </CardContent>
              </Card>

              {/* FAGRI Team */}
              <Card className="border-blue-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => requestAuthorization('fagri-team', language === 'it' ? 'Team FAGRI' : 'FAGRI Team')}>
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium text-blue-800">
                    {language === 'it' ? 'Team FAGRI' : 'FAGRI Team'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'it' ? 'Gestione clienti e applicazioni' : 'Client and application management'}
                  </p>
                </CardContent>
              </Card>

              {/* Audit & Certification */}
              <Card className="border-orange-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => requestAuthorization('audit-certification', language === 'it' ? 'Audit e Certificazione' : 'Audit & Certification')}>
                <CardContent className="p-4 text-center">
                  <FileCheck className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h4 className="font-medium text-orange-800">
                    {language === 'it' ? 'Audit e Certificazione' : 'Audit & Certification'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'it' ? 'Revisione e certificazione' : 'Review and certification'}
                  </p>
                </CardContent>
              </Card>

              {/* Administration */}
              <Card className="border-red-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => requestAuthorization('administration', language === 'it' ? 'Amministrazione' : 'Administration')}>
                <CardContent className="p-4 text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-red-600" />
                  <h4 className="font-medium text-red-800">
                    {language === 'it' ? 'Amministrazione' : 'Administration'}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    {language === 'it' ? 'Controllo completo del sistema' : 'Full system control'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Authorization Status */}
            {authorizations.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-800 mb-4">
                  {language === 'it' ? 'Stato delle Richieste' : 'Request Status'}
                </h4>
                <div className="space-y-3">
                  {authorizations.map((auth) => (
                    <div key={auth.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(auth.status)}
                        <div>
                          <p className="font-medium text-slate-800">{auth.displayName}</p>
                          <p className="text-sm text-slate-600">
                            {language === 'it' ? 'Richiesta del' : 'Requested on'} {new Date(auth.requestedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`${getStatusColor(auth.status)} border`}>
                          {language === 'it' 
                            ? (auth.status === 'pending' ? 'In Attesa' : auth.status === 'approved' ? 'Approvato' : 'Rifiutato')
                            : auth.status.charAt(0).toUpperCase() + auth.status.slice(1)
                          }
                        </Badge>
                        {auth.reviewerName && (
                          <p className="text-xs text-slate-500">
                            {language === 'it' ? 'da' : 'by'} {auth.reviewerName}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {authorizations.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{language === 'it' ? 'Nessuna richiesta di autorizzazione ancora inviata' : 'No authorization requests submitted yet'}</p>
                <p className="text-sm mt-2">
                  {language === 'it' 
                    ? 'Clicca su una delle opzioni sopra per richiedere l\'accesso'
                    : 'Click on one of the options above to request access'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approved Dashboards Access */}
        {authorizations.some(auth => auth.status === 'approved') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="h-6 w-6 mr-3" />
                {language === 'it' ? 'Accesso Dashboard' : 'Dashboard Access'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {authorizations
                  .filter(auth => auth.status === 'approved')
                  .map((auth) => (
                    <Button
                      key={auth.id}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800"
                      onClick={() => {
                        // Navigate to appropriate dashboard
                        window.location.href = `/${auth.accountType}-dashboard`;
                      }}
                    >
                      <div className="text-lg font-medium">{auth.displayName}</div>
                      <div className="text-xs opacity-90">
                        {language === 'it' ? 'Accedi alla Dashboard' : 'Access Dashboard'}
                      </div>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}