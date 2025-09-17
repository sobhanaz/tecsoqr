addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);

  // Force HTTPS
  if (url.protocol !== "https:") {
    return Response.redirect(`https://${url.hostname}${url.pathname}${url.search}`, 301);
  }

  // GitHub Pages target with /tecsoqr/ subpath
  const githubPagesBase = "https://sobhanaz.github.io";
  
  // Handle SPA routing - all paths should serve the React app
  // For GitHub Pages with project site (username.github.io/repo-name)
  // we need to prefix all requests with /tecsoqr/
  let path = url.pathname;
  
  // If it's the root path, we need to serve /tecsoqr/index.html
  if (path === '/' || path === '/index.html') {
    path = '/tecsoqr/index.html';
  }
  // If it's any other path that doesn't start with /tecsoqr/, add the prefix
  else if (!path.startsWith('/tecsoqr/')) {
    path = '/tecsoqr' + path;
  }
  
  // Handle assets - they should already be prefixed with /tecsoqr/ in the build
  // But if someone requests /assets/... directly, we need to add the prefix
  if (path.includes('/assets/') && !path.startsWith('/tecsoqr/')) {
    path = '/tecsoqr' + path;
  }

  const targetUrl = githubPagesBase + path + url.search;

  // Fetch from GitHub Pages
  let response = await fetch(targetUrl, {
    headers: request.headers,
    method: request.method,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    redirect: 'follow'
  });

  // For SPA routing, if GitHub returns 404, try serving index.html
  if (response.status === 404 && !path.endsWith('.html')) {
    const spaResponse = await fetch(githubPagesBase + '/tecsoqr/index.html', {
      headers: request.headers,
      method: 'GET'
    });
    
    if (spaResponse.status === 200) {
      response = spaResponse;
    }
  }

  // Modify response headers for CORS and remove CSP
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', 'https://qrcode.tecso.team');
  headers.delete('Content-Security-Policy');
  
  // Ensure proper content type for HTML
  if (path.endsWith('.html')) {
    headers.set('Content-Type', 'text/html; charset=utf-8');
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}