import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { preview } from "../assets";
import {FormField, Loader} from "../components";
import { getRandomPrompt } from "../utils";

function CreatePost() {
  const navigate = useNavigate();
  const [generateingImage, setGenerateingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const generateImage = async () =>{
    if (form.prompt) {
      try {
        setGenerateingImage(true);
        setDisable(true);
        const response = await fetch(`http://localhost:8080/api/dalle`,{
          method:`POST`,
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt}),
        })
        const data = await response.json();
        setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
      } catch (error) {
        alert(error);
      }finally{
        setGenerateingImage(false);
        setDisable(false);
      }
    }else{
      alert(`Please Enter a prompt`)
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        const response =  await fetch(`http://localhost:8080/api/post`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify({...form}),
        });
        await response.json();
        navigate(`/`);
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false);
      }
    }
    else{
      alert(`Please Enter a prompt`);
    }
  };

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value})
  };

  const handleSurprise = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPrompt})
  };

 
  return (

      <section className="max-w-7xl mx-auto">
        <h1 className="font-semibold font-mono  text-[#222328] text-[32px]">
          Create
        </h1>
        <p>Create Awesome images using AI and share with the Community </p>
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              handleChange={handleChange}
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="A man standing in front of a stargate to another dimension"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurprise={handleSurprise}
            />
            <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo?
            (
              <img src={form.photo}
              alt={form.prompt}
              className="w-full h-full object-contain" />
            ):
            (
              <img
                src={preview}
                alt="preview" className="w-9/12 h-9/12 object-contain opacity-40 ">
                
              </img>
            )}

            {generateingImage&&(
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg]"><Loader/></div>
            )}
            </div>
          </div>
          <div className="mt-5 flex gap-5">
          <button disabled = {disable}
           type="button"
          className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={generateImage}>
          {generateingImage ? <> 
        Processing...</> :'Generate'}
    </button>
          </div>
          <div className="mt-10">
              <p className="mt-2 text-[14px] text-[#666e75]">Once you have created the image, you can share it the Community</p>
              <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
              {loading? <> <div className="relative animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full float-left "></div> Sharing with the Community </>: 'Share'}
              </button>
          </div>
        </form>
      </section>

  );
};

export default CreatePost;
