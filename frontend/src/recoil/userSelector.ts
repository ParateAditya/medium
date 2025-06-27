// recoil/selectors/userSelector.ts
import axios from "axios";
import { selectorFamily } from "recoil";

type UserType = {
  name: string;
};

export const userSelector = selectorFamily<UserType | null, string>({
  key: "userSelector",
  get: (token: string) => async () => {
    if (!token) return null;
    try{
      const response = await axios.get("http://localhost:8787/api/v1/user" , {
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      return {
        name : response.data.name
      }
    }catch(e){
      console.error("Failed to fetch user:", e);
      return null;
    }
  }
});
