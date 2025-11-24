export const generateUploadsUrl = (filename?: string): string | undefined => {
  return filename ? process.env.API_HOST + '/uploads/' + filename : undefined;
};
