import { getAccessToken } from "../lib/actions";
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;


const apiService = {
  // ✅ GET 요청
  get: async (url: string): Promise<any> => {
    //console.log("📡 GET 요청:", `${API_HOST}${url}`);
    const token = await getAccessToken();
    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("📡 GET 요청 response:", response)
      ;
      return await response.json();
    } catch (error) {
      console.error("❗️GET 요청 실패:", error);
      throw error;
    }
  },

  // ✅ POST 요청 (Bearer Token 포함, 유연한 body 처리)
  post: async (url: string, data: any): Promise<any> => {
   // console.log("🎈 POST 요청:", `${API_HOST}${url}`, data);
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
     return await response.json();
    } catch (error) {
      console.error("❗️POST 요청 실패:", error);
      throw error;
    }
  },

    // ✅ POST 요청 (Token 없이, 유연한 body 처리)
  postWithoutToken: async (url: string, data: any): Promise<any> => {
        try {       
          const response = await fetch(`${API_HOST}${url}`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type":  "application/json",
            },
            body:  JSON.stringify(data),
          });
          
          return await response.json();        
        } catch (error) {
          console.error("❗️POST(no token) 실패:", error);
          throw error;
        }
  },


  // ✅ 파일 업로드 (FormData 사용)
  fileUpload: async (url: string, data: FormData): Promise<any> => {
    const token = await getAccessToken();
    try {
      const response = await fetch(`${API_HOST}${url}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // FormData 사용 시 Content-Type은 생략 (자동 설정됨)
        },
        body: data,
      });

      return await response.json();
    } catch (error) {
      console.error("❗️파일 업로드 실패:", error);
      throw error;
    }
  },
};

export default apiService;
