"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var routes = {
  home: '/',
  login: '/login',
  register: '/register',
  account: '/account',
  orders: '/orders',
  order: function order(orderId) {
    return orderId ? "/order/:".concat(orderId) : '/order/:id';
  },
  suppliers: '/suppliers',
  supplier: function supplier(supplierId) {
    return supplierId ? "/supplier/:".concat(supplierId) : '/supplier/:id';
  },
  admin: {
    team: '/admin/team',
    suppliersAdmin: '/admin/suppliers'
  }
};
var _default = routes;
exports["default"] = _default;