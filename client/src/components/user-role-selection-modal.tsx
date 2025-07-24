import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from './language-provider';
import { X, Shield, Users, User, Crown, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

interface UserRoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRoleSelected: (role: 'sales-team' | 'fagri-member' | 'non-member') => void;
  onMembershipApplicationOpen: () => void;
}

export function UserRoleSelectionModal({ isOpen, onClose, onRoleSelected, onMembershipApplicationOpen }: UserRoleSelectionModalProps) {
  const { t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<'sales-team' | 'fagri-member' | 'non-member' | null>(null);

  const roles = [
    {
      id: 'sales-team' as const,
      icon: Crown,
      title: t('sales-team'),
      description: t('sales-team-desc'),
      features: [
        t('admin-rights'),
        t('create-accounts-clients'),
        t('manage-customer-relationships'),
        t('full-platform-access'),
        t('client-management-dashboard')
      ],
      buttonText: t('select-sales-team'),
      color: 'bg-purple-600',
      borderColor: 'border-purple-200',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-800'
    },
    {
      id: 'fagri-member' as const,
      icon: Users,
      title: t('fagri-member'),
      description: t('fagri-member-desc'),
      features: [
        t('member-access'),
        t('co2-certification-applications'),
        t('alphag8-id-registration'),
        t('platform-features'),
        t('personal-account-only')
      ],
      buttonText: t('select-member'),
      color: 'bg-emerald-600',
      borderColor: 'border-emerald-200',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-800'
    },
    {
      id: 'non-member' as const,
      icon: User,
      title: t('non-member'),
      description: t('non-member-desc'),
      features: [
        t('membership-needed'),
        t('must-become-fagri-member'),
        t('limited-access-until-membership'),
        t('membership-application-required'),
        t('no-co2-features-without-membership')
      ],
      buttonText: t('become-member'),
      color: 'bg-amber-600',
      borderColor: 'border-amber-200',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-800'
    }
  ];

  const handleRoleSelection = (roleId: 'sales-team' | 'fagri-member' | 'non-member') => {
    setSelectedRole(roleId);
    onRoleSelected(roleId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="pb-6">
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-slate-100 rounded-lg">
              <Shield className="h-8 w-8 text-slate-700" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-light text-slate-900">
                {t('role-selection')}
              </DialogTitle>
              <p className="text-slate-600 font-light">
                {t('select-your-role')}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Role Selection Cards - Fixed Height for Symmetry */}
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => {
              const Icon = role.icon;
              
              return (
                <Card key={role.id} className={`h-[500px] flex flex-col transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  selectedRole === role.id ? `ring-2 ring-offset-2 ${role.borderColor}` : 'hover:border-slate-300'
                } ${role.borderColor}`}>
                  <CardHeader className="text-center pb-4 flex-shrink-0">
                    <div className={`mx-auto p-4 rounded-full w-16 h-16 flex items-center justify-center ${role.bgColor}`}>
                      <Icon className={`h-8 w-8 ${role.textColor}`} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 min-h-[28px]">
                      {role.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-light min-h-[48px] flex items-center justify-center">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2 flex-1">
                      {role.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-600 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      onClick={() => {
                        if (role.id === 'non-member') {
                          onMembershipApplicationOpen();
                          onClose();
                        } else {
                          handleRoleSelection(role.id);
                        }
                      }}
                      className={`w-full ${role.color} hover:opacity-90 text-white mt-4`}
                    >
                      {role.id === 'non-member' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{role.buttonText}</span>
                        </div>
                      ) : (
                        role.buttonText
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Non-Member Notice */}
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-800">{t('membership-required')}</h3>
                  <p className="text-amber-700 font-light mt-1">
                    {t('membership-required-desc')}
                  </p>
                  <p className="text-amber-700 font-light mt-2">
                    {t('non-members-must-apply-desc')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Level Information */}
          <div className="bg-slate-100 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-3">{t('user-roles')}</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <Badge className="bg-purple-100 text-purple-800 mb-2">Sales Team</Badge>
                <p className="text-slate-600">Can open accounts for others and manage clients with full administrative rights.</p>
              </div>
              <div>
                <Badge className="bg-emerald-100 text-emerald-800 mb-2">FAGRI Member</Badge>
                <p className="text-slate-600">Full access to platform features but can only register their own account.</p>
              </div>
              <div>
                <Badge className="bg-amber-100 text-amber-800 mb-2">Non-Member</Badge>
                <p className="text-slate-600">Must become a FAGRI member before accessing any CO₂ certification features.</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}