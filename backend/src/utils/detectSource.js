export const detectSource = (url = "") => {
    if (!url) return "Other";
  
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.toLowerCase();
  
      if (hostname.includes("youtube.com") || hostname.includes("youtu.be")) {
        return "YouTube";
      }
  
      if (hostname.includes("instagram.com")) {
        return "Instagram";
      }
  
      if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
        return "Twitter";
      }
  
      if (hostname.includes("linkedin.com")) {
        return "LinkedIn";
      }
  
      if (hostname.includes("github.com")) {
        return "GitHub";
      }
  
      if (hostname.includes("medium.com")) {
        return "Medium";
      }
  
      return "Other";
  
    } catch (error) {
      return "Other";
    }
  };