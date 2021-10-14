import React from 'react';

class Articulo extends React.Component {
constructor(){
    super();
    this.state = {
      Nombre: '',
      Descripcion: '',
      Precio: '',
      Img: '',
      _id:'',

      articulos: []
      
    };
    
    this.addArticulo = this.addArticulo.bind(this);
    
    this.handleChange = this.handleChange.bind(this);
}

addArticulo(e){
if(this.state._id){
    fetch(`http://localhost:3001/articulo/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
            Nombre:this.state.Nombre,
            Descripcion:this.state.Descripcion,
            Precio:this.state.Precio, 
            Img:this.state.Img
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          window.M.toast({html: 'Articulo actualizado'});
          this.setState({_id: '', Nombre: '',
          Descripcion: '',
          Precio: '',
          Img: ''});
          this.fetchArticulo();
        });

}else{
    fetch("http://localhost:3001/articulo",{
    method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
})

.then(res=>res.json())
.then(data=>{
    console.log(data)
    window.M.toast({html: 'Articulo Agregado'});
    this.setState({
        Nombre: '',
        Descripcion: '',
        Precio: '',
        Img: ''

})
this.fetchArticulo()

})
.catch(err=>console.error(err))


}
e.preventDefault();
}

componentDidMount() {
    this.fetchArticulo()
}
fetchArticulo(){
    fetch("http://localhost:3001/articulo")
    .then(res=>res.json())
    .then(data=>{
       
        this.setState({articulos:data.articulos})
        console.log(this.state.articulos)
    })
}

handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }
  deleteArticulo(id){
    
console.log("Eliminado",id)
if( window.confirm("Seguro que quieres eliminar?")){

    fetch(`http://localhost:3001/articulo/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
         window.M.toast({html: 'Articulo Eliminado'});
          this.fetchArticulo();
        });
}
}
editArticulo(id){
    fetch(`http://localhost:3001/articulo/${id}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.articulos)
        this.setState({
            Nombre:data.articulos.Nombre,
            Descripcion:data.articulos.Descripcion,
            Precio:data.articulos.Precio, 
            Img:data.articulos.Img,
            _id:data.articulos._id
        })
        console.log(this.state)
    })
    

    

}
    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="#" className="brand-logo">Gestion de Articulos</a>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">

                        <div className="col s5">
                            <div className="card">

                                <form onSubmit={this.addArticulo}>

                                    <div className="input-field col s12">
                                        <input type="text" name="Nombre"onChange={this.handleChange} placeholder="Igresa el nombre del articulo" value={this.state.Nombre}></input>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea type="text" name="Descripcion"onChange={this.handleChange} placeholder="escribe una descrpcion " value={this.state.Descripcion}></textarea>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="number" name="Precio"onChange={this.handleChange} placeholder="Ingresa el precio del articulo" value={this.state.Precio}></input>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="text" name="Img"onChange={this.handleChange} placeholder="Ingresa imagen del articulo" value={this.state.Img}></input>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">
                                        Agregar Articulo
                                    </button>

                                </form>

                            </div>

                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripcion</th>
                                        <th>Precio</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        this.state.articulos.map(articulos=>{
                                            return(
                                                <tr key={articulos._id}>
                                                    <td>{articulos.Nombre}</td>
                                                    <td>{articulos.Descripcion}</td>
                                                    <td>{articulos.Precio}</td>
                                                    <td> 
                                                        <img src={articulos.Img} width="60" height="60" >

                                                        </img>
                                                         </td>
                                                         <td>
                                                             <button  onClick={() => this.deleteArticulo(articulos._id)} className="btn light-blue darken-4">

                                                             <i className="material-icons">delete</i> 
                                                             </button>
                                                             
                                                             <button  onClick={() => this.editArticulo(articulos._id)}className="btn light-blue darken-4">
                                                             <i className="material-icons">edit</i>

                                                             </button>
                                                         </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>


                    </div>

                </div>
            </div>
        );
    }
}

export default Articulo;