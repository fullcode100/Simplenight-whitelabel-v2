import React, { useState } from 'react';
interface Props {
  pdf: string;
}

export const PDFViewer = ({ pdf }: Props) => {
  return (
    <embed src={pdf} type="application/pdf" width="100%" height="1080px" />
  );
};
