let DOMAIN;

const temp = ""

if (temp === 'production') {
    DOMAIN = "https://stsweng-13-backend.vercel.app";  // Production domain
} else if (temp === 'preview') {
    DOMAIN = "https://stsweng-13-backend.vercel.app";  // Development domain
} else {
    DOMAIN = "https://stsweng-13-backend.vercel.app";  // Local testing domain
}

export { DOMAIN };