const ImagePlaceholder = ({ src, alt, className, fallbackText }) => {
  const handleError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="relative">
      <img 
        src={src} 
        alt={alt} 
        className={className}
        onError={handleError}
      />
      <div 
        className={`${className} bg-gray-200 items-center justify-center text-gray-500 hidden`}
        style={{ display: 'none' }}
      >
        {fallbackText || alt}
      </div>
    </div>
  );
};

export default ImagePlaceholder;