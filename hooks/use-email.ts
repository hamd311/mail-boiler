import { apiFetch } from "@/lib/api";
import React from "react";
import { useCallback } from "react";

interface SendEmailBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}
const useEmail = () => {
  const sendEmail = useCallback(async (data: SendEmailBody) => {
    const resp =   await apiFetch("/contactus", {
      method: "POST",
      body: JSON.stringify(data),
    }) as any;

    const jsonRespnse :  {success:boolean, message: string} = await resp.json();
    return jsonRespnse
  }, []); 
  return {
    sendEmail,
  };
};

export default useEmail;
