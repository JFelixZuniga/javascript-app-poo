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
          <a href="#" class="btn btn-danger" name="delete">Delete</a>
        </div>
      </div>
    `;
    //ahora insertamos los elemtos en el html, a través de un elemento hijo (appenChild)
    productList.appendChild(element)
    //Le agregamos el método resetForm para resetear los valores
    //Opción 1: this.resetForm();
  }

  resetForm(){
    document.getElementById('product-form').reset();
  }

  deleteProduct(element){
    if(element.name === 'delete'){
      element.parentElement.parentElement.parentElement.remove();
      this.showMessage('Product Deleted Successfully', 'danger')
    }
  }

  showMessage(message, cssClass){
    const div = document.createElement('div');
    div.className = `alert alert-${cssClass} mt-4`
    div.appendChild(document.createTextNode(message));
    //Mostrando en el DOM
    const container = document.querySelector('.container');
    const app = document.querySelector('#App');
    //la linea siguiente se lee así:  insertamos dentro del contenedor, pero antes de un elemento otro elemento, es decir, dentro de container voy a insertar el div, el cual estará antes del elemento app
    container.insertBefore(div, app);
    setTimeout  (function () {
      document.querySelector('.alert').remove();
    }, 3000);
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
    //Para que se visualice el nuevo producto, creamos un nuevo objeto desde la interfaz
    const ui = new UI();

    if(name === '' || price === '' || year === ''){
      return ui.showMessage('Complete Fields Please', 'info');
    }
    ui.addProduct(product)
    //Opción 2: acá llamamos al método para resetear los valores
    ui.resetForm();

    ui.showMessage('Product Add Successfully', 'success');

    //cancelamos el evento por defecto de refrescar la página
    e.preventDefault();
});

//Capturamos el evento para eiiminar producto
document.getElementById('product-list')
  .addEventListener('click', e => {
    const ui = new UI();
    ui.deleteProduct(e.target);
  })