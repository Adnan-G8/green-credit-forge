import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useLanguage } from '@/components/language-provider';
import { 
  FileText, 
  Image, 
  Eye, 
  Download, 
  Calendar,
  FileImage,
  File,
  Paperclip,
  X
} from 'lucide-react';

interface DocumentItem {
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  category: 'document' | 'image';
  content?: string; // Base64 content for display
}

interface DocumentDisplayProps {
  documents: DocumentItem[];
  title: string;
  category?: string;
  className?: string;
}

export function DocumentDisplay({ documents, title, category, className = '' }: DocumentDisplayProps) {
  const { t } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<DocumentItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="h-5 w-5 text-blue-600" />;
    }
    return <FileText className="h-5 w-5 text-green-600" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (type.includes('pdf')) return 'bg-red-50 text-red-700 border-red-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const handleViewDocument = (doc: DocumentItem) => {
    setSelectedDocument(doc);
    setIsViewerOpen(true);
  };

  const handleDownloadDocument = (doc: DocumentItem) => {
    if (doc.content) {
      const link = document.createElement('a');
      link.href = doc.content;
      link.download = doc.name;
      link.click();
    }
  };

  if (!documents || documents.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Paperclip className="h-5 w-5 text-gray-400" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <File className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">Nessun documento caricato</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Paperclip className="h-5 w-5 text-emerald-600" />
            {title}
            <Badge variant="outline" className="ml-auto">
              {documents.length} {documents.length === 1 ? 'file' : 'file'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {getFileIcon(doc.type)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getFileTypeColor(doc.type)}`}>
                        {doc.type.split('/')[1]?.toUpperCase() || 'FILE'}
                      </Badge>
                      <span className="text-xs text-gray-500">{formatFileSize(doc.size)}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.uploadDate).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDocument(doc)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadDocument(doc)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && getFileIcon(selectedDocument.type)}
              {selectedDocument?.name}
            </DialogTitle>
            <DialogDescription>
              Anteprima documento - {selectedDocument?.type} - {selectedDocument && formatFileSize(selectedDocument.size)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[70vh] p-4">
            {selectedDocument && selectedDocument.type.startsWith('image/') ? (
              <div className="flex justify-center">
                <img
                  src={selectedDocument.content}
                  alt={selectedDocument.name}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : selectedDocument?.type.includes('pdf') ? (
              <div className="flex justify-center">
                <iframe
                  src={selectedDocument.content}
                  className="w-full h-[60vh] rounded-lg border"
                  title={selectedDocument.name}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Anteprima non disponibile</p>
                <p className="text-sm text-gray-500 mt-2">
                  Utilizzare il pulsante download per visualizzare questo documento
                </p>
                <Button
                  onClick={() => selectedDocument && handleDownloadDocument(selectedDocument)}
                  className="mt-4"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Scarica Documento
                </Button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => selectedDocument && handleDownloadDocument(selectedDocument)}
            >
              <Download className="h-4 w-4 mr-2" />
              Scarica
            </Button>
            <Button onClick={() => setIsViewerOpen(false)}>
              Chiudi
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}