import React from 'react'; 
import Dropbox from 'dropbox'; 
import "./dragdropfile.scss";  
function DragDropFile() {   
    const [dragActive, setDragActive] = React.useState(false);   
    const [error, setError] = React.useState(null);   
    const inputRef = React.useRef(null);   
    const dbx = new Dropbox.Dropbox({ accessToken:"sl.Bd8p58g7K8jcoHWOZ8nLZZ5S8B2rc2HCmH48i0vfNouV4p2OPDSvep2I1re4oXXC11HGFVh3ThpNqTNvjLuP36HI4NY3AdJLhwPlctBS9SsvMFt5yEdgoGB2KmFCEG1UWaXOIIc" });    
    const handleDrag = function(e) {     
        e.preventDefault();     
        e.stopPropagation();     
        if (e.type === "dragenter" || e.type === "dragover") {       
            setDragActive(true);     
        } else if (e.type === "dragleave") {       
            setDragActive(false);     
        }   
    };    
    const handleDrop = function(e) {     
        e.preventDefault();     
        e.stopPropagation();     
        setDragActive(false);     
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {       
            const file = e.dataTransfer.files[0];       
            const fileType = file.type;       
            if (fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {         
                uploadFile(file);       
            } else {         
                setError("Only Excel files are allowed!");       
            }     
        }   
    };    
    const handleChange = function(e) {     
        e.preventDefault();     
        if (e.target.files && e.target.files[0]) {       
            const file = e.target.files[0];       
            const fileType = file.type;       
            if (fileType === "application/vnd.ms-excel" || fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {        
                uploadFile(file);       
            } else {         
                setError("Only Excel files are allowed!");       
            }     
        }   
    };    
    const onButtonClick = () => {     
        inputRef.current.click();   
    };    
    const uploadFile = (file) => {     
        const path = `/uploads/${file.name}`;     
        dbx.filesUpload({path: path, contents: file})       
        .then(response => {         
            console.log(response);       
        })       
        .catch(error => {         
            console.error(error);       
        });   };    return (     
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>       
        <input ref={inputRef} type="file" id="input-file-upload" accept=".xls,.xlsx" onChange={handleChange} />       
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>         
        <div>           
            <p>Drag and drop your Excel file here or</p>           
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>         
        </div>       
        </label>       
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>       
        }       
        { error &&         
        <p>{error}</p>       
        }     
        </form>   
        ); 
    };  
    export default DragDropFile;