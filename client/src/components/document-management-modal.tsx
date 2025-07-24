import React, { useState, useRef } from 'react';
import { useLanguage } from './language-provider';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Upload,
  Download,
  Share2,
  Trash2,
  Eye,
  Edit,
  Plus,
  Search,
  Filter,
  Archive,
  Clock,
  User,
  Tag,
  Folder,
  FileImage,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react';

interface DocumentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  documentType: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  lastModified: string;
  status: string;
  isPublic: string;
  tags: string[];
}

export function DocumentManagementModal({ isOpen, onClose }: DocumentManagementModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState('upload');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    isPublic: false,
  });

  // Mock documents data for demonstration
  const [documents] = useState<Document[]>([
    {
      id: '1',
      title: 'CO₂ Certification Standards',
      description: 'EUFD2025-001 standard documentation',
      category: 'certification',
      documentType: 'pdf',
      fileName: 'EUFD2025-001-standards.pdf',
      fileSize: '2.4 MB',
      uploadDate: '2025-01-15T10:30:00Z',
      lastModified: '2025-01-20T14:22:00Z',
      status: 'active',
      isPublic: 'true',
      tags: ['EUFD', 'ISO', 'certification'],
    },
    {
      id: '2',
      title: 'Project Compliance Report',
      description: 'Q4 2024 compliance documentation',
      category: 'compliance',
      documentType: 'pdf',
      fileName: 'compliance-report-q4-2024.pdf',
      fileSize: '1.8 MB',
      uploadDate: '2025-01-10T09:15:00Z',
      lastModified: '2025-01-10T09:15:00Z',
      status: 'active',
      isPublic: 'false',
      tags: ['compliance', 'quarterly', 'report'],
    },
  ]);

  const categories = [
    { value: 'certification', label: t('certification-documents'), icon: FileText },
    { value: 'compliance', label: t('compliance-documents'), icon: AlertCircle },
    { value: 'technical', label: t('technical-documents'), icon: FileSpreadsheet },
    { value: 'legal', label: t('legal-documents'), icon: FileText },
    { value: 'financial', label: t('financial-documents'), icon: FileSpreadsheet },
  ];

  const documentTypes = [
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'image', label: t('image-files'), icon: FileImage },
    { value: 'spreadsheet', label: t('spreadsheet-files'), icon: FileSpreadsheet },
    { value: 'text', label: t('text-files'), icon: FileText },
  ];

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'image': return FileImage;
      case 'spreadsheet': return FileSpreadsheet;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'certification': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'compliance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'technical': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'legal': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'financial': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadForm(prev => ({
        ...prev,
        title: prev.title || file.name.split('.')[0],
      }));
      
      toast({
        title: t('file-selected'),
        description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
      });
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: t('document-uploaded'),
      description: t('document-uploaded-successfully'),
    });
    
    // Reset form
    setUploadForm({
      title: '',
      description: '',
      category: '',
      tags: '',
      isPublic: false,
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-slate-800 flex items-center space-x-3">
            <Folder className="h-6 w-6 text-emerald-700" />
            <span>{t('document-management')}</span>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload" className="flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>{t('upload-documents')}</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>{t('manage-documents')}</span>
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>{t('shared-documents')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Upload Documents Tab */}
          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-emerald-700" />
                  <span>{t('upload-new-document')}</span>
                </CardTitle>
                <CardDescription>
                  {t('upload-document-description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">{t('document-title')}</Label>
                      <Input
                        id="title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder={t('enter-document-title')}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">{t('category')}</Label>
                      <Select 
                        value={uploadForm.category} 
                        onValueChange={(value) => setUploadForm(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('select-category')} />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              <div className="flex items-center space-x-2">
                                <cat.icon className="h-4 w-4" />
                                <span>{cat.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">{t('description')}</Label>
                    <Textarea
                      id="description"
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={t('enter-document-description')}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">{t('tags')}</Label>
                    <Input
                      id="tags"
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder={t('enter-tags-comma-separated')}
                    />
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                    <div className="space-y-4">
                      <Upload className="h-12 w-12 text-slate-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-slate-700">{t('click-to-upload')}</p>
                        <p className="text-sm text-slate-500">{t('or-drag-and-drop')}</p>
                        <p className="text-xs text-slate-400 mt-2">{t('supported-formats')}: PDF, JPG, PNG, XLSX, DOCX</p>
                      </div>
                      <Button type="button" onClick={handleFileUpload} className="bg-emerald-700 hover:bg-emerald-800">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('select-file')}
                      </Button>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.jpg,.jpeg,.png,.xlsx,.docx,.txt"
                  />

                  <div className="flex justify-end space-x-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                      {t('cancel')}
                    </Button>
                    <Button type="submit" className="bg-emerald-700 hover:bg-emerald-800">
                      <Upload className="h-4 w-4 mr-2" />
                      {t('upload-document')}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Documents Tab */}
          <TabsContent value="manage" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t('search-documents')}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('all-categories')}</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents List */}
            <div className="grid gap-4">
              {filteredDocuments.map((doc) => {
                const DocumentIcon = getDocumentIcon(doc.documentType);
                return (
                  <Card key={doc.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="p-3 bg-slate-100 rounded-lg">
                            <DocumentIcon className="h-6 w-6 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-slate-800">{doc.title}</h3>
                              <Badge className={getCategoryColor(doc.category)}>
                                {categories.find(c => c.value === doc.category)?.label}
                              </Badge>
                              {doc.isPublic === 'true' && (
                                <Badge variant="outline" className="text-xs">
                                  {t('public')}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-3">{doc.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatDate(doc.uploadDate)}</span>
                              </span>
                              <span>{doc.fileSize}</span>
                              <span>{doc.fileName}</span>
                            </div>
                            {doc.tags.length > 0 && (
                              <div className="flex items-center space-x-2 mt-2">
                                <Tag className="h-3 w-3 text-slate-400" />
                                <div className="flex flex-wrap gap-1">
                                  {doc.tags.map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            {t('view')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-1" />
                            {t('download')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4 mr-1" />
                            {t('share')}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            {t('edit')}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredDocuments.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">{t('no-documents-found')}</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Shared Documents Tab */}
          <TabsContent value="shared" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Share2 className="h-5 w-5 text-emerald-700" />
                  <span>{t('shared-with-me')}</span>
                </CardTitle>
                <CardDescription>
                  {t('documents-shared-by-others')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Share2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">{t('no-shared-documents')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}