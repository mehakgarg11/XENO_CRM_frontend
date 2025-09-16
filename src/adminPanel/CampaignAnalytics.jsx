import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  PieChart,
  Users,
  Mail,
  Download,
} from "lucide-react";
import { getCampaignPerformance } from "../services/analyticsService";
import { getCampaigns } from "../services/CampaignService";

const CampaignAnalytics = () => {
  const [selectedCampaign, setSelectedCampaign] = useState("all");
  const [timeRange, setTimeRange] = useState("7d"); // 7d | 30d | 90d | ytd
  const [loading, setLoading] = useState(true);

  const [campaigns, setCampaigns] = useState([
    { id: "all", name: "All Campaigns" },
  ]);

  const [cards, setCards] = useState({
    totalSent: 0,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    revenue: 0,
  });
  const [rows, setRows] = useState([]);

  // load campaign list for the dropdown
  useEffect(() => {
    (async () => {
      try {
        const { obj } = await getCampaigns(); // { status, obj: [...] }
        const list = (obj || []).map((c) => ({ id: c._id, name: c.name }));
        setCampaigns([{ id: "all", name: "All Campaigns" }, ...list]);
      } catch {
        // ignore silently; dropdown will still have "All"
      }
    })();
  }, []);

  // fetch analytics whenever filters change
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const rangeParam = timeRange; // backend supports 7d/30d/90d; add 'ytd' tweak as noted above
        const { cards, rows } = await getCampaignPerformance({
          range: rangeParam,
          campaign: selectedCampaign,
        });
        setCards(cards || {});
        setRows(rows || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedCampaign, timeRange]);

  const stats = useMemo(
    () => [
      {
        label: "Total Sent",
        value: (cards.totalSent ?? 0).toLocaleString(),
        icon: <Mail size={20} />,
      },
      {
        label: "Open Rate",
        value: `${cards.openRate ?? 0}%`,
        icon: <BarChart3 size={20} />,
      },
      {
        label: "Click Rate",
        value: `${cards.clickRate ?? 0}%`,
        icon: <PieChart size={20} />,
      },
      {
        label: "Conversion Rate",
        value: `${cards.conversionRate ?? 0}%`,
        icon: <Users size={20} />,
      },
    ],
    [cards]
  );

  const exportCSV = () => {
    const header = [
      "Campaign",
      "Sent",
      "Opened",
      "Clicked",
      "Converted",
      "Revenue",
    ];
    const lines = rows.map((r) =>
      [
        `"${String(r.name || "").replace(/"/g, '""')}"`,
        r.sent || 0,
        r.opened || 0,
        r.clicked || 0,
        r.converted || 0,
        r.revenue || 0,
      ].join(",")
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `campaign-performance-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Campaign Analytics
            </h1>
            <p className="text-gray-600 mt-2">
              Measure and optimize your marketing performance
            </p>
          </div>
        </div>

        {/* Filters & Export */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="ytd">Year to date</option>
              </select>
            </div>

            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Download size={16} />
              Export Report
            </button>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-6 h-28" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Campaign Performance Table */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Campaign Performance
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium text-gray-600">
                      Campaign
                    </th>
                    <th className="text-left py-3 font-medium text-gray-600">
                      Sent
                    </th>
                    <th className="text-left py-3 font-medium text-gray-600">
                      Opened
                    </th>
                    <th className="text-left py-3 font-medium text-gray-600">
                      Clicked
                    </th>
                    <th className="text-left py-3 font-medium text-gray-600">
                      Converted
                    </th>
                    <th className="text-left py-3 font-medium text-gray-600">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.campaignId}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 font-medium text-gray-900">
                        {r.name}
                      </td>
                      <td className="py-4">
                        {(r.sent || 0).toLocaleString()}
                      </td>
                      <td className="py-4">
                        {(r.opened || 0).toLocaleString()}
                      </td>
                      <td className="py-4">
                        {(r.clicked || 0).toLocaleString()}
                      </td>
                      <td className="py-4">
                        {(r.converted || 0).toLocaleString()}
                      </td>
                      <td className="py-4 font-medium text-green-600">
                        ₹{(r.revenue || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {!rows.length && !loading && (
                    <tr>
                      <td className="py-8 text-gray-500" colSpan={6}>
                        No campaigns found in this range.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Charts section – visuals stay placeholder for now */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Open Rate Over Time
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <BarChart3 size={40} className="mx-auto mb-2" />
                <p>Open rate chart visualization</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Conversion Rate
            </h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <PieChart size={40} className="mx-auto mb-2" />
                <p>Conversion rate chart visualization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;

