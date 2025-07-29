import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  X, 
  User, 
  Building, 
  Users, 
  Shield,
  FileText,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react';


interface KycDocument {
  id: string;
  fagriIdKey: string;
  documentType: string;
  entityType: string;
  entityName?: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  verificationStatus: string;
  uploadedBy: string;
  uploadedByEmployee?: string;
  verificationNotes?: string;
  createdAt: string;
  fileData: string;
}

interface KycUploadSectionProps {
  fagriIdKey: string;
  userRole: string;
  kycStatus: string;
  onKycUpdate: () => void;
}

export function KycUploadSection({ fagriIdKey, userRole, kycStatus, onKycUpdate }: KycUploadSectionProps) {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<KycDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEntityName, setSelectedEntityName] = useState('');
  const [uploadNotes, setUploadNotes] = useState('');
  const [viewingDocument, setViewingDocument] = useState<KycDocument | null>(null);

  const fileInputRefs = {
    personalIdFront: useRef<HTMLInputElement>(null),
    personalIdBack: useRef<HTMLInputElement>(null),
    addressProof: useRef<HTMLInputElement>(null),
    companyRegistration: useRef<HTMLInputElement>(null),
    businessLicense: useRef<HTMLInputElement>(null),
    managementId: useRef<HTMLInputElement>(null),
    authorizationLetter: useRef<HTMLInputElement>(null),
  };

  // Load existing KYC documents
  const loadKycDocuments = () => {
    try {
      const storedDocs = JSON.parse(localStorage.getItem('kycDocuments') || '[]');
      const userDocs = storedDocs.filter((doc: KycDocument) => doc.fagriIdKey === fagriIdKey);
      setDocuments(userDocs);
    } catch (error) {
      console.error('Error loading KYC documents:', error);
    }
  };

  useEffect(() => {
    loadKycDocuments();
  }, [fagriIdKey]);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:type/subtype;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (documentType: string, entityType: string) => {
    const fileInputKey = documentType.replace('-', '').replace('_', '') as keyof typeof fileInputRefs;
    const fileInput = fileInputRefs[fileInputKey]?.current;
    
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Errore: Seleziona un file da caricare");
      return;
    }

    const file = fileInput.files[0];
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Errore: Il file è troppo grande. Massimo 10MB consentito.");
      return;
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert("Errore: Tipo di file non supportato. Usa JPG, PNG o PDF.");
      return;
    }

    setIsLoading(true);

    try {
      const fileData = await convertFileToBase64(file);
      
      const newDocument: KycDocument = {
        id: `KYC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fagriIdKey,
        documentType,
        entityType,
        entityName: entityType !== 'individual' ? selectedEntityName : undefined,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileData,
        uploadedBy: userRole === 'FAGRI Sales Team' ? 'employee' : 'self',
        uploadedByEmployee: userRole === 'FAGRI Sales Team' ? fagriIdKey : undefined,
        verificationStatus: userRole === 'FAGRI Sales Team' ? 'verified' : 'pending',
        verificationNotes: uploadNotes || undefined,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      const storedDocs = JSON.parse(localStorage.getItem('kycDocuments') || '[]');
      storedDocs.push(newDocument);
      localStorage.setItem('kycDocuments', JSON.stringify(storedDocs));

      // Add to audit trail
      const auditEntry = {
        id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fagriIdKey,
        actionType: 'kyc_upload',
        actionDetails: JSON.stringify({
          documentType,
          entityType,
          fileName: file.name,
          uploadedBy: newDocument.uploadedBy,
          uploadedByEmployee: newDocument.uploadedByEmployee,
        }),
        performedBy: fagriIdKey,
        performedByType: userRole === 'FAGRI Sales Team' ? 'employee' : 'user',
        relatedId: newDocument.id,
        createdAt: new Date().toISOString(),
      };

      const auditTrail = JSON.parse(localStorage.getItem('auditTrail') || '[]');
      auditTrail.push(auditEntry);
      localStorage.setItem('auditTrail', JSON.stringify(auditTrail));

      setDocuments([...documents, newDocument]);
      setSelectedEntityName('');
      setUploadNotes('');
      
      // Clear file input
      if (fileInput) {
        fileInput.value = '';
      }

      alert(userRole === 'FAGRI Sales Team' 
        ? "Documento caricato e verificato automaticamente"
        : "Documento caricato con successo. In attesa di verifica.");

      onKycUpdate();

    } catch (error) {
      console.error('Error uploading document:', error);
      alert("Errore: Errore durante il caricamento del documento");
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected': return <X className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getDocumentStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verificato';
      case 'pending': return 'In attesa';
      case 'rejected': return 'Rifiutato';
      default: return 'Sconosciuto';
    }
  };

  const getDocumentTypeLabel = (documentType: string) => {
    const labels: { [key: string]: string } = {
      'personal_id_front': 'Documento ID (Fronte)',
      'personal_id_back': 'Documento ID (Retro)',
      'address_proof': 'Prova di Residenza',
      'company_registration': 'Registrazione Azienda',
      'business_license': 'Licenza Commerciale',
      'management_id': 'ID Gestione',
      'authorization_letter': 'Lettera di Autorizzazione',
    };
    return labels[documentType] || documentType;
  };

  const hasDocument = (documentType: string) => {
    return documents.some(doc => doc.documentType === documentType);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const downloadDocument = (document: KycDocument) => {
    try {
      const link = window.document.createElement('a');
      link.href = `data:${document.mimeType};base64,${document.fileData}`;
      link.download = document.fileName;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (error) {
      alert("Errore: Errore durante il download del documento");
    }
  };

  return (
    <div className="space-y-6">
      {/* KYC Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            KYC - Know Your Customer
          </CardTitle>
          <CardDescription>
            Verifica della tua identità secondo il standard EUFD2025-001
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge 
                variant={kycStatus === 'approved' ? 'default' : 'secondary'}
                className={kycStatus === 'approved' ? 'bg-green-100 text-green-800' : ''}
              >
                {kycStatus === 'approved' ? 'Verificato' : 
                 kycStatus === 'under-review' ? 'In Revisione' : 
                 kycStatus === 'rejected' ? 'Rifiutato' : 'In Attesa'}
              </Badge>
              {userRole === 'FAGRI Sales Team' && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  Modalità Dipendente
                </Badge>
              )}
            </div>
            <div className="text-sm text-gray-600">
              Documenti caricati: {documents.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual KYC Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Verifica Persona Fisica
          </CardTitle>
          <CardDescription>
            Documenti di identità personale richiesti
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Personal ID Front */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Documento di Identità (Fronte)</span>
                {hasDocument('personal_id_front') && getDocumentStatusIcon(documents.find(d => d.documentType === 'personal_id_front')?.verificationStatus || '')}
              </div>
              {hasDocument('personal_id_front') && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingDocument(documents.find(d => d.documentType === 'personal_id_front') || null)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Visualizza
                  </Button>
                </div>
              )}
            </div>
            
            {!hasDocument('personal_id_front') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.personalIdFront}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('personal_id_front', 'individual')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Documento
                </Button>
              </div>
            )}
            
            {hasDocument('personal_id_front') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'personal_id_front')?.fileName}
              </div>
            )}
          </div>

          {/* Personal ID Back */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Documento di Identità (Retro)</span>
                {hasDocument('personal_id_back') && getDocumentStatusIcon(documents.find(d => d.documentType === 'personal_id_back')?.verificationStatus || '')}
              </div>
              {hasDocument('personal_id_back') && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingDocument(documents.find(d => d.documentType === 'personal_id_back') || null)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Visualizza
                  </Button>
                </div>
              )}
            </div>
            
            {!hasDocument('personal_id_back') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.personalIdBack}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('personal_id_back', 'individual')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Documento
                </Button>
              </div>
            )}
            
            {hasDocument('personal_id_back') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'personal_id_back')?.fileName}
              </div>
            )}
          </div>

          {/* Address Proof */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Prova di Residenza</span>
                {hasDocument('address_proof') && getDocumentStatusIcon(documents.find(d => d.documentType === 'address_proof')?.verificationStatus || '')}
              </div>
              {hasDocument('address_proof') && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingDocument(documents.find(d => d.documentType === 'address_proof') || null)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Visualizza
                  </Button>
                </div>
              )}
            </div>
            
            {!hasDocument('address_proof') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.addressProof}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('address_proof', 'individual')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Documento
                </Button>
              </div>
            )}
            
            {hasDocument('address_proof') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'address_proof')?.fileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company KYC Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-green-600" />
            Verifica Azienda/Impresa
          </CardTitle>
          <CardDescription>
            Documenti aziendali secondo standard EUFD2025-001
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Entity Name Input for Company Documents */}
          <div className="space-y-2">
            <Label>Nome Azienda/Impresa</Label>
            <Input
              value={selectedEntityName}
              onChange={(e) => setSelectedEntityName(e.target.value)}
              placeholder="Inserisci il nome dell'azienda"
            />
          </div>

          {/* Company Registration */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Registrazione Azienda (Visura Camerale)</span>
                {hasDocument('company_registration') && getDocumentStatusIcon(documents.find(d => d.documentType === 'company_registration')?.verificationStatus || '')}
              </div>
              {hasDocument('company_registration') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDocument(documents.find(d => d.documentType === 'company_registration') || null)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Visualizza
                </Button>
              )}
            </div>
            
            {!hasDocument('company_registration') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.companyRegistration}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('company_registration', 'company')}
                  disabled={isLoading || !selectedEntityName}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Registrazione
                </Button>
              </div>
            )}
            
            {hasDocument('company_registration') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'company_registration')?.fileName}
              </div>
            )}
          </div>

          {/* Business License */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Licenza Commerciale/Partita IVA</span>
                {hasDocument('business_license') && getDocumentStatusIcon(documents.find(d => d.documentType === 'business_license')?.verificationStatus || '')}
              </div>
              {hasDocument('business_license') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDocument(documents.find(d => d.documentType === 'business_license') || null)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Visualizza
                </Button>
              )}
            </div>
            
            {!hasDocument('business_license') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.businessLicense}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('business_license', 'company')}
                  disabled={isLoading || !selectedEntityName}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Licenza
                </Button>
              </div>
            )}
            
            {hasDocument('business_license') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'business_license')?.fileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Management KYC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            Verifica Gestione/Amministratori
          </CardTitle>
          <CardDescription>
            Identificazione dei responsabili aziendali
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Management Upload Notes */}
          <div className="space-y-2">
            <Label>Note per Upload Gestione</Label>
            <Textarea
              value={uploadNotes}
              onChange={(e) => setUploadNotes(e.target.value)}
              placeholder="Inserisci note per identificare il responsabile (nome, ruolo, etc.)"
              className="min-h-[60px]"
            />
          </div>

          {/* Management ID */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">ID Responsabile/Amministratore</span>
                {hasDocument('management_id') && getDocumentStatusIcon(documents.find(d => d.documentType === 'management_id')?.verificationStatus || '')}
              </div>
              {hasDocument('management_id') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDocument(documents.find(d => d.documentType === 'management_id') || null)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Visualizza
                </Button>
              )}
            </div>
            
            {!hasDocument('management_id') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.managementId}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('management_id', 'management')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica ID Gestione
                </Button>
              </div>
            )}
            
            {hasDocument('management_id') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'management_id')?.fileName}
              </div>
            )}
          </div>

          {/* Authorization Letter */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Lettera di Autorizzazione</span>
                {hasDocument('authorization_letter') && getDocumentStatusIcon(documents.find(d => d.documentType === 'authorization_letter')?.verificationStatus || '')}
              </div>
              {hasDocument('authorization_letter') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingDocument(documents.find(d => d.documentType === 'authorization_letter') || null)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Visualizza
                </Button>
              )}
            </div>
            
            {!hasDocument('authorization_letter') && (
              <div className="space-y-3">
                <Input
                  ref={fileInputRefs.authorizationLetter}
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleFileUpload('authorization_letter', 'management')}
                  disabled={isLoading}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Carica Autorizzazione
                </Button>
              </div>
            )}
            
            {hasDocument('authorization_letter') && (
              <div className="text-sm text-green-600">
                ✓ Documento caricato: {documents.find(d => d.documentType === 'authorization_letter')?.fileName}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {getDocumentTypeLabel(viewingDocument.documentType)}
                </h2>
                <p className="text-sm text-gray-600">{viewingDocument.fileName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => downloadDocument(viewingDocument)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewingDocument(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto h-full">
              {viewingDocument.mimeType.startsWith('image/') ? (
                <img
                  src={`data:${viewingDocument.mimeType};base64,${viewingDocument.fileData}`}
                  alt={viewingDocument.fileName}
                  className="max-w-full h-auto mx-auto"
                />
              ) : viewingDocument.mimeType === 'application/pdf' ? (
                <iframe
                  src={`data:application/pdf;base64,${viewingDocument.fileData}`}
                  className="w-full h-[calc(90vh-200px)]"
                  title={viewingDocument.fileName}
                />
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Anteprima non disponibile per questo tipo di file</p>
                  <Button
                    onClick={() => downloadDocument(viewingDocument)}
                    className="mt-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download per Visualizzare
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin w-6 h-6 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
            <span>Caricamento documento in corso...</span>
          </div>
        </div>
      )}
    </div>
  );
}