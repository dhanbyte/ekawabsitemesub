'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

type Referral = {
  id: string;
  referrerId: string;
  referrerEmail: string;
  refereeId: string;
  refereeEmail: string;
  amount: number;
  orderAmount: number;
  status: string;
  createdAt: string;
};

type User = {
  id: string;
  email: string;
  referralBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
};

export default function AdminReferrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [referralStats, setReferralStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('referrals');
  const router = useRouter();
  
  // Mock admin check for now
  const user = { id: 'admin' };
  const isAdmin = true;
  
  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      router.push('/');
      return;
    }
    
    fetchData();
  }, [activeTab]);
  
  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'referrals') {
        setReferrals([
          { id: '1', referrerId: 'user1', referrerEmail: 'john@example.com', refereeId: 'user2', refereeEmail: 'jane@example.com', amount: 50, orderAmount: 1000, status: 'completed', createdAt: '2024-01-15' }
        ]);
      } else if (activeTab === 'users') {
        setUsers([
          { id: 'user1', email: 'john@example.com', referralBalance: 125, totalEarned: 500, totalWithdrawn: 375 }
        ]);
      } else {
        setReferralStats([
          {
            referrerId: 'user1',
            referrerEmail: 'john@example.com',
            referrerName: 'John Doe',
            totalReferred: 5,
            successfulReferrals: 3,
            totalPurchases: 8,
            totalRevenue: 12500,
            referredUsers: [
              { email: 'jane@example.com', name: 'Jane Smith', purchases: 3, totalSpent: 4500, joinDate: '2024-01-10' },
              { email: 'mike@example.com', name: 'Mike Johnson', purchases: 2, totalSpent: 3000, joinDate: '2024-01-12' }
            ]
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Access Denied. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Referral Management</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('referrals')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'referrals'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Referral History
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            User Balances
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'stats'
                ? 'border-brand-500 text-brand-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Referral Stats
          </button>
        </nav>
      </div>
      
      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      ) : activeTab === 'referrals' ? (
        <ReferralHistoryTable referrals={referrals} />
      ) : activeTab === 'users' ? (
        <UserBalancesTable users={users} />
      ) : (
        <ReferralStatsTable stats={referralStats} />
      )}
    </div>
  );
}

function ReferralHistoryTable({ referrals }: { referrals: Referral[] }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referrer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Referee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reward
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {referrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="font-medium">{referral.referrerEmail}</div>
                  <div className="text-gray-500 text-xs">{referral.referrerId.substring(0, 8)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{referral.refereeEmail}</div>
                  <div className="text-gray-500 text-xs">{referral.refereeId.substring(0, 8)}...</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{referral.orderAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  +₹{referral.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(referral.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    referral.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {referral.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReferralStatsTable({ stats }: { stats: any[] }) {
  return (
    <div className="space-y-6">
      {stats.map((stat) => (
        <div key={stat.referrerId} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{stat.referrerName}</h3>
                <p className="text-sm text-gray-500">{stat.referrerEmail}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹{stat.totalRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Total Revenue Generated</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{stat.totalReferred}</div>
                <div className="text-xs text-gray-500">Total Referred</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{stat.successfulReferrals}</div>
                <div className="text-xs text-gray-500">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600">{stat.totalPurchases}</div>
                <div className="text-xs text-gray-500">Total Purchases</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-orange-600">{((stat.successfulReferrals / stat.totalReferred) * 100).toFixed(1)}%</div>
                <div className="text-xs text-gray-500">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4">
            <h4 className="font-medium text-gray-900 mb-3">Referred Users & Their Purchases:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Join Date</th>
                    <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Purchases</th>
                    <th className="text-left py-2 text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {stat.referredUsers.map((user: any, index: number) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2">
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="py-2 text-sm text-gray-600">{user.joinDate}</td>
                      <td className="py-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {user.purchases} orders
                        </span>
                      </td>
                      <td className="py-2 font-medium text-green-600">₹{user.totalSpent.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function UserBalancesTable({ users }: { users: User[] }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Earned
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{user.referralBalance?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  ₹{user.totalEarned?.toFixed(2) || '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    {(user.referralBalance || 0) > 0 && (
                      <button 
                        onClick={() => {
                          // Process payout
                          console.log('Process payout for:', user.email)
                        }}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200"
                      >
                        Process Payout
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        // View referral history
                        console.log('View history for:', user.email)
                      }}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
                    >
                      View History
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
