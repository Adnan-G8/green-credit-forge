import { useState, useRef } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Upload, FileText, User, Building2, X, CheckCircle2, Clock, AlertCircle, Shield, Camera, Lock } from 'lucide-react';
import personalKycImage from '@assets/image_1753788790320.png';
import companyKycImage from '@assets/image_1753788836028.png';

interface KYCDocument {
  id: string;
  type: 'personal' | 'company';
  name: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadDate: Date;
  file?: File;
}

interface KYCUploadSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KYCUploadSectionRedesigned({ isOpen, onClose }: KYCUploadSectionProps) {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<KYCDocument[]>([]);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const personalDocuments = [
    { id: 'id-front', name: t('kyc-id-document-front'), required: true },
    { id: 'id-back', name: t('kyc-id-document-back'), required: true },
    { id: 'address-proof', name: t('kyc-address-proof'), required: true },
    { id: 'selfie', name: t('kyc-selfie-verification'), required: false },
  ];

  const companyDocuments = [
    { id: 'business-registration', name: t('kyc-business-registration'), required: true },
    { id: 'tax-certificate', name: t('kyc-tax-certificate'), required: true },
    { id: 'director-id', name: t('kyc-director-identification'), required: true },
    { id: 'company-proof', name: t('kyc-company-address-proof'), required: false },
  ];

  const handleFileUpload = async (documentId: string, type: 'personal' | 'company') => {
    const fileInput = fileInputRefs.current[documentId];
    if (!fileInput?.files?.[0]) return;

    const file = fileInput.files[0];
    setUploadingId(documentId);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newDocument: KYCDocument = {
        id: documentId,
        type,
        name: type === 'personal' 
          ? personalDocuments.find(d => d.id === documentId)?.name || ''
          : companyDocuments.find(d => d.id === documentId)?.name || '',
        status: 'pending',
        uploadDate: new Date(),
        file
      };

      setDocuments(prev => {
        const filtered = prev.filter(d => d.id !== documentId);
        return [...filtered, newDocument];
      });

      alert(t('kyc-document-uploaded-success'));
    } catch (error) {
      alert(t('kyc-upload-failed'));
    } finally {
      setUploadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle2 className="w-3 h-3 mr-1" />{t('kyc-status-approved')}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200"><AlertCircle className="w-3 h-3 mr-1" />{t('kyc-status-rejected')}</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200"><Clock className="w-3 h-3 mr-1" />{t('kyc-status-pending')}</Badge>;
    }
  };

  const getDocumentStatus = (documentId: string) => {
    return documents.find(d => d.id === documentId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
        <DialogHeader className="border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-light text-slate-800">
                  KYC - Know Your Customer
                </DialogTitle>
                <DialogDescription className="text-slate-600 mt-1">
                  {t('kyc-verification-description')}
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-6">
          {/* Personal KYC Section */}
          <div className="space-y-6">
            <Card className="border-blue-200 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={personalKycImage} 
                      alt="Personal KYC" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 font-light flex items-center">
                      <User className="h-5 w-5 mr-2 text-blue-500" />
                      {t('kyc-personal-verification')}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {t('kyc-personal-documents-required')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {personalDocuments.map((doc) => {
                  const status = getDocumentStatus(doc.id);
                  const isUploading = uploadingId === doc.id;
                  
                  return (
                    <div key={doc.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-slate-700">{doc.name}</span>
                          {doc.required && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                              {t('kyc-required')}
                            </Badge>
                          )}
                        </div>
                        {status && getStatusBadge(status.status)}
                      </div>
                      
                      <input
                        type="file"
                        ref={el => fileInputRefs.current[doc.id] = el}
                        onChange={() => handleFileUpload(doc.id, 'personal')}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      
                      <Button
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-md"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t('kyc-uploading')}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {status ? t('kyc-replace-document') : t('kyc-upload-document')}
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Company KYC Section */}
          <div className="space-y-6">
            <Card className="border-emerald-200 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={companyKycImage} 
                      alt="Company KYC" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-emerald-100 bg-slate-800 p-2"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Building2 className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-800 font-light flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-emerald-500" />
                      {t('kyc-company-verification')}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {t('kyc-company-documents-required')}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {companyDocuments.map((doc) => {
                  const status = getDocumentStatus(doc.id);
                  const isUploading = uploadingId === doc.id;
                  
                  return (
                    <div key={doc.id} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-slate-700">{doc.name}</span>
                          {doc.required && (
                            <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                              {t('kyc-required')}
                            </Badge>
                          )}
                        </div>
                        {status && getStatusBadge(status.status)}
                      </div>
                      
                      <input
                        type="file"
                        ref={el => fileInputRefs.current[doc.id] = el}
                        onChange={() => handleFileUpload(doc.id, 'company')}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                      
                      <Button
                        onClick={() => fileInputRefs.current[doc.id]?.click()}
                        disabled={isUploading}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white border-0 shadow-md"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {t('kyc-uploading')}
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            {status ? t('kyc-replace-document') : t('kyc-upload-document')}
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-center space-x-3">
            <Lock className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-slate-800">{t('kyc-security-notice-title')}</h4>
              <p className="text-sm text-slate-600 mt-1">{t('kyc-security-notice-description')}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-slate-200 pt-6">
          <div className="flex justify-between items-center w-full">
            <div className="text-sm text-slate-600">
              {t('kyc-documents-uploaded')}: {documents.length}
            </div>
            <div className="space-x-3">
              <Button variant="outline" onClick={onClose} className="border-slate-300 text-slate-600 hover:bg-slate-50">
                {t('close')}
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-md"
                onClick={() => {
                  alert(t('kyc-submit-verification'));
                  onClose();
                }}
              >
                {t('kyc-submit-verification')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}