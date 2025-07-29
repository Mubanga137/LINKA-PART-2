'use client';

import { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  Calendar, 
  Filter, 
  Eye, 
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CreditCard,
  Smartphone,
  Building,
  Plus,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import RetailerDashboardLayout from '@/components/retailer/retailer-dashboard-layout';

// Mock earnings data
const earningsData = {
  totalEarnings: 245680,
  availableBalance: 18450,
  pendingPayouts: 5200,
  thisMonthEarnings: 32100,
  lastMonthEarnings: 28900,
  growthRate: 11.1,
  totalWithdrawals: 221030,
  commission: 0.05, // 5% platform commission
  avgOrderValue: 289.50
};

// Mock transaction history
const transactions = [
  {
    id: 'TXN-001',
    type: 'earning',
    description: 'Premium Wireless Headphones - Order #ORD-2024-001',
    amount: 459.99,
    commission: 23.00,
    netAmount: 436.99,
    date: '2024-01-22T14:30:00Z',
    status: 'completed',
    customer: 'Alexandra Chen',
    orderId: 'ORD-2024-001'
  },
  {
    id: 'TXN-002',
    type: 'payout',
    description: 'Withdrawal to MTN Money - +260977123456',
    amount: -15000,
    commission: 0,
    netAmount: -15000,
    date: '2024-01-21T10:15:00Z',
    status: 'completed',
    paymentMethod: 'MTN Money',
    reference: 'MTN-WD-001234'
  },
  {
    id: 'TXN-003',
    type: 'earning',
    description: 'Smart Fitness Watch - Order #ORD-2024-002',
    amount: 299.99,
    commission: 15.00,
    netAmount: 284.99,
    date: '2024-01-21T09:45:00Z',
    status: 'completed',
    customer: 'Marcus Johnson',
    orderId: 'ORD-2024-002'
  },
  {
    id: 'TXN-004',
    type: 'payout',
    description: 'Withdrawal to Airtel Money - +260966789012',
    amount: -8500,
    commission: 0,
    netAmount: -8500,
    date: '2024-01-20T16:20:00Z',
    status: 'pending',
    paymentMethod: 'Airtel Money',
    reference: 'ATL-WD-005678'
  },
  {
    id: 'TXN-005',
    type: 'earning',
    description: 'Designer Backpack - Order #ORD-2024-003',
    amount: 169.99,
    commission: 8.50,
    netAmount: 161.49,
    date: '2024-01-19T11:10:00Z',
    status: 'completed',
    customer: 'Sofia Rodriguez',
    orderId: 'ORD-2024-003'
  },
  {
    id: 'TXN-006',
    type: 'earning',
    description: 'Professional Camera Lens - Order #ORD-2024-004',
    amount: 899.99,
    commission: 45.00,
    netAmount: 854.99,
    date: '2024-01-18T13:25:00Z',
    status: 'pending',
    customer: 'David Kim',
    orderId: 'ORD-2024-004'
  }
];

// Mock payout history
const payoutHistory = [
  {
    id: 'PO-001',
    amount: 15000,
    method: 'MTN Money',
    account: '+260977123456',
    date: '2024-01-21T10:15:00Z',
    status: 'completed',
    reference: 'MTN-WD-001234',
    fee: 50
  },
  {
    id: 'PO-002',
    amount: 8500,
    method: 'Airtel Money',
    account: '+260966789012',
    date: '2024-01-20T16:20:00Z',
    status: 'pending',
    reference: 'ATL-WD-005678',
    fee: 30
  },
  {
    id: 'PO-003',
    amount: 12000,
    method: 'Bank Transfer',
    account: '****1234 - Zambia National Commercial Bank',
    date: '2024-01-18T09:30:00Z',
    status: 'completed',
    reference: 'ZNCB-001234',
    fee: 25
  },
  {
    id: 'PO-004',
    amount: 5500,
    method: 'MTN Money',
    account: '+260977123456',
    date: '2024-01-15T14:45:00Z',
    status: 'failed',
    reference: 'MTN-WD-009876',
    fee: 50,
    failureReason: 'Insufficient funds in mobile wallet'
  }
];

export default function EarningsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('');
  const [withdrawalAccount, setWithdrawalAccount] = useState('');

  const getTransactionIcon = (type: string, status: string) => {
    if (type === 'earning') {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    } else {
      return status === 'completed' ? 
        <ArrowDownLeft className="h-4 w-4 text-blue-600" /> :
        <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'MTN Money':
      case 'Airtel Money':
      case 'Zamtel Money':
        return <Smartphone className="h-4 w-4" />;
      case 'Bank Transfer':
        return <Building className="h-4 w-4" />;
      case 'Credit Card':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (transactionFilter === 'all') return true;
    return transaction.type === transactionFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return `K${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const handleWithdrawal = () => {
    // In a real app, this would make an API call
    console.log('Processing withdrawal:', {
      amount: withdrawalAmount,
      method: withdrawalMethod,
      account: withdrawalAccount
    });
    setShowWithdrawDialog(false);
    setWithdrawalAmount('');
    setWithdrawalMethod('');
    setWithdrawalAccount('');
  };

  return (
    <RetailerDashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Earnings & Payouts</h1>
            <p className="text-gray-600 mt-1">Track your revenue, commissions, and manage withdrawals</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Request Withdrawal
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Request Withdrawal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700 mb-1">Available Balance</p>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(earningsData.availableBalance)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount (ZMW)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(e.target.value)}
                      max={earningsData.availableBalance}
                    />
                    <p className="text-xs text-gray-500">
                      Minimum withdrawal: K100. Maximum: {formatCurrency(earningsData.availableBalance)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={withdrawalMethod} onValueChange={setWithdrawalMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mtn-money">
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            MTN Money (Fee: K50)
                          </div>
                        </SelectItem>
                        <SelectItem value="airtel-money">
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Airtel Money (Fee: K30)
                          </div>
                        </SelectItem>
                        <SelectItem value="zamtel-money">
                          <div className="flex items-center">
                            <Smartphone className="h-4 w-4 mr-2" />
                            Zamtel Money (Fee: K25)
                          </div>
                        </SelectItem>
                        <SelectItem value="bank-transfer">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            Bank Transfer (Fee: K25)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account">Account Details</Label>
                    <Input
                      id="account"
                      placeholder={
                        withdrawalMethod.includes('money') 
                          ? '+260 XXX XXX XXX' 
                          : 'Account number or details'
                      }
                      value={withdrawalAccount}
                      onChange={(e) => setWithdrawalAccount(e.target.value)}
                    />
                  </div>

                  {withdrawalAmount && withdrawalMethod && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Withdrawal Amount:</span>
                        <span>{formatCurrency(parseFloat(withdrawalAmount) || 0)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee:</span>
                        <span>
                          {withdrawalMethod === 'mtn-money' && 'K50'}
                          {withdrawalMethod === 'airtel-money' && 'K30'}
                          {withdrawalMethod === 'zamtel-money' && 'K25'}
                          {withdrawalMethod === 'bank-transfer' && 'K25'}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>You'll receive:</span>
                        <span>
                          {formatCurrency(
                            (parseFloat(withdrawalAmount) || 0) - 
                            (withdrawalMethod === 'mtn-money' ? 50 :
                             withdrawalMethod === 'airtel-money' ? 30 :
                             withdrawalMethod === 'zamtel-money' ? 25 :
                             withdrawalMethod === 'bank-transfer' ? 25 : 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleWithdrawal}
                    disabled={!withdrawalAmount || !withdrawalMethod || !withdrawalAccount}
                  >
                    Request Withdrawal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.availableBalance)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="mt-2">
                <Button size="sm" className="w-full">
                  Withdraw Funds
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.totalEarnings)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-600">+{earningsData.growthRate.toFixed(1)}% vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.thisMonthEarnings)}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-gray-600">
                  vs K{earningsData.lastMonthEarnings.toLocaleString()} last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(earningsData.pendingPayouts)}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-600">2 pending withdrawals</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Commission Structure</span>
                <Badge variant="outline">{(earningsData.commission * 100).toFixed(1)}% Platform Fee</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Your Revenue</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Platform Fee</span>
                  <span className="font-medium">5%</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
              
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Avg Order Value</p>
                    <p className="font-medium">{formatCurrency(earningsData.avgOrderValue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Withdrawals</p>
                    <p className="font-medium">{formatCurrency(earningsData.totalWithdrawals)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Recent Performance</span>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                    <SelectItem value="12m">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">Earnings Chart</p>
                  <p className="text-sm text-gray-500">Interactive earnings timeline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Transactions and Payouts */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <TabsList>
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="payouts">Payout History</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="earning">Earnings Only</SelectItem>
                  <SelectItem value="payout">Payouts Only</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {getTransactionIcon(transaction.type, transaction.status)}
                            <span className="ml-2 capitalize">{transaction.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            {transaction.customer && (
                              <p className="text-sm text-gray-500">Customer: {transaction.customer}</p>
                            )}
                            {transaction.reference && (
                              <p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className={transaction.type === 'earning' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {transaction.type === 'earning' ? '+' : ''}{formatCurrency(transaction.amount)}
                        </TableCell>
                        <TableCell>
                          {transaction.commission > 0 ? formatCurrency(transaction.commission) : '-'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {transaction.type === 'earning' ? '+' : ''}{formatCurrency(transaction.netAmount)}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(transaction.date)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payout History ({payoutHistory.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payoutHistory.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-mono text-sm">{payout.reference}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getPaymentMethodIcon(payout.method)}
                            <span className="ml-2">{payout.method}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{payout.account}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(payout.amount)}</TableCell>
                        <TableCell>{formatCurrency(payout.fee)}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {formatDate(payout.date)}
                        </TableCell>
                        <TableCell>
                          <div>
                            {getStatusBadge(payout.status)}
                            {payout.status === 'failed' && payout.failureReason && (
                              <p className="text-xs text-red-600 mt-1">{payout.failureReason}</p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <Download className="h-6 w-6 text-blue-600" />
                <span>Download Tax Report</span>
                <span className="text-xs text-gray-500">For accounting purposes</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <RefreshCw className="h-6 w-6 text-green-600" />
                <span>Set Auto-Withdrawal</span>
                <span className="text-xs text-gray-500">Automate your payouts</span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                <AlertCircle className="h-6 w-6 text-orange-600" />
                <span>Payment Support</span>
                <span className="text-xs text-gray-500">Get help with payouts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RetailerDashboardLayout>
  );
}
