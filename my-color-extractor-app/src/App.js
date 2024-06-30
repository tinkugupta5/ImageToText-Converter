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
  const [imageName, setImageName] = useState(null); // State for image name
  const [imageSize, setImageSize] = useState(null); // State for image name
  const [text, setText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('converter');


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    console.log('line 39', file);
    setImage(URL.createObjectURL(file));
    setImageName(file.name); // Set the image name
    setImageSize(file.size); // Set the image name
    setIsLoading(false);
  };

  const deleteImage = () => {
    setIsLoading(true);
    setImage(null);
    setImageName(null); // Clear the image name
    setText(null);
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
      <h1 class="h1 text-center text-white">Image to Text Converter</h1>
      {/* <p class="text text-center text-white slogan">
An online image to text converter to extract text from images. Upload your photo, to get text file instantly.
</p> */}
        {currentPage === 'converter' && (
          <div className='group'>
            {isLoading ? (
              <Loader />
            ) : (
              <div className='head'>
                {!image ? (
                  <label className='label'>
                    <div className='file-inner-container'>
                      {/* <MdCloudUpload className='upload-icon' /> */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="81" height="64" viewBox="0 0 81 64" fill="none">
                        <g filter="url(#filter0_d_2896_2)">
                          <rect x="35.2849" y="2.79492" width="44" height="40" rx="3" transform="rotate(14.8993 35.2849 2.79492)" fill="url(#paint0_linear_2896_2)" />
                          <rect x="35.4622" y="3.1008" width="43.5" height="39.5" rx="2.75" transform="rotate(14.8993 35.4622 3.1008)" stroke="#EAEAEA" stroke-width="0.5" />
                        </g>
                        <rect x="35.6128" y="13.2305" width="38" height="18" rx="2" transform="rotate(14.8993 35.6128 13.2305)" fill="#E7ECFA" />
                        <rect x="40.0547" y="8.20312" width="19" height="2" rx="1" transform="rotate(14.8993 40.0547 8.20312)" fill="#E7ECFA" />
                        <rect x="30.2131" y="33.5244" width="21.3373" height="2" rx="1" transform="rotate(14.8993 30.2131 33.5244)" fill="#E7ECFA" />
                        <rect x="29.1848" y="37.3896" width="30.939" height="2" rx="1" transform="rotate(14.8993 29.1848 37.3896)" fill="#E7ECFA" />
                        <path d="M56.4391 31.2359C58.4086 30.0493 60.9707 30.7633 62.0424 32.7976L65.7743 39.881L49.3458 35.5099L56.4391 31.2359Z" fill="url(#paint1_linear_2896_2)" />
                        <circle cx="62.7043" cy="24.7161" r="2.13373" transform="rotate(14.8993 62.7043 24.7161)" fill="url(#paint2_linear_2896_2)" />
                        <ellipse cx="37.8648" cy="8.65514" rx="1" ry="1" transform="rotate(14.8993 37.8648 8.65514)" fill="#E7ECFA" />
                        <path d="M44.0552 24.9928C46.0408 23.7428 48.6709 24.4622 49.7437 26.5489L55.1441 37.053L33.8838 31.3964L44.0552 24.9928Z" fill="url(#paint3_linear_2896_2)" />
                        <g filter="url(#filter1_d_2896_2)">
                          <rect x="3" y="15.7979" width="44" height="40" rx="3" transform="rotate(-21.0382 3 15.7979)" fill="url(#paint4_linear_2896_2)" />
                          <rect x="3.32308" y="15.9414" width="43.5" height="39.5" rx="2.75" transform="rotate(-21.0382 3.32308 15.9414)" stroke="#EAEAEA" stroke-width="0.5" />
                        </g>
                        <rect x="9.38989" y="24.0547" width="38" height="18" rx="2" transform="rotate(-21.0382 9.38989 24.0547)" fill="#E7ECFA" />
                        <rect x="10.0361" y="17.377" width="19" height="2" rx="1" transform="rotate(-21.0382 10.0361 17.377)" fill="#E7ECFA" />
                        <rect x="16.9287" y="43.6543" width="21.3373" height="2" rx="1" transform="rotate(-21.0382 16.9287 43.6543)" fill="#E7ECFA" />
                        <rect x="18.3647" y="47.3877" width="30.939" height="2" rx="1" transform="rotate(-21.0382 18.3647 47.3877)" fill="#E7ECFA" />
                        <path d="M36.8199 26.4103C37.718 24.2936 40.2115 23.3681 42.2732 24.3862L49.452 27.931L33.5852 34.0339L36.8199 26.4103Z" fill="url(#paint5_linear_2896_2)" />
                        <circle cx="38.0656" cy="17.454" r="2.13373" transform="rotate(-21.0382 38.0656 17.454)" fill="url(#paint6_linear_2896_2)" />
                        <ellipse cx="8.52842" cy="19.0285" rx="1" ry="1" transform="rotate(-21.0382 8.52842 19.0285)" fill="#E7ECFA" />
                        <path d="M23.129 28.6229C24.003 26.4455 26.5547 25.4844 28.648 26.5442L39.1854 31.8795L18.6519 39.7772L23.129 28.6229Z" fill="url(#paint7_linear_2896_2)" />
                        <g filter="url(#filter2_d_2896_2)">
                          <rect x="18" y="5.79492" width="44" height="40" rx="3" fill="url(#paint8_linear_2896_2)" />
                          <rect x="18.25" y="6.04492" width="43.5" height="39.5" rx="2.75" stroke="#EAEAEA" stroke-width="0.5" />
                        </g>
                        <rect x="21" y="15.7949" width="38" height="18" rx="2" fill="#E7ECFA" />
                        <rect x="24" y="9.79492" width="19" height="2" rx="1" fill="#E7ECFA" />
                        <rect x="21" y="36.7949" width="21.3373" height="2" rx="1" fill="#E7ECFA" />
                        <rect x="21" y="40.7949" width="30.939" height="2" rx="1" fill="#E7ECFA" />
                        <path d="M45.7559 27.8408C47.354 26.1876 50.0136 26.2189 51.5723 27.9092L57 33.7949H40L45.7559 27.8408Z" fill="url(#paint9_linear_2896_2)" />
                        <circle cx="50.1337" cy="19.9286" r="2.13373" fill="url(#paint10_linear_2896_2)" />
                        <ellipse cx="22" cy="10.7949" rx="1" ry="1" fill="#E7ECFA" />
                        <path d="M32.183 24.9914C33.7804 23.2728 36.5071 23.2918 38.0803 25.0325L46 33.7949H24L32.183 24.9914Z" fill="url(#paint11_linear_2896_2)" />
                        <defs>
                          <filter id="filter0_d_2896_2" x="22.6699" y="3.46484" width="57.4658" height="59.6289" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2896_2" />
                            <feOffset dy="8" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2896_2" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2896_2" result="shape" />
                          </filter>
                          <filter id="filter1_d_2896_2" x="0.876221" y="0.878906" width="59.6743" height="62.376" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2896_2" />
                            <feOffset dy="8" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2896_2" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2896_2" result="shape" />
                          </filter>
                          <filter id="filter2_d_2896_2" x="15" y="5.79492" width="50" height="51" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="5" operator="erode" in="SourceAlpha" result="effect1_dropShadow_2896_2" />
                            <feOffset dy="8" />
                            <feGaussianBlur stdDeviation="4" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2896_2" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2896_2" result="shape" />
                          </filter>
                          <linearGradient id="paint0_linear_2896_2" x1="57.2849" y1="2.79492" x2="57.2849" y2="42.7949" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                            <stop offset="1" stop-color="white" />
                          </linearGradient>
                          <linearGradient id="paint1_linear_2896_2" x1="62.1078" y1="33.3176" x2="49.4613" y2="34.6877" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                          <linearGradient id="paint2_linear_2896_2" x1="62.7043" y1="22.5824" x2="62.7043" y2="26.8498" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F9ECB9" />
                            <stop offset="1" stop-color="#FFD968" />
                          </linearGradient>
                          <linearGradient id="paint3_linear_2896_2" x1="50.4537" y1="28.3546" x2="34.0091" y2="29.9715" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                          <linearGradient id="paint4_linear_2896_2" x1="25" y1="15.7979" x2="25" y2="55.7979" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                            <stop offset="1" stop-color="white" />
                          </linearGradient>
                          <linearGradient id="paint5_linear_2896_2" x1="42.6313" y1="24.7688" x2="33.1961" y2="33.3004" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                          <linearGradient id="paint6_linear_2896_2" x1="38.0656" y1="15.3203" x2="38.0656" y2="19.5877" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F9ECB9" />
                            <stop offset="1" stop-color="#FFD968" />
                          </linearGradient>
                          <linearGradient id="paint7_linear_2896_2" x1="30.2826" y1="27.5895" x2="17.9171" y2="38.5501" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                          <linearGradient id="paint8_linear_2896_2" x1="40" y1="5.79492" x2="40" y2="45.7949" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white" />
                            <stop offset="1" stop-color="white" />
                          </linearGradient>
                          <linearGradient id="paint9_linear_2896_2" x1="51.7692" y1="28.3949" x2="39.9002" y2="32.9707" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                          <linearGradient id="paint10_linear_2896_2" x1="50.1337" y1="17.7949" x2="50.1337" y2="22.0624" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#F9ECB9" />
                            <stop offset="1" stop-color="#FFD968" />
                          </linearGradient>
                          <linearGradient id="paint11_linear_2896_2" x1="39.2308" y1="26.5949" x2="23.7548" y2="32.3858" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#69BB66" />
                            <stop offset="1" stop-color="#BFDAB8" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <span class="drag-n-drop-text" id="js-drag-n-drop">
                        Drag &amp; Drop, Upload or Paste image <br /> <small> Supported formats: JPG, PNG, GIF, JFIF (JPEG), PDF </small>
                      </span>
                      {/* <p className='upload-text'>Upload a file or drag and drop
                        <br />PNG, JPG, GIF up to 10MB</p> */}
                    </div>
                    <input type='file' name='uploadimage' onChange={handleChange} className='upload' />
                  </label>
                ) : (
                  <>
                    <div className='dispaly-image'>
                      <div className='left-preview'>
                        <img src={image} alt="uploaded" className='uploaded-image' />

                      </div>
                      <div className='image_details'>
                        {imageName && <p className='image-name'>Image: {imageName}</p>} {/* Display image name */}
                        {/* {imageSize && <p className='image-name'>Size: {imageSize}</p>} Display image name */}
                      </div>

                      <div className='delete-button'>
                        <img className='image_button' onClick={deleteImage} src="https://www.imagetotext.io/web_assets/frontend/img/delete.svg" width="20" height="20" alt="uploaded image" />
                      </div>
                    </div>
                    <button onClick={handleClick} className='btn'>Convert to text</button>



                  </>
                )}
              </div>
            )}
          </div>
        )}
        {/* {currentPage === 'about' && <AboutPage />} */}
        {/* {currentPage === 'pricing' && <PricingPage />} */}
        {/* {currentPage === 'login' && <LoginPage />} */}
        {currentPage === 'converter' && (
          <>
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
