// Call the dataTables jQuery plugin
$(document).ready(function() {
    cargarUsuarios();
  $('#usuarios').DataTable();
});


async function cargarUsuarios(){

  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const usuarios = await request.json();


  let listadoHtml = '';


  for (let usuario of usuarios){


    let botonEliminar = '<a href="#" onclick="eliminar(' + usuario.id + ')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';

    let botonEditar = '<a href="#" onclick="editar(' + usuario.id + ')" class="btn btn-primary btn-circle btn-sm"><i class="fas fa-edit"></i></a>';


    textotelefono = usuario.telefono = null ? "-" : usuario.telefono;

   let usuariohtml = '<tr><td>' + usuario.id + '</td><td>' + usuario.nombre + ' ' + usuario.apellido + '</td><td>' + usuario.email + '</td><td>' + textotelefono + '</td><td>' + botonEliminar + ' '+ botonEditar + '</td></tr>';

    listadoHtml += usuariohtml;
  }

  console.log(usuarios);


document.querySelector('#usuarios tbody').outerHTML = listadoHtml;

}


async function eliminar(id) {

if(!confirm('¿Desea borrar el usuario?')){
    return;
}

const request = await fetch('api/usuarios/' + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

  });

location.reload();

}