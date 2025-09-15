// src/adminPanel/CampaignHistory.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2, XCircle, BarChart3 } from "lucide-react";
import { getCampaignHistory } from "../services/CampaignService";

function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700";
    case "active":
      return "bg-blue-100 text-blue-700";
    case "scheduled":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function deriveStatus(audience, sent, failed) {
  const total = Number(audience || 0);
  const done = Number(sent || 0) + Number(failed || 0);
  if (total > 0 && done >= total) return "completed";
  if ((sent || 0) > 0 && done < total) return "active";
  if (total > 0 && (sent || 0) === 0) return "scheduled";
  return "draft";
}

const CampaignHistory = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { obj } = await getCampaignHistory();
        setRows(Array.isArray(obj) ? obj : []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // make sure newest is on top even if backend changes later
  const data = useMemo(
    () =>
      [...rows].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [rows]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            to="/admin"
            className="p-2 bg-white rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign History</h1>
            <p className="text-gray-600 mt-2">Past campaigns & delivery stats</p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="p-6 text-gray-500">No campaigns yet.</div>
          ) : (
            <div className="space-y-4">
              {data.map((c) => {
                const audience =
                  Number(c.audienceCount ?? c.audienceSize ?? c.audience ?? 0);
                const sent = Number(c.sent ?? 0);
                const failed = Number(c.failed ?? 0);
                const attempts = sent + failed;

                const status = deriveStatus(audience, sent, failed);

                // % of intended audience that received a message
                const pctSentOfAudience =
                  audience > 0 ? Math.round((sent / audience) * 100) : 0;

                // delivery success: sent / (sent + failed)
                const successRate =
                  attempts > 0 ? Math.round((sent / attempts) * 100) : 0;

                const sentWidth =
                  attempts > 0 ? Math.round((sent / attempts) * 100) : 0;
                const failedWidth = Math.max(0, 100 - sentWidth);

                return (
                  <div
                    key={c._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    {/* Left: icon + title + date */}
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Mail size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{c.name}</h3>
                        <p className="text-sm text-gray-600">
                          {new Date(c.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Right: numbers + chips */}
                    <div className="flex items-center gap-8">
                      {/* Audience + Delivery numbers */}
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          Audience: {audience.toLocaleString()}
                        </p>

                        {/* Numbers with percent beside "sent" */}
                        <p className="text-xs text-gray-600 flex items-center gap-3 justify-end">
                          <span className="inline-flex items-center gap-1 text-green-700">
                            <CheckCircle2 size={14} />
                            {sent.toLocaleString()} sent
                            <span className="text-gray-500">
                              ({pctSentOfAudience}%)
                            </span>
                          </span>

                          <span className="inline-flex items-center gap-1 text-red-600">
                            <XCircle size={14} />
                            {failed.toLocaleString()} failed
                          </span>

                          <span className="inline-flex items-center gap-1 text-blue-700">
                            <BarChart3 size={14} />
                            {successRate}% success
                          </span>
                        </p>

                        {/* tiny delivery progress bar */}
                        <div className="mt-1 w-48 h-2 rounded-full bg-gray-200 overflow-hidden ml-auto">
                          <div
                            className="h-2 bg-green-500 inline-block"
                            style={{ width: `${sentWidth}%` }}
                          />
                          {failedWidth > 0 && (
                            <div
                              className="h-2 bg-red-400 inline-block"
                              style={{ width: `${failedWidth}%` }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Status chip */}
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          status
                        )}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignHistory;
