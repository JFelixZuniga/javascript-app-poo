class Product {
  // Método constructor, se ejecuta a penas creamos un objeto
  constructor(name, price, year){
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

//Clase que contiene los objetos de la interfaz, es la que accede directamente al DOM (html) para poder alterarlo
class UI {
  addProduct(product){
    const productList = document.getElementById('product-list');
    const element = document.createElement('div');
    //Aquí diseñamos los elementos que iran dentro de product list
    element.innerHTML = `
      <div class= "card text-center mb-4">
        <div class="product-body">
          <strong>Product Name</strong>: ${product.name}
          <strong>Product Price</strong>: ${product.price}
          <strong>Product Year</strong>: ${product.year}
        </div>
      </div>
    `;
    //ahora insertamos los elemtos en el html
    productList.appendChild(element)
  }

  deleteProduct(){

  }

  showMessage(){
     
  }
}

//Eventos del DOM que queremos capturar
//Acá obtendremos el id del form, y para capturar el evento submit agregamos el método addEventListener
document.getElementById('product-form')
  .addEventListener('submit', function(e) {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const product = new Product(name, price, year);

    const ui = new UI();

    //cancelamos el evento por defecto de refrescar la página
    e.preventDefault();
});
