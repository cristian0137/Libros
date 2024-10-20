from flask import Flask, request, jsonify,session,render_template
from config.database import app,db
from models.Model_libro import Libro

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def Hello():
    return render_template('index.html')


@app.route('/Agregarlibro', methods = ['POST'])
def Agregar_libro():
    data = request.get_json()
    nuevo_libro = Libro(
        nombre = data.get('nombre'),
        año = data.get('año'),
        autor = data.get('autor'),
        editorial = data.get('editorial')
    )
    db.session.add(nuevo_libro)
    db.session.commit()
    return 'Libro guardado',201

@app.route('/Obtenerlibros',methods = ['GET'])
def Obtener_libros():
    libros = Libro.query.all()
    libros_dict = [libro.to_dict() for libro in libros]
    return jsonify(libros_dict)

@app.route('/Eliminarlibro', methods = ['DELETE'])
def Eliminar_libro():
    id = request.json['id']
    libro = Libro.query.get(id)

    if libro is None :
        return 'El libro no fue encontrado', 404
    
    db.session.delete(libro)
    db.session.commit()
    return 'Libro eliminado', 204


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
