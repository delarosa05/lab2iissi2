// Resumen de los controladores: aplican la logica de negocio
// Los controladores nos permiten ver, modificar o eliminar los datos segun la ruta que llama al controlador(metodo que usa (index, create, update, destroy))

import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)
  newRestaurant.userId = 1
  try {
    const Restaurant = await newRestaurant.save()
    res.json(Restaurant)
  } catch (error) {
    res.status(500).send(error)
  }
}

const show = async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: { model: ProductCategory, as: 'productCategory' }
      },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
      order: [[{ model: Product, as: 'products' }, 'order', 'ASC']]
    }
    )
    res.json(restaurant)
  } catch (error) {
    res.status(500).send(error)
  }
}

const update = async function (req, res) {
  try {
    await Restaurant.update(req.body, { where: { id: req.params.restaurantId } })
    const updatedRestaurant = Restaurant.findByPk(req.params.restaurantId)
    res.json(updatedRestaurant)
  } catch (error) {
    res.status(500).send(error)
  }
}

const destroy = async function (req, res) {
  try {
    const deletedRestaurant = await Restaurant.destroy({ where: { id: req.params.restaurantId } })
    let message = ''
    if (deletedRestaurant === 1) {
      message = 'Sucessfuly deleted restaurant id.' + req.params.restaurantId
    } else {
      message = 'Could not delete restaurant.'
    }
    res.json(message)
  } catch (error) {
    res.status(500).send(error)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
