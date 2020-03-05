from .db import db
from flask import request
import datetime
from flask_bcrypt import generate_password_hash, check_password_hash


class Empresa(db.Document):
    name        = db.StringField(required=True, unique=True)
    resume      = db.StringField(required=False)
    added_by    = db.ReferenceField('User')
    # opinions    = db.ListField(EmbeddedDocumentField(Opiniones), required=False)


class Opinion(db.Document):
    puntuacion = (
        ('1', 'Mala'),
        ('2', 'Regular'),
        ('3', 'Aceptable'),
        ('4', 'Buena'),
        ('5', 'Excelente')
    )

    title       = db.StringField(required=True)
    resume      = db.StringField(required=False)
    publish_date= db.DateTimeField(default=datetime.datetime.now())
    points      = db.StringField(max_length=1, choices=puntuacion, required=True)
    ip          = db.StringField(required=False)
    added_by    = db.ReferenceField('User')
    # empresa     = db.ReferenceField(Empresas)


class User(db.Document):
    name        = db.StringField(required=True, max_length=30)
    email       = db.EmailField(required=True, unique=True)
    password    = db.StringField(required=True, min_length=6)
    empresas    = db.ListField(db.ReferenceField('Empresa', reverse_delete_rule=db.PULL))
    opiniones   = db.ListField(db.ReferenceField('Opinion', reverse_delete_rule=db.PULL))

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)


User.register_delete_rule(Empresa, 'added_by', db.CASCADE)
User.register_delete_rule(Opinion, 'added_by', db.CASCADE)
