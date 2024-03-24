import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Loader from './Components/loader'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import Copy from './Components/copy';
import './App.css';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setIsLoading(true);
    setImage(URL.createObjectURL(event.target.files[0]))
    setIsLoading(false);

  }
  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);

  }
  const handleClick = () => {
    if (!image) {
      toast.error("Please upload the image!")
      return;
    }
    Tesseract.recognize(
      image, 'eng',
      {
        logger: m => { setProgress(parseInt(m.progress * 100)); }
      }
    )
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        // Get Confidence score
        // let confidence = result.confidence
        // Get full output
        let text = result.data.text
        setText(text);

      })
  }

  useEffect(() => { setText(text); }, [text])

  return (
    <>
      <div className="App">

      </div>
      <header>
        <h1 className='header'>Image to Text Converter</h1>
      </header>
      <div className='container'>
        <div className='group'>
          {isLoading ? <Loader /> : <>
            {!image ? <>
              <label className='label'>
                <div className='file-inner-container'>
                  <MdCloudUpload className='upload-icon' />
                  <p className='upload-text'>Click here to upload</p>
                </div>
                <input type='file' name='uploadimage' onChange={handleChange} className='upload' />
              </label>
            </> : <>
              <div className='dispaly-image'>
                <img src={image} alt="uploaded" className='uploaded-image' />
                 < MdDelete className='delete-icon' onClick={deleteImage} />
              </div>
            </>}
          </>}
        </div>
         <button onClick={handleClick} className='btn'>Convert to text</button>
        {progress < 100 && progress > 0 && <div>
          <div className="progress-label">Progress ({progress}%)</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }} ></div>
          </div>
        </div>}


        {text && <Copy text={text} />}
      </div>
    </>
  );
}

export default App
