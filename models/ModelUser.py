# from .entities.User import User
from .entities.User import Usuarios
#from .entities.User import Usuarios

# class ModelUser():

#     @classmethod
#     def login(self, db, user):
#         try:
#             cursor=db.connection.cursor()
#             sql="""SELECT id, username, password, fullname FROM user
#                     WHERE username='{}'""".format(user.username)
#             cursor.execute(sql)
#             row=cursor.fetchone()
#             if row != None:
#                 user=User(row[0], row[1], User.check_password(row[2], user.password), row[3])
#                 return user
            
#             else:
#                 return None 
#         except Exception as ex:
#             raise Exception(ex)
#     @classmethod
#     def get_by_id(self, db, id):
#         try:
#             cursor = db.connection.cursor()
#             sql = "SELECT id, username, fullname FROM user WHERE id = {}".format(id)
#             cursor.execute(sql)
#             row = cursor.fetchone()
#             if row != None:
#                 return User(row[0], row[1], None, row[2])
#             else:
#                 return None
#         except Exception as ex:
#             raise Exception(ex)
        
class ModelUsuarios():
    @classmethod
    def login(self, db, user):
        try:
            cursor=db.connection.cursor()
            sql="""SELECT id, UC_USUARIO, UC_PASSWORD, UC_NOMBRE_C, UC_DIRECCION, UC_NIVEL, UC_PUESTO, UC_FECHA_NACIMIENTO, UC_FECHA_REGISTRO, UC_FECHA_BAJA, UC_SUCURSAL, UC_LETRA_FOLIO, UC_ESTADO FROM ucat_usuarios
                    WHERE UC_USUARIO='{}'""".format(user.UC_USUARIO)
            #print(sql)
            cursor.execute(sql)
            row=cursor.fetchone()
            if row != None:
                user=Usuarios(row[0],row[1],Usuarios.check_password(row[2],user.UC_PASSWORD),row[3], row[4], row[5], row[6], row[7], row[8], row[9],row[10], row[11], row[12])
                return user
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_by_id(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = "SELECT id, UC_USUARIO, UC_NOMBRE_C, UC_NIVEL, UC_SUCURSAL, UC_LETRA_FOLIO, UC_ESTADO FROM ucat_usuarios WHERE id = {}".format(id)
            #print(sql)
            cursor.execute(sql)
            row = cursor.fetchone()
            if row != None:
                return Usuarios(row[0], row[1], None, row[2], None, row[3], None, None, None, None, row[4], row[5], row[6])
            else:
                return None
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def cambiar_password(self, db, usuario):
        try:
            password_hashed = Usuarios.generar_password_hashed(usuario.password)
            cursor = db.connection.cursor()
            sql = """UPDATE ucat_usuarios 
                     SET UC_PASSWORD = '{0}' 
                     WHERE id = {1}""".format(password_hashed, usuario.id)
            cursor.execute(sql)
            db.connection.commit()
            return True
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_datos_usuario(self, db, nombre, domicilio, nivel, puesto, fechanacimiento, id):
        try:
            cursor = db.connection.cursor()
            sql = """UPDATE ucat_usuarios 
                     SET UC_NOMBRE_C = '{0}', UC_DIRECCION = '{1}', UC_NIVEL = '{2}', UC_PUESTO = '{3}', UC_FECHA_NACIMIENTO = '{4}'  
                     WHERE id = {5}""".format(nombre, domicilio, nivel, puesto, fechanacimiento, id)
            cursor.execute(sql)
            db.connection.commit()
            return True

        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def mostrar_info_usuario(self, db, id):
        try:
            cursor = db.connection.cursor()
            sql = """SELECT * FROM ucat_usuarios 
              WHERE id ={0}""".format(id)
            cursor.execute(sql)
            resultado = cursor.fetchall()
            cursor.close()
            return resultado
        except Exception as ex:
            raise Exception(ex)
        

    # def lista_usuarios(self, db):
    #     try:
    #         cursor = db.conecction.cursor()
    #     except Exception as ex:
    #         raise Exception(ex)
    