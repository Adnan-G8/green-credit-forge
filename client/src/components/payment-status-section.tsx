import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Euro, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  CreditCard,
  Building2,
  Receipt,
  FileText,
  Copy,
  Download
} from 'lucide-react';


interface ProjectPayment {
  id: string;
  fagriIdKey: string;
  projectId: string;
  paymentType: string;
  amount: number; // in cents
  vatAmount: number; // in cents
  totalAmount: number; // in cents
  paymentStatus: string;
  paymentMethod?: string;
  transactionReference?: string;
  paymentDate?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  paymentNotes?: string;
  createdAt: string;
}

interface PaymentStatusSectionProps {
  fagriIdKey: string;
  userRole: string;
  projects: any[];
  onPaymentUpdate: () => void;
}

export function PaymentStatusSection({ fagriIdKey, userRole, projects, onPaymentUpdate }: PaymentStatusSectionProps) {
  const { t } = useLanguage();
  const [payments, setPayments] = useState<ProjectPayment[]>([]);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('bank_transfer');
  const [transactionRef, setTransactionRef] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState<string | null>(null);

  // Load existing payments
  useEffect(() => {
    loadPayments();
  }, [fagriIdKey]);

  const loadPayments = () => {
    try {
      const storedPayments = JSON.parse(localStorage.getItem('projectPayments') || '[]');
      const userPayments = storedPayments.filter((payment: ProjectPayment) => payment.fagriIdKey === fagriIdKey);
      setPayments(userPayments);
    } catch (error) {
      console.error('Error loading payments:', error);
    }
  };

  const calculateProjectCost = (projectIndex: number, totalProjects: number) => {
    // First project: €42 + VAT
    // Additional projects: €12 + VAT each
    const baseAmount = projectIndex === 0 ? 4200 : 1200; // in cents
    const vatRate = 0.22; // 22% VAT
    const vatAmount = Math.round(baseAmount * vatRate);
    const totalAmount = baseAmount + vatAmount;

    return {
      baseAmount,
      vatAmount,
      totalAmount,
      paymentType: projectIndex === 0 ? 'first_project' : 'additional_project'
    };
  };

  const getUnpaidProjects = () => {
    return projects.filter(project => {
      const projectPayment = payments.find(p => p.projectId === project.id);
      return !projectPayment || projectPayment.paymentStatus === 'pending';
    });
  };

  const getTotalUnpaidAmount = () => {
    const unpaidProjects = getUnpaidProjects();
    let totalAmount = 0;

    unpaidProjects.forEach((project, index) => {
      const existingProjectCount = projects.indexOf(project);
      const cost = calculateProjectCost(existingProjectCount, projects.length);
      totalAmount += cost.totalAmount;
    });

    return totalAmount;
  };

  const formatCurrency = (amountInCents: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(amountInCents / 100);
  };

  const submitPaymentConfirmation = async (projectId: string) => {
    if (!transactionRef.trim()) {
      alert("Errore: Inserisci il riferimento della transazione");
      return;
    }

    setIsSubmittingPayment(true);

    try {
      const projectIndex = projects.findIndex(p => p.id === projectId);
      const cost = calculateProjectCost(projectIndex, projects.length);

      const newPayment: ProjectPayment = {
        id: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fagriIdKey,
        projectId,
        paymentType: cost.paymentType,
        amount: cost.baseAmount,
        vatAmount: cost.vatAmount,
        totalAmount: cost.totalAmount,
        paymentStatus: userRole === 'FAGRI Sales Team' ? 'verified' : 'received',
        paymentMethod: selectedPaymentMethod,
        transactionReference: transactionRef,
        paymentDate: new Date().toISOString(),
        verifiedBy: userRole === 'FAGRI Sales Team' ? fagriIdKey : undefined,
        verifiedDate: userRole === 'FAGRI Sales Team' ? new Date().toISOString() : undefined,
        paymentNotes: paymentNotes || undefined,
        createdAt: new Date().toISOString(),
      };

      // Save payment to localStorage
      const storedPayments = JSON.parse(localStorage.getItem('projectPayments') || '[]');
      storedPayments.push(newPayment);
      localStorage.setItem('projectPayments', JSON.stringify(storedPayments));

      // Add to audit trail
      const auditEntry = {
        id: `AUDIT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fagriIdKey,
        actionType: 'payment_received',
        actionDetails: JSON.stringify({
          projectId,
          amount: cost.totalAmount,
          paymentMethod: selectedPaymentMethod,
          transactionReference: transactionRef,
          verifiedBy: userRole === 'FAGRI Sales Team' ? fagriIdKey : 'pending',
        }),
        performedBy: fagriIdKey,
        performedByType: userRole === 'FAGRI Sales Team' ? 'employee' : 'user',
        relatedId: newPayment.id,
        createdAt: new Date().toISOString(),
      };

      const auditTrail = JSON.parse(localStorage.getItem('auditTrail') || '[]');
      auditTrail.push(auditEntry);
      localStorage.setItem('auditTrail', JSON.stringify(auditTrail));

      // Update project payment status in localStorage
      const storedProjects = JSON.parse(localStorage.getItem('userProjects') || '[]');
      const updatedProjects = storedProjects.map((project: any) => {
        if (project.id === projectId) {
          return {
            ...project,
            paymentStatus: newPayment.paymentStatus,
            paymentReference: transactionRef,
          };
        }
        return project;
      });
      localStorage.setItem('userProjects', JSON.stringify(updatedProjects));

      setPayments([...payments, newPayment]);
      setTransactionRef('');
      setPaymentNotes('');
      setShowPaymentForm(null);

      alert(userRole === 'FAGRI Sales Team' 
        ? "Pagamento verificato e confermato" 
        : "Conferma di pagamento inviata. In attesa di verifica.");

      onPaymentUpdate();

    } catch (error) {
      console.error('Error submitting payment:', error);
      alert("Errore: Errore durante la conferma del pagamento");
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'received': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verificato';
      case 'received': return 'Ricevuto';
      case 'pending': return 'In Attesa';
      case 'failed': return 'Fallito';
      default: return 'Sconosciuto';
    }
  };

  const copyBankDetails = () => {
    const bankDetails = `FAGRI DIGITAL S.r.l.
Via Isonzo 38, 00198 Roma
IBAN: IT60 X054 2811 1010 0000 0123 456
BIC: BPMOIT22XXX
Causale: Certificazione CO₂ - ${fagriIdKey}`;

    navigator.clipboard.writeText(bankDetails);
    alert("Dettagli bancari copiati negli appunti");
  };

  const generatePaymentReceipt = (payment: ProjectPayment) => {
    const project = projects.find(p => p.id === payment.projectId);
    const receiptContent = `
RICEVUTA DI PAGAMENTO
FAGRI DIGITAL S.r.l.
Via Isonzo 38, 00198 Roma

Cliente: ${fagriIdKey}
Progetto: ${project?.projectName || project?.projectType}
Data: ${new Date(payment.createdAt).toLocaleDateString('it-IT')}

Importo Base: ${formatCurrency(payment.amount)}
IVA (22%): ${formatCurrency(payment.vatAmount)}
Totale: ${formatCurrency(payment.totalAmount)}

Metodo di Pagamento: ${payment.paymentMethod === 'bank_transfer' ? 'Bonifico Bancario' : 'Carta di Credito'}
Riferimento: ${payment.transactionReference}
Status: ${getPaymentStatusText(payment.paymentStatus)}

${payment.verifiedBy ? `Verificato da: ${payment.verifiedBy}` : ''}
${payment.verifiedDate ? `Data Verifica: ${new Date(payment.verifiedDate).toLocaleDateString('it-IT')}` : ''}
`;

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `ricevuta-${payment.id}.txt`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Payment Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Euro className="h-5 w-5 text-green-600" />
            Stato Pagamenti
          </CardTitle>
          <CardDescription>
            Gestione pagamenti per certificazione CO₂ secondo tariffario FAGRI Digital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 text-blue-700 mb-1">
                <Receipt className="h-4 w-4" />
                <span className="font-medium">Totale Progetti</span>
              </div>
              <div className="text-2xl font-bold text-blue-800">
                {projects.length}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Pagamenti Verificati</span>
              </div>
              <div className="text-2xl font-bold text-green-800">
                {payments.filter(p => p.paymentStatus === 'verified').length}
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-700 mb-1">
                <AlertCircle className="h-4 w-4" />
                <span className="font-medium">In Attesa</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">
                {getUnpaidProjects().length}
              </div>
            </div>
          </div>
          
          {getTotalUnpaidAmount() > 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-orange-800">Importo Totale da Pagare</div>
                  <div className="text-2xl font-bold text-orange-900">
                    {formatCurrency(getTotalUnpaidAmount())}
                  </div>
                </div>
                <Button
                  onClick={copyBankDetails}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copia Dati Bancari
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            Istruzioni per il Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Dati Bancari FAGRI DIGITAL S.r.l.</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <div><strong>Beneficiario:</strong> FAGRI DIGITAL S.r.l.</div>
              <div><strong>Indirizzo:</strong> Via Isonzo 38, 00198 Roma</div>
              <div><strong>IBAN:</strong> IT60 X054 2811 1010 0000 0123 456</div>
              <div><strong>BIC:</strong> BPMOIT22XXX</div>
              <div><strong>Causale:</strong> Certificazione CO₂ - {fagriIdKey}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-2">Tariffario Ufficiale</h4>
            <div className="text-sm text-gray-700 space-y-1">
              <div>• <strong>Primo Progetto:</strong> €42,00 + IVA (22%) = €51,24</div>
              <div>• <strong>Progetti Aggiuntivi:</strong> €12,00 + IVA (22%) = €14,64 ciascuno</div>
              <div>• <strong>Verifica KYC inclusa</strong> nel costo del progetto</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Payment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Stato Pagamenti per Progetto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project, index) => {
              const projectPayment = payments.find(p => p.projectId === project.id);
              const cost = calculateProjectCost(index, projects.length);
              const isPaid = projectPayment && projectPayment.paymentStatus !== 'pending';

              return (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">
                        {project.projectName || `Progetto ${project.projectType} #${project.id.slice(-6)}`}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {cost.paymentType === 'first_project' ? 'Primo Progetto' : 'Progetto Aggiuntivo'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {formatCurrency(cost.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Base: {formatCurrency(cost.baseAmount)} + IVA: {formatCurrency(cost.vatAmount)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {projectPayment && getPaymentStatusIcon(projectPayment.paymentStatus)}
                      <Badge 
                        variant={isPaid ? 'default' : 'secondary'}
                        className={isPaid ? 'bg-green-100 text-green-800' : ''}
                      >
                        {projectPayment ? getPaymentStatusText(projectPayment.paymentStatus) : 'Non Pagato'}
                      </Badge>
                      {projectPayment?.transactionReference && (
                        <span className="text-xs text-gray-500">
                          Rif: {projectPayment.transactionReference}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {projectPayment && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generatePaymentReceipt(projectPayment)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Ricevuta
                        </Button>
                      )}
                      
                      {!isPaid && (
                        <Button
                          onClick={() => setShowPaymentForm(project.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CreditCard className="h-3 w-3 mr-1" />
                          Conferma Pagamento
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Payment Form */}
                  {showPaymentForm === project.id && (
                    <div className="mt-4 pt-4 border-t space-y-4">
                      <div className="space-y-3">
                        <div>
                          <Label>Metodo di Pagamento</Label>
                          <select
                            value={selectedPaymentMethod}
                            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="bank_transfer">Bonifico Bancario</option>
                            <option value="credit_card">Carta di Credito</option>
                          </select>
                        </div>

                        <div>
                          <Label>Riferimento Transazione *</Label>
                          <Input
                            value={transactionRef}
                            onChange={(e) => setTransactionRef(e.target.value)}
                            placeholder="Inserisci CRO, TRN o riferimento della transazione"
                            required
                          />
                        </div>

                        <div>
                          <Label>Note Aggiuntive</Label>
                          <Textarea
                            value={paymentNotes}
                            onChange={(e) => setPaymentNotes(e.target.value)}
                            placeholder="Note opzionali sul pagamento"
                            className="min-h-[60px]"
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => submitPaymentConfirmation(project.id)}
                            disabled={isSubmittingPayment || !transactionRef.trim()}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {isSubmittingPayment ? (
                              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            ) : (
                              <CheckCircle className="h-4 w-4 mr-2" />
                            )}
                            Conferma Pagamento
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setShowPaymentForm(null)}
                            disabled={isSubmittingPayment}
                          >
                            Annulla
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {userRole === 'FAGRI Sales Team' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              Modalità Dipendente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-purple-800 text-sm">
                Come dipendente FAGRI, i tuoi pagamenti sono automaticamente verificati.
                I progetti possono iniziare immediatamente la fase di revisione.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}