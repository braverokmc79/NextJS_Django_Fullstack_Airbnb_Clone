import { getAccessToken } from "../lib/actions";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const apiService = {
  // GET 요청
  get: async (url: string): Promise<any> => {
    console.log("GET:", url);

    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();
      console.log("Response:", json);
      return json;
    } catch (error) {
      throw error;
    }
  },

  // POST 요청 (Bearer Token 포함)
  post: async (url: string, data: any): Promise<any> => {
    console.log("🎈 POST:", url, data);

    const token = await getAccessToken();

    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: data,
      });

      const json = await response.json();
      console.log("Response:", json);
      return json;
    } catch (error) {
      throw error;
    }
  },

  // POST 요청 (Token 없이)
  postWithoutToken: async (url: string, data: any): Promise<any> => {
    console.log("POST (no token):", url, data);

    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: data,
      });

      const json = await response.json();
      console.log("Response:", json);
      return json;
    } catch (error) {
      throw error;
    }
  },

  // 파일 업로드 (FormData 등)
  fileUpload: async (url: string, data: FormData): Promise<any> => {
    console.log("File upload:", url);
    const token = await getAccessToken();

    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,        
        },
        body: data,
      });

      const json = await response.json();
      console.log("Response:", json);
      return json;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
