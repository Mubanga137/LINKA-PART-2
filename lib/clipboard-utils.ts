/**
 * Safe clipboard utility that handles permission errors gracefully
 */

export interface ShareData {
  title?: string;
  text?: string;
  url: string;
}

/**
 * Safely copy text to clipboard with fallback methods
 */
export async function safeCopyToClipboard(text: string): Promise<boolean> {
  try {
    // Try the modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.warn('Clipboard API failed, trying fallback method:', error);
  }

  // Fallback method using execCommand (deprecated but more widely supported)
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    if (success) {
      return true;
    }
  } catch (error) {
    console.warn('Fallback clipboard method failed:', error);
  }

  return false;
}

/**
 * Safe share functionality with clipboard fallback
 */
export async function safeShare(data: ShareData): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'failed' }> {
  // Try native sharing first (on mobile devices)
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return { success: true, method: 'native' };
    } catch (error) {
      // User cancelled or sharing failed, fall back to clipboard
      console.warn('Native share failed, falling back to clipboard:', error);
    }
  }

  // Fallback to copying URL to clipboard
  const copySuccess = await safeCopyToClipboard(data.url);
  
  if (copySuccess) {
    return { success: true, method: 'clipboard' };
  }

  return { success: false, method: 'failed' };
}

/**
 * Show user feedback for sharing actions
 */
export function showShareFeedback(result: { success: boolean; method: 'native' | 'clipboard' | 'failed' }) {
  if (result.success) {
    if (result.method === 'clipboard') {
      // You could show a toast notification here
      console.log('Link copied to clipboard!');
    }
  } else {
    console.warn('Sharing failed - clipboard access may be blocked');
  }
}
