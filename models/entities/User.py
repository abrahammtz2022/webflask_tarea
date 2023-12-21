from werkzeug.security import check_password_hash, generate_password_hash
from flask_login import UserMixin

# class User(UserMixin):
#     def __init__(self, id, username, password, fullname="") -> None:
#         self.id = id
#         self.username = username
#         self.password = password
#         self.fullname = fullname

#     @classmethod
#     def check_password(self, hashed_password, password):
#         return check_password_hash(hashed_password, password)

#esta clase pertece para la nueva base de datos pvwebcontrol    
class Usuarios(UserMixin):
    def __init__(self, id, UC_USUARIO, UC_PASSWORD, UC_NOMBRE_C, UC_DIRECCION, UC_NIVEL, UC_PUESTO, UC_FECHA_NACIMIENTO, UC_FECHA_REGISTRO, UC_FECHA_BAJA, UC_SUCURSAL, UC_LETRA_FOLIO, UC_ESTADO) -> None:
        self.id = id
        self.UC_USUARIO = UC_USUARIO
        self.UC_PASSWORD = UC_PASSWORD
        self.UC_NOMBRE_C = UC_NOMBRE_C
        self.UC_DIRECCION = UC_DIRECCION
        self.UC_NIVEL = UC_NIVEL
        self.UC_PUESTO = UC_PUESTO
        self.UC_FECHA_NACIMIENTO = UC_FECHA_NACIMIENTO
        self.UC_FECHA_REGISTRO = UC_FECHA_REGISTRO
        self.UC_FECHA_BAJA = UC_FECHA_BAJA
        self.UC_SUCURSAL = UC_SUCURSAL
        self.UC_LETRA_FOLIO = UC_LETRA_FOLIO
        self.UC_ESTADO = UC_ESTADO

    
    @classmethod
    def check_password(self, hashed_password, password):
        return check_password_hash(hashed_password, password)

    @classmethod
    def generar_password_hashed(self, password):
        return generate_password_hash(password)
#print(generate_password_hash("rfs980102cg8"))

#INSERT INTO `ucat_usuarios` (`UC_ID`, `UC_USUARIO`, `UC_PASSWORD`, `UC_NOMBRE_C`, `UC_DIRECCION`, `UC_NIVEL`, `UC_PUESTO`, `UC_FECHA_NACIMIENTO`, `UC_FECHA_REGISTRO`, `UC_FECHA_BAJA`) VALUES (NULL, 'ABRAHAM', 'pbkdf2:sha256:260000$6mvRxD237O73fjio$222c2f2a7fde07fe7ed2046e5bb1dfba29d09cf76fcc594a988f23a6945c20a1', 'Abraham Martinez S.', 'Domicilio conocido', '1 - SuperAdministrador', '1 - Gerente Informatica', '1983-07-04', '2023-10-17 19:40:14.000000', '1900-10-17 19:40:14.000000');