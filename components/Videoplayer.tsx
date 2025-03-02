import React from 'react';


type VideoPlayerProps = {
  videoId?: string;
  videoSrc?: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId , videoSrc }) => {
  return (
    <div className="w-full max-w-4xl mx-auto my-8">
      {videoId ? (
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/watch?v=lw9fGXYfGOo`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      ) : videoSrc ? (
        <video
          className="w-full rounded-lg"
          controls
          autoPlay
          src={videoSrc}
           
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="text-center text-gray-500">No video source provided.</p>
      )}
    </div>
  );
};

export default VideoPlayer;