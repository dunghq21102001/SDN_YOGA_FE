class func {
    static convertVND(price) {
        return price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }
}

export default func