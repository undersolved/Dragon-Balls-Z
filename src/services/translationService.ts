export const translateSpanishToEnglish = async (
  text: string,
): Promise<string> => {
  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    console.log(
      "Starting translation for text:",
      text.substring(0, 50) + "...",
    );

    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        q: text.trim(),
        source: "es",
        target: "en",
        format: "text",
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Translation API error status:", response.status);
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("Translation successful:", data);

    if (data.translatedText) {
      return data.translatedText;
    } else {
      console.warn("No translatedText in response:", data);
      return text;
    }
  } catch (error) {
    console.error("Translation error details:", error);
    return text; // Return original text if translation fails
  }
};

// Alternative translation function using Google Translate API
export const translateUsingGoogle = async (text: string): Promise<string> => {
  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    // Using MyMemory Translation API (free, no key required)
    const encodedText = encodeURIComponent(text.trim());
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=es|en`,
    );

    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      return data.responseData.translatedText;
    } else {
      console.warn("MyMemory translation failed:", data);
      return text;
    }
  } catch (error) {
    console.error("MyMemory translation error:", error);
    return text;
  }
};

// Smart translation - tries multiple services
export const translateSmartly = async (text: string): Promise<string> => {
  if (!text || text.trim().length === 0) {
    return text;
  }

  // Try LibreTranslate first
  try {
    const result = await translateSpanishToEnglish(text);
    if (result !== text) {
      console.log("Successfully translated with LibreTranslate");
      return result;
    }
  } catch (error) {
    console.error("LibreTranslate failed, trying alternative...");
  }

  // Fallback to MyMemory
  try {
    const result = await translateUsingGoogle(text);
    if (result !== text) {
      console.log("Successfully translated with MyMemory");
      return result;
    }
  } catch (error) {
    console.error("MyMemory also failed");
  }

  // Return original text if all fail
  console.log("All translation services failed, returning original text");
  return text;
};
