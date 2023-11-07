const routes = {
    landing:"/home",
    home: '/',
    login: '/login',
    register: '/register',
    addRestaurants: '/addRestaurants',
    firstView: '/firstView',
    orderSuccessful: '/orderSuccessful',
    settings: '/settings',
    record: '/record',
    reception: '/reception',
    order: (orderId) => (orderId ? `/order/:${orderId}` : '/order/:id'),
    restaurants: '/restaurants',
    suppliers: '/suppliers',
    chatIntercom: '/chatIntercom',
    chat: '/chat',
    supplier: (supplierId) => (supplierId ? `/supplier/:${supplierId}` : '/supplier/:id'),
    admin: {
        team: '/admin/team',
        suppliersAdmin: '/admin/suppliers'
    }
}
export default routes;