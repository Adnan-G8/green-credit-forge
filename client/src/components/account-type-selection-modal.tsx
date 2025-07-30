import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';
import { X, Building2, Shield, FileCheck, Users, Settings, Eye, ArrowRight, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AccountTypeSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  fagriId: string;
  onAccountTypeSelected?: (accountType: string, fagriId: string) => void;
}

type AccountType = 'corporate' | 'admin' | 'certification';

interface AccountTypeInfo {
  id: AccountType;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  accessLevel: string;
  color: string;
  requirements: string[];
}

export function AccountTypeSelectionModal({ 
  isOpen, 
  onClose, 
  fagriId,
  onAccountTypeSelected 
}: AccountTypeSelectionModalProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<AccountType | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const accountTypes: AccountTypeInfo[] = [
    {
      id: 'corporate',
      icon: <Building2 className="h-8 w-8" />,
      title: t('corporate-farmer-account'),
      description: t('corporate-account-description'),
      features: [
        t('manage-multiple-co2-projects'),
        t('team-member-access-control'),
        t('company-certification-tracking'),
        t('financial-reporting-tools'),
        t('bulk-project-submissions'),
        t('corporate-dashboard-access')
      ],
      accessLevel: t('full-certification-access'),
      color: 'emerald',
      requirements: [
        t('valid-fagri-id-required'),
        t('company-registration-documents'),
        t('authorized-representative-verification'),
        t('corporate-kyc-completion')
      ]
    },
    {
      id: 'admin',
      icon: <Shield className="h-8 w-8" />,
      title: t('admin-management-account'),
      description: t('admin-account-description'),
      features: [
        t('full-platform-administration'),
        t('user-account-management'),
        t('system-configuration-access'),
        t('comprehensive-reporting-tools'),
        t('audit-trail-monitoring'),
        t('security-settings-control'),
        t('global-dashboard-overview')
      ],
      accessLevel: t('complete-system-access'),
      color: 'blue',
      requirements: [
        t('valid-fagri-id-required'),
        t('administrator-authorization'),
        t('enhanced-security-verification'),
        t('management-approval-required')
      ]
    },
    {
      id: 'certification',
      icon: <FileCheck className="h-8 w-8" />,
      title: t('certification-control-account'),
      description: t('certification-account-description'),
      features: [
        t('application-review-access'),
        t('document-verification-tools'),
        t('certification-approval-workflow'),
        t('audit-documentation-system'),
        t('compliance-monitoring-dashboard'),
        t('quality-control-interfaces')
      ],
      accessLevel: t('certification-authority-access'),
      color: 'orange',
      requirements: [
        t('valid-fagri-id-required'),
        t('certification-authority-credentials'),
        t('professional-qualifications-verification'),
        t('audit-office-authorization')
      ]
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'border' | 'text' | 'hover') => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        hover: 'hover:bg-emerald-100'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        hover: 'hover:bg-blue-100'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        hover: 'hover:bg-orange-100'
      }
    };
    return colorMap[color]?.[type] || '';
  };

  const handleAccountTypeSelect = (type: AccountType) => {
    setSelectedType(type);
  };

  const handleCreateAccount = async () => {
    if (!selectedType) return;

    setIsCreating(true);
    
    try {
      // Simulate account creation process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get existing account data
      const existingAccount = JSON.parse(localStorage.getItem(`account_${fagriId}`) || '{}');
      
      // Update account with selected type
      const updatedAccount = {
        ...existingAccount,
        accountType: selectedType,
        accountPermissions: getAccountPermissions(selectedType),
        lastUpdated: new Date().toISOString()
      };

      // Store updated account information
      localStorage.setItem(`account_${fagriId}`, JSON.stringify(updatedAccount));
      
      toast({
        title: t('account-type-created'),
        description: t('account-setup-completed'),
      });

      if (onAccountTypeSelected) {
        onAccountTypeSelected(selectedType, fagriId);
      }

      onClose();
    } catch (error) {
      toast({
        title: t('creation-failed'),
        description: t('please-try-again'),
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const getAccountPermissions = (type: AccountType) => {
    switch (type) {
      case 'corporate':
        return {
          canManageProjects: true,
          canViewReports: true,
          canManageTeam: true,
          canAccessDashboard: true,
          canSubmitApplications: true,
          canViewCertifications: true,
          isAdmin: false,
          isCertificationAuthority: false
        };
      case 'admin':
        return {
          canManageProjects: true,
          canViewReports: true,
          canManageTeam: true,
          canAccessDashboard: true,
          canSubmitApplications: true,
          canViewCertifications: true,
          canManageUsers: true,
          canAccessSystemSettings: true,
          canViewAuditTrail: true,
          isAdmin: true,
          isCertificationAuthority: false
        };
      case 'certification':
        return {
          canViewApplications: true,
          canReviewDocuments: true,
          canApproveCertifications: true,
          canAccessAuditTools: true,
          canManageCompliance: true,
          canViewReports: true,
          canAccessDashboard: true,
          isAdmin: false,
          isCertificationAuthority: true
        };
      default:
        return {};
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-light text-slate-800">
              {t('select-account-type')}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-slate-600">
            {t('fagri-id')}: <span className="font-mono font-medium">{fagriId}</span>
          </p>
        </DialogHeader>

        <div className="px-8 py-8">
          {/* Account Type Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {accountTypes.map((accountType) => (
              <Card
                key={accountType.id}
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  selectedType === accountType.id
                    ? `${getColorClasses(accountType.color, 'border')} ${getColorClasses(accountType.color, 'bg')} shadow-lg`
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
                onClick={() => handleAccountTypeSelect(accountType.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    selectedType === accountType.id
                      ? `bg-${accountType.color}-600 text-white`
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {accountType.icon}
                  </div>
                  <CardTitle className="text-lg font-medium text-slate-800">
                    {accountType.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600">
                    {accountType.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Access Level */}
                  <div className={`p-3 rounded-lg ${getColorClasses(accountType.color, 'bg')}`}>
                    <div className="flex items-center space-x-2">
                      <Shield className={`h-4 w-4 ${getColorClasses(accountType.color, 'text')}`} />
                      <span className={`text-sm font-medium ${getColorClasses(accountType.color, 'text')}`}>
                        {accountType.accessLevel}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">
                      {t('key-features')}
                    </h4>
                    <ul className="space-y-1">
                      {accountType.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs text-slate-600">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 mb-2">
                      {t('requirements')}
                    </h4>
                    <ul className="space-y-1">
                      {accountType.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs text-slate-600">
                          <Eye className="h-3 w-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selection Confirmation */}
          {selectedType && (
            <Card className="border-2 border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      {accountTypes.find(type => type.id === selectedType)?.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-green-800">
                        {accountTypes.find(type => type.id === selectedType)?.title}
                      </h3>
                      <p className="text-sm text-green-700">
                        {t('selected-account-type')}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateAccount}
                    disabled={isCreating}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    {isCreating ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        {t('creating-account')}
                      </>
                    ) : (
                      <>
                        {t('create-account')}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Information Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-medium text-blue-800 mb-3">
              {t('important-information')}
            </h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• {t('account-type-determines-access-level')}</li>
              <li>• {t('all-accounts-require-fagri-id-verification')}</li>
              <li>• {t('additional-verification-may-be-required')}</li>
              <li>• {t('account-permissions-can-be-modified-later')}</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}