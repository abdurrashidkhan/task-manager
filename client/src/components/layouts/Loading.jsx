import React from 'react';
import '../styles/loading/loading.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
    <div className='fixed w-[100vw] h-screen flex justify-center items-center bg-[#ffffff] '>
      <DotLottieReact
        src='https://lottie.host/f2b69835-2ab2-4403-b037-5cd52bc315cb/Yu9kqQfMKN.lottie'
        loop
        autoplay
        style={{
          width: '25%', 
          height: 'auto',
          margin: 'auto',
        }}
      />
    </div>
  );
};

export default Loading;
