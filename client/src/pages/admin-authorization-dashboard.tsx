import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/components/language-provider';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar, 
  MessageSquare,
  Shield,
  Building2,
  FileCheck,
  Settings,
  Search,
  Filter,
  Eye,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Authorization {
  id: string;
  userId: string;
  userFagriId: string;
  userName: string;
  userEmail: string;
  accountType: string;
  displayName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  reviewerName?: string;
  reviewNotes?: string;
  digitalFingerprint?: {
    firstName: string;
    lastName: string;
    socialSecurityNumber: string;
    telephone: string;
    email: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    province: string;
  };
}

export function AdminAuthorizationDashboard() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [filteredAuths, setFilteredAuths] = useState<Authorization[]>([]);
  const [selectedAuth, setSelectedAuth] = useState<Authorization | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demonstration - in production this would come from API
  useEffect(() => {
    const mockAuthorizations: Authorization[] = [
      {
        id: 'auth_001',
        userId: 'user_001',
        userFagriId: 'FAGRI-1BKQE5C3-K9X2P4M7-A3',
        userName: 'Mario Rossi',
        userEmail: 'mario.rossi@example.com',
        accountType: 'fagri-member',
        displayName: 'FAGRI Member',
        status: 'pending',
        requestedAt: new Date().toISOString(),
        digitalFingerprint: {
          firstName: 'Mario',
          lastName: 'Rossi',
          socialSecurityNumber: 'RSSMRA85M01H501Z',
          telephone: '+39 333 1234567',
          email: 'mario.rossi@example.com',
          streetAddress: 'Via Roma 123',
          city: 'Milano',
          postalCode: '20100',
          province: 'MI'
        }
      },
      {
        id: 'auth_002',
        userId: 'user_002',
        userFagriId: 'FAGRI-2CKQE5C3-L9X2P4N8-B4',
        userName: 'Giulia Bianchi',
        userEmail: 'giulia.bianchi@example.com',
        accountType: 'fagri-team',
        displayName: 'FAGRI Team',
        status: 'pending',
        requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        digitalFingerprint: {
          firstName: 'Giulia',
          lastName: 'Bianchi',
          socialSecurityNumber: 'BNCGLI90A41F205X',
          telephone: '+39 320 9876543',
          email: 'giulia.bianchi@example.com',
          streetAddress: 'Corso Venezia 45',
          city: 'Roma',
          postalCode: '00198',
          province: 'RM'
        }
      },
      {
        id: 'auth_003',
        userId: 'user_003',
        userFagriId: 'FAGRI-3DKQE5C3-M9X2P4O9-C5',
        userName: 'Luca Verde',
        userEmail: 'luca.verde@example.com',
        accountType: 'audit-certification',
        displayName: 'Audit & Certification',
        status: 'approved',
        requestedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        reviewedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        reviewerId: 'admin_001',
        reviewerName: 'Admin User',
        reviewNotes: 'Approved based on qualifications and background check.',
        digitalFingerprint: {
          firstName: 'Luca',
          lastName: 'Verde',
          socialSecurityNumber: 'VRDLCU88L15A662K',
          telephone: '+39 347 1122334',
          email: 'luca.verde@example.com',
          streetAddress: 'Via Nazionale 89',
          city: 'Torino',
          postalCode: '10100',
          province: 'TO'
        }
      }
    ];

    setAuthorizations(mockAuthorizations);
    setFilteredAuths(mockAuthorizations);
    setIsLoading(false);
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = authorizations;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(auth => auth.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(auth =>
        auth.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auth.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auth.userFagriId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        auth.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAuths(filtered);
  }, [authorizations, searchTerm, statusFilter]);

  const handleApprove = () => {
    if (!selectedAuth) return;

    const updatedAuth = {
      ...selectedAuth,
      status: 'approved' as const,
      reviewedAt: new Date().toISOString(),
      reviewerId: 'admin_current',
      reviewerName: 'Current Admin',
      reviewNotes: reviewNotes || 'Approved'
    };

    setAuthorizations(prev => 
      prev.map(auth => auth.id === selectedAuth.id ? updatedAuth : auth)
    );

    toast({
      title: language === 'it' ? 'Autorizzazione Approvata' : 'Authorization Approved',
      description: language === 'it' 
        ? `${selectedAuth.userName} è stato approvato per ${selectedAuth.displayName}`
        : `${selectedAuth.userName} has been approved for ${selectedAuth.displayName}`,
    });

    setSelectedAuth(null);
    setReviewNotes('');
  };

  const handleReject = () => {
    if (!selectedAuth) return;

    const updatedAuth = {
      ...selectedAuth,
      status: 'rejected' as const,
      reviewedAt: new Date().toISOString(),
      reviewerId: 'admin_current',
      reviewerName: 'Current Admin',
      reviewNotes: reviewNotes || 'Rejected'
    };

    setAuthorizations(prev => 
      prev.map(auth => auth.id === selectedAuth.id ? updatedAuth : auth)
    );

    toast({
      title: language === 'it' ? 'Autorizzazione Rifiutata' : 'Authorization Rejected',
      description: language === 'it' 
        ? `${selectedAuth.userName} è stato rifiutato per ${selectedAuth.displayName}`
        : `${selectedAuth.userName} has been rejected for ${selectedAuth.displayName}`,
      variant: 'destructive'
    });

    setSelectedAuth(null);
    setReviewNotes('');
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

  const getAccountTypeIcon = (accountType: string) => {
    switch (accountType) {
      case 'fagri-member':
        return <User className="h-5 w-5" />;
      case 'fagri-team':
        return <Building2 className="h-5 w-5" />;
      case 'audit-certification':
        return <FileCheck className="h-5 w-5" />;
      case 'administration':
        return <Settings className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getAccountTypeColor = (accountType: string) => {
    switch (accountType) {
      case 'fagri-member':
        return 'text-emerald-600 bg-emerald-50';
      case 'fagri-team':
        return 'text-blue-600 bg-blue-50';
      case 'audit-certification':
        return 'text-orange-600 bg-orange-50';
      case 'administration':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-slate-800 mb-2">
            {language === 'it' ? 'Dashboard Amministrazione' : 'Administration Dashboard'}
          </h1>
          <p className="text-slate-600">
            {language === 'it' ? 'Gestisci le richieste di autorizzazione degli utenti' : 'Manage user authorization requests'}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    {language === 'it' ? 'In Attesa' : 'Pending'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-900">
                    {authorizations.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {language === 'it' ? 'Approvate' : 'Approved'}
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {authorizations.filter(a => a.status === 'approved').length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-800">
                    {language === 'it' ? 'Rifiutate' : 'Rejected'}
                  </p>
                  <p className="text-2xl font-bold text-red-900">
                    {authorizations.filter(a => a.status === 'rejected').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    {language === 'it' ? 'Totale' : 'Total'}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {authorizations.length}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              {language === 'it' ? 'Filtri e Ricerca' : 'Filters and Search'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-slate-700">
                  {language === 'it' ? 'Cerca' : 'Search'}
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="search"
                    placeholder={language === 'it' ? 'Nome, email, FAGRI ID...' : 'Name, email, FAGRI ID...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-48">
                <Label htmlFor="status" className="text-sm font-medium text-slate-700">
                  {language === 'it' ? 'Stato' : 'Status'}
                </Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">{language === 'it' ? 'Tutti' : 'All'}</option>
                  <option value="pending">{language === 'it' ? 'In Attesa' : 'Pending'}</option>
                  <option value="approved">{language === 'it' ? 'Approvate' : 'Approved'}</option>
                  <option value="rejected">{language === 'it' ? 'Rifiutate' : 'Rejected'}</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Authorization Requests List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* List Panel */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'it' ? 'Richieste di Autorizzazione' : 'Authorization Requests'} 
                ({filteredAuths.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="max-h-96 overflow-y-auto">
                {filteredAuths.map((auth) => (
                  <div
                    key={auth.id}
                    className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors ${
                      selectedAuth?.id === auth.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                    onClick={() => setSelectedAuth(auth)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`p-1 rounded ${getAccountTypeColor(auth.accountType)}`}>
                            {getAccountTypeIcon(auth.accountType)}
                          </div>
                          <h4 className="font-medium text-slate-800">{auth.userName}</h4>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{auth.userEmail}</p>
                        <p className="text-xs text-slate-500 font-mono">{auth.userFagriId}</p>
                        <p className="text-sm text-blue-600 mt-1">{auth.displayName}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {language === 'it' ? 'Richiesta del' : 'Requested on'} {new Date(auth.requestedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`${getStatusColor(auth.status)} border`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(auth.status)}
                            <span>
                              {language === 'it' 
                                ? (auth.status === 'pending' ? 'In Attesa' : auth.status === 'approved' ? 'Approvato' : 'Rifiutato')
                                : auth.status.charAt(0).toUpperCase() + auth.status.slice(1)
                              }
                            </span>
                          </div>
                        </Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAuth(auth);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {language === 'it' ? 'Dettagli' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredAuths.length === 0 && (
                  <div className="p-8 text-center text-slate-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>{language === 'it' ? 'Nessuna richiesta trovata' : 'No requests found'}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detail Panel */}
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'it' ? 'Dettagli Richiesta' : 'Request Details'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAuth ? (
                <div className="space-y-6">
                  {/* User Information */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">
                      {language === 'it' ? 'Informazioni Utente' : 'User Information'}
                    </h4>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-600">{language === 'it' ? 'Nome:' : 'Name:'}</span>
                          <p className="text-slate-800">{selectedAuth.digitalFingerprint?.firstName} {selectedAuth.digitalFingerprint?.lastName}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">Email:</span>
                          <p className="text-slate-800">{selectedAuth.userEmail}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">{language === 'it' ? 'Telefono:' : 'Phone:'}</span>
                          <p className="text-slate-800">{selectedAuth.digitalFingerprint?.telephone}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">{language === 'it' ? 'Codice Fiscale:' : 'Tax Code:'}</span>
                          <p className="text-slate-800">{selectedAuth.digitalFingerprint?.socialSecurityNumber}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="font-medium text-slate-600">{language === 'it' ? 'Indirizzo:' : 'Address:'}</span>
                        <p className="text-slate-800">
                          {selectedAuth.digitalFingerprint?.streetAddress}, {selectedAuth.digitalFingerprint?.city} {selectedAuth.digitalFingerprint?.postalCode} ({selectedAuth.digitalFingerprint?.province})
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-3">
                      {language === 'it' ? 'Dettagli Richiesta' : 'Request Details'}
                    </h4>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded ${getAccountTypeColor(selectedAuth.accountType)}`}>
                          {getAccountTypeIcon(selectedAuth.accountType)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{selectedAuth.displayName}</p>
                          <p className="text-sm text-slate-600">{selectedAuth.accountType}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                        <div>
                          <span className="font-medium text-slate-600">{language === 'it' ? 'Richiesta del:' : 'Requested:'}</span>
                          <p className="text-slate-800">{new Date(selectedAuth.requestedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-600">{language === 'it' ? 'Stato:' : 'Status:'}</span>
                          <Badge className={`${getStatusColor(selectedAuth.status)} border mt-1`}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(selectedAuth.status)}
                              <span>
                                {language === 'it' 
                                  ? (selectedAuth.status === 'pending' ? 'In Attesa' : selectedAuth.status === 'approved' ? 'Approvato' : 'Rifiutato')
                                  : selectedAuth.status.charAt(0).toUpperCase() + selectedAuth.status.slice(1)
                                }
                              </span>
                            </div>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Previous Review */}
                  {selectedAuth.reviewedAt && (
                    <div>
                      <h4 className="font-medium text-slate-800 mb-3">
                        {language === 'it' ? 'Revisione Precedente' : 'Previous Review'}
                      </h4>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-slate-600">{language === 'it' ? 'Revisionato da:' : 'Reviewed by:'}</span>
                            <p className="text-slate-800">{selectedAuth.reviewerName}</p>
                          </div>
                          <div>
                            <span className="font-medium text-slate-600">{language === 'it' ? 'Data:' : 'Date:'}</span>
                            <p className="text-slate-800">{new Date(selectedAuth.reviewedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {selectedAuth.reviewNotes && (
                          <div className="pt-2 border-t">
                            <span className="font-medium text-slate-600">{language === 'it' ? 'Note:' : 'Notes:'}</span>
                            <p className="text-slate-800 mt-1">{selectedAuth.reviewNotes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Review Actions (only for pending requests) */}
                  {selectedAuth.status === 'pending' && (
                    <div>
                      <h4 className="font-medium text-slate-800 mb-3">
                        {language === 'it' ? 'Azione di Revisione' : 'Review Action'}
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="reviewNotes" className="text-sm font-medium text-slate-700">
                            {language === 'it' ? 'Note di Revisione' : 'Review Notes'}
                          </Label>
                          <Textarea
                            id="reviewNotes"
                            placeholder={language === 'it' ? 'Inserisci note sulla revisione...' : 'Enter review notes...'}
                            value={reviewNotes}
                            onChange={(e) => setReviewNotes(e.target.value)}
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            onClick={handleApprove}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === 'it' ? 'Approva' : 'Approve'}
                          </Button>
                          <Button
                            onClick={handleReject}
                            variant="destructive"
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {language === 'it' ? 'Rifiuta' : 'Reject'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{language === 'it' ? 'Seleziona una richiesta per vedere i dettagli' : 'Select a request to see details'}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}