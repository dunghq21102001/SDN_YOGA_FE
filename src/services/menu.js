export default class menu {
    static mainMenu() {
        return [
            { name: 'Home', link: '/', title: 'Home' },
            { name: 'About', link: '/about', title: 'About' },
            { name: 'Products', link: '/products', title: 'Products' },
            { name: 'Contact', link: '/contact', title: 'Contact' },
        ]
    }

    static adminMenu() {
        return [
            { name: 'User Management', link: 'users-mnt', title: 'User Management' },
            { name: 'Product Management', link: 'products-mnt', title: 'Product Management' },
            { name: 'Class Management', link: 'classes-mnt', title: 'Class Management' },
            { name: 'Contact Management', link: 'contact-mnt', title: 'Contact Management' },
        ]
    }
}