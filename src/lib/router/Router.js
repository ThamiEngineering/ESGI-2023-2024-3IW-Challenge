// Définition de la classe Router
export class Router {
    // Le constructeur prend en paramètre les routes et charge la route initiale
    constructor(routes) {
        this.routes = routes; // Stockage des routes
        this._loadInitialRoute(); // Chargement de la route initiale
    }

    // Cette méthode charge une route spécifique en fonction des segments d'URL fournis
    loadRoute(...urlSegs) {
        // Trouve la route correspondante
        const matchedRoute = this._matchUrlToRoute(urlSegs);

        // Si aucune route correspondante n'a été trouvée, affiche une erreur et arrête l'exécution
        if (!matchedRoute) {
            console.error(`Aucune route correspondante trouvée pour /${urlSegs.join('/')}`);
            return;
        }

        // Construit l'URL à partir des segments
        const url = `/${urlSegs.join('/')}`;
        // Met à jour l'historique du navigateur avec la nouvelle URL
        history.pushState({}, 'this works', url);

        // Trouve l'élément du DOM où le template de la route sera affiché
        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        // Met à jour l'élément du DOM avec le template de la route
        routerOutElm.innerHTML = matchedRoute.component.display();
    }

    // Cette méthode trouve la route correspondant à une liste de segments d'URL
    _matchUrlToRoute(urlSegs) {
        // Parcourt toutes les routes
        const matchedRoute = this.routes.find(route => {
            // Divise le chemin de la route en segments
            const routePathSegs = route.path.split('/').slice(1);

            // Si le nombre de segments ne correspond pas, la route ne correspond pas
            if (routePathSegs.length !== urlSegs.length) {
                return false;
            }

            // Vérifie que tous les segments correspondent
            return routePathSegs
                .every((routePathSeg, i) => routePathSeg === urlSegs[i]);
        });

        // Retourne la route correspondante
        return matchedRoute;
    }

    // Cette méthode charge la route correspondant à l'URL actuelle lors du chargement initial de l'application
    _loadInitialRoute() {
        // Récupère les segments de l'URL actuelle
        const pathnameSplit = window.location.pathname.split('/');
        let pathSegs = pathnameSplit.length > 1 ? pathnameSplit.slice(1) : [];

        // Si le premier segment est 'public', l'ignore
        if (pathSegs[0] === 'public') {
            pathSegs = pathSegs.slice(1);
        }

        // Charge la route correspondante
        this.loadRoute(...pathSegs);
    }
}