class Cart {
    constructor() {
        this.productList = new Map();
    }

    addProduct(id, quantity) {
        if (this.productList.has(id))
            this.productList.set(id, this.productList.get(id) + quantity);
        else
            this.productList.set(id, quantity);
    }
    getNumberOfItems() {
        return this.productList.size;
    }

    unserialize(content) {
       if (content.hasOwnProperty("livrare")) {
           const livrare = new Livrare();
           const adresa = new Address();

           livrare.detalii = content.livrare.detalii;
           adresa.unserialize(content.livrare.adresa);
           livrare.adresa = adresa;
           this.setLivrare(livrare);

       }
    }

    deleteProduct(id) {
        this.productList.delete(id);
    }

    setAddress(address) {
        this.address = address;
    }

    setLivrare(livrare) {
        this.livrare = livrare;
    }

    setFacturare(facturare) {
        this.facturare = facturare;
    }

    setPlata(plata) {
        this.plata = plata;
    }

    getAddress() {
        return this.address;
    }

    getLivrare() {
        return this.livrare;
    }

    getFacturare() {
        return this.facturare;
    }

    getPlata() {
        return this.plata;
    }

    getProductList() {
        return this.productList;
    }
}

class Product {
    constructor(name, id, price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
}


class ProductCatalog {
    constructor() {
        this.productCatalog = new Map();
    }

    addProduct(product) {
        if(this.productCatalog.has(product))
            this.productCatalog.set(product);
    }
}

class Address {
    constructor() { }

    unserialize(adresa) {
        this.judet = adresa.judet;
        this.oras = adresa.oras;
        this.strada = adresa.strada;
    }
}

class Livrare {
    constructor() { }
}

class Facturare {
    constructor() { }
}

class Plata {
    constructor() { }
}
//localStorage.clear();
if (localStorage.getItem('cart') == null) {
    cos = new Cart();

    adresaLivrare = new Address();
    adresaFacturare = new Address();
    livrare1 = new Livrare();
    factura1 = new Facturare();
    plata1 = new Plata();
    catalog = new ProductCatalog();

    adresaLivrare.judet = 'Dolj';
    adresaLivrare.oras = 'Craiova';
    adresaLivrare.strada = 'Sfintii Apostoli';

    livrare1.adresa = adresaLivrare;
    livrare1.detalii = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

    adresaFacturare.judet = 'Bucuresti';

    factura1.cui = '6859662';
    factura1.adresa = adresaFacturare;

    plata1.tip = 'card';
    plata1.numarCard = '4469 5350 2910 6378';
    plata1.lunaExpirare = '08';
    plata1.anExpirare = '25';
    plata1.numeDetinator = 'Mihai Alexandru'
    plata1.cvv = '327';

    cos.setLivrare(livrare1);
    cos.setFacturare(factura1);
    cos.setPlata(plata1);

    console.log(cos);
    localStorage.setItem('cart', JSON.stringify(cos));
    console.log(JSON.stringify(cos));
} else {
    console.log('else');
    cosContent = JSON.parse(localStorage.getItem('cart'));
    cos = new Cart();
    cos.unserialize(cosContent);
    console.log(cos);
}

function showNumberOfItems() {

}

function addProduct(id) {

    cos.addProduct(id, parseInt(document.getElementById(id + 'Cantitate').value));
    document.getElementById('numberOfItems').innerHTML = cos.getNumberOfItems();

    localStorage.setItem('cart', JSON.stringify(cos));

}
