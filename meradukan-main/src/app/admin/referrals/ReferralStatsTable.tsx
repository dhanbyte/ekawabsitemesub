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

export default ReferralStatsTable;