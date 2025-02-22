import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length,setlength]=useState(14);
  const [number,setnumber]=useState(false);
  const [char,setchar]=useState(false);
  const [pass,setpass]=useState("");
  const makePass = useCallback(()=>{
    let pass="";
    let s="ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) s+="123456789";
    if(char) s+="~`! @#$%^&*()-_+={}[]|:<>,./? ";
    for (let i = 1; i <length; i++) {
      let tempPass=Math.floor(Math.random()*s.length+1);
      pass+=s.charAt(tempPass);
    }
    setpass(pass);
  },[length,char,number,setpass]);
 useEffect(() => {
  makePass();
 }, [number,char,makePass,length])
// for copying
  let ref_pass=useRef(null);
  let CopyToClip=useEffect(() => {
    ref_pass.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass])
  

  return (
<div className='bg-black w-full h-screen flex flex-col items-center'>
  <h1 className='text-white text-5xl text-center py-20'>Password Generator</h1>
  <div className='bg-gray-700 w-[60%] h-[15%] rounded-lg flex flex-col items-center '>
    <div className='flex justify-center rounded-lg w-[70%]'>
    <input className='w-[45%]  px-2 rounded-lg'
    value={pass}
    placeholder='Password'
    readOnly
    ref={ref_pass}
    ></input>
    <button className='bg-blue-700 p-1 text-white'
    onClick={CopyToClip}
    >copy</button>
    </div>
    <div className='flex gap-3 py-3'>
    <input type="range" 
    min={0}
    max={100}
    onChange={(e)=>setlength(e.target.value)}
    />
    <label className='text-white'>Length:{length}</label>
    <input type="checkbox"  className='cursor-pointer'
    onChange={()=>setnumber((prev)=> !prev)}
    />
    <label className='text-white'>Number</label>
    <input type="checkbox"  className='cursor-pointer'
    onChange={()=>setchar((prev)=> !prev)}
    />
    <label className='text-white'>Character</label>

    </div>
  
    
  </div>
</div>
  )
}

export default App
