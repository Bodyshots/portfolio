const FractalNoise = ( size ) => {
    return (<svg viewBox={[0, 0, size, size]} xmlns='http://www.w3.org/2000/svg'>
    <filter id='noiseFilter'>
        <feTurbulence 
        type='fractalNoise' 
        baseFrequency='6.91' 
        numOctaves='6' 
        stitchTiles='stitch' />
    </filter>
    
    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
    </svg>)
}

export default FractalNoise