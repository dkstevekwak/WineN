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
        return order.cart.some(function(orderProduct){
            return (orderProduct._id).toString() === productId.toString();
          }) ;
      }); //returns a list of orders containing productId
      filteredOrders.forEach(function(order){
        order.cart.forEach(function(el){
          if (el._id.toString() !== productId.toString()){
            if (recProducts[el._id]) recProducts[el._id]++;
            else recProducts[el._id] = 1;
          }
        })
      })  //updates the rec Products for the productId
      return recProducts;
    }


    Product.find({}, function(err, products){
      var result = {};
      req.products = products;
      products.forEach(function(product){
        result[product._id] = productAnalyzer(product._id);
      })
      
      //sort results to have products with highest quantities first.
      
      req.hashTable = result;

      //console.log('here is the hashTable if it works!', result)
      next();
    })

    // sample output
    //{ product_id: { product_id2 : Qty, product_id3: Qty } }


  });
});

router.get('/:productId', function(req, res, next){
  var validProduct = req.products.some(function(product){
    return product._id.toString() === req.params.productId.toString();
  });
  if (validProduct){
    var arr= [];
    for (var key in req.hashTable[req.params.productId]){
      arr.push({ "productId": key, "qty": req.hashTable[req.params.productId][key] });
    }
    arr = arr.sort(function(a,b){
      return b.qty - a.qty;
    });
    arr = arr.slice(0,3);

    res.send(arr);
    next();
  }
  else next();

})
router.get('/', function(req, res, next){
  res.send(req.hashTable);
  console.log(hashTable);
  next();
})

// Make sure this is after all of
// the registered routes!

router.use(function (req, res) {
    res.status(404).end();
});
