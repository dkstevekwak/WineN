'use strict';
var router = require('express').Router();
var Order = require('mongoose').model('Order');
var Product = require('mongoose').model('Product');
var _ = require('lodash');
module.exports = router;

router.use('/*', function(req, res, next){
  Order.find({}, function(err, orders){
    if(err) next(err);
    //console.log('here is the orders from database', orders)
    var productAnalyzer = function(productId){
      var recProducts = {};
      var filteredOrders = orders.filter(function(order, idx){
        //console.log('this is for order ', idx)
        return order.cart.some(function(orderProduct){
            //console.log(orderProduct._id," vs ",productId, (orderProduct._id) === productId);
            return (orderProduct._id).toString() === productId.toString();
          }) ; //due to some historical changes in schema && order.paid == true
      }); //returns a list of orders containing productId
      //console.log("HERE IS FILTERED ORDERS", filteredOrders.length);
      filteredOrders.forEach(function(order){
        //console.log('here are the orders inside filteredOrders', order);
        order.cart.forEach(function(el){
          //console.log('here is order.cart', order.cart);
          if (el._id.toString() !== productId.toString()){
            if (recProducts[el._id]) recProducts[el._id]++;
            else recProducts[el._id] = 1;
            //console.log("here is the product association: ", el._id ," qty: " ,  recProducts[el._id])
          }
        })
      })  //updates the rec Products for the productId
      return recProducts;
    }
    //need to take filtered orders and return an object.
    Product.find({}, function(err, products){
      var result = {};
      req.products = products;
      products.forEach(function(product){
        result[product._id] = productAnalyzer(product._id);
      })
      
      //sort results to have products with highest quantities first.
      console.log("_.sortBy(result)",_.sortBy(result));
//      results = _.sortBy(result);
      
      req.hashTable = result;

      //console.log('here is the hashTable if it works!', result)
      next();
    })

    //var table = {
    //  product_id: times
    //}
    //
    //{ product_id: { product_id2 : Qty, product_id3: Qty } }


  });
});

router.get('/:productId', function(req, res, next){
  var validProduct = req.products.some(function(product){
    return product._id.toString() === req.params.productId.toString();
  });
  if (validProduct){
    //console.log('here is rec engine prod id', req.params.productId);
    res.send(req.hashTable[req.params.productId]);
    next();
  }
  else next();

})
router.get('/', function(req, res, next){
  //console.log('here is rec engine prod id', req.params.productId);
  res.send(req.hashTable);
  next();
})

// Make sure this is after all of
// the registered routes!

// router.use(function(err, req, res, next) {
// 	if (err) return res.sendStatus(500);
// });

router.use(function (req, res) {
    res.status(404).end();
});
