import React, { useState ,useRef, useEffect} from 'react'
import Editor from "@monaco-editor/react";
import { Button } from '@mui/material';
import axios from 'axios';
import { server } from '../../constants';
import CircularProgress from '@mui/material/CircularProgress';
import useAuth from '../../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

function SolutionForm() {
    const [code,setCode] = useState("");
    const [explanation,setExplanation] = useState("");
    const [analysis,setAnalysis] = useState("");
    const [plan,setPlan] = useState("");
    const [loading,setLoading] = useState(false);
    const {user} = useAuth();
    const {problemId} = useParams()
    const [userId,setUserId] = useState(user?._id || null)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!user)  return;
        setUserId(user?.id);
    },[user])

    
    const handleAddProblem = async() => {
        setLoading(true);
        console.log(user);
        const solutionData = {
            code,
            explanation,
            analysis,
            plan
        }

        const response = await axios.post(`${server}/user/addSolution`,
            {
                userId : user?._id,
                problemId,
                solutionData
            },
            {
                withCredentials:true
            }
        ).then(response => response.data)
        .catch(err => console.log(err))
        .finally(setLoading(false));

        console.log(response.data);

        if(response) navigate(-1);

    }


    return (
        <div className='flex flex-col items-center'>
            <div className='bg-gradient-to-r from-black max-h-[85vh] my-8 py-8 px-20 border border-teal-400 shadow-md shadow-teal-300 rounded-xl flex flex-col gap-2 overflow-auto mx-12 scrollbar-custom2 w-5/6'>
                <h1 className='text-center text-gray-100 text-5xl font-semibold my-2 mx-20  logoText-notLogo  p-4 rounded-lg'>Add Solution</h1>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='plan' className='text-xl mx-2 text-gray-100' >Plan :</label>
                    <textarea
                    className='bg-zinc-800 px-8 py-4 h-[10vh] overflow-auto rounded-lg text-gray-300'
                    id='plan' name='plan' type='text' placeholder='Plan' onChange={(e) => setPlan(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xl mx-2 text-gray-100' htmlFor='code'>Code : </label>
                    <Editor
                        height={300}
                        language="javascript"
                        theme="vs-dark"
                        value={code}
                        defaultValue={code.length > 0 ? code : "// Write your code here"}
                        onChange={(value, event) => setCode(value)}
                        options={{
                            inlineSuggest: true,
                            fontSize: "16px",
                            formatOnType: true,
                            autoClosingBrackets: true,
                            //minimap: { scale: 10 }
                            minimap: { enabled: false }, // Example option to disable the minimap
                            padding: { top: 10, bottom: 10 }
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xl mx-2 text-gray-100' htmlFor='explanation'>Explanation : </label>
                    <textarea className='bg-zinc-800 px-8 py-4 h-[10vh] overflow-auto w-full rounded-lg text-gray-300' id='explanation' name='explanation' type='text' placeholder='Explanation' onChange={(e) => setExplanation(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label className='text-xl mx-2 text-gray-100' htmlFor='analysis'>Analysis : </label>
                    <textarea className='bg-zinc-800 px-8 py-4 h-[10vh] overflow-auto w-full rounded-lg text-gray-300' id='analysis' name='analysis' type='text' placeholder='Analysis' onChange={(e) => setAnalysis(e.target.value)}/>
                </div>
                <div className='flex items-center justify-center pt-5 text-3xl'>
                    <Button variant='outlined' size="large" 
                    onClick={handleAddProblem}
                    sx={{
                        color:"whitesmoke",
                        padding: '10px 20px',
                        borderRadius: '8px',
                        width: {
                            xs: '100%', // 100% width on extra-small screens
                            sm: '75%',  // 75% width on small screens
                            md: '50%',  // 50% width on medium screens
                            lg: '25%',  // 25% width on large screens
                          },
                    }}

                    > {loading ? <CircularProgress />: "Add Solution"}</Button>
                </div>
                
            </div>
        </div>
    )
}

export default SolutionForm
