from flask import Response, request
from database.models import Empresa, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, \
    NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, EmpresaAlreadyExistsError,\
    EmpresaNotExistsError, InternalServerError, UpdatingEmpresaError, DeletingEmpresaError, UnauthorizedCreation


class EmpresasApi(Resource):
    def get(self):
        empresas = Empresa.objects().to_json()
        return Response(empresas, mimetype="application/json", status=200)

    @jwt_required
    def post(self):
        try:
            user_id = get_jwt_identity()
            body    = request.get_json()
            user    = User.objects.get(id=user_id)
            empresa = Empresa(**body, added_by=user_id)
            empresa.save()
            user.update(push__empresas=empresa)
            user.save()
            id      = empresa.id
            return {'id': str(id)}, 200
        except(FieldDoesNotExist, ValidationError):
            raise SchemaValidationError
        except NotUniqueError:
            raise EmpresaAlreadyExistsError
        except NoAuthorizationError:
            raise UnauthorizedCreation
        except Exception as e:
            raise InternalServerError

class EmpresaApi(Resource):
    @jwt_required
    def put(self, id):
        try:
            user_id = get_jwt_identity()
            empresa = Empresa.objects.get(id=id, added_by=user_id)
            body    = request.get_json()
            Empresa.objects.get(id=id).update(**body)
            return '', 200
        except InvalidQueryError:
            raise SchemaValidationError
        except DoesNotExist:
            raise UpdatingEmpresaError
        except Exception:
            raise InternalServerError

    @jwt_required
    def delete(self, id):
        try:
            user_id = get_jwt_identity()
            empresa = Empresa.objects.get(id=id, added_by=user_id)
            empresa.delete()
            return '', 200
        except DoesNotExist:
            raise DeletingEmpresaError
        except Exception:
            raise InternalServerError

    def get(self, id):
        try:
            empresa = Empresa.objects.get(id=id).to_json()
            return Response(empresa, mimetype="application/json", status=200)
        except DoesNotExist:
            raise EmpresaNotExistsError
        except Exception:
            raise InternalServerError