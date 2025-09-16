import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Users, Plus, X, Trash2, Bot, Sparkles } from "lucide-react";
import { previewAudience, createCampaign } from "../services/CampaignService";
import { generateAIPersona } from "../services/aiService";
import ReactMarkdown from 'react-markdown';

const emptyRule = { field: "", operator: "", value: "" };

function makeCond({ field, operator, value }) {
  const v = String(value ?? "").trim();
  if (!field || !operator || v === "") return null;

  const asNum = Number(v);
  const now = Date.now();

  if (field === "spend") {
    if (!Number.isFinite(asNum)) return null;
    const key = "totalSpend";
    if (operator === ">") return { [key]: { $gt: asNum } };
    if (operator === "<") return { [key]: { $lt: asNum } };
    if (operator === "!=") return { [key]: { $ne: asNum } };
    return { [key]: asNum };
  }

  if (field === "visits") {
    if (!Number.isFinite(asNum)) return null;
    const key = "visits";
    if (operator === ">") return { [key]: { $gt: asNum } };
    if (operator === "<") return { [key]: { $lt: asNum } };
    if (operator === "!=") return { [key]: { $ne: asNum } };
    return { [key]: asNum };
  }

  if (field === "lastPurchase") {
    if (!Number.isFinite(asNum)) return null;
    const threshold = new Date(now - asNum * 24 * 60 * 60 * 1000);
    if (operator === ">") return { lastOrderAt: { $lte: threshold } };
    if (operator === "<") return { lastOrderAt: { $gt: threshold } };
    if (operator === "!=") return { lastOrderAt: { $ne: threshold } };
    const start = new Date(threshold);
    const end = new Date(threshold); end.setDate(end.getDate() + 1);
    return { lastOrderAt: { $gte: start, $lt: end } };
  }

  if (field === "location") {
    if (operator === "!=") return { location: { $ne: v } };
    return { location: v };
  }

  return null;
}

function buildQueryFromGroups(groups) {
  const ors = [];
  (groups || []).forEach((g) => {
    const ands = [];
    (g.rules || []).forEach((r) => {
      const c = makeCond(r);
      if (c) ands.push(c);
    });
    if (ands.length === 1) ors.push(ands[0]);
    else if (ands.length > 1) ors.push({ $and: ands });
  });
  if (ors.length === 0) return {};
  if (ors.length === 1) return ors[0];
  return { $or: ors };
}

/*function suggestRulesFromText(txt) {
  const out = [];
  const s = (txt || "").toLowerCase();

  const spent = /spent.*(\d{3,})/.exec(s) || /over\s*₹?\s*(\d{3,})/.exec(s);
  if (spent) out.push({ field: "spend", operator: ">", value: spent[1] });

  const months = /(\d+)\s*(months?|m)/.exec(s);
  const days = /(\d+)\s*(days?|d)/.exec(s);
  if (months) out.push({ field: "lastPurchase", operator: ">", value: String(Number(months[1]) * 30) });
  else if (days) out.push({ field: "lastPurchase", operator: ">", value: days[1] });

  const visitsLess = /visits?.*(less|<)\s*(\d+)/.exec(s);
  if (visitsLess) out.push({ field: "visits", operator: "<", value: visitsLess[2] });

  return out.length ? out : [{ ...emptyRule }];
}*/

