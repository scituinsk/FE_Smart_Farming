import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { getTermsService } from "../../services/account-service";
import { Loader2, AlertCircle } from "lucide-react";

const PrivacyPolicyPage = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await getTermsService();
        // Ambil string content
        let rawText = response.data?.content || response.content || "";

        if (rawText) {
          const formatted = rawText
            .replace(/\\r\\n/g, "\n")
            .replace(/^Privacy Policy$/m, "# Privacy Policy")
            .replace(/^(Last updated:.*)$/m, "_$1_\n\n---\n\n")
            .replace(
              /^(Interpretation and Definitions|Collecting and Using Your Personal Data|Use of Your Personal Data|Retention of Your Personal Data|Transfer of Your Personal Data|Delete Your Personal Data|Disclosure of Your Personal Data|Security of Your Personal Data|Children\'s Privacy|Links to Other Websites|Changes to this Privacy Policy|Contact Us)$/gm,
              "## $1",
            )
            .replace(
              /^(Interpretation|Definitions|Types of Data Collected|Personal Data|Usage Data|Information Collected while Using the Application|Business Transactions|Law enforcement|Other legal requirements)$/gm,
              "### $1",
            )
            .replace(/^\s*•/gm, "*");
          setContent(formatted);
        }
        setLoading(false);
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error("Dev Only Error:", err);
        }
        setError("Gagal memuat dokumen. Periksa koneksi internet Anda.");
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-600 mb-4" />
        <p className="text-slate-500 font-medium">Memuat Dokumen Legal...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 p-4">
        <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-red-100 max-w-md w-full">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">
            Terjadi Kesalahan
          </h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-[850px] mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
        <article>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2 pb-2"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-2xl font-bold text-slate-700 mt-10 mb-4 block border-b border-slate-100 pb-2"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg font-bold text-slate-600 mt-6 mb-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className="text-[15px] leading-relaxed text-slate-500 mb-4"
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc pl-5 mb-4 space-y-2 text-slate-500"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="text-[15px] pl-1 leading-relaxed" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a
                  className="text-emerald-600 font-medium hover:underline hover:text-emerald-700 transition-colors"
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr className="my-8 border-slate-200" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-slate-700" {...props} />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
