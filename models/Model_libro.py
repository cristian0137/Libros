from config.database import db

class Libro(db.Model):

    __tablename__= 'Libros'

    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(100))
    año = db.Column(db.Integer)
    autor = db.Column(db.String(100))
    editorial = db.Column(db.String(100))

    def to_dict(self):
        return{
            'id':self.id,
            'nombre':self.nombre,
            'año': self.año,
            'autor': self.autor,
            'editorial': self.editorial
        }
