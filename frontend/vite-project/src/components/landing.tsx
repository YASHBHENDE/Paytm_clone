import React from "react";
import { useNavigate } from "react-router-dom";

export default function PhonePayLandingPage() {

  const navigate = useNavigate()
  return (
    <>
      <div className="border border-1 border-black p-4 flex justify-between">
        <h3>Paytm</h3>

        <div>
          <button className="bg-gray-300 rounded-2xl" onClick={()=>{navigate('/signup')}} >
            Sign up now!
          </button>
        </div>
      </div>



       <div className="p-10 flex flex-col items-center text-center gap-4 m-10">
          <h1 className="text-4xl font-bold">
            Fast, Secure & Simple Payments
          </h1>

          <p className="text-gray-600 max-w-xl">
            Pay bills, recharge, transfer money and manage your finances —
            all in one place.
          </p>

          <div className="flex gap-4 mt-4">
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-xl"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>

            <button 
              className="border border-gray-400 px-6 py-2 rounded-xl"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          </div>
        </div>

       
      <div className="p-10 text-center m-10 mb-5">
        <h2 className="text-2xl font-bold">
          Ready to experience smarter payments?
        </h2>

        <button 
          className="mt-4 bg-blue-600 text-white px-8 py-3 rounded-xl"
          onClick={() => navigate("/signup")}
        >
          Create Free Account
        </button>
      </div>



      <hr />
      <footer className="p-4 flex justify-between">
        <div>
          © 2025 Paytm
        </div>
          
        
        follow us on ⓕ 𝕏 ▶ 🇮🇳
      </footer>
    </>
  );
}
