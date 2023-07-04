class func {
    static convertVND(price) {
        return price?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    static convertDate(date) {
        let fDate = new Date(date)
        return fDate.toLocaleString()
    }

}

export default func