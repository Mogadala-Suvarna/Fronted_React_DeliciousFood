import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);
  

const handleImageUpload=(event)=>{
  const selectedImage=event.target.file[0];
  setFile(selectedImage)
}
  
  
  const handleCaterogyChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }
    else{
      setCategory([...category,value])
    }
  }
  
  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try{
      const loginToken=localStorage.getItem('loginToken')
      if(!loginToken){
        console.error("User not Authenticated");
      }
      const formData=new FormData();
      formData.append('firmName',firmName);
      formData.append('area',area);
      formData.append('offer',offer);
      formData.append('image',file);
      category.forEach((value)=>{
        formData.append('category',value)
      })

      region.forEach((value)=>{
        formData.append('region',value)
      })
      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token':`${loginToken}`
        },
        body:formData

      });
      const data=await response.json()
      if(response.ok){
        console.log(data);
        alert('Firm added successfully')
        setFirmName("");
        setArea("");
        setCategory([]);
        setRegion([]);
        setOffer([]);
        setFile(null);

      }
      const firmId=data.firmId;
      console.log("this is firmId",data.firmId);
     
      localStorage.setItem('firmId',firmId)

    }catch(error){
      console.log("failed to add firm");

    }
  }


  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h2>Add Firm</h2>
            <label>Firm Name</label>
            <input type="text" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br/>
            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/><br/>
            {/* <input type="text"/><br/>
            <label>Category</label> */}
            <div className="check-inp">
              <label>Cateogry</label>
              <div className="inputContainer">
              <div className="checkboxContainer">
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCaterogyChange}/>
              </div>
              <div className="checkboxContainer">
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCaterogyChange}/>
              </div>
              </div>
            
            </div>
            
            {/* <label>Region</label>
            <input type="text"/><br/> */}
            <div className="regbox">
              <label>Cateogry</label>
              <div className="reg-input">
              <div className="reg-boxContainer">
                <label>South INDIAN</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
              </div>
              <div className="reg-hboxContainer">
                <label>North Indian</label>
                <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange}/>
              </div>
              <div className="reg-boxContainer">
                <label>Chinese</label>
                <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange}/>
              </div>
              <div className="reg-boxContainer">
                <label>Bakery</label>
                <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange}/>
              </div>

              </div>
            
            </div>
            <label>Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)} /><br/>
            <label>Firm Image</label>
            <input type="file" onchange={handleImageUpload}/><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button><br></br><br></br>
            </div>
        </form>
    </div>
  )
}

export default AddFirm