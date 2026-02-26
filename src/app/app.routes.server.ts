import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  // Dynamic routes → SSR
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:slug/:id',
    renderMode: RenderMode.Server
  },

  // Everything else → Prerender
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }

];
