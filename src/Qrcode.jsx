import { useState } from 'react';
import './Qrcode.css'
function Qrcode(){

    const[img,setimg] = useState(null);
    const[loading, setloading] = useState(false);
    const[link,setlink] = useState("");
    const[size,setsize] = useState(0);
    const[popup, setpopup] = useState(false);
    function generateQR(){
        if(link=="" && size==0){
            alert("Fill the fields");
            return;
        }
        setloading(true);
        setTimeout(()=>{
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${link}`;
            setimg(url);
        }catch(e){
            console.log(e); 
        }finally{
            setloading(false);
        }
        },1000);
    }

    function downloadQR(){
        
        if(img==null){
            alert("No image available");
            return;
        }
        setpopup(true);
        setTimeout(()=>{

       
        try{
        fetch(img)
        .then((res)=>res.blob())
        .then((blob)=>{
            const lin = document.createElement("a");
            lin.href = URL.createObjectURL(blob);
            lin.download = link.substring(0,link.indexOf('.'))+".png";
            document.body.appendChild(lin);
            lin.click(); 
        })}catch(e){
            console.log(e);
        }finally{
            setpopup(false);
        }
         },1000);
    }

    function shareQR(){
        if(img==null){
            alert("No image available");
            return;
        }
         fetch(img)
        .then((res)=>res.blob())
        .then((blob)=>{
            navigator.share({
          title: "QR Code Generator",
          text: "Check out this cool QR Code Generator!",
          files : [new File([blob], link.substring(0,link.indexOf('.'))+".png", { type: "image/png" })],
        });
        })
    }

    function handleinput1(e){
        setlink(e.target.value);
    }
    function handleinput2(e){
        setsize(e.target.value);
    }
    return(
    <>
    <div className='main'>
        <center>
        <h1 className='title'>QR CODE GENERATOR</h1><br></br>
        {!loading && img!=null && <img src={img} alt="image" className='image'/>}<br></br>
        {loading && <p>Please wait...</p>}</center>
        <label htmlFor="linkinput">Data for QR code</label><br></br>
        <input type="text" id='linkinput' onChange={handleinput1} required/><br></br>

        <label htmlFor="sizeinput">Image Size (e.g ., 150)</label><br></br>
        <input type="text" id='sizeinput'onChange={handleinput2}  required/>

        <button className='btn btn1' disabled={loading} onClick={generateQR}>Generate QR code</button>
        <button className='btn btn2'onClick={downloadQR}>Download the QR code</button>
        <button className='btn btn3' onClick={shareQR}>Share</button>

        {popup && 
        
        <div className='minipopup'>
            <p>Please wait...</p>
        </div>
        
        }
    </div>
    </>);
}

export default Qrcode