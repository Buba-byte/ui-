import React, { useState } from 'react';
import { DocumentItem } from '../../types';
import { Search, FileText, CheckCircle2, ShieldCheck, Download, Eye, Plus, Sparkles } from 'lucide-react';

interface DocumentsScreenProps {
  documents: DocumentItem[];
  onViewDocument: (doc: DocumentItem) => void;
  onAddDocument: (newDoc: DocumentItem) => void;
}

export const DocumentsScreen: React.FC<DocumentsScreenProps> = ({
  documents,
  onViewDocument,
  onAddDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const tags = ['All', 'KRA', 'SHA', 'Permit', 'BRS', 'CR12', 'Receipt'];

  const filteredDocs = documents.filter((doc) => {
    const matchesTag =
      selectedTag === 'All' ||
      doc.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
      doc.category.toLowerCase().includes(selectedTag.toLowerCase());

    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.referenceNo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTag && matchesSearch;
  });

  const handleSimulateUpload = () => {
    const newRef = `CR12-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: 'Uploaded Compliance Document',
      agency: 'County / KRA Portal',
      category: 'Certificate',
      referenceNo: newRef,
      issueDate: 'Today',
      fileSize: '450 KB',
      isVerified: true,
      tags: ['Uploaded', 'Verification'],
      taxDeductible: true,
      downloadUrl: '#',
    };
    onAddDocument(newDoc);
  };

  return (
    <div className="p-4 space-y-4 text-slate-900 pb-10">
      {/* Header Bar */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Document Vault</h1>
          <p className="text-xs text-slate-500">Automated Receipt Intelligence & Verification</p>
        </div>

        <button
          onClick={handleSimulateUpload}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl shadow-xs transition flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload</span>
        </button>
      </div>

      {/* Intelligence Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-2xl p-3.5 shadow-xs border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">Receipt Intelligence Active</div>
            <p className="text-[10px] text-slate-300">
              {documents.length} official documents cryptographically archived and ready for KRA audits.
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, PIN, or reference number..."
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
        />
      </div>

      {/* Filter Tag Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Documents List */}
      <div className="space-y-2.5">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            onClick={() => onViewDocument(doc)}
            className="cursor-pointer bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs transition hover:shadow-md hover:border-emerald-300 flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 truncate">
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-700 flex items-center justify-center shrink-0 transition">
                <FileText className="w-5 h-5" />
              </div>

              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-xs text-slate-900 truncate">{doc.title}</h3>
                  {doc.isVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Verified" />
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  Ref: {doc.referenceNo} • {doc.agency}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-slate-400">{doc.issueDate}</span>
                  {doc.taxDeductible && (
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-md">
                      KRA Tax Deductible
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Action Icons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDocument(doc);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
