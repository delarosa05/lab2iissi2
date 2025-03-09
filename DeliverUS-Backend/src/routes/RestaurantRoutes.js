import RestaurantController from '../controllers/RestaurantController.js'

// Resumen de las rutas: endpoints donde se hacen las peticiones http posibles que hemos definido en este archivo
// El controlador se encarga de como funciona la accion que nosotros pedimos por mensaje HTTP

const loadFileRoutes = function (app) {
  // TODO: Include routes for restaurant described in the lab session README
  app.route('/restaurants')
    .get(RestaurantController.index) // Me da todos los restaurantes
    .post(RestaurantController.create)

  app.route('restaurants/:restaurantId')
    .get(RestaurantController.show)
    .put(RestaurantController.update)
    .delete(RestaurantController.destroy)
}
export default loadFileRoutes
