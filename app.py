from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, json, Response
from flask_mysqldb import MySQL, MySQLdb
from flask_wtf.csrf import CSRFProtect
from  flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_paginate import Pagination, get_page_args

import os
import openpyxl
import pandas as pd
import socket
import locale

#from werkzeug.security import generate_password_hash
from datetime import datetime
from config import config
#Models:
# from models.ModelUser import ModelUser
from models.ModelUser import ModelUsuarios
#Entities:
# from models.entities.User import User
from models.entities.User import Usuarios


app=Flask(__name__)

locale.setlocale(locale.LC_ALL, '')

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'pvwebcontrol'
app.config['MYSQL_CHARSET'] = 'utf8mb4'
db = MySQL(app)
app.config['SECRET_KEY'] = "BB!1w8NAt1T^%kvhUI*S^"
app.config['WTF_CSRF_SECRET_KEY'] = "BB!1w8NAt1T^%kvhUI*S^"
csrf = CSRFProtect(app)

login_manager_app=LoginManager(app)


@login_manager_app.user_loader
def load_user(id):
    # return ModelUser.get_by_id(db, id)
    return ModelUsuarios.get_by_id(db, id)

@app.route('/')
def index():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method=='POST':
        #print(request.form['username'])
        #print(request.form['password'])
        # user=User(0,request.form['username'], request.form['password'])
        user=Usuarios(0,request.form['username'], request.form['password'],0,0,0,0,0,0,0,0,0,0)
        # logged_user=ModelUser.login(db, user)
        logged_user=ModelUsuarios.login(db, user)
        if logged_user != None:
            if logged_user.UC_PASSWORD:
                login_user(logged_user)
                flash("Bienvenido al Sistema usuari@ " + current_user.UC_NOMBRE_C, 'success')
                return redirect(url_for('home'))
            else:
                flash("Password incorrecto...",'warning')
                return render_template('auth/login_v2.html')
        else:
            flash("Usuario no encontrado...",'warning')
            return render_template('auth/login_v2.html')
    else:
        return render_template('auth/login_v2.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash("Ha cerrado sesion correctamente", 'success')
    return redirect(url_for('login'))

@app.route('/home')
def home():
    
    return render_template('index_m.html')

#8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
@app.route('/catalogo/productosv_json')
@login_required
def c_productosv_json():
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_productos limit 1000")
    productos = cursor.fetchall()

    data = []
    contenido = {}
    for producto in productos:
        contenido = {
            'id':producto['id'],
            'codigo':producto['cp_codigo'],
            'descripcion':producto['cp_descripcion'],
            'um':producto['cp_um'],
            'existencia':producto['cp_existencia'],
            'pventa':producto['cp_precio_venta'],
            'pcosto':producto['cp_precio_costo'],
            'codprov':producto['cp_codigo_prov'],
            'marca':producto['cp_marca'],
            'prodserv':producto['cp_cod_prod_serv_sat'],
            'umsat':producto['cp_cod_um_sat'],
        }
        data.append(contenido)
        contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify(data)

@app.route('/catalogo/productosv_jsonv2',methods=['GET','POST'])
@login_required
def c_productosv_jsonv2():
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT id,cp_cod_prod_serv_sat,cp_codigo,cp_descripcion,cp_codigo_prov,cp_um,cp_precio_venta,cp_existencia FROM ucat_productos ")
    productos = cursor.fetchall()

    data = []
    contenido = {}
    for producto in productos:
        contenido = {
            'id':producto['id'],
            'prodserv':producto['cp_cod_prod_serv_sat'],
            'codigo':producto['cp_codigo'],
            'descripcion':producto['cp_descripcion'],
            'codprov':producto['cp_codigo_prov'],
            'um':producto['cp_um'],
            'pventa':locale.currency(producto['cp_precio_venta'],symbol=True, grouping=True),
            'existencia':locale.currency(producto['cp_existencia'],symbol=False, grouping=True),
        }
        data.append(contenido)
        contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify({'data':data})

@app.route("/catalogo/productosv2",methods=["POST","GET"])
@login_required
def ajaxfile():
    try:
        #conn = mysql.connect()
        #cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
        if request.method == 'POST':
            draw = request.form['draw'] 
            row = int(request.form['start'])
            rowperpage = int(request.form['length'])
            searchValue = request.form["search[value]"]
            print(draw)
            print(row)
            print(rowperpage)
            print(searchValue)
 
            ## Total number of records without filtering
            cursor.execute("select count(*) as allcount from ucat_productos")
            rsallcount = cursor.fetchone()
            totalRecords = rsallcount['allcount']
            print(totalRecords) 
 
            ## Total number of records with filtering
            likeString = "%" + searchValue +"%"
            cursor.execute("SELECT count(*) as allcount from ucat_productos WHERE cp_codigo LIKE %s OR cp_descripcion LIKE %s OR cp_codigo_prov LIKE %s", (likeString, likeString, likeString))
            rsallcount = cursor.fetchone()
            totalRecordwithFilter = rsallcount['allcount']
            print(totalRecordwithFilter) 
 
            ## Fetch records
            if searchValue=='':
                cursor.execute("SELECT * FROM ucat_productos limit %s, %s;", (row, rowperpage))
                employeelist = cursor.fetchall()
            else:        
                cursor.execute("SELECT * FROM ucat_productos WHERE cp_codigo LIKE %s OR cp_descripcion LIKE %s OR cp_codigo_prov LIKE %s limit %s, %s;", (likeString, likeString, likeString, row, rowperpage))
                employeelist = cursor.fetchall()
 
            data = []
            for row in employeelist:
                data.append({
                    'prodserv':row['cp_cod_prod_serv_sat'],
                    'codigo':row['cp_codigo'],
                    'descripcion':row['cp_descripcion'],
                    'codprov':row['cp_codigo_prov'],
                    'um':row['cp_um'],
                    'pventa':row['cp_precio_venta'],
                    'existencia':row['cp_existencia'],
                })
            
            response = {
                'draw': draw,
                'iTotalRecords': totalRecords,
                'iTotalDisplayRecords': totalRecordwithFilter,
                'aaData': data,
            }
            print(response)
            return jsonify(response)
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        #conn.close()

@app.route('/catalogo/productos_mostrador_json', methods=['GET'])
@login_required
def c_productos_mostrador_json():
    query = request.args.get('query')
    print(query)
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_productos where id>1500 limit 200")
    productos = cursor.fetchall()

    data = []
    contenido = {}
    for producto in productos:
        contenido = {
            'id':producto['id'],
            'codigo':producto['cp_codigo'],
            'descripcion':producto['cp_descripcion'],
            'um':producto['cp_um'],
            'existencia':producto['cp_existencia'],
            'pventa':producto['cp_precio_venta'],
            'pcosto':producto['cp_precio_costo'],
            'codprov':producto['cp_codigo_prov'],
            'marca':producto['cp_marca'],
            'prodserv':producto['cp_cod_prod_serv_sat'],
            'umsat':producto['cp_cod_um_sat'],
        }
        data.append(contenido)
        contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify(data)

@app.route('/catalogo/productos_ubicacion_json')
@login_required
def c_productos_ubicacion_json():
    #query = request.args.get('query')
    l_ubica = request.args.get('m_clave','', type=str)
    #print(l_ubica)
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    new_sql = "SELECT concat(cast(ana_clave as char), ana_lado, cast(ana_posicion as char)) as Ubicacion FROM ucat_ubicaciones where ana_art_clave='{0}'".format(l_ubica)
    #print(new_sql)
    cursor.execute(new_sql)
    ubicacion = cursor.fetchall()

    #data = []
    #contenido = {}
    ubicando=''
    for producto in ubicacion:
        ubicando += producto['Ubicacion'] + ','
        
    #print(ubicando)    
    # contenido = {'ubicacion':ubicando}
    # data.append(contenido)
    # contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify(result=ubicando)

#Metodo de crear Json sobre la estructura raiz [productos]:
#solo creando un acumulado de string sin usar contenedor {}
@app.route('/catalogo/prod_serv_json_cadena',methods=["GET"])
@login_required
def c_prod_serv_json_cadena():

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_productos_serv_sat order by id")
    productos = cursor.fetchall()
        
    data = []
    contenido = ""
    for producto in productos:
        contenido = producto['ups_claveprodserv'] + ' - ' + producto['ups_descripcion']
        data.append(contenido)
        contenido = ""
    
    cursor.close()

    return jsonify({'productos':data})

@app.route('/catalogo/umsat_json_cadena',methods=["GET"])
@login_required
def c_umsat_json_cadena():

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_um_sat order by id")
    productos = cursor.fetchall()
        
    data = []
    contenido = ""
    for producto in productos:
        contenido = producto['us_clave'] + ' - ' + producto['us_nombre_clave']
        data.append(contenido)
        contenido = ""
    
    cursor.close()

    return jsonify({'umsat':data})

@app.route('/catalogo/mostrador_json_cadena',methods=["GET"])
@login_required
def c_mostrador_json_cadena():

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_productos")
    productos = cursor.fetchall()
        
    data = []
    contenido = ""
    for producto in productos:
        contenido = producto['cp_codigo'] + ' | ' + producto['cp_descripcion'] + ' | ' + str(producto['cp_precio_venta']) + ' | ' + str(producto['cp_existencia'])
        data.append(contenido)
        contenido = ""
    
    cursor.close()

    return jsonify({'mostrador':data})

@app.route('/catalogo/venta_mostrador_letra')
@login_required
def c_venta_mostrador_letra():
    estado = request.args.get('letra','', type=str)

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    new_sql = "SELECT CONCAT(UC_LETRA_FOLIO , ' - ' , UC_NOMBRE_C) AS VENDEDOR FROM ucat_usuarios WHERE UC_LETRA_FOLIO != ''"
    #print(new_sql)
    cursor.execute(new_sql)
    letras = cursor.fetchall()

    data = []
    contenido = ""
    for letrita in letras:
        contenido = letrita['VENDEDOR']
        data.append(contenido)
        contenido = ""
    
    cursor.close()
    #print(data)
    return jsonify(result=data)

@app.route('/catalogo/actualiza_mostrador_letra')
@login_required
def c_actualiza_mostrador_letra():
    letra = request.args.get('letra','', type=str)
    numero = request.args.get('numero','', type=str)

    cursor = db.connection.cursor()
    sql = """UPDATE ucat_folios SET fol_folio = {0} WHERE fol_catalogo = '{1}'""".format(numero, letra.strip())

    #print(sql)
    cursor.execute(sql)
    db.connection.commit()
    conteo = cursor.rowcount
    cursor.close()
    msg = ''

    if conteo == 1:
        msg = 'Actualizado'
    else:
        msg = 'Error'

    return jsonify(result=msg)

@app.route('/catalogo/actualiza_existencia')
@login_required
def c_actualiza_existencia():
    codigo = request.args.get('codigo','', type=str)
    cant = request.args.get('cant','', type=str)
    condicion = request.args.get('condicion','', type=str)

    if condicion == 'suma':
        sqlA = """UPDATE ucat_productos SET cp_existencia = cp_existencia + {0} WHERE cp_codigo='{1}'""".format(cant,codigo)
    elif condicion == 'resta':
        sqlA = """UPDATE ucat_productos SET cp_existencia = cp_existencia - {0} WHERE cp_codigo='{1}'""".format(cant,codigo)

    cursor = db.connection.cursor()
    print(sqlA,condicion)
    cursor.execute(sqlA)
    db.connection.commit()
    contador = cursor.rowcount
    cursor.close()
    msg = ''
    if contador == 1:
        msg = 'Actualizado'
    else:
        msg = 'Error'
    
    return jsonify(result=msg)

@app.route('/operaciones/crea_kardex')
@login_required
def c_oper_crea_kardex():
    ktipo = request.args.get('ktipo','', type=str)
    kfecha = request.args.get('kfecha','', type=str)
    kfolio = request.args.get('kfolio','', type=str)
    kcodigo = request.args.get('kcodigo','', type=str)
    kcant = request.args.get('kcant','', type=str)
    kcosto = request.args.get('kcosto','', type=str)
    kestado = request.args.get('kestado','', type=str)

    cursorB = db.connection.cursor()
    sql ="""SELECT * FROM ucat_productos WHERE cp_codigo='{0}'""".format(kcodigo)
    cursorB.execute(sql)
    producto = cursorB.fetchall()
    p_costo = producto[0][6]
    cursorB.close()
    kcosto = p_costo

    sql=''
    msg=''

    sql ="INSERT INTO upro_kardex_producto ( ukp_tipo, ukp_fecha, ukp_folio, ukp_codigo, ukp_cant, ukp_costo, ukp_estado) VALUES( %s, %s, %s, %s, %s, %s, %s)"
    #print(sql)
    value =(ktipo, kfecha, kfolio, kcodigo, kcant, kcosto, kestado)
    cursor= db.connection.cursor()
    cursor.execute(sql, value)    
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        db.connection.commit()
        msg = 'Agregado'
    else:
        db.connection.rollback()
        msg = 'Fallado'
    1
    
    return jsonify(result=msg)

@app.route('/operaciones/muestra_kardex_codigo')
@login_required
def c_oper_muuestra_kardex_codigo():
    clave = request.args.get('clave','', type=str)
    #print(clave)

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    new_sql = """SELECT id as ID,DATE(ukp_fecha) as FECHA,ukp_codigo as CODIGO,ukp_estado as ESTADO,ukp_tipo as TIPO,ukp_folio AS FOLIO,
                case when (ukp_tipo) = 'V' then 'Ventas(SALIDAS)'
                     when (ukp_tipo) = 'C' then 'Compras(ENTRADAS)'
                     END AS MOVIMIENTOS,
                (case when ukp_tipo='C' then ukp_cant else 0 end ) AS ENT,
                (case when ukp_tipo='V' then ukp_cant else 0 end ) AS SAL,
                (case when ukp_tipo='C' then ukp_cant else 0 end ) -
                (case when ukp_tipo='V' then ukp_cant else 0 end ) AS EXIST,
                ukp_costo AS COSTO,
                (case when ukp_tipo='C' then ukp_cant*ukp_costo else 0 end ) AS MOV_ENT,
                (case when ukp_tipo='V' then ukp_cant*ukp_costo else 0 end  ) AS MOV_SAL,
                '0.00' AS MOV_INV
                FROM upro_kardex_producto
                WHERE ukp_codigo= '{0}'
                order by ukp_fecha""".format(clave)
    #print(new_sql)
    cursor.execute(new_sql)
    kardex = cursor.fetchall()

    data = []
    contenido = {}
    for producto in kardex:
        contenido = {
            'ID':producto['ID'],
            'FECHA': producto['FECHA'],
            'CODIGO':producto['CODIGO'],
            'TIPO':producto['TIPO'],
            'ESTADO':producto['ESTADO'],
            'FOLIO':producto['FOLIO'],
            'MOVIMIENTOS':producto['MOVIMIENTOS'],
            'ENT':producto['ENT'],
            'SAL':producto['SAL'],
            'EXIST':producto['EXIST'],
            'COSTO':producto['COSTO'],
            'MOV_ENT':producto['MOV_ENT'],
            'MOV_SAL':producto['MOV_SAL'],
            'MOV_INV':producto['MOV_INV'],
        }
        data.append(contenido)
        contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify({'data':data})

@app.route('/catalogo/venta_mostrador_encabezado')
@login_required
def c_venta_mostrador_encabezado():
    nombre_catalogo = request.args.get('nombre','', type=str)
    #print(l_ubica)
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    new_sql = "SELECT fol_folio FROM ucat_folios where fol_catalogo='{0}'".format(nombre_catalogo)
    #print(new_sql)
    cursor.execute(new_sql)
    num_folio = cursor.fetchall()

    numero = num_folio[0]['fol_folio']
    numero = numero + 1
    cursor.close()
    print(numero)
    return jsonify(result=numero)

@app.route('/catalogo/venta_mostrador_fecha')
@login_required
def c_venta_mostrador_fecha():
    fecha = request.args.get('fecha','', type=str)
    #print(l_ubica)
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    new_sql = f"""SELECT DATE_FORMAT(NOW(), "%Y-%m-%d") as fecha"""
    #print(new_sql)
    cursor.execute(new_sql)
    v_fecha = cursor.fetchall()

    n_fecha = v_fecha[0]['fecha']
    #numero = numero + 1
    cursor.close()
    #print(numero)
    return jsonify(result=n_fecha)


@app.route('/catalogo/regimen_json_cadena',methods=["GET"])
@login_required
def c_regimen_json_cadena():

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_regimen_sat order by id")
    regimenes = cursor.fetchall()
        
    data = []
    contenido = ""
    for regimen in regimenes:
        contenido = regimen['r_regimen'] + ' - ' + regimen['r_descripcion']
        data.append(contenido)
        contenido = ""
    
    cursor.close()

    return jsonify({'regimen':data})

#metodo para crear el archivo json con otra estructura
@app.route('/catalogo/prod_serv_json_archivo')
@login_required
def c_prod_serv_json_archivo():

    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_productos_serv_sat order by id")
    productos = cursor.fetchall()
    
    data = []
    contenedor={}
    for producto in productos:
        contenedor = {
            'Id': producto['ups_claveprodserv'],
            'Value': producto['ups_claveprodserv'] + ' - ' + producto['ups_descripcion']
        }
        data.append(contenedor)
        contenedor={}

    #json_data = json.dumps(data, encoding='utf-8') 
    #descomentar si requieres generar el archivo json
    with open('productos.json', 'w', encoding="utf-8") as f:
         json.dump({'productos':data}, f, ensure_ascii=False)

    cursor.close()
    #db.connection.close()
    #print(data)
    return jsonify(data)
    #return jsonify({'productos':data})

@app.route('/catalogo/clientesv_json')
@login_required
def c_clientesv_json():
    
    cursor = db.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM ucat_clientes")
    clientes = cursor.fetchall()

    data = []
    contenido = {}
    for cliente in clientes:
        contenido = {
            'id':cliente['id'],
            'rfc':cliente['cli_rfc'],
            'razon':cliente['cli_razonsocial'],
            'nombre':cliente['cli_nombrecomercial'],
            'calle':cliente['cli_calle'],
            'noext':cliente['cli_noexterior'],
            'noint':cliente['cli_nointerior'],
            'cpostal':cliente['cli_codigopostal'],
            'estado':cliente['cli_estado'],
            'municipio':cliente['cli_municipio'],
            'ciudad':cliente['cli_ciudad'],
            'regimen':cliente['cli_regimenfiscal'],
            'correo':cliente['cli_correo']
        }
        data.append(contenido)
        contenido = {}
    #print(data)
    cursor.close()
    #db.connection.close()

    return jsonify(data)


#8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888  
#                           AREA PRODUCTOS/ARTICULOS C-R-U-D
#8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888  
@app.route('/catalogo/productos')
@login_required
def c_productos():
    return render_template('catalog/articulos/cat_product_v2.html')

@app.route('/catalogo/productos/agregar_ver')
@login_required
def c_productos_agrega_ver():
    cursor = db.connection.cursor()
    cursor.execute("SELECT * FROM ucat_um")
    umedida = cursor.fetchall()
    #print(umedida)
    cursor.close()

    cur_marca = db.connection.cursor()
    cur_marca.execute("SELECT * FROM ucat_marca_producto")
    umarca = cur_marca.fetchall()
    print(umarca)
    cur_marca.close()
    return render_template('/catalog/articulos/cat_product_add.html', unidades=umedida, marcas=umarca)
    #return render_template('ejemplos.html')

@app.route('/catalogo/productos/agregar', methods=['POST','GET'])
@login_required
def c_productos_agregar():
    if request.method == 'POST':
        p_codigo = request.form['txtCodigo'].upper()
        p_cod_prov = request.form['txtCodProv'].upper()
        p_existencia = request.form['txtExistencia']
        p_descripcion = request.form['txtDescripcion'].upper()
        p_um = request.form['txtUM']
        p_marca = request.form['txtMarca']
        p_pventa = request.form['txtPVenta']
        p_pcosto = request.form['txtPCosto']
        p_prodserv = request.form['txtProdServSAT']
        separa_prod = p_prodserv.split('-')
        clave,descripcion = separa_prod

        p_umsat = request.form['txtUMSat']
        separa_um = p_umsat.split('-')
        uclave,udesc = separa_um

        print(descripcion + "-" + udesc)

        sql ="""INSERT INTO ucat_productos (cp_codigo, cp_descripcion,
                cp_um, cp_existencia, cp_precio_venta, cp_precio_costo,
                cp_codigo_prov, cp_marca, cp_cod_prod_serv_sat,
                cp_cod_um_sat) VALUES( '{0}', '{1}', '{2}', {3}, {4}, {5},
                '{6}', '{7}', '{8}', '{9}')""".format(p_codigo, p_descripcion, p_um, p_existencia, p_pventa, p_pcosto, p_cod_prov, p_marca, clave, uclave)
        print(sql)
        cursor= db.connection.cursor()
        cursor.execute(sql)
        db.connection.commit()
        cursor.close()

        flash("Se ha ingresado el Producto Correctamente!!", 'success')
    return redirect(url_for('c_productos'))
    #return jsonify('Se ha creado un nuevo producto correctamente!')
        
@app.route('/catalogo/productos/mostrar/<id>', methods=['POST','GET'])
@login_required
def c_productos_mostrar(id):
    cursor_prod = db.connection.cursor()
    sql ="""SELECT * FROM ucat_productos WHERE cp_codigo='{0}'""".format(id)
    cursor_prod.execute(sql)
    producto = cursor_prod.fetchall()
    prod_clave=producto[0][9]
    um_sat=producto[0][10]
    #print(producto)
    #print(prod_clave,um_sat)
    cursor_prod.close()

    cur_pro_clave = db.connection.cursor()
    sql ="""SELECT * FROM ucat_productos_serv_sat WHERE ups_claveprodserv={0}""".format(prod_clave)
    cur_pro_clave.execute(sql)
    pro_desc = cur_pro_clave.fetchall()
    prod_descripcion = pro_desc[0][2]
    #print("descripcion: " + prod_descripcion)
    cur_pro_clave.close()

    campo_prod_clave = prod_clave + ' - ' + prod_descripcion

    cur_um = db.connection.cursor()
    sql_um ="""SELECT * FROM ucat_um_sat WHERE us_clave='{0}'""".format(um_sat)
    #print(sql_um)
    cur_um.execute(sql_um)
    um_desc = cur_um.fetchall()
    um_descripcion = um_desc[0][2]
    #print("descripcion: " + um_descripcion)
    cur_um.close()

    campo_um_sat = um_sat + ' - ' + um_descripcion
    #print(campo_um_sat)

    cursor = db.connection.cursor()
    cursor.execute("SELECT * FROM ucat_um")
    umedida = cursor.fetchall()
    #print(umedida)
    cursor.close()

    cur_marca = db.connection.cursor()
    cur_marca.execute("SELECT * FROM ucat_marca_producto")
    umarca = cur_marca.fetchall()
    #print(umarca)
    cur_marca.close()
    
    return render_template('catalog/articulos/cat_product_edit.html', producto_edit=producto[0], unidades=umedida, marcas=umarca, edit_pro_clave=campo_prod_clave, edit_um_sat=campo_um_sat)

@app.route('/catalogo/productos/modificar/<id>', methods=['POST','GET'])
@login_required
def c_productos_modificar(id):
    if request.method == 'POST':
        e_cod_prov = request.form['txtCodProv'].upper()  #"AB Martinez"
        e_exist = request.form['txtExistencia']   # "Domicilio conocido 4"
        e_descripcion = request.form['txtDescripcion'].upper()  #"1 - SuperAdministrador"
        e_um = request.form['txtUM']  # "3 - Administrador"
        e_marca =  request.form['txtMarca']   #"1952-01-05"
        e_pventa =  request.form['txtPVenta']   #"1952-01-05"
        e_pcosto =  request.form['txtPCosto']   #"1952-01-05"
        e_prodsat =  request.form['txtProdServSAT']   #"1952-01-05"
        separa_prod = e_prodsat.split('-')
        clave,descripcion = separa_prod

        e_um_sat =  request.form['txtUMSat']   #"1952-01-05"
        separa_um = e_um_sat.split('-')
        uclave,udesc = separa_um

        cursor = db.connection.cursor()
        sql = """UPDATE ucat_productos 
                     SET cp_codigo_prov = '{0}', cp_existencia = {1}, cp_descripcion = '{2}', 
                     cp_um = '{3}', cp_marca = '{4}', cp_precio_venta = {5},
                     cp_precio_costo = {6}, cp_cod_prod_serv_sat = '{7}', cp_cod_um_sat = '{8}'   
                     WHERE id = {9}""".format(e_cod_prov, e_exist, e_descripcion, e_um, e_marca, e_pventa, e_pcosto, clave, uclave, id)

        #print(sql)
        cursor.execute(sql)
        db.connection.commit()
        conteo = cursor.rowcount
        cursor.close()

        if conteo == 1:
            flash("Se ha actualizado correctamente el Producto", 'success')
            return redirect(url_for('c_productos'))
        else:
            flash("Ocurrio una error al actualizar el producto",'warning')
            return redirect(url_for('c_productos'))
        
@app.route('/catalogo/productos/eliminar/<id>', methods=['POST','GET'])
@login_required
def c_productos_eliminar(id):
    
    sql = "DELETE FROM ucat_productos WHERE cp_codigo='{0}'".format(id)
    cursor = db.connection.cursor()
    cursor.execute(sql)
    db.connection.commit()
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        flash("Se ha eliminado el Producto Correctamente", 'success')
        return redirect(url_for('c_productos'))
    else:
        flash("Ocurrio una error al eliminar el Producto",'warning')
        return redirect(url_for('c_productos'))

@app.route('/catalogo/productos/eliminarV2')
@login_required
def c_productos_eliminarV2():
    codigo = request.args.get('codigo','', type=str)
    
    print(codigo)
    sql = "DELETE FROM ucat_productos WHERE cp_codigo='{0}'".format(codigo)
    cursor = db.connection.cursor()
    cursor.execute(sql)
    db.connection.commit()
    confirma = cursor.rowcount
    cursor.close()
    #confirma=1
    msg=''
    if confirma == 1:
        msg='Eliminado'
        #flash("Se ha eliminado el Cliente Correctamente", 'success')
        #return redirect(url_for('c_clientes'))
    else:
        msg='Cancelado'
        #flash("Ocurrio una error al eliminar el Cliente",'warning')
        #return redirect(url_for('c_clientes'))
    print(msg)
    return jsonify(result=msg)

#00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#                       AREA DE CLIENTES C-R-U-D
#00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
@app.route('/catalog/clientes/codigopostal', methods=['GET'])
@login_required
def c_clientes_busca():
    query = request.args.get('query')
    #print('Obteniendo desde el input de la pagina:' + query)

    cursor_prod = db.connection.cursor()
    sql ="""SELECT d_estado, d_municipio FROM ucat_codigo_postal WHERE d_codigo={0} GROUP BY d_estado""".format(query)
    cursor_prod.execute(sql)
    datos_cp = cursor_prod.fetchall()
    
    if len(datos_cp) == 0:
        print('no se encuentra el codigo postal')
        parametro={'parametro':'Vacio'}
        poblados={'poblados':'Vacio'}
        mensaje = {'mensaje':'Vacio'}
        data=parametro | poblados | mensaje
        return jsonify(data)
    else:
        parametro=[]
        #for linea in datos_cp:
        parametro.append(datos_cp[0][0])
        parametro.append(datos_cp[0][1])

        parametro = {'parametro':parametro}

        cursor_prod.close()

        cursor_asent = db.connection.cursor()
        sql ="""SELECT d_asenta_poblado FROM ucat_codigo_postal WHERE d_codigo={0}""".format(query)
        cursor_asent.execute(sql)
        pueblos = cursor_asent.fetchall()
        #print(pueblos)
        poblados=[]
    
        for pueblo in pueblos:
            poblados.append(pueblo[0])

        poblados = {'poblados':poblados}
        mensaje = {'mensaje':'lleno'}
        cursor_asent.close()

        data = parametro | poblados | mensaje
        #print(data)
        #print(data1)
        return jsonify(data)

@app.route('/catalogo/clientes')
@login_required
def c_clientes():
    return render_template('catalog/clientes/cat_clientes.html')

@app.route('/catalog/clientes/agregar_capturar')
@login_required
def c_clientes_agregar_capturar():
    #return render_template('catalog/prueba.html')
    return render_template('catalog/clientes/cat_clientes_add.html')

@app.route('/catalogo/clientes/agregar_guardar')
@login_required
def c_clientes_agregar_guardar():
    rfc = request.args.get('rfc','', type=str)
    razon = request.args.get('razon','', type=str)
    comercial = request.args.get('comercial','',type=str)
    calle = request.args.get('calle','',type=str)
    noext = request.args.get('noexterior','',type=str)
    noint = request.args.get('nointerior','',type=str)
    postal = request.args.get('postal','',type=str)
    estado = request.args.get('estado','',type=str)
    municipio = request.args.get('municipio','',type=str)
    ciudad = request.args.get('ciudad','',type=str)
    regimen = request.args.get('regimen','',type=str)
    correo = request.args.get('correo','',type=str)

    #print(rfc,razon,comercial,calle,noext,noint,postal,estado,municipio,ciudad,regimen,correo)
    sql=''
    msg=''

    sql ="INSERT INTO ucat_clientes (cli_rfc, cli_razonsocial, cli_nombrecomercial, cli_calle, cli_noexterior, cli_nointerior, cli_codigopostal, cli_estado, cli_municipio, cli_ciudad, cli_regimenfiscal, cli_correo) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #print(sql)
    value =(rfc, razon, comercial, calle, noext, noint, postal, estado, municipio, ciudad, regimen, correo)
    cursor= db.connection.cursor()
    cursor.execute(sql, value)    
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        db.connection.commit()
        msg = 'Agregado'
    else:
        db.connection.rollback()
        msg = 'Fallado'
    
    
    return jsonify(result=msg)
    # return jsonify(msj)

@app.route('/catalogo/clientes/mostrar/<id>', methods=['POST','GET'])
@login_required
def c_clientes_mostrar(id):
    cursor_cte = db.connection.cursor()
    sql ="""SELECT * FROM ucat_clientes WHERE cli_rfc='{0}'""".format(id)
    cursor_cte.execute(sql)
    cliente = cursor_cte.fetchall()
    cli_cp = cliente[0][7]
    #print(cli_cp)
    cursor_asent = db.connection.cursor()
    sql ="""SELECT d_asenta_poblado FROM ucat_codigo_postal WHERE d_codigo={0}""".format(cli_cp)
    cursor_asent.execute(sql)
    pueblos = cursor_asent.fetchall()
    #print(pueblos)
    poblados=[]
    for pueblo in pueblos:
        poblados.append(pueblo[0])
    #asentamiento = {'poblados':poblados}
    #print(poblados)
    return render_template('catalog/clientes/cat_clientes_edit.html', cliente_edit=cliente[0], asentamientos=poblados)

@app.route('/catalogo/clientes/modificar')
@login_required
def c_clientes_modificar():
    rfc = request.args.get('rfc','', type=str)
    razon = request.args.get('razon','', type=str)
    comercial = request.args.get('comercial','',type=str)
    calle = request.args.get('calle','',type=str)
    noext = request.args.get('noexterior','',type=str)
    noint = request.args.get('nointerior','',type=str)
    postal = request.args.get('postal','',type=str)
    estado = request.args.get('estado','',type=str)
    municipio = request.args.get('municipio','',type=str)
    ciudad = request.args.get('ciudad','',type=str)
    regimen = request.args.get('regimen','',type=str)
    correo = request.args.get('correo','',type=str)
    #print(rfc,razon,comercial,calle,noext,noint,postal,estado,municipio,ciudad,regimen,correo)
    sql=''
    msg=''
    #sql ="INSERT INTO ucat_clientes (cli_rfc, cli_razonsocial, cli_nombrecomercial, cli_calle, cli_noexterior, cli_nointerior, cli_codigopostal, cli_estado, cli_municipio, cli_ciudad, cli_regimenfiscal, cli_correo) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    sql_modificar = """UPDATE ucat_clientes 
                     SET cli_razonsocial = '{0}', cli_nombrecomercial = '{1}', cli_calle = '{2}', 
                     cli_noexterior = '{3}', cli_nointerior = '{4}', cli_codigopostal = {5},
                     cli_estado = '{6}', cli_municipio = '{7}', cli_ciudad = '{8}', cli_regimenfiscal = '{9}', cli_correo = '{10}'  
                     WHERE cli_rfc = '{11}'""".format(razon, comercial, calle, noext, noint, postal, estado, municipio, ciudad, regimen, correo, rfc)
    #print(sql)
    #value =(rfc, razon, comercial, calle, noext, noint, postal, estado, municipio, ciudad, regimen, correo)
    cursor= db.connection.cursor()
    cursor.execute(sql_modificar)    
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        db.connection.commit()
        msg = 'Modificado'
    else:
        db.connection.rollback()
        msg = 'Fallado'
    
    
    return jsonify(result=msg)
    # return jsonify(msj)

@app.route('/catalogo/clientes/eliminar')
@login_required
def c_clientes_eliminar():
    rfc = request.args.get('rfc','', type=str)
    
    #print(rfc)
    sql = "DELETE FROM ucat_clientes WHERE cli_rfc='{0}'".format(rfc)
    cursor = db.connection.cursor()
    cursor.execute(sql)
    db.connection.commit()
    confirma = cursor.rowcount
    cursor.close()
    #confirma=1
    msg=''
    if confirma == 1:
        msg='Eliminado'
        #flash("Se ha eliminado el Cliente Correctamente", 'success')
        #return redirect(url_for('c_clientes'))
    else:
        msg='Cancelado'
        #flash("Ocurrio una error al eliminar el Cliente",'warning')
        #return redirect(url_for('c_clientes'))
    return jsonify(result=msg)
#  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#               INICIA EL PROCESO DE USUARIOS CRUD
#  000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
@app.route('/catalogo/usuarios', methods=['POST','GET'])
@login_required
def c_usuarios():
    if request.method == 'POST':
        palabra = request.form['inputBuscar']
        if palabra is not None:
            print(palabra)

            likeString = "%" + palabra +"%"
            #Obtener los parametros de paginacion de la URL actual
            page, per_page, offset = get_page_args(page_parameter='page', per_page_parameter='per_page')

            cursor=db.connection.cursor()
            cursor.execute("SELECT * FROM ucat_usuarios where UC_USUARIO LIKE %s OR UC_NOMBRE_C like %s;",(likeString,likeString))
            u_usuarios=cursor.fetchall()
            cursor.close()

            data=[]
            for usuario in u_usuarios:
                usuario_dict = {
                    'id':usuario[0],
                    'usuario':usuario[1],
                    'password':usuario[2],
                    'nombre':usuario[3],
                    'direccion':usuario[4],
                    'nivel':usuario[5],
                    'puesto':usuario[6],
                    'fechanac':usuario[7],
                    'fechareg':usuario[8],
                    'fechabaja':usuario[9],
                }
                data.append(usuario_dict)
            #print(data)
            #print(data)
            #calcular el numero total de elementos y la lista de elementos para la pag actual
            total = len(data)
            paginated_data = u_usuarios[offset: offset + per_page]
            #Crear objeto de paginacion
            pagination = Pagination(page=page, per_page=per_page, total=total, css_framework='bootstrap5')
            #cursor.commit()
            #print(u_usuarios)
            cur_nivel=db.connection.cursor()
            cur_nivel.execute("SELECT * FROM ucat_nivelusuario")
            lista_nivel=cur_nivel.fetchall()

            cur_puesto=db.connection.cursor()
            cur_puesto.execute("SELECT * FROM ucat_puestotrabajo")
            lista_puesto=cur_puesto.fetchall()

            #print(current_user)
            #print(current_user.UC_NOMBRE_C)
            #print(current_user.UC_NIVEL)
            return render_template('catalog/usuarios/cat_usuarios.html', usuarios = paginated_data, lista_nivel = lista_nivel, lista_puesto = lista_puesto, pagination = pagination)
        
    #Obtener los parametros de paginacion de la URL actual
    page, per_page, offset = get_page_args(page_parameter='page', per_page_parameter='per_page')

    cursor=db.connection.cursor()
    cursor.execute("SELECT * FROM ucat_usuarios")
    u_usuarios=cursor.fetchall()
    cursor.close()

    data=[]
    for usuario in u_usuarios:
        usuario_dict = {
            'id':usuario[0],
            'usuario':usuario[1],
            'password':usuario[2],
            'nombre':usuario[3],
            'direccion':usuario[4],
            'nivel':usuario[5],
            'puesto':usuario[6],
            'fechanac':usuario[7],
            'fechareg':usuario[8],
            'fechabaja':usuario[9],
        }
        data.append(usuario_dict)
    #print(data)
    #calcular el numero total de elementos y la lista de elementos para la pag actual
    total = len(data)
    paginated_data = u_usuarios[offset: offset + per_page]
    #Crear objeto de paginacion
    pagination = Pagination(page=page, per_page=per_page, total=total, css_framework='bootstrap5')
    #cursor.commit()
    #print(u_usuarios)
    cur_nivel=db.connection.cursor()
    cur_nivel.execute("SELECT * FROM ucat_nivelusuario")
    lista_nivel=cur_nivel.fetchall()

    cur_puesto=db.connection.cursor()
    cur_puesto.execute("SELECT * FROM ucat_puestotrabajo")
    lista_puesto=cur_puesto.fetchall()

    #print(current_user)
    #print(current_user.UC_NOMBRE_C)
    #print(current_user.UC_NIVEL)
    return render_template('catalog/usuarios/cat_usuarios.html', usuarios = paginated_data, lista_nivel = lista_nivel, lista_puesto = lista_puesto, pagination = pagination)

@app.route('/catalogo/usuarios/agregar', methods=['POST','GET'])
@login_required
def c_usuarios_agregar():
    date = datetime.now()
    if request.method == 'POST':
        l_usuario = request.form['txtUsuario']  # "MRAB2023"
        l_password = Usuarios.generar_password_hashed(request.form['txtPassword']) # generate_password_hash("nuevo2023")
        l_nombre_c = request.form['txtNombre']  #"AB Martinez"
        l_domicilio = request.form['txtDireccion']   # "Domicilio conocido 4"
        l_nivel = request.form['txtNivel']  #"1 - SuperAdministrador"
        l_puesto = request.form['txtPuesto']  # "3 - Administrador"
        l_fecha_nacimiento =  request.form['txtFechaNac']   #"1952-01-05"
        l_fecha_registro = date.strftime("%Y-%m-%d %H:%M:%S") #"2023-10-18 13:55:14.000000"
        l_fecha_baja = "1900-01-01 01:01:01.000000"
        
        #print(request.form['txtPassword'])
        #print(l_password)
        query = f"INSERT INTO ucat_usuarios (UC_USUARIO, UC_PASSWORD, UC_NOMBRE_C, UC_DIRECCION, UC_NIVEL, UC_PUESTO, UC_FECHA_NACIMIENTO, UC_FECHA_REGISTRO, UC_FECHA_BAJA) VALUES ( '{l_usuario}', '{l_password}', '{l_nombre_c}', '{l_domicilio}', '{l_nivel}', '{l_puesto}', '{l_fecha_nacimiento}', '{l_fecha_registro}', '{l_fecha_baja}')"
        
        cursor = db.connection.cursor()
        cursor.execute(query)
        db.connection.commit()
        cursor.close()
        #print(query)
        flash("Se ha creado correctamente el Usuario", 'success')
    return redirect(url_for('c_usuarios'))

@app.route('/catalogo/usuarios/mostrar/<id>', methods=['POST','GET'])
@login_required
def c_usuarios_mostrar(id):
    
    cursor=db.connection.cursor()
    sql ="""SELECT * FROM ucat_usuarios WHERE id={0}""".format(id)
    cursor.execute(sql)
    data_user=cursor.fetchall()
    cursor.close()
    
    cur_nivel=db.connection.cursor()
    cur_nivel.execute("SELECT * FROM ucat_nivelusuario")
    lista_nivel=cur_nivel.fetchall()
    cur_nivel.close()

    cur_puesto=db.connection.cursor()
    cur_puesto.execute("SELECT * FROM ucat_puestotrabajo")
    lista_puesto=cur_puesto.fetchall()
    cur_puesto.close()

    return render_template('catalog/usuarios/cat_usuarios_modificar.html', contacto = data_user[0], lista_nivel = lista_nivel, lista_puesto = lista_puesto)

@app.route('/catalogo/usuarios/modificar/<id>', methods=['POST','GET'])
@login_required
def c_usuarios_modificar(id):
    if request.method == 'POST':
        l_nombre_c = request.form['txtNombre']  #"AB Martinez"
        l_domicilio = request.form['txtDireccion']   # "Domicilio conocido 4"
        l_nivel = request.form['txtNivel']  #"1 - SuperAdministrador"
        l_puesto = request.form['txtPuesto']  # "3 - Administrador"
        l_fecha_nacimiento =  request.form['txtFechaNac']   #"1952-01-05"

        ModelUsuarios.actualizar_datos_usuario(db, l_nombre_c, l_domicilio, l_nivel, l_puesto, l_fecha_nacimiento, id)
        flash("Se ha actualizado correctamente los datos del Usuario", 'success')
    return redirect(url_for('c_usuarios'))
    #return "hola"

@app.route('/catalogo/usuarios/eliminar/<id>', methods=['POST','GET'])
@login_required
def c_usuarios_eliminar(id):
    sql = "DELETE FROM ucat_usuarios WHERE id='{0}'".format(id)
    cursor = db.connection.cursor()
    cursor.execute(sql)
    db.connection.commit()
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        flash("Se ha eliminado el Usuario Correctamente", 'success')
        return redirect(url_for('c_usuarios'))
    else:
        flash("Ocurrio una error al eliminar el Usuario",'warning')
        return redirect(url_for('c_usuarios'))

@app.route('/catalogo/usuarios/cambiarPassword', methods=['GET','POST'])
@login_required
def cambiar_password():

    if request.method ==  'POST':
        nuevo_password = request.form['nuevoPassword']
        confirmacion_password = request.form['repitePassword']
        if(nuevo_password == confirmacion_password):
            usuario = current_user
            usuario.password = nuevo_password
            ModelUsuarios.cambiar_password(db, usuario)
            flash("Se cambio correctamente el password", 'success')
            return redirect(url_for('c_usuarios'))
        else:
            flash("Los password no coinciden", 'warning')
            return render_template('auth/cambiar_password.html')   
    else:
        return render_template('auth/cambiar_password.html')
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#          INICIA AREA DE OPERACIONES
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
@app.route('/operaciones/ventas/genera_venta_ticket')
@login_required
def oper_ventas_genera():
    nombre_host = socket.gethostname()
    aqui_ip = socket.gethostbyname(socket.gethostname())
    return render_template('/catalog/operaciones/ventas/generar_venta_ticket.html',nombrepc=nombre_host, aip=aqui_ip)

@app.route('/operaciones/ventas/genera_venta_ticket/agregar')
@login_required
def oper_ventas_genera_agrega():
    p_folio = request.args.get('p_folio','', type=str)
    p_letra = request.args.get('p_letra','', type=str)
    p_numero = request.args.get('p_numero','',type=str)
    p_fecha = request.args.get('p_fecha','',type=str)
    p_estado = request.args.get('p_estado','',type=str)
    p_facturar = request.args.get('p_facturar','',type=str)
    p_sucursal = request.args.get('p_sucursal','',type=str)
    p_comentario = request.args.get('p_comentario','',type=str)
    p_vendedor = request.args.get('p_vendedor','',type=str)
    p_total = request.args.get('p_total','',type=str)
    p_subtotal = request.args.get('p_subtotal','',type=str)
    p_iva = request.args.get('p_iva','',type=str)
    p_usu_canc = request.args.get('p_usu_canc','',type=str)
    p_u_f_canc = request.args.get('p_u_f_canc','',type=str)
    p_ncredito = request.args.get('p_ncredito','',type=str)
    p_ucobra = request.args.get('p_ucobra','',type=str)
    p_no_fact = request.args.get('p_no_fact','',type=str)
    p_nomb_pc = request.args.get('p_nomb_pc','',type=str)
    p_ver_1p = request.args.get('p_ver_1p','',type=str)

    #print(rfc,razon,comercial,calle,noext,noint,postal,estado,municipio,ciudad,regimen,correo)
    sql=''
    msg=''

    sql ="INSERT INTO upro_ventas (uvt_folio, uvt_letra, uvt_numero, uvt_fecha, uvt_estado, uvt_facturar, uvt_sucursal, uvt_comentario, uvt_vendedor, uvt_total, uvt_subtotal, uvt_iva, uvt_usuario_cancela, uvt_usuario_fecha_cancela, uvt_nota_credito, uvt_usuario_cobra, uvt_no_factura, uvt_equipo_pc, uvt_ip_pc) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #print(sql)
    value =(p_folio, p_letra, p_numero, p_fecha, p_estado, p_facturar, p_sucursal, p_comentario, p_vendedor, p_total, p_subtotal, p_iva, p_usu_canc, p_u_f_canc, p_ncredito, p_ucobra, p_no_fact, p_nomb_pc, p_ver_1p)
    cursor= db.connection.cursor()
    cursor.execute(sql, value)    
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        db.connection.commit()
        msg = 'AgregadoEnc'
    else:
        db.connection.rollback()
        msg = 'FalladoEnc'
    
    return jsonify(result=msg)

@app.route('/operaciones/ventas/genera_venta_ticket/agregar_detalle')
@login_required
def oper_ventas_genera_agrega_detalle():
    det_folio = request.args.get('det_folio','', type=str)
    det_cant = request.args.get('det_cant','', type=str)
    det_codigo = request.args.get('det_codigo','', type=str)  #buscar por codigo los campos que falta que por javascript no se puede
    det_descr = request.args.get('det_descr','', type=str)
    det_pu = request.args.get('det_pu','', type=str)
    det_importe = request.args.get('det_importe','', type=str)
    det_cod_sat = request.args.get('det_cod_sat','', type=str) #buscar
    det_um_sat = request.args.get('det_um_sat','', type=str)  #buscar
    det_um = request.args.get('det_um','', type=str) #buscar
    det_pu_iva = request.args.get('det_pu_iva','', type=str)
    det_pu_subtotal = request.args.get('det_pu_subtotal','', type=str)
    det_imp_iva = request.args.get('det_imp_iva','', type=str)
    det_imp_subtotal = request.args.get('det_imp_subtotal','', type=str)
    det_imp_desc = request.args.get('det_imp_desc','', type=str)
    det_imp_desc_subtotal = request.args.get('det_imp_desc_subtotal','', type=str)
    det_imp_desc_iva = request.args.get('det_imp_desc_iva','', type=str)
    det_cod_prov = request.args.get('det_cod_prov','', type=str)  #buscar
    det_pre_costo = request.args.get('det_pre_costo','', type=str)  #buscar

     # -->SE REALIZA LA BUSQUEDA Y OBTENER LOS CAMPOS A RELLENAR
    cursorB = db.connection.cursor()
    sql ="""SELECT * FROM ucat_productos WHERE cp_codigo='{0}'""".format(det_codigo)
    cursorB.execute(sql)
    producto = cursorB.fetchall()
    p_um = producto[0][3]
    p_costo = producto[0][6]
    p_cprov = producto[0][7]
    p_sat=producto[0][9]
    um_sat=producto[0][10]
    #print(p)
    #print(prod_clave,um_sat)
    cursorB.close()
    det_cod_sat = p_sat
    det_um_sat = um_sat
    det_um = p_um
    det_cod_prov = p_cprov
    det_pre_costo = p_costo

    #print(p_um,p_costo,p_cprov,p_sat,um_sat)
    sql=''
    msg=''

    sql ="INSERT INTO upro_ventas_detallado (uvt_det_folio, uvt_det_cant, uvt_det_codigo, uvt_det_descripcion, uvt_det_precio_unitario, uvt_det_importe, uvt_det_codigo_sat, uvt_det_um_sat, uvt_det_um, uvt_det_pu_iva, uvt_det_pu_subtotal, uvt_det_importe_iva, uvt_det_importe_subtotal, uvt_det_importe_descuento, uvt_det_importe_descuento_subtotal, uvt_det_importe_descuento_iva, uvt_det_codigo_prov, uvt_det_precio_costo) VALUES( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    #print(sql)
    value =(det_folio, det_cant, det_codigo, det_descr, det_pu, det_importe, det_cod_sat, det_um_sat, det_um, det_pu_iva, det_pu_subtotal, det_imp_iva, det_imp_subtotal, det_imp_desc, det_imp_desc_subtotal, det_imp_desc_iva, det_cod_prov, det_pre_costo)
    cursor= db.connection.cursor()
    cursor.execute(sql, value)    
    confirma = cursor.rowcount
    cursor.close()

    if confirma == 1:
        db.connection.commit()
        msg = 'AgregadoDet'
    else:
        db.connection.rollback()
        msg = 'FalladoDet'
    
    
    return jsonify(result=msg)

@app.route('/operaciones/ventas/genera_venta_ticket/mostrar_ticket/<id>', methods=['GET','POST'])
@login_required
def oper_ventas_genera_impresion(id):
    cursor=db.connection.cursor()
    sql ="""SELECT * FROM upro_ventas_detallado WHERE uvt_det_folio='{0}'""".format(id)
    #print(sql)
    cursor.execute(sql)
    venta_det=cursor.fetchall()
    #print(venta_det)
    cursor.close()

    cursor_enc=db.connection.cursor()
    sql_enc ="""SELECT * FROM upro_ventas WHERE uvt_folio='{0}'""".format(id)
    #print(sql)
    cursor_enc.execute(sql_enc)
    venta_enc=cursor_enc.fetchall()
    #print(venta_enc)
    cursor_enc.close()

    data=[]
    data_enc=[]

    detallado = {}
    det_enc ={
        'folio':venta_enc[0][1],
        'fecha':venta_enc[0][4],
        'estado':venta_enc[0][5],
        'sucursal':venta_enc[0][7],
        'vendedor':venta_enc[0][9],
        'comentario':venta_enc[0][8],
        'total':locale.currency(venta_enc[0][10],symbol=True, grouping=True),
    }
    data_enc.append(det_enc)
    #documentacion formato moneda https://docs.python.org/3.6/library/locale.html
    for v_det in venta_det:
        detallado = {
            'cant':locale.currency(v_det[2],symbol=False, grouping=True),
            'codigo':v_det[3],
            'descripcion':v_det[4],
            'precio':locale.currency(v_det[5],symbol=True, grouping=True),
            'importe':locale.currency(v_det[6],symbol=True, grouping=True),
        }
        data.append(detallado)

    #print(data_enc)


    return render_template('/catalog/operaciones/ventas/ver_ticket_venta.html',detalles=data, encabezado=data_enc)


# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#          FINALIZA EL PROCESO CRUD DE CATALOGO DE USUARIOS
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
@app.route('/subir_prodservsat')
@login_required
def subir_prodservsat():
    return render_template('/extras/subir_csv_sat_prodserv.html')

@app.route('/subir_umsat')
@login_required
def subir_umsat():
    return render_template('/extras/subir_csv_sat_um.html')

@app.route('/importar_articulos')
@login_required
def importar_articulos():
    return render_template('/extras/subir_articulos_bd.html')

@app.route('/importar_codigopostal')
@login_required
def importar_codigopostal():
    return render_template('extras/subir_codpostal_bd.html')

@app.route('/importar_regimenfiscal')
@login_required
def importar_regimenfiscal():
    return render_template('extras/subir_regimenfiscal.html')

@app.route('/importar_ubicaciones')
@login_required
def importar_ubicaciones():
    return render_template('extras/subir_ubicaciones.html')
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#PROCESO PARA IMPORTAR PRODUCTOS Y SERVICIOS SAT A LA BASE DE DATOS
@app.route('/subir_data_csv/procesar',methods=['POST','GET'])
@login_required
def subir_data_csv_procesar():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('subir_prodservsat'))
        else:
            #print(os.path.dirname(__file__))
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                ## print(archivo_path)
                ## revisar la pagina para agregar parametros
                ## https://www.digitalocean.com/community/tutorials/pandas-read_excel-reading-excel-file-in-python
                lectura = pd.read_excel(direc_join,sheet_name='c_ClaveProdServ', usecols=['c_ClaveProdServ', 'Descripción'])
                flash('Realizando lectura de Excel','success')
                ##print(lectura)
                ##flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]
                for i,row in lectura.iterrows():
                   n_codigo =row['c_ClaveProdServ']
                   n_descripcion=row['Descripción']
                   data.append((n_codigo,n_descripcion))

                   n_codigo=''
                   n_descripcion=''
            
                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')
                flash('Direccion de almacenamiento: ' + direc_join)
                
                sql ="INSERT INTO ucat_productos_serv_sat (ups_claveprodserv, ups_descripcion) VALUES( %s, %s)"
                
                cursor= db.connection.cursor()
                cursor.executemany(sql,data)

                if(len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Codigos Postales a la Base de Datos.', 'success')
                else:
                    db.connection.rollback()
                    flash('Ocurrio un problema al ingresar','warning')
                
                cursor.close()
                flash('Se ha ingresado correctamente el archivo de excel a la Base de Datos','success')

            #return redirect(url_for('subir_data_csv'))        
    return redirect(url_for('subir_prodservsat'))

#PROCESO PARA IMPORTAR UNIDAD DE MEDIDA SAT A LA BASE DE DATOS
@app.route('/subir_data_csv/procesarV2',methods=['POST','GET'])
@login_required
def subir_data_csv_procesarV2():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('subir_umsat'))
        else:
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
                #archivo.save(archivo_path)
                flash('Se ha subido el archivo Excel para procesar...','success')
                #print(archivo_path)
                #revisar la pagina para agregar parametros
                # https://www.digitalocean.com/community/tutorials/pandas-read_excel-reading-excel-file-in-python
                lectura = pd.read_excel(direc_join,sheet_name='c_ClaveUnidad', usecols=['c_ClaveUnidad', 'Nombre'])
                flash('Realizando lectura de Excel','success')
                #print(lectura)
                #flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]
                for i,row in lectura.iterrows():
                    u_clave=row['c_ClaveUnidad']
                    u_nombre = row['Nombre']
                    data.append((u_clave,u_nombre))

                    u_clave=''
                    u_nombre=''

                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')

                sql ="INSERT INTO ucat_um_sat (us_clave, us_nombre_clave) VALUES( %s, %s)"
                
                cursor= db.connection.cursor()
                cursor.executemany(sql, data)

                if(len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Unidades de Medida SAT a la Base de Datos.', 'success')
                else:
                    db.connection.rollback()
                    flash('Ocurrio un problema al ingresar','warning')

                cursor.close()

                flash('Se ha ingresado correctamente el archivo de excel a la Base de Datos','success')

            #return redirect(url_for('subir_data_csv'))        
    return redirect(url_for('subir_umsat'))

#PROCESO PARA IMPORTAR CATALOGO DE ARTICULOS A LA BASE DE DATOS
@app.route('/subir_data_csv/procesarV3',methods=['POST','GET'])
@login_required
def subir_data_csv_procesarV3():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('importar_articulos'))
        else:
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
                #archivo.save(archivo_path)
                flash('Se ha subido el archivo Excel para procesar...','success')
                #print(archivo_path)
                #revisar la pagina para agregar parametros
                # https://www.digitalocean.com/community/tutorials/pandas-read_excel-reading-excel-file-in-python
                lectura = pd.read_excel(direc_join,sheet_name='Articulos', usecols=['ART_CLAVE', 'ART_DESCRIPCION','ART_UM_CLAVE','ART_EXISTENCIA','ART_PRECIO_VENTA','ART_PRECIO_PROMEDIO','ART_DESCRIPCION_CORTA','ART_MARCA_PRODUCTO','ART_SAT_CLAVE_PYS','ART_SAT_CLAVE_UNIDAD'])
                flash('Realizando lectura de Excel','success')
                #print(lectura)
                #flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]
                for i,row in lectura.iterrows():
                    p_codigo = row['ART_CLAVE']
                    p_descripcion = row['ART_DESCRIPCION']
                    p_um = row['ART_UM_CLAVE']
                    p_existencia = row['ART_EXISTENCIA']
                    p_pventa = row['ART_PRECIO_VENTA']
                    p_pcosto = row['ART_PRECIO_PROMEDIO']
                    p_cod_prov = row['ART_DESCRIPCION_CORTA']
                    p_marca = row['ART_MARCA_PRODUCTO']
                    clave = row['ART_SAT_CLAVE_PYS']
                    uclave = row['ART_SAT_CLAVE_UNIDAD']
                    data.append((p_codigo, p_descripcion, p_um, p_existencia, p_pventa, p_pcosto, p_cod_prov, p_marca, clave, uclave))

                    p_codigo=''
                    p_descripcion=''
                    p_um=''
                    p_existencia=''
                    p_pventa=''
                    p_pcosto=''
                    p_cod_prov=''
                    p_marca=''
                    clave=''
                    uclave=''
                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')
                
                sql ="INSERT INTO ucat_productos (cp_codigo, cp_descripcion,cp_um, cp_existencia, cp_precio_venta, cp_precio_costo,cp_codigo_prov, cp_marca, cp_cod_prod_serv_sat, cp_cod_um_sat) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

                cursor= db.connection.cursor()
                cursor.executemany(sql, data)

                if (len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Articulos/Productos a la Base de Datos.', 'success')
                else:
                    db.connection.commit()
                    flash('Ocurrio un problema al ingresar','warning')

                cursor.close()    
                flash('Se ha finalizado el ingreso Los Articulos a la Base de Datos','success')
            #return redirect(url_for('subir_data_csv'))        
    return redirect(url_for('importar_articulos'))

#PROCESO PARA SUBIR LA LISTA DE CODIGO POSTAL A LA BASE DE DATOS
@app.route('/subir_data_csv/procesarV4',methods=['POST','GET'])
@login_required
def subir_data_csv_procesarV4():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('importar_codigopostal'))
        else:
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
                #archivo.save(archivo_path)
                flash('Se ha subido el archivo Excel para procesar...','success')
                #print(archivo_path)
                #revisar la pagina para agregar parametros
                # https://www.digitalocean.com/community/tutorials/pandas-read_excel-reading-excel-file-in-python
                lectura = pd.read_excel(direc_join, sheet_name='CodigoPostal3', usecols=['d_codigo','d_asenta_poblado','d_tipo_asenta','d_municipio','d_estado','d_ciudad'])
                flash('Realizando lectura de Excel','success')
                #print(lectura)
                #flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]
                #contador=0
                for i,row in lectura.iterrows():
                    d_codigo = row['d_codigo']
                    d_asenta_poblado = row['d_asenta_poblado']
                    d_tipo_asenta = row['d_tipo_asenta']
                    d_municipio = row['d_municipio']
                    d_estado = row['d_estado']
                    d_ciudad = row['d_ciudad']
                    data.append((d_codigo, d_asenta_poblado, d_tipo_asenta, d_municipio, d_estado, d_ciudad))
                                    
                    d_codigo=0
                    d_asenta_poblado=''
                    d_tipo_asenta =''
                    d_municipio=''
                    d_estado=''
                    d_ciudad =''
                    #sql=''
                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')

                sql ="INSERT INTO ucat_codigo_postal (d_codigo, d_asenta_poblado, d_tipo_asenta, d_municipio, d_estado, d_ciudad) VALUES (%s, %s, %s, %s, %s, %s)"
                #print(sql)
                cursor= db.connection.cursor()
                cursor.executemany(sql, data)

                if (len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Codigos Postales a la Base de Datos.', 'success')
                else:
                    db.connection.rollback()
                    flash('Ocurrio un problema al ingresar','warning')

                #contador +=1
                cursor.close()
                #print(data)
                flash('Se ha finalizado el proceso de subir informacion sin problemas!','success')

            #return redirect(url_for('subir_data_csv'))        
    return redirect(url_for('importar_codigopostal'))

#PROCESO PARA SUBIR LA LISTA DE REGIMENES FISCALES A LA BASE DE DATOS
@app.route('/subir_data_csv/procesarV5',methods=['POST','GET'])
@login_required
def subir_data_csv_procesarV5():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('importar_regimenfiscal'))
        else:
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
                #archivo.save(archivo_path)
                flash('Se ha subido el archivo Excel para procesar...','success')
                
                lectura = pd.read_excel(direc_join,sheet_name='c_RegimenFiscal', usecols=['c_RegimenFiscal', 'Descripción'])
                flash('Realizando lectura de Excel','success')
                #print(lectura)
                #flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]

                for i,row in lectura.iterrows():
                    n_regimen =row['c_RegimenFiscal']
                    n_descripcion=row['Descripción']
                    data.append((n_regimen,n_descripcion))

                    n_regimen=''
                    n_descripcion=''
                
                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')

                sql ="INSERT INTO ucat_regimen_sat (r_regimen, r_descripcion) VALUES( %s, %s)"
                
                cursor= db.connection.cursor()
                cursor.executemany(sql,data)

                if(len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Regimen Fiscal a la Base de Datos.', 'success')
                else:
                    db.connection.rollback()
                    flash('Ocurrio un problema al ingresar','warning')
                
                cursor.close()
                flash('Se ha ingresado correctamente el archivo de excel a la Base de Datos','success')

    return redirect(url_for('importar_regimenfiscal'))

@app.route('/subir_data_csv/procesarV6',methods=['POST','GET'])
@login_required
def subir_data_csv_procesarV6():
    if request.method == 'POST':
        archivo = request.files['inputSubir']
        print(archivo)
        if archivo.filename == '':
            flash('No ha seleccionado ningun archivo de Excel','warning')
            return redirect(url_for('importar_ubicaciones'))
        else:
            direccion = os.path.dirname(os.path.abspath(__file__))
            direc_join = os.path.join(direccion, app.config['UPLOAD_FOLDER'], archivo.filename)
            #print('direccion base',direc_join)
            #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
            #archivo.save(archivo_path)
            isFile = os.path.isfile(direc_join)
            if not isFile:
                archivo.save(direc_join)
                flash('Se ha subido el archivo Excel para procesar...','success')
            else:
                flash('El archivo ya existe...')
                #archivo_path = os.path.join(app.config['UPLOAD_FOLDER'],archivo.filename)
                #archivo.save(archivo_path)
                flash('Se ha subido el archivo Excel para procesar...','success')
                
                lectura = pd.read_excel(direc_join,sheet_name='UBICACION', usecols=['ANA_CLAVE', 'ANA_LADO', 'ANA_POSICION','ANA_ART_CLAVE','ANA_DESCRIPCION'])
                flash('Realizando lectura de Excel','success')
                #print(lectura)
                #flash('Leyendo el archivo','success')
                lectura.fillna('', inplace=True)
                data=[]

                for i,row in lectura.iterrows():
                    a_num =row['ANA_CLAVE']
                    a_lado=row['ANA_LADO']
                    a_lugar=row['ANA_POSICION']
                    a_codigo=row['ANA_ART_CLAVE']
                    a_descripcion=row['ANA_DESCRIPCION']
                    data.append((a_num, a_lado, a_lugar, a_codigo, a_descripcion))
                
                flash('Se ha procesado el archivo de Excel pasando a Data, Empezando a subir....','success')

                sql ="INSERT INTO ucat_ubicaciones (ana_clave, ana_lado, ana_posicion, ana_art_clave, ana_descripcion) VALUES( %s, %s, %s, %s, %s)"
                
                cursor= db.connection.cursor()
                cursor.executemany(sql,data)

                if(len(data) == cursor.rowcount):
                    db.connection.commit()
                    flash('Se han ingresado ' + str(len(data)) + '  Ubicaciones a la Base de Datos.', 'success')
                else:
                    db.connection.rollback()
                    flash('Ocurrio un problema al ingresar la ubicacion','warning')
                
                cursor.close()
                flash('Se ha ingresado correctamente el archivo de excel a la Base de Datos','success')

    return redirect(url_for('importar_ubicaciones'))
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
#           FINALIZA EL AREA DE HERRAMIENTAS
# 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
@app.route('/extras/visor1')
@login_required
def c_extras_visor1():
    #return render_template('catalog/prueba.html')
    return render_template('extras/practicas/rapidapi/visor_rfc.html')
@app.route('/extras/visor2')
@login_required
def c_extras_visor2():
    return render_template('extras/practicas/rapidapi/visor_curp.html')

@app.route('/extras/visor3')
@login_required
def c_extras_visor3():
    return render_template('catalog/articulos/buscador_prod_v2.html')

@app.route('/protected')
@login_required
def protected():
    return "<h1>Esta es una vista protegida, solo para usuarios autenticados.</h1>"

def status_401(error):
    return redirect(url_for('login'))

def status_404(error):
    date = datetime.now()
    return "<h1>Pagina no encontrada</h1><br>" + date.strftime("%Y-%m-%d %H:%M:%S"), 404

@app.errorhandler(400)
def status_400(e):
    return render_template('error_400.html'), 400

@app.errorhandler(401)
def status_401(e):
    return redirect(url_for('login'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('error_404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('error_500.html'), 500

if __name__ == '__main__':
    #app.config.from_object(config['development'])
    #csrf.init_app(app)
    #app.register_error_handler(401,status_401)
    #app.register_error_handler(404,status_404)
    app.run(debug=True)



