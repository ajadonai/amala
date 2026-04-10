'use client';

import { FileTextIcon } from '@/components/icons';

export function ArticleDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-outline"
      aria-label="Save article as PDF"
    >
      <FileTextIcon size={15} />
      Save as PDF
    </button>
  );
}
