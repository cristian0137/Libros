// static/js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libro-form');
    const listaLibros = document.getElementById('lista-libros');
    const mensaje = document.getElementById('mensaje');

    // Función para obtener y mostrar libros
    const obtenerLibros = () => {
        fetch('/Obtenerlibros')
            .then(response => response.json())
            .then(data => {
                listaLibros.innerHTML = '';
                data.forEach(libro => {
                    const li = document.createElement('li');
                    li.textContent = `${libro.nombre} - ${libro.autor} (${libro.año}) - Editorial: ${libro.editorial}`;
                    
                    // Botón para eliminar el libro
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.style.marginLeft = '10px';
                    btnEliminar.onclick = () => eliminarLibro(libro.id);
                    
                    li.appendChild(btnEliminar);
                    listaLibros.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                mensaje.textContent = 'Error al obtener los libros.';
                mensaje.style.color = 'red';
            });
    };

    // Función para agregar un libro
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const nombre = document.getElementById('nombre').value;
        const año = parseInt(document.getElementById('año').value);
        const autor = document.getElementById('autor').value;
        const editorial = document.getElementById('editorial').value;
    
        const libro = { nombre, año, autor, editorial };
    
        fetch('/Agregarlibro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(libro)
        })
        .then(response=>{
            if(response.status === 201){
                mensaje.textContent='Libro guardado'
                mensaje.style.color = 'gree';
                form.reset()
            }else{
                throw new Error('Error al agregar el libro')
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mensaje.textContent = 'Error al agregar el libro.';
            mensaje.style.color = 'blue';
        });
        
    });

    // Función para eliminar un libro
    const eliminarLibro = (id) => {
        fetch('/Eliminarlibro', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id }) // Enviando el id en el cuerpo de la solicitud
        })
        .then(response => {
            if (response.status === 204) {
                mensaje.textContent = 'Libro eliminado correctamente.';
                mensaje.style.color = 'green';
                obtenerLibros();
            } else {
                throw new Error('Error al eliminar el libro.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            mensaje.textContent = 'Error al eliminar el libro.';
            mensaje.style.color = 'blue';
        });
    };
    

    // Obtener libros al cargar la página
    obtenerLibros();
});
