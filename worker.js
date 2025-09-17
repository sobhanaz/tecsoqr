addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const incomingUrl = new URL(request.url);

  // Step 1: Force HTTPS
  if (incomingUrl.protocol !== "https:") {
    const httpsURL = `https://${incomingUrl.hostname}${incomingUrl.pathname}${incomingUrl.search}`;
    return Response.redirect(httpsURL, 301);
  }

  // Step 2: Define your GitHub Pages target
  const targetBase = "https://sobhanaz.github.io/tecsoqr";
  
  // Step 3: Handle path rewriting for Vite app with base: '/tecsoqr/'
  let targetPath = incomingUrl.pathname;
  
  // If root path, serve index.html from GitHub Pages (which will load the React app)
  if (targetPath === '/' || targetPath === '/index.html') {
    targetPath = '/index.html';
  }
  
  // For all other paths, check if they need the /tecsoqr/ prefix
  // Vite builds assets with /tecsoqr/ prefix, so we need to handle this
  const isAsset = targetPath.includes('/assets/') || 
                  targetPath.endsWith('.js') || 
                  targetPath.endsWith('.css') ||
                  targetPath.endsWith('.svg') ||
                  targetPath.endsWith('.png') ||
                  targetPath.endsWith('.ico') ||
                  targetPath.endsWith('.json') ||
                  targetPath.endsWith('.woff') ||
                  targetPath.endsWith('.woff2') ||
                  targetPath.endsWith('.ttf');
  
  // If it's an asset or the path doesn't start with /tecsoqr/, add the prefix
  if (isAsset || !targetPath.startsWith('/tecsoqr/')) {
    targetPath = '/tecsoqr' + targetPath;
  }

  const proxiedUrl = targetBase + targetPath + incomingUrl.search;

  // Step 4: Create modified request
  const modifiedRequest = new Request(proxiedUrl, {
    method: request.method,
    headers: request.headers,
    body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
    redirect: "follow",
  });

  let response = await fetch(modifiedRequest);

  // Step 5: Adjust headers (CORS + CSP fix)
  const newHeaders = new Headers(response.headers);
  newHeaders.set("Access-Control-Allow-Origin", "https://qrcode.tecso.team");
  newHeaders.delete("Content-Security-Policy");
  
  // Fix content-type for HTML files
  if (targetPath.endsWith('.html')) {
    newHeaders.set("Content-Type", "text/html; charset=utf-8");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}