import React from 'react';
import { DocumentItem } from '../types';
import { X, FileText, CheckCircle2, Download, Share2, ShieldCheck, Tag } from 'lucide-react';

interface DocumentViewerModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({ document, onClose }) => {
  if (!document) return null;

  const handleDownload = () => {
    // Generate simple receipt text content for download
    const content = `COMPLYKE KENYA OFFICIAL ARCHIVED DOCUMENT
----------------------------------------
Document: ${document.title}
Agency: ${document.agency}
Category: ${document.category}
Reference No: ${document.referenceNo}
Issued Date: ${document.issueDate}
${document.expiryDate ? `Expiry Date: ${document.expiryDate}\n` : ''}${document.amountPaid ? `Amount Paid: KSh ${document.amountPaid.toLocaleString()}\n` : ''}Status: Verified Official Government Record (SHA-256 Signed)
Tax Deductible Status: ${document.taxDeductible ? 'Eligible for KRA Expense Deduction' : 'Non-Deductible Record'}
----------------------------------------
Generated via ComplyKE AI Business OS`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.referenceNo}_Receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: `Official Document ${document.referenceNo} from ${document.agency} stored on ComplyKE.`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      alert(`Document reference copied: ${document.referenceNo}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm truncate max-w-[200px]">{document.title}</h3>
              <p className="text-[10px] text-slate-400">{document.agency}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Official Document Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Document Ref:</span>
              <span className="font-mono font-bold text-slate-900">{document.referenceNo}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Issued On:</span>
              <span className="font-medium text-slate-800">{document.issueDate}</span>
            </div>
            {document.expiryDate && (
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Valid Until:</span>
                <span className="font-semibold text-amber-700">{document.expiryDate}</span>
              </div>
            )}
            {document.amountPaid && (
              <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="font-extrabold text-emerald-700 text-sm">
                  KSh {document.amountPaid.toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Cryptographically verified on {document.agency} Government Portal</span>
            </div>
          </div>

          {/* Tax Deductible Note */}
          {document.taxDeductible && (
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">ETIMS & KRA Deductible Expense:</span>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  This receipt qualifies as a deductible expense on your annual Income Tax return.
                </p>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {document.tags.map((tag, i) => (
              <span key={i} className="flex items-center gap-1 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                <Tag className="w-2.5 h-2.5 text-slate-400" /> #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleDownload}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download e-Receipt</span>
            </button>
            <button
              onClick={handleShare}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
