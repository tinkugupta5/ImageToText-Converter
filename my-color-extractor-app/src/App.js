import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Loader from './Components/loader';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import Copy from './Components/copy';
import './App.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../src/images/Text logo.png'; // Adjust the path to your logo file

// Define Page Components
function AboutPage() {
  return <div>About Page</div>;
}

function PricingPage() {
  return <div>FAQ</div>;
}

function LoginPage() {
  return <div>Login Page</div>;
}

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('converter');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (event) => {
    setIsLoading(true);
    setImage(URL.createObjectURL(event.target.files[0]));
    setIsLoading(false);
  };

  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setIsLoading(false);
  };

  const handleClick = () => {
    if (!image) {
      toast.error("Please upload the image!");
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
        let text = result.data.text;
        setText(text);
      });
  };

  useEffect(() => { setText(text); }, [text]);

  return (
    <div className="App">
      <img src={logo} alt="Logo" className="logo" />
      <header>
        <div className="header-content">
          <h1 className='header'>Image to Text Converter</h1>
          <div className='header-buttons'>
            <button className="header-button1" onClick={() => handlePageChange('about')}>About</button>
            <button className="header-button2" onClick={() => handlePageChange('pricing')}>Pricing</button>
            <button className="header-button3" onClick={() => handlePageChange('login')}>Login</button>
          </div>
        </div>
      </header>
      <div className="container">
        {currentPage === 'converter' && (
          <div className='group'>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='head'>
                <p className='text'>Convert your images to editable text</p>
                    <p className='text1'>Upload your image and our AI will convert it to text for<br/>you.</p>
                {!image ? (
                  <label className='label'>
                    <div className='file-inner-container'>
                      <MdCloudUpload className='upload-icon' />
                      <p className='upload-text'>Upload a file or drag and drop
                      <br/>PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input type='file' name='uploadimage' onChange={handleChange} className='upload' />
                  </label>
                ) : (
                  <>
                    <div className='dispaly-image'>
                      <img src={image} alt="uploaded" className='uploaded-image' />
                      <MdDelete className='delete-icon' onClick={deleteImage} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'pricing' && <PricingPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'converter' && (
          <>
            <button onClick={handleClick} className='btn'>Convert to text</button>
            {progress < 100 && progress > 0 && (
              <div>
                <div className="progress-label">Progress ({progress}%)</div>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}
            {text && <Copy text={text} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
