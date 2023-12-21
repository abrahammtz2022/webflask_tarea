class Config:
    SECRET_KEY = 'B!1w8NAt1T^%kvhUI*S^'


class DevelomentConfig(Config):
    DEBUG=True
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'pvwebcontrol'
    MYSQL_CHARSET = 'utf8mb4'

config = {
    'development': DevelomentConfig
}