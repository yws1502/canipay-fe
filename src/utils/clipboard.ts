export const copyClipboard = async (text: string) => {
  try {
    if (typeof navigator.clipboard === 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      document.execCommand('copy');
    } else {
      navigator.clipboard.writeText(text);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
