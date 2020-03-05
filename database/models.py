from .db import db


class Empresas(db.Document):
    name        = db.StringField(required=True, unique=True)
    resume      = db.StringField(required=True)
    opinions    = db.ListField(db.StringField(), required=False) 