export default function CampaignCreate() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [basics, setBasics] = useState({ name: "", description: "", objective: "" });
  const [groups, setGroups] = useState([{ rules: [{ ...emptyRule }] }]);
  //const [nlPrompt, setNlPrompt] = useState("");
  const [audience, setAudience] = useState(null);
  const [message, setMessage] = useState("");
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [launching, setLaunching] = useState(false);

  // Nayi state variables
  const [persona, setPersona] = useState("");
  const [personaLoading, setPersonaLoading] = useState(false);

  const query = useMemo(() => buildQueryFromGroups(groups), [groups]);
  const anyRule = useMemo(() => {
    return (groups || []).some((g) =>
      (g.rules || []).some((r) => r.field && r.operator && String(r.value ?? "").trim() !== "")
    );
  }, [groups]);

  // Group operations
  const addGroup = () => setGroups((prev) => [...prev, { rules: [{ ...emptyRule }] }]);
  const removeGroup = (gi) =>
    setGroups((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== gi)));
  const addRuleTo = (gi) =>
    setGroups((prev) =>
      prev.map((g, i) => (i === gi ? { ...g, rules: [...g.rules, { ...emptyRule }] } : g))
    );
  const removeRuleFrom = (gi, ri) =>
    setGroups((prev) =>
      prev.map((g, i) =>
        i !== gi
          ? g
          : {
              ...g,
              rules: g.rules.length === 1 ? g.rules : g.rules.filter((_, j) => j !== ri),
            }
      )
    );
  const updateRuleIn = (gi, ri, key, val) =>
    setGroups((prev) =>
      prev.map((g, i) =>
        i !== gi ? g : { ...g, rules: g.rules.map((r, j) => (j === ri ? { ...r, [key]: val } : r)) }
      )
    );
  
  // Naya function: AI Persona generate karein
  async function generatePersona() {
    if (!anyRule) {
        alert("Please create at least one audience rule to generate a persona.");
        return;
    }
    try {
        setPersonaLoading(true);
        setPersona("");
        const res = await generateAIPersona(query);
        setPersona(res.persona);
    } catch (err) {
        console.error("Persona generation failed", err);
        setPersona("Could not generate persona. Please try refining your audience.");
    } finally {
        setPersonaLoading(false);
    }
  }

  // Purane functions
  async function doPreview() {
    try {
      setLoadingPreview(true);
      const r = await previewAudience(query);
      setAudience(r?.audienceCount ?? 0);
    } catch (e) {
      alert("Preview failed");
    } finally {
      setLoadingPreview(false);
    }
  }

  async function handleLaunch() {
    try {
      if (!basics.name.trim()) return alert("Please enter a campaign name");
      if (!anyRule) return alert("Add at least one audience rule");
      setLaunching(true);

      const createdBy =
        JSON.parse(localStorage.getItem("user") || "{}").email ||
        localStorage.getItem("userEmail") ||
        "webuser";

      const payload = {
        name: basics.name.trim(),
        description: basics.description || "",
        objective: basics.objective || "custom",
        rule: query,
        message,
        createdBy,
      };

      const resp = await createCampaign(payload);
      if (resp?.status) navigate("/admin/history");
      else throw new Error(resp?.error || "Unknown error");
    } catch (e) {
      alert(e?.message || "Launch failed");
    } finally {
      setLaunching(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* header */}
        <div className="flex items-center gap-6 mb-8">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border bg-white hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
              Create Campaign
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Build targeted campaigns</p>
          </div>
        </div>

        {/* steps bar */}
        <div className="bg-white/80 rounded-2xl border shadow p-6 mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((id, i) => (
              <div key={id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold
                  ${
                    id === step
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow"
                      : id < step
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {id < step ? "✓" : id}
                </div>
                <div className="ml-3 hidden sm:block text-slate-700">
                  {id === 1 && <>Campaign Basics</>}
                  {id === 2 && <>Build Audience</>}
                  {id === 3 && <>Create Message</>}
                  {id === 4 && <>Review & Launch</>}
                </div>
                {i < 3 && (
                  <div
                    className={`w-16 h-1 mx-6 rounded-full ${
                      id < step ? "bg-emerald-400" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* content card */}
        <div className="bg-white/80 rounded-2xl border shadow overflow-hidden p-8">
          {/* --- Step 1 --- */}
          {step === 1 && (
            <div>
              <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 grid place-items-center mb-6">
                <div className="w-8 h-8 bg-white/20 rounded-full" />
              </div>
              <h2 className="text-center text-3xl font-bold mb-2">Campaign Basics</h2>
              <p className="text-center text-slate-600 mb-8">Let's start with the fundamentals</p>

              <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Name *</label>
              <input
                value={basics.name}
                onChange={(e) => setBasics((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g., Summer Sale 2024, Welcome New Users"
                className="w-full mb-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={basics.description}
                onChange={(e) => setBasics((p) => ({ ...p, description: e.target.value }))}
                placeholder="Briefly describe the goal..."
                className="w-full mb-6 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <label className="block text-sm font-medium text-slate-700 mb-2">Campaign Objective *</label>
              <select
                value={basics.objective}
                onChange={(e) => setBasics((p) => ({ ...p, objective: e.target.value }))}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select your campaign objective</option>
                <option value="promotion">Promotion</option>
                <option value="winback">Winback</option>
                <option value="announcement">Announcement</option>
                <option value="custom">Custom</option>
              </select>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!basics.name.trim() || !basics.objective}
                  className={`px-6 py-3 rounded-xl text-white font-semibold
                    ${
                      !basics.name.trim() || !basics.objective
                        ? "bg-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                    }`}
                >
                  Next: Build Audience →
                </button>
              </div>
            </div>
          )}

          {/* --- Step 2 --- */}
          {step === 2 && (
            <div>
              <h2 className="text-3xl font-bold mb-2">Build Your Audience</h2>
              <p className="text-slate-600 mb-6">
                Combine conditions with <b>ALL</b> inside a group and <b>ANY</b> across groups.
              </p>

              

              <div className="space-y-6">
                {groups.map((g, gi) => (
                  <div key={gi} className="rounded-2xl border bg-white">
                    <div className="flex items-center justify-between p-4 border-b">
                      <div className="font-semibold">
                        Group {gi + 1} <span className="text-slate-500">(ALL conditions)</span>
                      </div>
                      <button
                        onClick={() => removeGroup(gi)}
                        disabled={groups.length === 1}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg ${
                          groups.length === 1
                            ? "text-slate-300 bg-slate-100 cursor-not-allowed"
                            : "text-red-600 bg-red-50 hover:bg-red-100"
                        }`}
                      >
                        <Trash2 size={14} /> Remove Group
                      </button>
                    </div>

                    <div className="p-4 space-y-3">
                      {g.rules.map((r, ri) => (
                        <div
                          key={ri}
                          className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-white p-3 rounded-lg border"
                        >
                          <select
                            value={r.field}
                            onChange={(e) => updateRuleIn(gi, ri, "field", e.target.value)}
                            className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select field</option>
                            <option value="spend">Total Spend</option>
                            <option value="visits">Number of Visits</option>
                            <option value="lastPurchase">Days Since Last Purchase</option>
                            <option value="location">Location</option>
                          </select>

                          <select
                            value={r.operator}
                            onChange={(e) => updateRuleIn(gi, ri, "operator", e.target.value)}
                            className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select operator</option>
                            <option value=">">Greater Than</option>
                            <option value="<">Less Than</option>
                            <option value="=">Equals</option>
                            <option value="!=">Not Equals</option>
                          </select>

                          <input
                            value={r.value}
                            onChange={(e) => updateRuleIn(gi, ri, "value", e.target.value)}
                            placeholder="Enter value"
                            className="px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <button
                            onClick={() => removeRuleFrom(gi, ri)}
                            className="text-slate-500 hover:text-red-600 justify-self-start md:justify-self-end"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => addRuleTo(gi)}
                        className="inline-flex items-center gap-2 text-blue-700 font-medium"
                      >
                        <Plus size={16} /> Add Condition
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-slate-600">
                Match <b>ANY</b> group (<b>OR</b>) — within a group: <b>ALL</b> (<b>AND</b>)
              </div>

              <div className="mt-3">
                <button
                  onClick={addGroup}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700"
                >
                  <Plus size={16} /> Add Group
                </button>
              </div>

              <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-blue-600" />
                  <p className="font-medium">Audience Size Preview</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={doPreview}
                    disabled={!anyRule || loadingPreview}
                    className={`px-4 py-2 rounded-xl text-white font-semibold
                      ${
                        !anyRule || loadingPreview
                          ? "bg-slate-300 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                      }`}
                  >
                    {loadingPreview ? "Calculating..." : "Preview"}
                  </button>
                  <span className="text-slate-700">
                    {audience != null
                      ? `${audience.toLocaleString()} customers`
                      : anyRule
                      ? "This campaign will target approximately…"
                      : "Add at least one rule"}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={18} className="text-indigo-600" />
                    <p className="font-medium">AI Customer Persona</p>
                </div>
                <p className="text-sm text-slate-600 mb-3">Get an AI-generated profile of the ideal customer in this segment.</p>
                
                <button
                    onClick={generatePersona}
                    disabled={!anyRule || personaLoading}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white font-semibold
                      ${!anyRule || personaLoading ? "bg-slate-300 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95"}`}
                >
                    <Bot size={16} />
                    {personaLoading ? "Generating..." : "Generate Persona"}
                </button>

                {persona && (
                    <div className="mt-4 p-4 bg-white rounded-lg border prose prose-sm max-w-full">
                        <ReactMarkdown>{persona}</ReactMarkdown>
                    </div>
                )}
              </div>

              <div className="mt-10 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!anyRule}
                  className={`px-6 py-3 rounded-xl text-white font-semibold
                    ${
                      !anyRule
                        ? "bg-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                    }`}
                >
                  Next: Create Message →
                </button>
              </div>
            </div>
          )}

          {/* --- Step 3 --- */}
          {step === 3 && (
            <div>
              <h2 className="text-3xl font-bold mb-2">Create Your Message</h2>
              <p className="text-slate-600 mb-6">Craft the perfect message for your audience</p>

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Campaign Message *
              </label>
              <textarea
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi {{name}}, we've got a special offer just for you…"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <div className="mt-10 flex justify-between">
                <button onClick={() => setStep(2)} className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300">
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!message.trim()}
                  className={`px-6 py-3 rounded-xl text-white font-semibold
                    ${
                      !message.trim()
                        ? "bg-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95"
                    }`}
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* --- Step 4 --- */}
          {step === 4 && (
            <div>
              <h2 className="text-3xl font-bold mb-6">Review & Launch</h2>

              <div className="bg-slate-50 rounded-xl border p-5 mb-6">
                <h3 className="font-semibold mb-2">Campaign Details</h3>
                <p>
                  <span className="font-medium">Name:</span> {basics.name || "—"}
                </p>
                <p>
                  <span className="font-medium">Description:</span> {basics.description || "—"}
                </p>
                <p>
                  <span className="font-medium">Objective:</span> {basics.objective || "—"}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border p-5 mb-6">
                <h3 className="font-semibold mb-2">Audience</h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white font-medium">
                  {audience != null ? `${audience} customers` : "Run preview to see size"}
                </div>
                <p className="text-slate-500 mt-2 text-sm">Based on your group rule set</p>
              </div>

              <div className="bg-slate-50 rounded-xl border p-5 mb-6">
                <h3 className="font-semibold mb-2">Message</h3>
                <div className="px-4 py-3 rounded-lg bg-white border text-slate-800 whitespace-pre-wrap">
                  {message || "—"}
                </div>
              </div>

              <div className="mt-10 flex justify-between">
                <button onClick={() => setStep(3)} className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300">
                  Back
                </button>
                <button
                  onClick={handleLaunch}
                  disabled={launching || !basics.name.trim() || !anyRule}
                  className={`px-6 py-3 rounded-xl text-white font-semibold
                    ${
                      launching || !basics.name.trim() || !anyRule
                        ? "bg-slate-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-95"
                    }`}
                >
                  {launching ? "Launching…" : "Launch"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
