import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  History, 
  User, 
  Upload, 
  CheckCircle, 
  Euro, 
  FileText, 
  Shield,
  Clock,
  Filter,
  Download
} from 'lucide-react';

interface AuditEntry {
  id: string;
  fagriIdKey: string;
  actionType: string;
  actionDetails: string;
  performedBy: string;
  performedByType: string;
  relatedId?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

interface AuditTrailDisplayProps {
  fagriIdKey: string;
  userRole: string;
}

export function AuditTrailDisplay({ fagriIdKey, userRole }: AuditTrailDisplayProps) {
  const { t } = useLanguage();
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<AuditEntry[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuditTrail();
  }, [fagriIdKey]);

  useEffect(() => {
    filterEntries();
  }, [auditEntries, selectedFilter]);

  const loadAuditTrail = () => {
    try {
      const storedAudit = JSON.parse(localStorage.getItem('auditTrail') || '[]');
      const userEntries = storedAudit.filter((entry: AuditEntry) => entry.fagriIdKey === fagriIdKey);
      
      // Sort by date descending (most recent first)
      userEntries.sort((a: AuditEntry, b: AuditEntry) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      setAuditEntries(userEntries);
    } catch (error) {
      console.error('Error loading audit trail:', error);
      setAuditEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEntries = () => {
    if (selectedFilter === 'all') {
      setFilteredEntries(auditEntries);
    } else {
      setFilteredEntries(auditEntries.filter(entry => entry.actionType === selectedFilter));
    }
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'kyc_upload': return <Upload className="h-4 w-4 text-blue-600" />;
      case 'kyc_approval': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'payment_received': return <Euro className="h-4 w-4 text-green-600" />;
      case 'project_review': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'document_verification': return <Shield className="h-4 w-4 text-orange-600" />;
      default: return <History className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActionTitle = (actionType: string) => {
    switch (actionType) {
      case 'kyc_upload': return 'Caricamento KYC';
      case 'kyc_approval': return 'Approvazione KYC';
      case 'payment_received': return 'Pagamento Ricevuto';
      case 'project_review': return 'Revisione Progetto';
      case 'document_verification': return 'Verifica Documento';
      default: return 'Azione Sistema';
    }
  };

  const getActionDescription = (entry: AuditEntry) => {
    try {
      const details = JSON.parse(entry.actionDetails);
      
      switch (entry.actionType) {
        case 'kyc_upload':
          return `Caricato documento: ${details.documentType} (${details.fileName})`;
        case 'kyc_approval':
          return `KYC approvato da: ${details.approvedBy}`;
        case 'payment_received':
          return `Pagamento di €${(details.amount / 100).toFixed(2)} - Riferimento: ${details.transactionReference}`;
        case 'project_review':
          return `Progetto ${details.projectId} - Status: ${details.status}`;
        case 'document_verification':
          return `Documento verificato: ${details.documentType}`;
        default:
          return JSON.stringify(details);
      }
    } catch (error) {
      return entry.actionDetails;
    }
  };

  const getPerformedByBadge = (entry: AuditEntry) => {
    switch (entry.performedByType) {
      case 'employee':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Dipendente</Badge>;
      case 'admin':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">Amministratore</Badge>;
      case 'user':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Cliente</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Sistema</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('it-IT'),
      time: date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const exportAuditTrail = () => {
    const csvContent = [
      ['Data', 'Ora', 'Azione', 'Descrizione', 'Eseguito Da', 'Tipo', 'ID Correlato'].join(','),
      ...filteredEntries.map(entry => {
        const { date, time } = formatDate(entry.createdAt);
        return [
          date,
          time,
          getActionTitle(entry.actionType),
          `"${getActionDescription(entry)}"`,
          entry.performedBy,
          entry.performedByType,
          entry.relatedId || ''
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `audit-trail-${fagriIdKey}-${new Date().toISOString().split('T')[0]}.csv`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filterOptions = [
    { value: 'all', label: 'Tutte le Azioni' },
    { value: 'kyc_upload', label: 'Caricamenti KYC' },
    { value: 'kyc_approval', label: 'Approvazioni KYC' },
    { value: 'payment_received', label: 'Pagamenti' },
    { value: 'project_review', label: 'Revisioni Progetto' },
    { value: 'document_verification', label: 'Verifiche Documento' },
  ];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin w-6 h-6 border-4 border-emerald-600 border-t-transparent rounded-full mr-3"></div>
          Caricamento cronologia attività...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-gray-600" />
              Cronologia Attività
            </CardTitle>
            <CardDescription>
              Registro completo di tutte le azioni KYC e pagamenti
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={exportAuditTrail}
              disabled={filteredEntries.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Esporta CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filter Controls */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filtra per:</span>
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Badge variant="outline" className="bg-gray-50">
            {filteredEntries.length} {filteredEntries.length === 1 ? 'voce' : 'voci'}
          </Badge>
        </div>

        {/* Audit Entries */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>Nessuna attività trovata per il filtro selezionato</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEntries.map((entry, index) => {
              const { date, time } = formatDate(entry.createdAt);
              
              return (
                <div
                  key={entry.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getActionIcon(entry.actionType)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">
                            {getActionTitle(entry.actionType)}
                          </h4>
                          {getPerformedByBadge(entry)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {getActionDescription(entry)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {date} alle {time}
                          </div>
                          {entry.performedBy !== fagriIdKey && (
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {entry.performedBy}
                            </div>
                          )}
                          {entry.relatedId && (
                            <div className="text-gray-400">
                              ID: {entry.relatedId.slice(-8)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      #{index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Summary Statistics */}
        {auditEntries.length > 0 && (
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-blue-800">
                  {auditEntries.filter(e => e.actionType === 'kyc_upload').length}
                </div>
                <div className="text-xs text-blue-600">Caricamenti KYC</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-green-800">
                  {auditEntries.filter(e => e.actionType === 'payment_received').length}
                </div>
                <div className="text-xs text-green-600">Pagamenti</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-purple-800">
                  {auditEntries.filter(e => e.actionType === 'project_review').length}
                </div>
                <div className="text-xs text-purple-600">Revisioni</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-lg font-bold text-orange-800">
                  {auditEntries.filter(e => e.actionType === 'document_verification').length}
                </div>
                <div className="text-xs text-orange-600">Verifiche</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}