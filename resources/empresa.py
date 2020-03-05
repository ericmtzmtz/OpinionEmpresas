from flask import Blueprint, Response, request
from database.models import Empresas

empresas = Blueprint('empresas', __name__)

# @app.route('/empresas')
@empresas.route('/empresas')
def get_empresas():
    empresas = Empresas.objects().to_json()
    return Response(empresas, mimetype="application/json", status=200)


# @app.route('/empresas', methods=['POST'])
@empresas.route('/empresas', methods=['POST'])
def add_empresa():
    body = request.json
    empresa = Empresas(**body).save()
    id = empresa.id
    return {'id': str(id)}, 200


# @app.route('/empresas/<id>', methods=['PUT'])
@empresas.route('/empresas/<id>', methods=['PUT'])
def update_empresa(id):
    body = request.get_json()
    Empresas.objects.get(id=id).update(**body)
    return '', 200


# @app.route('/empresas/<id>', methods=['DELETE'])
@empresas.route('/empresas/<id>', methods=['DELETE'])
def delete_empresa(id):
    Empresas.objects.get(id=id).delete()
    return '', 200


# @app.route('/empresas/<id>')
@empresas.route('/empresas/<id>')
def get_empresa(id):
    empresa = Empresas.objects.get(id=id).to_json()
    return Response(empresa, mimetype="application/json", status=200)