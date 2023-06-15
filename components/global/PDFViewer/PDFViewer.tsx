import React, { useState } from 'react';
interface Props {
  pdf: string;
}

export const PDFViewer = ({ pdf }: Props) => {
  return <iframe src={pdf} width="100%" height="1080px" />;
};
