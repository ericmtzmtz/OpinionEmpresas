from flask import Response, request
from database.models import Opinion, User, Empresa
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_jwt_extended.exceptions import NoAuthorizationError
from flask_restful import Resource
from mongoengine.errors import FieldDoesNotExist, \
	NotUniqueError, DoesNotExist, ValidationError, InvalidQueryError
from resources.errors import SchemaValidationError, EmpresaAlreadyExistsError,\
	EmpresaNotExistsError, InternalServerError, UpdatingEmpresaError, DeletingEmpresaError, UnauthorizedCreation
import json
from datetime import datetime


class OpinionesApi(Resource):
	@jwt_required
	def get(self):
		try:
			user_id     = get_jwt_identity()
			user        = User.objects.get(id=user_id)
			username    = user.name
			isStaff     = user.isStaff
			if isStaff:
				opiniones     = Opinion.objects()
			else:
				opiniones   = Opinion.objects.filter(added_by=user_id)
			empresas    = Empresa.objects()
			empresasList= []
			for i in empresas:
				empresasList.append(i.name)
			
			responseOpinion = []
			puntuacion = [
				'1',
				'2',
				'3',
				'4',
				'5'
			]
			if len(opiniones)>0:
				for i in opiniones:
					user        = User.objects.get(id=i.added_by.id)
					username    = user.name
					if isStaff:
						datosOpinion = {
							'data': {
								'_id': str(i.id),
								'title': i.title,
								'resume': i.resume,
								'publish_date': i.publish_date.strftime("%m/%d/%Y, %H:%M:%S"),
								'points': i.points,
								'ip': i.ip,
								'userName': username,
							},
							'data2': {
								'empresas': empresasList,
								'puntuaciones': puntuacion
							}
						}
					else:
						datosOpinion = {
							'data': {
								'_id': str(i.id),
								'title': i.title,
								'resume': i.resume,
								'publish_date': i.publish_date.strftime("%m/%d/%Y, %H:%M:%S"),
								'points': i.points,
								'userName': username,
							},
							'data2': {
								'empresas': empresasList,
								'puntuaciones': puntuacion
							}
						}
					responseOpinion.append(datosOpinion)
			else:
				datosOpinion = {
						'data2': {
							'empresas': empresasList,
							'puntuaciones': puntuacion
						}
					}
				responseOpinion.append(datosOpinion)
			return Response(json.dumps(responseOpinion), mimetype="application/json", status=200)
		except DoesNotExist:
			return 'Aun no hay opiniones'
		except NoAuthorizationError:
			return UnauthorizedCreation

	@jwt_required
	def post(self):
		try:
			user_id = get_jwt_identity()
			body    = request.get_json()
			ip      = request.environ.get('HTTP_X_REAL_IP', request.remote_addr)
			user    = User.objects.get(id=user_id)
			opinion = Opinion(**body, added_by=user_id, ip=ip)
			opinion.save()
			user.update(push__opiniones=opinion)
			user.save()
			id      = opinion.id
			return {'id': str(id), 'message': 'Creation Successful'}, 200
		except(FieldDoesNotExist, ValidationError):
			raise SchemaValidationError + 'Remenber only umber 1 to 5 in points'
		except Exception as e:
			raise InternalServerError

class OpinionApi(Resource):
	@jwt_required
	def update(self, id):
		try:
			user_id = get_jwt_identity()
			opinion = Opinion.objects.get(id=id, added_by=user_id)
			body = request.get_json()
			Opinion.objects.get(id=id).update(**body)
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
			opinion = Opinion.objects.get(id=id, added_by=user_id)
			opinion.delete()
			return '', 200
		except DoesNotExist:
			raise DeletingEmpresaError
		except Exception:
			raise InternalServerError

	@jwt_required
	def get(self, id):
		try:
			user_id = get_jwt_identity()
			user        = User.objects.get(id=user_id)
			username    = user.name
			isStaff     = user.isStaff
			opinion     = Opinion.objects.get(id=id, added_by=user_id)
			empresas    = Empresa.objects()
			empresasList= []
			for i in empresas:
				empresasList.append(i.name)
			puntuacion = [
				'1',
				'2',
				'3',
				'4',
				'5'
			]
			if isStaff:
				datosOpinion = {
					'_id': id,
					'title': opinion.title,
					'resume': opinion.resume,
					'publish_date': opinion.publish_date.strftime("%m/%d/%Y, %H:%M:%S"),
					'points': opinion.points,
					'ip': opinion.ip,
					'userName': username,
					'empresas': empresasList,
					'puntuaciones': puntuacion
				}
			else:
				datosOpinion = {
					'_id': id,
					'title': opinion.title,
					'resume': opinion.resume,
					'publish_date': opinion.publish_date.strftime("%m/%d/%Y, %H:%M:%S"),
					'points': opinion.points,
					'userName': username,
					'empresas': empresasList,
					'puntuaciones': puntuacion
				}
			return Response(json.dumps(datosOpinion), mimetype="application/json", status=200)
		except DoesNotExist:
			raise EmpresaNotExistsError
		except Exception:
			raise InternalServerError