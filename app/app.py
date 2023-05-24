#importando las dependecias
from flask import Flask, render_template,request,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text



#Comunicar bd y  inicializar app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:ysoloSEqv19%@localhost/bdprojectx'
db = SQLAlchemy(app)



    

class Egresado(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    pais = db.Column(db.String(50), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    area = db.Column(db.String(50), nullable=False)
    salario = db.Column(db.String(50), nullable=False)

with app.app_context():
    db.create_all()

@app.route('/')
def login():
    return render_template('login.html')

@app.route('/inicio')
def index():
    
    id_elemento = request.args.get('id')
    if id_elemento is None:
        ide = 0
    else:
        ide = int(id_elemento)
        
    
    elemento = db.session.execute(text('SELECT * FROM egresado WHERE id = :id'), {'id': ide}).fetchone()
    tabla = db.session.execute(text('SELECT * FROM egresado')).fetchall()
    return render_template('user.html',tabla = tabla, elemento = elemento)


@app.route('/agregar', methods=['POST'])
def retornar():
    nombre = request.form['nombre']
    pais = request.form['pais']
    fecha = request.form['fecha']
    area = request.form['area']
    salario = request.form['salario']

    guardarDatos = Egresado(nombre=nombre, pais=pais, fecha=fecha, area=area, salario=salario)
    db.session.add(guardarDatos)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/eliminar/<int:id>', methods=['POST'])
def eliminar(id):
    elemento = Egresado.query.get(id)  # Obtener el elemento a eliminar
    db.session.delete(elemento)  # Eliminar el elemento

    # Actualizar las claves primarias de los demás elementos
    elementos = Egresado.query.filter(Egresado.id > id).all()
    for elemento in elementos:
        elemento.id -= 1

    db.session.commit()  # Guardar los cambios en la base de datos

    return redirect(url_for('index'))

@app.route('/editar/<int:id>', methods=['GET'])
def editar(id):
    
    return redirect(url_for('index', id=id))



@app.route('/actualizar/<int:id>',methods=['POST'])
def actualizar(id):

    nombre = request.form['nombre2']
    pais = request.form['pais2']
    fecha = request.form['fecha2']
    area = request.form['area2']
    salario = request.form['salario2']

    egresado = db.session.query(Egresado).filter_by(id=id).first()
    egresado.nombre = nombre
    egresado.pais = pais
    egresado.fecha = fecha
    egresado.area = area
    egresado.salario = salario

    db.session.commit()
    return redirect(url_for('index'))

@app.route('/cerrar')
def cerar():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(debug = True)



